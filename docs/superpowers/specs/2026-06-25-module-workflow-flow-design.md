# Module Workflow Flow — Design Spec

**Date:** 2026-06-25
**Status:** Approved (pending spec review)
**Author:** Gabriel (via brainstorming with ZCode)

## 1. Problem Statement

Today the Developer Portal has three disconnected tools:

- **DSL Studio** (`/dsl-studio`) — Monaco editor that generates a full-stack project ZIP from `.schema` + `.views`.
- **Manifest Builder** (`/manifest`) — form-driven XML manifest editor with a dependency graph.
- **Submission Portal** (`/`) — a manual form where the developer **re-types** module name, version, DSL code, and manifest XML.

These three tools share no state. To submit a module, the developer must **copy-paste by hand** between tabs. The Manifest Builder also lacks per-endpoint request/response schemas, so the API Explorer can't surface rich contract details. There is no version history, no package download, and no way to resume work after a refresh.

The goal is a single guided authoring → packaging → submission flow where data flows automatically, the package can be downloaded/uploaded as a ZIP, every tab has its own import/export, and submissions are version-tracked to match how modules appear in the Giolit marketplace (Landing Page) and Admin dashboard.

## 2. Goals & Non-Goals

### Goals

1. **Guided wizard flow** — DSL Studio → Manifest Builder → Module Details → Review & Submit, with a progress stepper and automatic data passing between steps.
2. **No manual copy-paste** — DSL code and manifest XML are read directly from a shared store when submitting.
3. **Rich API contracts in the manifest** — each exposed API carries description, request body schema, response schema, and required roles, which the API Explorer consumes.
4. **Package download & upload** — export the complete module (DSL + manifest + metadata) as a structured ZIP; upload a ZIP to restore all steps.
5. **Per-tab import/export** — DSL Studio, Manifest Builder, and the wizard each have their own import/export.
6. **Version tracking** — smart SemVer bump selector backed by per-module version history; changelog + release notes per version (mirrors Giolit Admin's `ModuleVersion`).
7. **Marketplace-aligned metadata** — submission captures every field the marketplace and Admin need: `displayName`, `description`, `category`, `industry`, `iconName`, `features[]`, `tagline`, `color`, `price`.

### Non-Goals

- Building a formal admin approval/rejection workflow (Giolit Admin uses a status field; we align with that, not invent a new review board).
- Changing the Hospital DSL engine or the code-generation backend.
- Removing the existing SSE pipeline/compilation behavior.
- Consumer-facing marketplace UI (that lives in the Landing Page repo).

## 3. Key Decisions (from brainstorming)

| Decision | Choice | Rationale |
|---|---|---|
| Workflow shape | **4-step guided wizard** with stepper | Natural funnel; eliminates copy-paste; each step still deep-linkable. |
| State management | **Zustand + localStorage backup** | Survives refresh without backend churn; backend save only on explicit submit. |
| Version entry | **Smart SemVer bump selector** | Patch by default; developer can pick minor/major; backed by version history. |
| ZIP format | **Structured: DSL files + manifest XML + metadata JSON** | Clean, parseable, mirrors the file types each tool already produces. |
| API contract detail | **Full schema per endpoint** | Enables API Explorer to show request/response bodies. |
| Metadata ownership | **Developer fills all** marketplace fields | Admin can still edit later (matches Admin's existing edit modal). |
| Import/export scope | **Per-tab + full package + history export** | Covers all four formats the user requested. |

## 4. Architecture

### 4.1 High-level flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Module Workspace (/workspace)                 │
│                                                                     │
│   ┌─────────┐   ┌──────────┐   ┌────────────┐   ┌───────────────┐   │
│   │ Step 1  │──▶│ Step 2   │──▶│ Step 3     │──▶│ Step 4        │   │
│   │ DSL     │   │ Manifest │   │ Module     │   │ Review &      │   │
│   │ Studio  │   │ Builder  │   │ Details    │   │ Submit        │   │
│   └─────────┘   └──────────┘   └────────────┘   └───────┬───────┘   │
│        │              │               │                  │           │
│        └──────────────┴───────────────┴──────────────────┘           │
│                              │                                        │
│                    workspaceStore (Zustand + localStorage)           │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼  (on submit)
                    BFF /bff/dsl/submit (expanded)
                               │
                               ▼
                  SubmissionEntity (+ new metadata columns)
                               │
                               ▼  (existing SSE pipeline)
                    Compilation status → Review step
```

### 4.2 New shared store: `workspaceStore`

A new Zustand store at `devportal/frontend/src/store/workspaceStore.ts` with a `persist` middleware (localStorage) so in-progress work survives refreshes. Shape:

```ts
interface WorkspaceState {
  // Step 1 — DSL
  dsl: {
    schema: string;
    views: string;
  };
  // Step 2 — Manifest (form state, mirrors current ManifestBuilder local state)
  manifest: {
    name: string;
    version: string;
    description: string;
    contextPath: string;
    publicApis: ManifestApi[];      // enhanced — see 4.4
    dependencies: ManifestDependency[];
  };
  // Step 3 — Marketplace metadata (mirrors Giolit Admin Module + Landing Page)
  metadata: {
    displayName: string;
    longDescription: string;
    category: string;               // functional category
    industry: string;               // suite id: healthcare | education | retail | ...
    iconName: string;               // Phosphor icon name, e.g. "Heartbeat"
    tagline: string;
    color: string;                  // tailwind accent, e.g. "rose"
    features: string[];             // feature bullets
    price: number;                  // 0 = free
    changelog: string;              // for this version
    releaseNotes: string;           // for this version
  };
  // Tracking
  lastSavedAt: string | null;       // localStorage persistence timestamp
  currentStep: WizardStep;          // 'dsl' | 'manifest' | 'details' | 'review'

  // Actions
  setDsl: (patch: Partial<WorkspaceState['dsl']>) => void;
  setManifest: (patch: Partial<WorkspaceState['manifest']>) => void;
  setMetadata: (patch: Partial<WorkspaceState['metadata']>) => void;
  setCurrentStep: (step: WizardStep) => void;
  loadPackage: (pkg: ModulePackage) => void;  // from ZIP import
  exportPackage: () => ModulePackage;          // to ZIP
  reset: () => void;                           // new module / after submit
}
```

Enhanced manifest API type (the key new contract detail):

```ts
interface ManifestApi {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;          // NEW
  requiredRole: string;         // NEW (was hardcoded "ANY")
  requestSchema?: object;       // NEW — JSON schema
  responseSchema?: object;      // NEW — JSON schema
  exampleResponse?: object;     // NEW — sample body
}
```

### 4.3 Routing & navigation changes

The sidebar (`App.tsx` `navItems`) is restructured. The three separate entries (Submission Portal, DSL Studio, Manifest Builder) collapse into **one** "Module Workspace" entry pointing at `/workspace`. API Explorer and Ticket Inbox remain.

```
navItems = [
  { path: '/workspace',      label: 'Module Workspace',  icon: Hammer },     // NEW (replaces 3)
  { path: '/api-explorer',   label: 'API Explorer',      icon: MagnifyingGlass },
  { path: '/tickets',        label: 'Ticket Inbox',      icon: Ticket },
];
```

Routes under `/workspace/*` (all share `PortalLayout`):

| Path | Step | Component |
|---|---|---|
| `/workspace` | — | redirects to `currentStep` from the store (defaults to `/workspace/dsl` for a fresh module); the stepper lets the developer jump to any step regardless |
| `/workspace/dsl` | 1 | `WorkspaceDslStep` (wraps existing DSL Studio editor) |
| `/workspace/manifest` | 2 | `WorkspaceManifestStep` (wraps existing Manifest Builder form) |
| `/workspace/details` | 3 | `ModuleDetailsStep` (new) |
| `/workspace/review` | 4 | `ReviewSubmitStep` (new, replaces Submission Portal form) |

Legacy paths (`/`, `/dsl-studio`, `/manifest`) redirect to the corresponding workspace step so old bookmarks still work.

A **`<WizardStepper>`** component renders at the top of every workspace step: four clickable segments showing step name + completion checkmark (a step is "complete" when its required fields validate). Free navigation is allowed; the stepper only *guides*, never blocks.

### 4.4 Step 2 enhancement — full API contracts

The Manifest Builder's "Exposed APIs" tab grows from two fields (method, path) to a richer editor. Each API row expands inline to reveal:

- **Description** (text)
- **Required Role** (text, e.g. `Admin`, `Patient`, `ANY`)
- **Request Schema** (JSON, edited in a small Monaco/lightweight JSON editor)
- **Response Schema** (JSON)
- **Example Response** (JSON)

The generated XML manifest is extended to carry these (new `<description>`, `<requiredRole>` already exist as stubs; add optional `<requestSchema>`, `<responseSchema>`, `<exampleResponse>` CDATA blocks). The BFF's `ApiEndpoint` type and the API Explorer already render `requestSchema`/`responseSchema`/`exampleResponse` — so once the manifest carries them, the Explorer shows them with no Explorer-side changes.

Validation rule **VAL-009** is added: request/response schema fields, if non-empty, must parse as valid JSON.

### 4.5 Step 3 — Module Details

A new form capturing marketplace metadata. Field sources:

- **From Giolit Admin `Module` entity:** `displayName`, `description` (→ `longDescription`), `category`, `industry`, `iconName`, `tagline`, `color`, `price`, `features`.
- **From Giolit Admin `ModuleVersion` entity:** `changelog`, `releaseNotes`.
- **From Landing Page `IndustrySuite`:** the `industry` dropdown is populated from the fixed suite list (healthcare, education, retail, manufacturing, agriculture, finance, legal, logistics, hospitality, government) so submitted modules slot into existing marketplace suites. The `color` and default `iconName` auto-suggest from the chosen industry but remain editable.

**Smart SemVer bump selector:** on entering this step (and whenever `manifest.name` changes), the store fetches `GET /bff/developer/submissions/{moduleName}/versions`. If prior versions exist, a segmented control offers:

```
Current latest: v1.2.4
[ ● Patch v1.2.5 ]  [ ○ Minor v1.3.0 ]  [ ○ Major v2.0.0 ]   [ ✎ Custom ]
```

Selecting one writes the bumped version back into `manifest.version`. If no prior versions exist, it defaults to `0.1.0`. The developer can always pick "Custom" and type any SemVer.

**features editor:** a tag-input (add/remove chips) that the package serializes as a comma-joined string in `module-metadata.json` (to match Giolit Admin's comma-separated `features` column) while remaining an array in the store.

### 4.6 Step 4 — Review & Submit

Replaces the Submission Portal's left-hand form. Layout:

- **Read-only summary cards** — DSL code preview (first ~30 lines + "show all"), generated manifest XML preview, and a metadata summary grid.
- **Validation gate** — re-runs all manifest validations (VAL-001…009) and required-metadata checks; the Submit button is disabled until green, with a tooltip listing blockers.
- **Primary actions:**
  - **Download Package** — builds and downloads the structured ZIP (see 4.7).
  - **Submit to Pipeline** — calls the expanded `POST /bff/dsl/submit` with the full package.
- **Post-submit:** the existing SSE pipeline timeline moves *into this step* (right pane), reusing `useStatusStream`. On terminal `ACTIVE`/`ERROR`, the store's `reset()` is offered ("Start new module").

The separate "Your Submissions" list that currently lives on the Submission Portal moves to a **new `/workspace/history`** sub-route (or a collapsible panel) so it doesn't crowd the authoring flow.

## 5. Package Format (ZIP)

A downloaded/uploaded module package is a ZIP with this exact structure:

```
<module-name>-v<version>.zip
├── module/
│   ├── project.schema          # DSL schema (Step 1)
│   ├── project.views           # DSL views (Step 1)
│   ├── module-manifest.xml     # generated manifest (Step 2)
│   └── module-metadata.json    # metadata + version info (Steps 3 & 4)
└── package.json                # manifest for the package itself
```

`module/package.json` (package manifest, not the npm one):

```json
{
  "packageVersion": 1,
  "moduleName": "acme-cardiology",
  "version": "1.2.4",
  "createdAt": "2026-06-25T12:00:00Z",
  "exportedBy": "dev-partner",
  "files": {
    "schema": "project.schema",
    "views": "project.views",
    "manifest": "module-manifest.xml",
    "metadata": "module-metadata.json"
  }
}
```

`module/module-metadata.json`:

```json
{
  "name": "acme-cardiology",
  "displayName": "Acme Cardiology",
  "version": "1.2.4",
  "description": "Cardiology diagnostic viewer and reporting module.",
  "longDescription": "...",
  "contextPath": "/api/acme/cardiology",
  "category": "Clinical Operations",
  "industry": "healthcare",
  "iconName": "Heartbeat",
  "tagline": "...",
  "color": "rose",
  "features": ["EKG viewer", "Reporting", "..."],
  "price": 0,
  "changelog": "- Fixed EKG render\n- Added export",
  "releaseNotes": "Maintenance release."
}
```

**Library:** `jszip` (add to `package.json`) for both build and parse. No backend involvement for download; upload parses client-side and calls `workspaceStore.loadPackage()`.

**Round-trip guarantee:** `exportPackage()` then `loadPackage()` is lossless for every field in `workspaceStore`.

## 6. Import/Export Matrix

| Location | Export | Import |
|---|---|---|
| Step 1 header | "Export DSL" → ZIP with `project.schema` + `project.views` | "Import DSL" → upload `.schema`/`.views` files or a DSL ZIP; replaces editor contents (with confirm) |
| Step 2 header | "Export XML" → `module-manifest.xml` (existing button kept) | "Import XML" → upload `.xml`; parses fields back into the form |
| Any step (wizard toolbar) | "Download Package" → full module ZIP (§5) | "Upload Package" → full module ZIP; restores all four steps |
| History view | "Export History" → `submissions.json` (or CSV) of all the developer's submissions | — (history is read-only; re-editing a past submission is done by downloading *that* submission's package and uploading it as a new package) |

A small **"Re-edit"** action on each history row downloads that submission as a package ZIP, so the developer can tweak and resubmit as a new version.

## 7. Backend Changes (BFF)

Minimal, additive only.

### 7.1 `SubmissionEntity` — new columns

```java
@Column(name = "display_name")
private String displayName;

@Column(name = "long_description", columnDefinition = "TEXT")
private String longDescription;

@Column(name = "category")
private String category;

@Column(name = "industry")
private String industry;

@Column(name = "icon_name")
private String iconName;

@Column(name = "tagline")
private String tagline;

@Column(name = "color")
private String color;

@Column(name = "features", columnDefinition = "TEXT")   // comma-separated
private String features;

@Column(name = "price")
private Double price;

@Column(name = "changelog", columnDefinition = "TEXT")
private String changelog;

@Column(name = "release_notes", columnDefinition = "TEXT")
private String releaseNotes;
```

Added alongside the existing `dslCode`, `manifestXml`, `moduleName`, `version`, `status`. A Flyway/Liquibase-style migration or `spring.jpa.hibernate.ddl-auto=update` (already the dev mode) handles the schema.

### 7.2 `SubmitDslRequest` — expanded record

```java
public record SubmitDslRequest(
    @NotBlank String moduleName,
    @NotBlank @Pattern(regexp = SEMVER) String version,
    @NotBlank String dslCode,
    @NotBlank String manifestXml,
    // new optional marketplace metadata
    String displayName,
    String longDescription,
    String category,
    String industry,
    String iconName,
    String tagline,
    String color,
    String features,        // comma-separated
    Double price,
    String changelog,
    String releaseNotes
) {}
```

`SubmissionService.createSubmission()` populates the new columns. `SubmissionDto` gains matching fields so the frontend can render full submissions in history.

> **Why the new fields are optional on the backend but required at submit:** the record stays backward-compatible with any existing caller (and with already-stored submissions that have null metadata). The *enforcement* of required marketplace fields happens client-side in the Review step's validation gate (§4.6), so the developer never reaches the API with missing data. The backend does not duplicate that validation — it trusts the authenticated portal.

### 7.3 New endpoint — version history

```java
@GetMapping("/submissions/{moduleName}/versions")
public ResponseEntity<List<VersionInfo>> getVersions(
        @AuthenticationPrincipal JwtUser principal,
        @PathVariable String moduleName) { ... }
```

Returns the developer's submitted versions for that module name, newest first:

```json
[
  { "version": "1.2.4", "status": "ACTIVE",  "submittedAt": "2026-06-20T..." },
  { "version": "1.2.3", "status": "ACTIVE",  "submittedAt": "2026-06-10T..." },
  { "version": "1.2.0", "status": "ERROR",   "submittedAt": "2026-06-01T..." }
]
```

Implemented via a new `SubmissionRepository.findByDeveloperIdAndModuleNameOrderBySubmittedAtDesc(...)` query. The frontend uses the highest `ACTIVE`/`PENDING` version to compute bump suggestions.

### 7.4 No changes

- The DSL generation/validate endpoints (`/bff/dsl/generate`, `/bff/dsl/validate-hospital`) are unchanged.
- The SSE status stream (`/bff/status/stream`) is unchanged.
- The compilation pipeline is unchanged.

## 8. Version Tracking Model

Version tracking is **submission-centric** in the dev portal (each submission = one version attempt) and aligns with Giolit Admin's `ModuleVersion` on promotion to the catalog:

- **In the dev portal:** every `POST /bff/dsl/submit` with a `(moduleName, version)` pair is a version record. The `(moduleName, version)` combination should be **unique while occupying** (a validation in `SubmissionService`: reject a new submission whose `(moduleName, version)` already exists with status `PENDING`/`COMPILING`/`ACTIVE`; a prior `ERROR`/`INACTIVE` frees the slot so the version can be retried). This mirrors Giolit Admin's `module_versions` unique constraint.
- **History view** groups submissions by `moduleName`, showing each version's status and timestamp, with a "current latest" badge on the highest `ACTIVE` version.
- **On promotion** (future, out of scope here): Giolit Admin ingests a submission into its `modules` + `module_versions` tables; the dev portal's `changelog`/`releaseNotes` map directly onto `ModuleVersion.changelog`/`releaseNotes`.

## 9. Components to Build / Modify

### New files
- `src/store/workspaceStore.ts` — persisted Zustand store (§4.2).
- `src/screens/workspace/WorkspaceLayout.tsx` — stepper + step outlet + wizard toolbar (download/upload package).
- `src/screens/workspace/WorkspaceDslStep.tsx` — wraps the DSL editor, reads/writes `workspaceStore.dsl`.
- `src/screens/workspace/WorkspaceManifestStep.tsx` — wraps the manifest form, reads/writes `workspaceStore.manifest`.
- `src/screens/workspace/ModuleDetailsStep.tsx` — new metadata form + SemVer bump selector (§4.5).
- `src/screens/workspace/ReviewSubmitStep.tsx` — review cards + submit + SSE timeline (§4.6).
- `src/screens/workspace/SubmissionHistory.tsx` — relocated "Your Submissions" + export.
- `src/components/workspace/WizardStepper.tsx`
- `src/components/workspace/SemverBumpSelector.tsx`
- `src/components/workspace/FeaturesEditor.tsx` (tag input)
- `src/lib/package-io.ts` — ZIP build/parse using jszip, with `buildPackage()`, `parsePackage()`, plus per-tab exporters/importers.

### Modified files
- `src/App.tsx` — new routes, collapsed nav, legacy redirects.
- `src/screens/playground/DslStudio.tsx` — refactor the *editor core* into a reusable `<DslEditor>` that both the legacy page and `WorkspaceDslStep` can render; add import/export buttons; wire to store.
- `src/screens/manifest/ManifestBuilder.tsx` — refactor form core into `<ManifestForm>`; add per-API schema editor; wire to store; add import XML.
- `src/screens/submission/SubmissionPortal.tsx` — its submit form is removed; the SSE timeline + history move into the workspace. (File may be deleted or reduced to a redirect.)
- `src/store/submissionStore.ts` — add `fetchVersions(moduleName)`, expand `submitDsl` to send the full package.
- `src/types/index.ts` — add `ManifestApi` (enhanced), `ModuleMetadata`, `ModulePackage`, `VersionInfo`, `WizardStep`.
- `src/api/bff.ts` — add `getModuleVersions(moduleName)`; expand `submitDsl` body.
- Backend: `SubmissionEntity`, `SubmitDslRequest`, `SubmissionDto`, `SubmissionService`, `SubmissionRepository`, `DeveloperController` (new endpoint) — §7.

### Deleted/removed from routing
- The standalone `/` Submission Portal route (redirects to `/workspace`).
- Unused marketplace/sandbox playground files are untouched (already unrouted).

## 10. Error Handling

- **ZIP parse failure** (corrupt or wrong format): show an inline error toast naming the missing/invalid file; do not clobber existing store state.
- **Schema version mismatch** (`package.json.packageVersion` unknown): refuse load with an upgrade hint.
- **Version collision on submit** (§8): the BFF returns `409 Conflict`; the Review step surfaces it and offers to bump the version via the selector.
- **Network failure during submit**: existing error handling in `submissionStore` is reused; the package remains in the store so retry needs no re-entry.
- **localStorage quota / parse errors**: `persist` middleware's `onRehydrateStorage` catches and resets to defaults with a console warning rather than crashing the app.

## 11. Testing

- **Unit (Vitest):**
  - `package-io.ts`: round-trip equality for every store field; malformed-ZIP rejection; missing-file rejection.
  - `SemverBumpSelector`: correct patch/minor/major math from a given latest; custom-entry validation.
  - `workspaceStore`: `loadPackage` populates all slices; `reset` clears everything.
- **Component (Testing Library):**
  - Wizard stepper marks steps complete based on validation.
  - Step 2 API editor produces XML containing the new schema CDATA blocks; VAL-009 flags bad JSON.
  - Review step disables Submit when any validation error exists.
- **Integration (backend):**
  - `POST /bff/dsl/submit` with full metadata persists all new columns.
  - `GET /bff/developer/submissions/{moduleName}/versions` returns versions newest-first.
  - Duplicate `(moduleName, version)` submit returns `409`.
- **Manual smoke:** full flow — author DSL → fill manifest → fill details → download ZIP → reload page → upload ZIP → verify restoration → submit → watch SSE → see version in history.

## 12. Migration / Rollout

1. Backend schema + endpoint changes ship first (additive, no breaking change to existing `submitDsl` callers — new fields are optional).
2. Frontend ships the workspace; legacy routes redirect. The old Submission Portal form is removed only after the workspace Review step is verified to cover every existing field.
3. No data migration needed — existing submissions keep their null metadata columns and simply render without marketplace fields in history.

## 13. Open Questions

None blocking. (All were resolved during brainstorming — see §3.)
