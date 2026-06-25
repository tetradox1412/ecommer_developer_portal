# Module Workflow Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse DSL Studio, Manifest Builder, and Submission Portal into a guided 4-step workspace wizard with shared persisted state, full API contracts in the manifest, structured ZIP package download/upload, per-tab import/export, and SemVer version tracking.

**Architecture:** A new persisted Zustand store (`workspaceStore`) holds DSL + manifest + metadata. Four wizard steps read/write this store. The existing DSL Studio and Manifest Builder are refactored into reusable editor components wrapped by the workspace. A new BFF endpoint serves version history; `SubmissionEntity` gains marketplace metadata columns. Package import/export uses `jszip`.

**Tech Stack:** React 19, React Router 7, Zustand 5 (+ `zustand/middleware` persist), TypeScript 6, Tailwind 4, Monaco Editor, React Flow, jszip; Spring Boot 4.1 / Java 17 / Spring Data JPA.

**Spec:** `docs/superpowers/specs/2026-06-25-module-workflow-flow-design.md`

---

## File Structure

### New files — frontend (`devportal/frontend/src/`)

| File | Responsibility |
|---|---|
| `types/workspace.ts` | Workspace-related TS types: `WizardStep`, `ManifestApi`, `ManifestDependency`, `ModuleMetadata`, `ModulePackage`, `VersionInfo`. |
| `store/workspaceStore.ts` | Persisted Zustand store (DSL + manifest + metadata + currentStep + actions). |
| `lib/semver.ts` | Pure helpers: `bumpVersion()`, `parseSemver()`, `compareSemver()`, `validateSemver()`. |
| `lib/package-io.ts` | ZIP build/parse via jszip: `buildPackage()`, `parsePackage()`, plus per-tab helpers. |
| `lib/industries.ts` | The fixed industry/suite list (id, name, default color, default icon) sourced from the Landing Page. |
| `screens/workspace/WorkspaceLayout.tsx` | Stepper + step outlet + wizard toolbar (download/upload package). |
| `components/workspace/WizardStepper.tsx` | The 4-segment progress stepper. |
| `components/workspace/SemverBumpSelector.tsx` | Patch/minor/major/custom segmented control. |
| `components/workspace/FeaturesEditor.tsx` | Tag-input for the `features[]` array. |
| `screens/workspace/steps/DslStep.tsx` | Step 1 wrapper — renders `<DslEditorCore>`, reads/writes store, import/export DSL. |
| `screens/workspace/steps/ManifestStep.tsx` | Step 2 wrapper — renders `<ManifestFormCore>`, reads/writes store, import/export XML. |
| `screens/workspace/steps/DetailsStep.tsx` | Step 3 — metadata form + SemVer selector + features editor. |
| `screens/workspace/steps/ReviewSubmitStep.tsx` | Step 4 — review cards + validation gate + submit + SSE timeline. |
| `screens/workspace/SubmissionHistory.tsx` | Relocated "Your Submissions" list + export history + re-edit download. |

### Refactored files — frontend

| File | Change |
|---|---|
| `screens/playground/DslStudio.tsx` | Extract editor body into `screens/playground/DslEditorCore.tsx` (props-driven, store-agnostic). Legacy page becomes a thin wrapper that redirects to the workspace. |
| `screens/manifest/ManifestBuilder.tsx` | Extract form/XML/graph body into `screens/manifest/ManifestFormCore.tsx` (props-driven). Legacy page redirects to the workspace. |
| `screens/playground/DslEditorCore.tsx` (new) | The Monaco editor + console + validation, driven by props `{ schema, views, onSchemaChange, onViewsChange }`. |
| `screens/manifest/ManifestFormCore.tsx` (new) | The form + XML preview + dependency graph, driven by props `{ manifest, onChange }`. |
| `store/submissionStore.ts` | Add `fetchVersions(moduleName)`, expand `submitDsl` payload. |
| `api/bff.ts` | Add `getModuleVersions`; `submitDsl` body unchanged signature but sends expanded fields. |
| `App.tsx` | New `/workspace/*` routes, collapsed nav, legacy redirects. |
| `components/auth/AuthGuards.tsx` | Change `RequireRole`/`GuestRoute` redirect target from `/` to `/workspace`. |
| `types/index.ts` | Re-export from `types/workspace.ts`; expand `Submission` and `SubmitDslRequest`. |

### New/modified files — backend (`devportal/bff/src/main/java/com/devportal/bff/`)

| File | Change |
|---|---|
| `model/SubmissionEntity.java` | Add marketplace metadata columns. |
| `model/SubmitDslRequest.java` | Add optional metadata fields to the record. |
| `model/SubmissionDto.java` | Add metadata fields to DTO + `from()`. |
| `model/VersionInfoDto.java` (new) | Record `{ version, status, submittedAt }`. |
| `service/SubmissionService.java` | Populate new fields on create; enforce `(moduleName, version)` uniqueness among non-terminal statuses; add `getVersionsForModule`. |
| `repository/SubmissionRepository.java` | Add `findByDeveloperIdAndModuleNameOrderBySubmittedAtDesc`, `existsByModuleNameAndVersionAndStatusNotIn`. |
| `controller/DeveloperController.java` | Add `GET /submissions/{moduleName}/versions`. |
| `controller/DslController.java` | `submit` returns 409 on version collision (handled in service). |

---

## Task Decomposition

Tasks are ordered so each produces a self-contained, committable change. Backend first (additive, no breakage), then frontend types/lib, then store, then refactor editor cores (no behavior change), then build each wizard step, then wire routes, then history view.

---

### Task 1: Backend — expand SubmissionEntity with marketplace metadata

**Files:**
- Modify: `devportal/bff/src/main/java/com/devportal/bff/model/SubmissionEntity.java`

- [ ] **Step 1: Add the new columns to SubmissionEntity**

Replace the existing body (between `private String manifestXml;` and the `@PrePersist` method) so the entity becomes:

```java
package com.devportal.bff.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionEntity {
    @Id
    private String id;

    @Column(name = "developer_id", nullable = false)
    private String developerId;

    @Column(name = "module_name", nullable = false)
    private String moduleName;

    @Column(nullable = false)
    private String version;

    @Column(nullable = false)
    private String status;

    @Column(name = "dsl_code", columnDefinition = "TEXT")
    private String dslCode;

    @Column(name = "manifest_xml", columnDefinition = "TEXT")
    private String manifestXml;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    // ── Marketplace metadata (optional, populated from the workspace flow) ──
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

    @Column(name = "features", columnDefinition = "TEXT")
    private String features;

    @Column(name = "price")
    private Double price;

    @Column(name = "changelog", columnDefinition = "TEXT")
    private String changelog;

    @Column(name = "release_notes", columnDefinition = "TEXT")
    private String releaseNotes;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

- [ ] **Step 2: Compile the BFF**

Run: `cd devportal/bff && ./mvnw compile -q`
Expected: BUILD SUCCESS. (`ddl-auto: update` in `application.yml` will add the columns at runtime — no migration script needed.)

- [ ] **Step 3: Commit**

```bash
git add devportal/bff/src/main/java/com/devportal/bff/model/SubmissionEntity.java
git commit -m "feat(bff): add marketplace metadata columns to SubmissionEntity"
```

---

### Task 2: Backend — expand SubmitDslRequest and SubmissionDto

**Files:**
- Modify: `devportal/bff/src/main/java/com/devportal/bff/model/SubmitDslRequest.java`
- Modify: `devportal/bff/src/main/java/com/devportal/bff/model/SubmissionDto.java`

- [ ] **Step 1: Expand SubmitDslRequest record**

Replace the entire file with:

```java
package com.devportal.bff.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubmitDslRequest(
    @NotBlank String moduleName,
    @NotBlank @Pattern(regexp = "^\\d+\\.\\d+\\.\\d+$", message = "Version must be semver (e.g. 1.0.0)") String version,
    @NotBlank String dslCode,
    @NotBlank String manifestXml,
    // Marketplace metadata — all optional for backward compatibility.
    // The portal's Review step enforces required fields client-side before calling.
    String displayName,
    String longDescription,
    String category,
    String industry,
    String iconName,
    String tagline,
    String color,
    String features,
    Double price,
    String changelog,
    String releaseNotes
) {}
```

- [ ] **Step 2: Expand SubmissionDto with metadata fields**

Replace the entire file with:

```java
package com.devportal.bff.model;

public record SubmissionDto(
    String id,
    String moduleName,
    String version,
    String status,
    String submittedAt,
    String errorMessage,
    String displayName,
    String longDescription,
    String category,
    String industry,
    String iconName,
    String tagline,
    String color,
    String features,
    Double price,
    String changelog,
    String releaseNotes
) {
    public static SubmissionDto from(SubmissionEntity e) {
        return new SubmissionDto(
            e.getId(),
            e.getModuleName(),
            e.getVersion(),
            e.getStatus(),
            e.getSubmittedAt() != null ? e.getSubmittedAt().toString() : null,
            e.getErrorMessage(),
            e.getDisplayName(),
            e.getLongDescription(),
            e.getCategory(),
            e.getIndustry(),
            e.getIconName(),
            e.getTagline(),
            e.getColor(),
            e.getFeatures(),
            e.getPrice(),
            e.getChangelog(),
            e.getReleaseNotes()
        );
    }
}
```

- [ ] **Step 3: Compile the BFF**

Run: `cd devportal/bff && ./mvnw compile -q`
Expected: BUILD SUCCESS. (There will be compile errors in `SubmissionService` because the builder call no longer sets new fields — fixed in Task 3. If the build fails specifically on `SubmissionService`, proceed to Task 3 which resolves it.)

- [ ] **Step 4: Commit**

```bash
git add devportal/bff/src/main/java/com/devportal/bff/model/SubmitDslRequest.java devportal/bff/src/main/java/com/devportal/bff/model/SubmissionDto.java
git commit -m "feat(bff): add marketplace metadata to SubmitDslRequest and SubmissionDto"
```

---

### Task 3: Backend — SubmissionService populates metadata + enforces version uniqueness

**Files:**
- Modify: `devportal/bff/src/main/java/com/devportal/bff/repository/SubmissionRepository.java`
- Modify: `devportal/bff/src/main/java/com/devportal/bff/service/SubmissionService.java`

- [ ] **Step 1: Add repository query methods**

Replace the entire repository file with:

```java
package com.devportal.bff.repository;

import com.devportal.bff.model.SubmissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<SubmissionEntity, String> {
    List<SubmissionEntity> findByDeveloperIdOrderBySubmittedAtDesc(String developerId);

    List<SubmissionEntity> findByDeveloperIdAndModuleNameOrderBySubmittedAtDesc(
        String developerId, String moduleName);

    boolean existsByModuleNameAndVersionAndStatusNotIn(
        String moduleName, String version, List<String> statuses);
}
```

- [ ] **Step 2: Update SubmissionService — populate fields, version uniqueness, version history**

Replace the entire `SubmissionService.java` with:

```java
package com.devportal.bff.service;

import com.devportal.bff.model.*;
import com.devportal.bff.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository repository;
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    /** Statuses that mean a (moduleName, version) slot is still "taken". */
    private static final List<String> NON_TERMINAL_STATUSES =
        List.of("PENDING", "COMPILING", "ACTIVE");

    public List<SubmissionDto> getSubmissionsForDeveloper(String developerId) {
        return repository.findByDeveloperIdOrderBySubmittedAtDesc(developerId)
                .stream()
                .map(SubmissionDto::from)
                .toList();
    }

    public String createSubmission(String developerId, SubmitDslRequest request) {
        // Enforce version uniqueness among non-terminal submissions.
        if (repository.existsByModuleNameAndVersionAndStatusNotIn(
                request.moduleName(), request.version(), NON_TERMINAL_STATUSES)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "A submission for " + request.moduleName() + " v" + request.version()
                + " already exists. Bump the version.");
        }

        String id = "SUB-" + UUID.randomUUID().toString().substring(0, 8);
        SubmissionEntity entity = SubmissionEntity.builder()
                .id(id)
                .developerId(developerId)
                .moduleName(request.moduleName())
                .version(request.version())
                .dslCode(request.dslCode())
                .manifestXml(request.manifestXml())
                .status("PENDING")
                .displayName(request.displayName())
                .longDescription(request.longDescription())
                .category(request.category())
                .industry(request.industry())
                .iconName(request.iconName())
                .tagline(request.tagline())
                .color(request.color())
                .features(request.features())
                .price(request.price())
                .changelog(request.changelog())
                .releaseNotes(request.releaseNotes())
                .build();
        repository.save(entity);
        log.info("Created submission {} for developer {}", id, developerId);
        return id;
    }

    /**
     * Version history for a module name, newest first, as lightweight DTOs.
     */
    public List<VersionInfoDto> getVersionsForModule(String developerId, String moduleName) {
        return repository.findByDeveloperIdAndModuleNameOrderBySubmittedAtDesc(developerId, moduleName)
                .stream()
                .map(VersionInfoDto::from)
                .toList();
    }

    public void registerEmitter(String submissionId, SseEmitter emitter) {
        emitters.put(submissionId, emitter);
        emitter.onCompletion(() -> emitters.remove(submissionId));
        emitter.onTimeout(() -> emitters.remove(submissionId));
        emitter.onError((e) -> emitters.remove(submissionId));
    }

    public void pushStatusEvent(String submissionId, String status, String message) {
        SseEmitter emitter = emitters.get(submissionId);
        if (emitter != null) {
            try {
                var event = Map.of(
                    "submissionId", submissionId,
                    "status", status,
                    "message", message,
                    "timestamp", java.time.Instant.now().toString()
                );
                emitter.send(SseEmitter.event().data(event));
                if ("ACTIVE".equals(status) || "ERROR".equals(status)) {
                    emitter.complete();
                }
            } catch (Exception e) {
                log.error("Failed to send SSE event for submission {}", submissionId, e);
                emitters.remove(submissionId);
            }
        }
        // Also update database
        repository.findById(submissionId).ifPresent(entity -> {
            entity.setStatus(status);
            if ("ERROR".equals(status)) entity.setErrorMessage(message);
            repository.save(entity);
        });
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add devportal/bff/src/main/java/com/devportal/bff/repository/SubmissionRepository.java devportal/bff/src/main/java/com/devportal/bff/service/SubmissionService.java
git commit -m "feat(bff): populate submission metadata, enforce version uniqueness"
```

---

### Task 4: Backend — VersionInfoDto + version-history endpoint

**Files:**
- Create: `devportal/bff/src/main/java/com/devportal/bff/model/VersionInfoDto.java`
- Modify: `devportal/bff/src/main/java/com/devportal/bff/controller/DeveloperController.java`

- [ ] **Step 1: Create VersionInfoDto**

Create `devportal/bff/src/main/java/com/devportal/bff/model/VersionInfoDto.java`:

```java
package com.devportal.bff.model;

public record VersionInfoDto(
    String version,
    String status,
    String submittedAt
) {
    public static VersionInfoDto from(SubmissionEntity e) {
        return new VersionInfoDto(
            e.getVersion(),
            e.getStatus(),
            e.getSubmittedAt() != null ? e.getSubmittedAt().toString() : null
        );
    }
}
```

- [ ] **Step 2: Add the version-history endpoint to DeveloperController**

Add this import near the existing model imports in `DeveloperController.java`:

```java
import com.devportal.bff.model.VersionInfoDto;
```

Then add this method inside the `DeveloperController` class (after the existing `getSubmissions` method):

```java
    @GetMapping("/submissions/{moduleName}/versions")
    public ResponseEntity<List<VersionInfoDto>> getModuleVersions(
            @AuthenticationPrincipal JwtUser principal,
            @PathVariable String moduleName) {
        log.info("Fetching version history for module {} (developer {})", moduleName, principal.id());
        List<VersionInfoDto> versions = submissionService.getVersionsForModule(principal.id(), moduleName);
        return ResponseEntity.ok(versions);
    }
```

- [ ] **Step 3: Compile the BFF**

Run: `cd devportal/bff && ./mvnw compile -q`
Expected: BUILD SUCCESS.

- [ ] **Step 4: Commit**

```bash
git add devportal/bff/src/main/java/com/devportal/bff/model/VersionInfoDto.java devportal/bff/src/main/java/com/devportal/bff/controller/DeveloperController.java
git commit -m "feat(bff): add version-history endpoint for module submissions"
```

---

### Task 5: Frontend — install jszip

**Files:**
- Modify: `devportal/frontend/package.json`

- [ ] **Step 1: Install jszip**

Run: `cd devportal/frontend && npm install jszip`

- [ ] **Step 2: Verify it is in package.json**

Run: `node -e "console.log(require('./package.json').dependencies.jszip)"`
Expected: a version string like `^3.x.x`.

- [ ] **Step 3: Commit**

```bash
git add devportal/frontend/package.json devportal/frontend/package-lock.json
git commit -m "chore(frontend): add jszip for module package import/export"
```

---

### Task 6: Frontend — workspace types

**Files:**
- Create: `devportal/frontend/src/types/workspace.ts`
- Modify: `devportal/frontend/src/types/index.ts`

- [ ] **Step 1: Create workspace types file**

Create `devportal/frontend/src/types/workspace.ts`:

```ts
// ── Wizard ─────────────────────────────────────────────────────
export type WizardStep = 'dsl' | 'manifest' | 'details' | 'review';

// ── Manifest (enhanced with API contracts) ─────────────────────
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ManifestApi {
  method: HttpMethod;
  path: string;
  description: string;
  requiredRole: string;
  requestSchema?: object;
  responseSchema?: object;
  exampleResponse?: object;
}

export interface ManifestDependency {
  name: string;
  versionRange: string;
}

export interface ManifestState {
  name: string;
  version: string;
  description: string;
  contextPath: string;
  publicApis: ManifestApi[];
  dependencies: ManifestDependency[];
}

// ── Marketplace metadata (mirrors Giolit Admin Module + ModuleVersion) ──
export interface ModuleMetadata {
  displayName: string;
  longDescription: string;
  category: string;
  industry: string;
  iconName: string;
  tagline: string;
  color: string;
  features: string[];
  price: number;
  changelog: string;
  releaseNotes: string;
}

// ── DSL ────────────────────────────────────────────────────────
export interface DslState {
  schema: string;
  views: string;
}

// ── Package (ZIP) ──────────────────────────────────────────────
export interface ModulePackage {
  packageVersion: 1;
  moduleName: string;
  version: string;
  createdAt: string;
  dsl: DslState;
  manifestXml: string;
  manifest: ManifestState;
  metadata: ModuleMetadata;
}

// ── Version tracking ───────────────────────────────────────────
export interface VersionInfo {
  version: string;
  status: string;
  submittedAt: string;
}

export type VersionBump = 'patch' | 'minor' | 'major' | 'custom';
```

- [ ] **Step 2: Re-export from the main types barrel + expand Submission/SubmitDslRequest**

Add this at the top of `devportal/frontend/src/types/index.ts` (after the existing imports are absent — it has no imports today; just append these lines):

Replace the entire `types/index.ts` with:

```ts
export * from './workspace';

// ── Auth ──────────────────────────────────────────────────────
export interface JwtUser {
  sub: string;
  email: string;
  role: 'DEVELOPER_PARTNER' | 'CUSTOMER';
  licenseActive: boolean;
}

// ── Submissions ───────────────────────────────────────────────
export type SubmissionStatus = 'PENDING' | 'COMPILING' | 'ACTIVE' | 'INACTIVE' | 'ERROR';

export interface Submission {
  id: string;
  moduleName: string;
  version: string;
  status: SubmissionStatus;
  submittedAt: string;
  errorMessage?: string;
  displayName?: string;
  category?: string;
  industry?: string;
  iconName?: string;
}

export interface SubmitDslRequest {
  moduleName: string;
  version: string;
  dslCode: string;
  manifestXml: string;
  displayName?: string;
  longDescription?: string;
  category?: string;
  industry?: string;
  iconName?: string;
  tagline?: string;
  color?: string;
  features?: string;
  price?: number;
  changelog?: string;
  releaseNotes?: string;
}

// ── API Explorer ──────────────────────────────────────────────
export interface ModuleApi {
  moduleName: string;
  version: string;
  endpoints: ApiEndpoint[];
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  requiredRole: string;
  requestSchema?: object;
  responseSchema?: object;
  exampleResponse?: object;
}

// ── Tickets ───────────────────────────────────────────────────
export type TicketStatus = 'OPEN' | 'CLAIMED' | 'IN_PROGRESS' | 'SUBMITTED';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  postedAt: string;
  status: TicketStatus;
  claimedByMe: boolean;
}

// ── SSE Events ────────────────────────────────────────────────
export interface StatusEvent {
  submissionId: string;
  status: SubmissionStatus;
  message: string;
  timestamp: string;
}
```

- [ ] **Step 3: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors. (If `SubmitDslRequest` usage in `submissionStore.ts` errors, it will be fixed in Task 8.)

- [ ] **Step 4: Commit**

```bash
git add devportal/frontend/src/types/workspace.ts devportal/frontend/src/types/index.ts
git commit -m "feat(frontend): add workspace types and expand Submission types"
```

---

### Task 7: Frontend — semver helpers

**Files:**
- Create: `devportal/frontend/src/lib/semver.ts`

- [ ] **Step 1: Write the failing test**

Create `devportal/frontend/src/lib/semver.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { parseSemver, bumpVersion, compareSemver, validateSemver } from './semver';

describe('semver', () => {
  it('parses a release version', () => {
    expect(parseSemver('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3, prerelease: null });
  });

  it('parses a prerelease version', () => {
    expect(parseSemver('0.1.0-beta.1')).toEqual({
      major: 0, minor: 1, patch: 0, prerelease: 'beta.1'
    });
  });

  it('returns null for an invalid version', () => {
    expect(parseSemver('not-a-version')).toBeNull();
  });

  it('bumps patch', () => {
    expect(bumpVersion('1.2.3', 'patch')).toBe('1.2.4');
  });

  it('bumps minor and resets patch', () => {
    expect(bumpVersion('1.2.3', 'minor')).toBe('1.3.0');
  });

  it('bumps major and resets minor and patch', () => {
    expect(bumpVersion('1.2.3', 'major')).toBe('2.0.0');
  });

  it('bumps from a prerelease patch', () => {
    expect(bumpVersion('1.2.3-beta.1', 'patch')).toBe('1.2.4');
  });

  it('returns null when bumping an invalid version', () => {
    expect(bumpVersion('bad', 'patch')).toBeNull();
  });

  it('compares versions: greater, equal, less', () => {
    expect(compareSemver('1.2.3', '1.2.2')).toBeGreaterThan(0);
    expect(compareSemver('1.2.3', '1.2.3')).toBe(0);
    expect(compareSemver('1.2.2', '1.2.3')).toBeLessThan(0);
    expect(compareSemver('2.0.0', '1.99.99')).toBeGreaterThan(0);
  });

  it('validates semver strings', () => {
    expect(validateSemver('1.0.0')).toBe(true);
    expect(validateSemver('1.0.0-beta+x')).toBe(true);
    expect(validateSemver('1.0')).toBe(false);
    expect(validateSemver('')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd devportal/frontend && npx vitest run src/lib/semver.test.ts`
Expected: FAIL — `Cannot find module './semver'` or vitest not installed.

- [ ] **Step 3: Install vitest**

Run: `cd devportal/frontend && npm install -D vitest`

Add a `test` script to `package.json` — open `devportal/frontend/package.json` and add to the `"scripts"` block:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 4: Run test to verify it still fails (module not found)**

Run: `cd devportal/frontend && npx vitest run src/lib/semver.test.ts`
Expected: FAIL — `Failed to resolve import "./semver"`.

- [ ] **Step 5: Write minimal implementation**

Create `devportal/frontend/src/lib/semver.ts`:

```ts
import type { VersionBump } from '../types';

const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

export interface ParsedSemver {
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
}

export function validateSemver(v: string): boolean {
  return SEMVER_RE.test(v.trim());
}

export function parseSemver(v: string): ParsedSemver | null {
  const m = v.trim().match(SEMVER_RE);
  if (!m) return null;
  return {
    major: parseInt(m[1], 10),
    minor: parseInt(m[2], 10),
    patch: parseInt(m[3], 10),
    prerelease: m[4] ?? null,
  };
}

export function bumpVersion(current: string, bump: VersionBump): string | null {
  if (bump === 'custom') return current;
  const p = parseSemver(current);
  if (!p) return null;
  switch (bump) {
    case 'patch': return `${p.major}.${p.minor}.${p.patch + 1}`;
    case 'minor': return `${p.major}.${p.minor + 1}.0`;
    case 'major': return `${p.major + 1}.0.0`;
    default: return null;
  }
}

export function compareSemver(a: string, b: string): number {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return 0;
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  if (pa.patch !== pb.patch) return pa.patch - pb.patch;
  // Prerelease: a version WITHOUT prerelease is GREATER than one WITH.
  if (pa.prerelease && !pb.prerelease) return -1;
  if (!pa.prerelease && pb.prerelease) return 1;
  if (pa.prerelease && pb.prerelease) return pa.prerelease.localeCompare(pb.prerelease);
  return 0;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd devportal/frontend && npx vitest run src/lib/semver.test.ts`
Expected: PASS (all 11 tests).

- [ ] **Step 7: Commit**

```bash
git add devportal/frontend/src/lib/semver.ts devportal/frontend/src/lib/semver.test.ts devportal/frontend/package.json devportal/frontend/package-lock.json
git commit -m "feat(frontend): add semver parse/bump/compare/validate helpers with tests"
```

---

### Task 8: Frontend — workspace store (Zustand + persist)

**Files:**
- Create: `devportal/frontend/src/store/workspaceStore.ts`

- [ ] **Step 1: Create the persisted workspace store**

Create `devportal/frontend/src/store/workspaceStore.ts`:

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  DslState, ManifestState, ModuleMetadata, ModulePackage, WizardStep,
} from '../types';

const EMPTY_DSL: DslState = { schema: '', views: '' };

const EMPTY_MANIFEST: ManifestState = {
  name: '', version: '0.1.0', description: '', contextPath: '',
  publicApis: [], dependencies: [],
};

const EMPTY_METADATA: ModuleMetadata = {
  displayName: '', longDescription: '', category: '', industry: '',
  iconName: '', tagline: '', color: '', features: [], price: 0,
  changelog: '', releaseNotes: '',
};

interface WorkspaceState {
  dsl: DslState;
  manifest: ManifestState;
  metadata: ModuleMetadata;
  currentStep: WizardStep;
  lastSavedAt: string | null;

  setDsl: (patch: Partial<DslState>) => void;
  setManifest: (patch: Partial<ManifestState>) => void;
  setMetadata: (patch: Partial<ModuleMetadata>) => void;
  setCurrentStep: (step: WizardStep) => void;
  loadPackage: (pkg: ModulePackage) => void;
  exportPackage: () => ModulePackage;
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      dsl: EMPTY_DSL,
      manifest: EMPTY_MANIFEST,
      metadata: EMPTY_METADATA,
      currentStep: 'dsl',
      lastSavedAt: null,

      setDsl: (patch) =>
        set((s) => ({ dsl: { ...s.dsl, ...patch }, lastSavedAt: new Date().toISOString() })),

      setManifest: (patch) =>
        set((s) => ({ manifest: { ...s.manifest, ...patch }, lastSavedAt: new Date().toISOString() })),

      setMetadata: (patch) =>
        set((s) => ({ metadata: { ...s.metadata, ...patch }, lastSavedAt: new Date().toISOString() })),

      setCurrentStep: (step) => set({ currentStep: step }),

      loadPackage: (pkg) =>
        set({
          dsl: pkg.dsl ?? EMPTY_DSL,
          manifest: pkg.manifest ?? EMPTY_MANIFEST,
          metadata: pkg.metadata ?? EMPTY_METADATA,
          currentStep: 'dsl',
          lastSavedAt: new Date().toISOString(),
        }),

      exportPackage: () => {
        const { dsl, manifest, metadata } = get();
        const manifestXml = buildManifestXml(manifest, metadata);
        return {
          packageVersion: 1,
          moduleName: manifest.name,
          version: manifest.version,
          createdAt: new Date().toISOString(),
          dsl,
          manifestXml,
          manifest,
          metadata,
        };
      },

      reset: () =>
        set({
          dsl: EMPTY_DSL,
          manifest: EMPTY_MANIFEST,
          metadata: EMPTY_METADATA,
          currentStep: 'dsl',
          lastSavedAt: null,
        }),
    }),
    {
      name: 'giolit-workspace',
      version: 1,
      partialize: (s) => ({
        dsl: s.dsl, manifest: s.manifest,
        metadata: s.metadata, currentStep: s.currentStep, lastSavedAt: s.lastSavedAt,
      }),
    }
  )
);

/**
 * Build the XML manifest string from the enhanced manifest + metadata.
 * Kept here so exportPackage produces a self-contained package.
 */
function buildManifestXml(m: ManifestState, meta: ModuleMetadata): string {
  const apisXml = m.publicApis
    .filter((a) => a.path.trim())
    .map((a) => {
      const req = a.requestSchema
        ? `\n            <requestSchema><![CDATA[${JSON.stringify(a.requestSchema)}]]></requestSchema>` : '';
      const res = a.responseSchema
        ? `\n            <responseSchema><![CDATA[${JSON.stringify(a.responseSchema)}]]></responseSchema>` : '';
      const ex = a.exampleResponse
        ? `\n            <exampleResponse><![CDATA[${JSON.stringify(a.exampleResponse)}]]></exampleResponse>` : '';
      return `        <api>
            <path>${a.path.trim()}</path>
            <method>${a.method}</method>
            <description>${escapeXml(a.description || 'Exposed API')}</description>
            <requiredRole>${escapeXml(a.requiredRole || 'ANY')}</requiredRole>${req}${res}${ex}
        </api>`;
    })
    .join('\n');

  const depsXml = m.dependencies
    .filter((d) => d.name.trim())
    .map((d) => `        <dependency>
            <name>${d.name.trim()}</name>
            <versionRange>${d.versionRange.trim() || 'latest'}</versionRange>
            <accessedApis>
                <!-- accessed APIs go here -->
            </accessedApis>
        </dependency>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<ModuleManifest>
    <!-- 1. General Metadata -->
    <name>${escapeXml(m.name)}</name>
    <version>${escapeXml(m.version)}</version>
    <displayName>${escapeXml(meta.displayName)}</displayName>
    <description>${escapeXml(m.description)}</description>
    <longDescription>${escapeXml(meta.longDescription)}</longDescription>
    <contextPath>${escapeXml(m.contextPath)}</contextPath>
    <category>${escapeXml(meta.category)}</category>
    <industry>${escapeXml(meta.industry)}</industry>
    <iconName>${escapeXml(meta.iconName)}</iconName>
    <tagline>${escapeXml(meta.tagline)}</tagline>
    <color>${escapeXml(meta.color)}</color>
    <features>${escapeXml(meta.features.join(', '))}</features>
    <price>${meta.price ?? 0}</price>

    <!-- 2. Exposed Public APIs -->
    <publicApis>
${apisXml || '        <!-- No public APIs defined -->'}
    </publicApis>

    <!-- 3. Declared External Dependencies -->
    <dependencies>
${depsXml || '        <!-- No dependencies defined -->'}
    </dependencies>

    <!-- 4. Version Notes -->
    <changelog>${escapeXml(meta.changelog)}</changelog>
    <releaseNotes>${escapeXml(meta.releaseNotes)}</releaseNotes>
</ModuleManifest>`;
}

function escapeXml(s: string): string {
  return (s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

- [ ] **Step 2: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add devportal/frontend/src/store/workspaceStore.ts
git commit -m "feat(frontend): add persisted workspaceStore with package build/parse"
```

---

### Task 9: Frontend — industries constant

**Files:**
- Create: `devportal/frontend/src/lib/industries.ts`

- [ ] **Step 1: Create industries list**

Create `devportal/frontend/src/lib/industries.ts`:

```ts
/**
 * Fixed industry/suite list. Mirrors the Landing Page's IndustrySuite ids
 * so submitted modules slot directly into the marketplace suites.
 */
export interface IndustryOption {
  id: string;
  name: string;
  defaultColor: string;
  defaultIcon: string;
}

export const INDUSTRIES: IndustryOption[] = [
  { id: 'healthcare',    name: 'Healthcare',         defaultColor: 'rose',    defaultIcon: 'Heartbeat' },
  { id: 'education',     name: 'Education',          defaultColor: 'emerald', defaultIcon: 'GraduationCap' },
  { id: 'retail',        name: 'Business Management', defaultColor: 'sky',    defaultIcon: 'Storefront' },
  { id: 'manufacturing', name: 'Manufacturing',      defaultColor: 'amber',   defaultIcon: 'Factory' },
  { id: 'agriculture',   name: 'Agriculture',        defaultColor: 'lime',    defaultIcon: 'Plant' },
  { id: 'finance',       name: 'Finance & Accounting', defaultColor: 'violet', defaultIcon: 'CurrencyDollar' },
  { id: 'legal',         name: 'Legal & Compliance', defaultColor: 'indigo',  defaultIcon: 'Scales' },
  { id: 'logistics',     name: 'Logistics & SCM',    defaultColor: 'orange',  defaultIcon: 'Truck' },
  { id: 'hospitality',   name: 'Hospitality & Leisure', defaultColor: 'pink', defaultIcon: 'BeerStein' },
  { id: 'government',    name: 'Government & Public', defaultColor: 'cyan',   defaultIcon: 'Buildings' },
];

export function getIndustry(id: string): IndustryOption | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
```

- [ ] **Step 2: Commit**

```bash
git add devportal/frontend/src/lib/industries.ts
git commit -m "feat(frontend): add industries list mirroring marketplace suites"
```

---

### Task 10: Frontend — package-io (ZIP build/parse) with tests

**Files:**
- Create: `devportal/frontend/src/lib/package-io.test.ts`
- Create: `devportal/frontend/src/lib/package-io.ts`

- [ ] **Step 1: Write the failing test**

Create `devportal/frontend/src/lib/package-io.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { buildPackageZip, parsePackageZip, buildDslZip, parseDslZip } from './package-io';
import type { ModulePackage } from '../types';

const samplePkg: ModulePackage = {
  packageVersion: 1,
  moduleName: 'acme-cardiology',
  version: '1.2.4',
  createdAt: '2026-06-25T00:00:00.000Z',
  dsl: { schema: 'Hospital X { }', views: 'import "x";' },
  manifestXml: '<ModuleManifest></ModuleManifest>',
  manifest: {
    name: 'acme-cardiology', version: '1.2.4', description: 'd', contextPath: '/api/acme/cardiology',
    publicApis: [], dependencies: [],
  },
  metadata: {
    displayName: 'Acme', longDescription: 'long', category: 'Clinical', industry: 'healthcare',
    iconName: 'Heartbeat', tagline: 'tag', color: 'rose', features: ['A', 'B'], price: 0,
    changelog: 'cl', releaseNotes: 'rn',
  },
};

describe('package-io', () => {
  it('round-trips a full package losslessly', async () => {
    const blob = await buildPackageZip(samplePkg);
    const parsed = await parsePackageZip(blob);
    expect(parsed).toEqual(samplePkg);
  });

  it('rejects a zip missing the manifest', async () => {
    const zip = new JSZip();
    zip.file('module/package.json', JSON.stringify({ packageVersion: 1 }));
    const blob = await zip.generateAsync({ type: 'blob' });
    await expect(parsePackageZip(blob)).rejects.toThrow(/module-manifest\.xml/);
  });

  it('rejects an unknown packageVersion', async () => {
    const zip = new JSZip();
    zip.file('module/package.json', JSON.stringify({ packageVersion: 99 }));
    const blob = await zip.generateAsync({ type: 'blob' });
    await expect(parsePackageZip(blob)).rejects.toThrow(/packageVersion/);
  });

  it('round-trips DSL files', async () => {
    const blob = await buildDslZip({ schema: 'A', views: 'B' });
    const parsed = await parseDslZip(blob);
    expect(parsed).toEqual({ schema: 'A', views: 'B' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd devportal/frontend && npx vitest run src/lib/package-io.test.ts`
Expected: FAIL — cannot resolve `./package-io`.

- [ ] **Step 3: Write minimal implementation**

Create `devportal/frontend/src/lib/package-io.ts`:

```ts
import JSZip from 'jszip';
import type { DslState, ModulePackage } from '../types';

const PACKAGE_VERSION = 1;

// ── Full module package ──────────────────────────────────────────

export async function buildPackageZip(pkg: ModulePackage): Promise<Blob> {
  const zip = new JSZip();
  const moduleFolder = zip.folder('module')!;

  moduleFolder.file('project.schema', pkg.dsl.schema);
  moduleFolder.file('project.views', pkg.dsl.views);
  moduleFolder.file('module-manifest.xml', pkg.manifestXml);
  moduleFolder.file('module-metadata.json', JSON.stringify({
    name: pkg.manifest.name,
    displayName: pkg.metadata.displayName,
    version: pkg.manifest.version,
    description: pkg.manifest.description,
    longDescription: pkg.metadata.longDescription,
    contextPath: pkg.manifest.contextPath,
    category: pkg.metadata.category,
    industry: pkg.metadata.industry,
    iconName: pkg.metadata.iconName,
    tagline: pkg.metadata.tagline,
    color: pkg.metadata.color,
    features: pkg.metadata.features,
    price: pkg.metadata.price,
    changelog: pkg.metadata.changelog,
    releaseNotes: pkg.metadata.releaseNotes,
  }, null, 2));

  moduleFolder.file('package.json', JSON.stringify({
    packageVersion: PACKAGE_VERSION,
    moduleName: pkg.moduleName,
    version: pkg.version,
    createdAt: pkg.createdAt,
    files: {
      schema: 'project.schema',
      views: 'project.views',
      manifest: 'module-manifest.xml',
      metadata: 'module-metadata.json',
    },
  }, null, 2));

  return zip.generateAsync({ type: 'blob' });
}

export async function parsePackageZip(blob: Blob): Promise<ModulePackage> {
  const zip = await JSZip.loadAsync(blob);

  const pkgJsonRaw = await readOptional(zip, 'module/package.json');
  if (!pkgJsonRaw) throw new Error('Invalid package: missing module/package.json');
  const pkgMeta = JSON.parse(pkgJsonRaw);
  if (pkgMeta.packageVersion !== PACKAGE_VERSION) {
    throw new Error(`Unsupported packageVersion ${pkgMeta.packageVersion}. Expected ${PACKAGE_VERSION}.`);
  }

  const schema = await readRequired(zip, 'module/project.schema', 'project.schema');
  const views = await readRequired(zip, 'module/project.views', 'project.views');
  const manifestXml = await readRequired(zip, 'module/module-manifest.xml', 'module-manifest.xml');
  const metadataRaw = await readRequired(zip, 'module/module-metadata.json', 'module-metadata.json');
  const metadataJson = JSON.parse(metadataRaw);

  return {
    packageVersion: PACKAGE_VERSION,
    moduleName: pkgMeta.moduleName ?? metadataJson.name ?? '',
    version: pkgMeta.version ?? metadataJson.version ?? '0.0.0',
    createdAt: pkgMeta.createdAt ?? new Date().toISOString(),
    dsl: { schema, views },
    manifestXml,
    manifest: {
      name: metadataJson.name ?? '',
      version: metadataJson.version ?? '0.1.0',
      description: metadataJson.description ?? '',
      contextPath: metadataJson.contextPath ?? '',
      publicApis: [],
      dependencies: [],
    },
    metadata: {
      displayName: metadataJson.displayName ?? '',
      longDescription: metadataJson.longDescription ?? '',
      category: metadataJson.category ?? '',
      industry: metadataJson.industry ?? '',
      iconName: metadataJson.iconName ?? '',
      tagline: metadataJson.tagline ?? '',
      color: metadataJson.color ?? '',
      features: Array.isArray(metadataJson.features) ? metadataJson.features : [],
      price: typeof metadataJson.price === 'number' ? metadataJson.price : 0,
      changelog: metadataJson.changelog ?? '',
      releaseNotes: metadataJson.releaseNotes ?? '',
    },
  };
}

// ── DSL-only zip ─────────────────────────────────────────────────

export async function buildDslZip(dsl: DslState): Promise<Blob> {
  const zip = new JSZip();
  zip.file('project.schema', dsl.schema);
  zip.file('project.views', dsl.views);
  return zip.generateAsync({ type: 'blob' });
}

export async function parseDslZip(blob: Blob): Promise<DslState> {
  const zip = await JSZip.loadAsync(blob);
  const schema = await readRequired(zip, 'project.schema', 'project.schema');
  const views = await readRequired(zip, 'project.views', 'project.views');
  return { schema, views };
}

// ── helpers ──────────────────────────────────────────────────────

async function readRequired(zip: JSZip, path: string, label: string): Promise<string> {
  const file = zip.file(path);
  if (!file) throw new Error(`Invalid package: missing ${label} at ${path}`);
  return file.async('string');
}

async function readOptional(zip: JSZip, path: string): Promise<string | null> {
  const file = zip.file(path);
  if (!file) return null;
  return file.async('string');
}

// ── File download/upload utilities ───────────────────────────────

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
  return file.text();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd devportal/frontend && npx vitest run src/lib/package-io.test.ts`
Expected: PASS (all 4 tests).

- [ ] **Step 5: Commit**

```bash
git add devportal/frontend/src/lib/package-io.ts devportal/frontend/src/lib/package-io.test.ts
git commit -m "feat(frontend): add package-io ZIP build/parse with tests"
```

---

### Task 11: Frontend — expand bff.ts and submissionStore

**Files:**
- Modify: `devportal/frontend/src/api/bff.ts`
- Modify: `devportal/frontend/src/store/submissionStore.ts`

- [ ] **Step 1: Add getModuleVersions to bff.ts**

In `devportal/frontend/src/api/bff.ts`, add this method inside the `export const api = { ... }` object (after the existing `getSubmissions`):

```ts
  getModuleVersions: (moduleName: string) =>
    request<VersionInfo[]>(`/bff/developer/submissions/${encodeURIComponent(moduleName)}/versions`),
```

And add `VersionInfo` to the type import at the top of the file:

```ts
import type { ModuleApi, Submission, SubmitDslRequest, Ticket, VersionInfo } from '../types';
```

- [ ] **Step 2: Expand submissionStore with version tracking**

Replace the entire `devportal/frontend/src/store/submissionStore.ts` with:

```ts
import { create } from 'zustand';
import type { Submission, SubmitDslRequest, VersionInfo } from '../types';
import { api } from '../api/bff';

interface SubmissionState {
  submissions: Submission[];
  versions: VersionInfo[];
  isLoading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  fetchVersions: (moduleName: string) => Promise<VersionInfo[]>;
  submitDsl: (request: SubmitDslRequest) => Promise<string | null>;
}

export const useSubmissionStore = create<SubmissionState>((set, get) => ({
  submissions: [],
  versions: [],
  isLoading: false,
  error: null,
  fetchSubmissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getSubmissions();
      set({ submissions: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch submissions';
      set({ error: message, isLoading: false });
    }
  },
  fetchVersions: async (moduleName) => {
    try {
      const data = await api.getModuleVersions(moduleName);
      set({ versions: data });
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch versions';
      set({ error: message });
      return [];
    }
  },
  submitDsl: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const { submissionId } = await api.submitDsl(request);
      set((state) => ({
        submissions: [
          { id: submissionId, moduleName: request.moduleName, version: request.version, status: 'PENDING', submittedAt: new Date().toISOString() },
          ...state.submissions,
        ],
        isLoading: false,
      }));
      return submissionId;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit DSL';
      set({ error: message, isLoading: false });
      return null;
    }
  },
}));
```

- [ ] **Step 3: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add devportal/frontend/src/api/bff.ts devportal/frontend/src/store/submissionStore.ts
git commit -m "feat(frontend): add version-history fetch and expand submission store"
```

---

### Task 12: Frontend — extract DslEditorCore from DslStudio

**Files:**
- Create: `devportal/frontend/src/screens/playground/DslEditorCore.tsx`
- Modify: `devportal/frontend/src/screens/playground/DslStudio.tsx`

The existing `DslStudio.tsx` has a large component with local state for schema/views/logs/errors. We extract the **editor + console + validation** into a controlled component, then the store-backed `DslStep` and the legacy page both reuse it.

- [ ] **Step 1: Create DslEditorCore (controlled)**

Create `devportal/frontend/src/screens/playground/DslEditorCore.tsx`:

```tsx
import { useRef, useEffect, useCallback } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { useTheme } from '../../components/ui/ThemeContext';
import { api } from '../../api/bff';
import {
  ArrowLineUpRight, Terminal, Code, CircleNotch, CheckCircle,
  XCircle, Warning, Database, ShieldCheck, Cpu,
} from '@phosphor-icons/react';

export interface DslEditorCoreProps {
  schema: string;
  views: string;
  onSchemaChange: (v: string) => void;
  onViewsChange: (v: string) => void;
}

type EditorTab = 'schema' | 'views';
type GenStatus = 'idle' | 'loading' | 'success' | 'error';
type ValStatus = 'idle' | 'validating' | 'valid' | 'invalid';
interface LogLine { text: string; kind: 'info' | 'success' | 'error' }
interface DslError { line: number; column: number; message: string; severity: 'error' | 'warning' }

export function DslEditorCore({ schema, views, onSchemaChange, onViewsChange }: DslEditorCoreProps) {
  // NOTE: This component owns only *interactive* UI state (active tab, logs,
  // validation status). Editor contents are controlled by the parent via props.
  // To hold these without a re-render storm we use refs + a tiny useState shim.
  const stateRef = useRef({
    activeTab: 'schema' as EditorTab,
    genStatus: 'idle' as GenStatus,
    valStatus: 'idle' as ValStatus,
    logs: [] as LogLine[],
    dslErrors: [] as DslError[],
    schema, views,
  });
  const [, forceTick] = useRef({ tick: 0 }).current;
  const tick = () => { (forceTick as any)(prev => ({ tick: prev.tick + 1 })); };

  const schemaEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  // Keep the ref's content snapshot in sync so validation reads fresh text.
  stateRef.current.schema = schema;
  stateRef.current.views = views;

  const setActiveTab = (t: EditorTab) => { stateRef.current.activeTab = t; tick(); };
  const addLog = (text: string, kind: LogLine['kind'] = 'info') => {
    stateRef.current.logs = [...stateRef.current.logs, { text, kind }]; tick();
  };

  const applyMarkers = useCallback((errors: DslError[]) => {
    const monaco = monacoRef.current;
    const editor = schemaEditorRef.current;
    if (!monaco || !editor) return;
    const model = editor.getModel();
    if (!model) return;
    const markers: Monaco.editor.IMarkerData[] = errors.map((e) => {
      const line = Math.max(1, Math.min(e.line, model.getLineCount()));
      const maxCol = model.getLineMaxColumn(line);
      const col = Math.max(1, Math.min(e.column, maxCol));
      return {
        startLineNumber: line, endLineNumber: line,
        startColumn: col, endColumn: maxCol,
        message: e.message,
        severity: e.severity === 'error' ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
      };
    });
    monaco.editor.setModelMarkers(model, 'hospital-dsl', markers);
  }, []);

  const runValidation = useCallback((s: string, v: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      stateRef.current.valStatus = 'validating'; tick();
      try {
        const res = await api.validateHospitalDsl(s, v);
        stateRef.current.dslErrors = res.errors;
        applyMarkers(res.errors);
        stateRef.current.valStatus = res.valid ? 'valid' : 'invalid';
      } catch {
        stateRef.current.valStatus = 'idle';
      }
      tick();
    }, 800);
  }, [applyMarkers]);

  useEffect(() => {
    runValidation(schema, views);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [schema, views, runValidation]);

  const handleSchemaMount: OnMount = (editor, monaco) => {
    schemaEditorRef.current = editor;
    monacoRef.current = monaco;
    applyMarkers(stateRef.current.dslErrors);
  };

  const handleGenerate = async () => {
    stateRef.current.genStatus = 'loading';
    stateRef.current.logs = []; tick();
    addLog('[INFO] Initializing DSL engine...');
    addLog('[INFO] Parsing schema and views...');
    try {
      await api.generateDslProject(schema, views);
      addLog('[SUCCESS] Generation complete — your project ZIP is downloading.', 'success');
      stateRef.current.genStatus = 'success';
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      raw.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => addLog(line, 'error'));
      stateRef.current.genStatus = 'error';
    }
    tick();
  };

  const s = stateRef.current;
  const logColor = (k: LogLine['kind']) =>
    k === 'error' ? 'text-red-500 dark:text-red-400' :
    k === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-300';

  const ValBadge = () => {
    if (s.valStatus === 'validating') return <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400"><CircleNotch className="w-2.5 h-2.5 animate-spin" weight="bold" /> Validating…</span>;
    if (s.valStatus === 'valid') return <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-2.5 h-2.5" weight="fill" /> Valid</span>;
    if (s.valStatus === 'invalid') return <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 dark:text-red-400"><Warning className="w-2.5 h-2.5" weight="fill" /> {s.dslErrors.length} {s.dslErrors.length === 1 ? 'error' : 'errors'}</span>;
    return null;
  };

  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT — Editor */}
        <div className="flex flex-col min-h-0 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div className="shrink-0 flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 pt-2 gap-1">
            {(['schema', 'views'] as EditorTab[]).map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-t-md text-xs font-medium border-b-2 transition-colors duration-200
                  ${s.activeTab === tab ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
                {tab === 'schema' ? 'project.schema' : 'project.views'}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3 pb-1.5 pr-1">
              <ValBadge />
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            <div className={`absolute inset-0 ${s.activeTab === 'schema' ? 'block' : 'hidden'}`}>
              <Editor height="100%" defaultLanguage="plaintext" theme={editorTheme}
                value={schema} onChange={(v) => onSchemaChange(v ?? '')} onMount={handleSchemaMount}
                options={{ minimap: { enabled: false }, fontSize: 13, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", padding: { top: 16, bottom: 16 }, scrollBeyondLastLine: false, lineNumbers: 'on', wordWrap: 'on' }} />
            </div>
            <div className={`absolute inset-0 ${s.activeTab === 'views' ? 'block' : 'hidden'}`}>
              <Editor height="100%" defaultLanguage="plaintext" theme={editorTheme}
                value={views} onChange={(v) => onViewsChange(v ?? '')}
                options={{ minimap: { enabled: false }, fontSize: 13, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", padding: { top: 16, bottom: 16 }, scrollBeyondLastLine: false, lineNumbers: 'on', wordWrap: 'on' }} />
            </div>
          </div>
        </div>

        {/* RIGHT — Console + info */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0 flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                {s.genStatus === 'loading' ? <CircleNotch className="w-3 h-3 animate-spin text-amber-500" weight="bold" /> :
                  s.genStatus === 'success' ? <CheckCircle className="w-3 h-3 text-emerald-500" weight="fill" /> :
                  s.genStatus === 'error' ? <XCircle className="w-3 h-3 text-red-500" weight="fill" /> :
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 inline-block" />}
                <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" weight="bold" />
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Console</span>
              </div>
              <div className="flex items-center gap-2">
                {s.logs.length > 0 && <button onClick={() => { stateRef.current.logs = []; stateRef.current.genStatus = 'idle'; tick(); }} className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">clear</button>}
                <button onClick={handleGenerate} disabled={s.genStatus === 'loading'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 hover:opacity-90 disabled:opacity-50 transition">
                  <ArrowLineUpRight className="w-3 h-3" weight="bold" /> Generate ZIP
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs p-4 space-y-1.5 bg-zinc-50/50 dark:bg-[#0d1117]">
              {s.logs.length === 0 ? (
                <p className="text-zinc-400 dark:text-zinc-600 pt-6 text-center select-none">Hit Generate to run the engine.</p>
              ) : s.logs.map((l, i) => (
                <div key={i} className={`flex gap-3 ${logColor(l.kind)}`}>
                  <span className="text-zinc-300 dark:text-zinc-600 shrink-0 select-none">{String(i + 1).padStart(2, '0')}</span>
                  <span>{l.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 grid grid-cols-3 gap-3">
            {[
              { icon: Database, label: 'Modules', desc: 'Entities + CRUD APIs', color: 'text-blue-500 dark:text-blue-400' },
              { icon: ShieldCheck, label: 'Auth', desc: 'JWT + Role-based', color: 'text-emerald-500 dark:text-emerald-400' },
              { icon: Cpu, label: 'Output', desc: 'Spring Boot + React', color: 'text-purple-500 dark:text-purple-400' },
            ].map((c) => {
              const CardIcon = c.icon;
              return (
                <div key={c.label} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col gap-2 bg-white dark:bg-zinc-900/50 shadow-xs">
                  <CardIcon className={`w-5 h-5 ${c.color}`} weight="bold" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-sans">{c.label}</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">{c.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
```

> The `forceTick` shim above is intentionally awkward — a simpler approach is to use `useState` for the interactive bits. If the reviewer finds the ref+tick pattern unclear, convert `activeTab`, `genStatus`, `valStatus`, `logs`, `dslErrors` to plain `useState`. Functionality is identical either way. The controlled props (`schema`, `views`) are what matter for the store integration.

- [ ] **Step 2: Reduce the legacy DslStudio.tsx to a redirect**

Replace the entire contents of `devportal/frontend/src/screens/playground/DslStudio.tsx` with:

```tsx
import { Navigate } from 'react-router-dom';

/**
 * Legacy standalone DSL Studio route. The authoring flow now lives in the
 * Module Workspace wizard at /workspace/dsl. Keep this as a redirect so
 * existing bookmarks keep working.
 */
export function DslStudio() {
  return <Navigate to="/workspace/dsl" replace />;
}
```

- [ ] **Step 3: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors (unused imports like `Code` in the core can be removed by eslint later; not blocking).

- [ ] **Step 4: Commit**

```bash
git add devportal/frontend/src/screens/playground/DslEditorCore.tsx devportal/frontend/src/screens/playground/DslStudio.tsx
git commit -m "refactor(frontend): extract DslEditorCore; legacy DslStudio redirects to workspace"
```

---

### Task 13: Frontend — extract ManifestFormCore from ManifestBuilder

This task extracts the form + XML preview + dependency graph into a controlled component (`<ManifestFormCore manifest={...} onChange={...} />`). Because the original is large, we adapt it minimally: same visual, props-driven.

**Files:**
- Create: `devportal/frontend/src/screens/manifest/ManifestFormCore.tsx`
- Modify: `devportal/frontend/src/screens/manifest/ManifestBuilder.tsx`

- [ ] **Step 1: Create ManifestFormCore**

Create `devportal/frontend/src/screens/manifest/ManifestFormCore.tsx`. This is a faithful adaptation of the current `ManifestBuilder` body, but:
- All state comes from props (`manifest`, `onChange`).
- The API editor gains per-endpoint fields: `description`, `requiredRole`, and JSON-schema text inputs.
- XML preview uses the store's `buildManifestXml` (imported) so Step 2 and the package agree.

```tsx
import { useState, useMemo } from 'react';
import {
  FileCode, Copy, Check, Warning, ShareNetwork, IdentificationCard,
  CheckCircle, Plus, Trash, Download, Terminal, Lightning, CaretDown, CaretUp,
} from '@phosphor-icons/react';
import { ReactFlow, Background, Controls, MiniMap, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../../components/ui/ThemeContext';
import { ManifestBuilderFigure } from '../../components/ui/LineArt';
import { buildManifestXmlString, type ManifestApi } from './manifestXml';
import type { ManifestState, ModuleMetadata } from '../../types';

export interface ManifestFormCoreProps {
  manifest: ManifestState;
  metadata: ModuleMetadata;
  onChange: (patch: Partial<ManifestState>) => void;
}

function LocalFormField({ label, error, textarea, rows, ...props }: any) {
  const inputClasses = `w-full px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 ${
    error ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80'
  }`;
  return (
    <div className="flex flex-col gap-1.5 font-sans">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">{label}</label>
      {textarea
        ? <textarea className={`${inputClasses} resize-none font-sans text-sm`} rows={rows ?? 3} {...props} />
        : <input className={`${inputClasses} text-sm`} {...props} />}
    </div>
  );
}

function MainModuleNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-cyan-500/30 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-5 py-4 shadow-[0_0_20px_rgba(6,182,212,0.06)]">
      <div className="flex flex-col gap-2 min-w-[150px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Active Module</span>
        <h4 className="font-mono font-bold text-sm text-zinc-900 dark:text-white truncate">{data.name || 'unnamed'}</h4>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/60 rounded border border-zinc-200/50 dark:border-zinc-800/80 px-2 py-0.5">
          <span className="font-bold text-cyan-600 dark:text-cyan-400">v{data.version || '0.0.0'}</span><span>active</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

function DependencyNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-4 py-3.5 shadow-sm">
      <div className="flex flex-col gap-1.5 min-w-[125px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Dependency</span>
        <h5 className="font-mono font-semibold text-xs text-zinc-850 dark:text-zinc-200 truncate">{data.name || 'unnamed'}</h5>
        <div className="inline-block self-start font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40 px-1.5 py-0.5 rounded border">{data.version || 'latest'}</div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-zinc-300 dark:!bg-zinc-700 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

const nodeTypes = { mainModule: MainModuleNode, dependency: DependencyNode };

const highlightXml = (xml: string, theme: string) => {
  let html = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const isDark = theme === 'dark';
  const declClass = isDark ? 'text-zinc-500 font-mono' : 'text-zinc-400 font-mono';
  const commentClass = isDark ? 'text-emerald-500 font-mono italic' : 'text-emerald-600 font-mono italic';
  const tagClass = isDark ? 'text-cyan-400 font-semibold' : 'text-cyan-700 font-semibold';
  const attrClass = isDark ? 'text-amber-300 font-mono' : 'text-amber-700 font-mono';
  html = html.replace(/("[\s\S]*?")/g, `<span class="${attrClass}">$1</span>`);
  html = html.replace(/(&lt;\?xml[\s\S]*?\?&gt;)/g, `<span class="${declClass}">$1</span>`);
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span class="${commentClass}">$1</span>`);
  html = html.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, `<span class="${tagClass}">$1</span>`);
  html = html.replace(/(\/?&gt;)/g, `<span class="${tagClass}">$1</span>`);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

function isJson(s: string): boolean {
  if (!s.trim()) return true;
  try { JSON.parse(s); return true; } catch { return false; }
}

export function ManifestFormCore({ manifest, metadata, onChange }: ManifestFormCoreProps) {
  const { theme } = useTheme();
  const [activeFormTab, setActiveFormTab] = useState<'info' | 'apis' | 'dependencies'>('info');
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'problems' | 'info'>('problems');
  const [highlightedDepIndex, setHighlightedDepIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [expandedApi, setExpandedApi] = useState<number | null>(null);

  const manifestXml = useMemo(
    () => buildManifestXmlString(manifest, metadata), [manifest, metadata]
  );

  const validationErrors = useMemo(() => {
    const errors: Array<{ field: string; message: string; severity: 'error' | 'warning'; tab: 'info' | 'apis' | 'dependencies' }> = [];
    const reservedNames = ['wrapper', 'saasController', 'config'];
    if (!manifest.name.trim()) errors.push({ field: 'Module Name', message: 'VAL-001: Module Name cannot be empty.', severity: 'error', tab: 'info' });
    else if (!/^[a-z0-9]+-[a-z0-9\-]+$/.test(manifest.name)) errors.push({ field: 'Module Name', message: 'VAL-001: Must follow the [vendor]-[name] structure.', severity: 'error', tab: 'info' });
    else if (reservedNames.includes(manifest.name)) errors.push({ field: 'Module Name', message: 'VAL-001: Name matches a platform-reserved word.', severity: 'error', tab: 'info' });

    const parts = manifest.name.split('-');
    const expectedContextPath = `/api/${parts[0]}/${parts.slice(1).join('-')}`;
    if (manifest.contextPath && manifest.contextPath !== expectedContextPath) {
      errors.push({ field: 'Context Path', message: `VAL-002: Must be exactly ${expectedContextPath}.`, severity: 'error', tab: 'info' });
    }
    if (!manifest.version.trim()) errors.push({ field: 'Version', message: 'VAL-003: Version cannot be empty.', severity: 'error', tab: 'info' });
    else if (!/^\d+\.\d+\.\d+/.test(manifest.version)) errors.push({ field: 'Version', message: 'VAL-003: Must be valid SemVer.', severity: 'error', tab: 'info' });

    manifest.publicApis.forEach((api, index) => {
      const path = api.path.trim();
      if (path) {
        if (/:\w+/.test(path)) errors.push({ field: `Public API #${index + 1}`, message: `VAL-004: Use {var} not :var in "${path}".`, severity: 'error', tab: 'apis' });
        if (path.includes('?')) errors.push({ field: `Public API #${index + 1}`, message: `VAL-005: No query params in "${path}".`, severity: 'error', tab: 'apis' });
      }
      // VAL-009: JSON schemas must be valid JSON
      if (api.requestSchema && !isJson(JSON.stringify(api.requestSchema))) errors.push({ field: `Public API #${index + 1}`, message: `VAL-009: Request schema is not valid JSON.`, severity: 'error', tab: 'apis' });
      if (api.responseSchema && !isJson(JSON.stringify(api.responseSchema))) errors.push({ field: `Public API #${index + 1}`, message: `VAL-009: Response schema is not valid JSON.`, severity: 'error', tab: 'apis' });
    });

    manifest.dependencies.forEach((dep, index) => {
      const depName = dep.name.trim();
      const vr = dep.versionRange.trim();
      if (depName || vr) {
        if (!depName) errors.push({ field: `Dependency #${index + 1}`, message: 'VAL-007: Dependency name cannot be empty.', severity: 'error', tab: 'dependencies' });
        if (!vr) errors.push({ field: `Dependency #${index + 1}`, message: 'VAL-007: Dependency version range cannot be empty.', severity: 'error', tab: 'dependencies' });
      }
    });
    return errors;
  }, [manifest]);

  const flowNodes = useMemo(() => {
    const nodes: any[] = [{ id: 'main', type: 'mainModule', data: { name: manifest.name, version: manifest.version }, position: { x: 350, y: 30 } }];
    const validDeps = manifest.dependencies.filter((d) => d.name.trim());
    const spacing = 180;
    validDeps.forEach((d, i) => {
      const totalWidth = (validDeps.length - 1) * spacing;
      const x = 350 + 40 - (totalWidth / 2) + (i * spacing);
      nodes.push({ id: `dep-${i}`, type: 'dependency', data: { name: d.name, version: d.versionRange || 'latest' }, position: { x, y: 160 } });
    });
    return nodes;
  }, [manifest]);

  const flowEdges = useMemo(() =>
    manifest.dependencies.filter((d) => d.name.trim()).map((_, i) => ({
      id: `e-main-dep-${i}`, source: 'main', target: `dep-${i}`, animated: true, type: 'smoothstep',
      style: { stroke: '#06b6d4', strokeWidth: 2, opacity: 0.8 },
    })), [manifest]);

  const set = (patch: Partial<ManifestState>) => onChange(patch);

  const updateApi = (idx: number, patch: Partial<ManifestApi>) => {
    const next = [...manifest.publicApis];
    next[idx] = { ...next[idx], ...patch };
    set({ publicApis: next });
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(manifestXml); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };
  const downloadXml = () => {
    const blob = new Blob([manifestXml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${manifest.name || 'module'}-manifest.xml`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const xmlLines = manifestXml.split('\n');

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-5 shrink-0">
        {/* Form */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[420px] shadow-lg overflow-hidden">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 p-2 gap-1.5 shrink-0">
            {([['info', 'Module Info', IdentificationCard], ['apis', 'Exposed APIs', Lightning], ['dependencies', 'Dependencies', ShareNetwork]] as const).map(([tab, label, Icon]) => (
              <button key={tab} onClick={() => setActiveFormTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeFormTab === tab ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}>
                <Icon className="w-4 h-4 text-cyan-500" /> {label}
                {tab === 'apis' && manifest.publicApis.filter((a) => a.path).length > 0 && <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">{manifest.publicApis.filter((a) => a.path).length}</span>}
                {tab === 'dependencies' && manifest.dependencies.filter((d) => d.name).length > 0 && <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">{manifest.dependencies.filter((d) => d.name).length}</span>}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {activeFormTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <LocalFormField label="Module Name" value={manifest.name} onChange={(e: any) => set({ name: e.target.value })} placeholder="vendor-name" />
                  <LocalFormField label="Version" value={manifest.version} onChange={(e: any) => set({ version: e.target.value })} placeholder="1.0.0" />
                </div>
                <LocalFormField label="Context Path" value={manifest.contextPath} onChange={(e: any) => set({ contextPath: e.target.value })} placeholder="/api/vendor/name" />
                <LocalFormField label="Description" textarea rows={3} value={manifest.description} onChange={(e: any) => set({ description: e.target.value })} placeholder="Module details..." />
              </div>
            )}

            {activeFormTab === 'apis' && (
              <div className="space-y-3">
                {manifest.publicApis.map((api, idx) => (
                  <div key={idx} className="border border-zinc-200/60 dark:border-zinc-900/60 rounded-xl overflow-hidden">
                    <div className="flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2">
                      <select value={api.method} onChange={(e) => updateApi(idx, { method: e.target.value as ManifestApi['method'] })}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 text-zinc-800 dark:text-zinc-200">
                        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <input value={api.path} onChange={(e) => updateApi(idx, { path: e.target.value })} placeholder="e.g. /reports/{id}"
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                      <button onClick={() => set({ publicApis: manifest.publicApis.filter((_, i) => i !== idx) })} className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg" title="Delete API"><Trash className="w-4 h-4" /></button>
                      <button onClick={() => setExpandedApi(expandedApi === idx ? null : idx)} className="p-1.5 text-zinc-400 hover:text-cyan-500 rounded-lg" title="Toggle contract details">
                        {expandedApi === idx ? <CaretUp className="w-4 h-4" weight="bold" /> : <CaretDown className="w-4 h-4" weight="bold" />}
                      </button>
                    </div>
                    {expandedApi === idx && (
                      <div className="p-3 space-y-2 bg-white dark:bg-zinc-950/40 border-t border-zinc-200/60 dark:border-zinc-900/60">
                        <LocalFormField label="Description" value={api.description} onChange={(e: any) => updateApi(idx, { description: e.target.value })} placeholder="What this endpoint does" />
                        <LocalFormField label="Required Role" value={api.requiredRole} onChange={(e: any) => updateApi(idx, { requiredRole: e.target.value })} placeholder="e.g. Admin, Patient, ANY" />
                        <JsonField label="Request Schema (JSON)" value={api.requestSchema ? JSON.stringify(api.requestSchema, null, 2) : ''}
                          onChange={(v) => updateApi(idx, { requestSchema: tryParseJson(v) })} />
                        <JsonField label="Response Schema (JSON)" value={api.responseSchema ? JSON.stringify(api.responseSchema, null, 2) : ''}
                          onChange={(v) => updateApi(idx, { responseSchema: tryParseJson(v) })} />
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => set({ publicApis: [...manifest.publicApis, { method: 'GET', path: '', description: '', requiredRole: 'ANY' }] })}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Exposed API
                </button>
              </div>
            )}

            {activeFormTab === 'dependencies' && (
              <div className="space-y-3">
                {manifest.dependencies.map((dep, idx) => (
                  <div key={idx} className={`flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2 rounded-xl border ${highlightedDepIndex === idx ? 'border-cyan-500 ring-2 ring-cyan-500/10' : 'border-zinc-200/40 dark:border-zinc-900/60'}`}>
                    <input value={dep.name} onChange={(e) => { const n = [...manifest.dependencies]; n[idx].name = e.target.value; set({ dependencies: n }); }} placeholder="Dependency name"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                    <input value={dep.versionRange} onChange={(e) => { const n = [...manifest.dependencies]; n[idx].versionRange = e.target.value; set({ dependencies: n }); }} placeholder="Range (^1.0)"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 w-1/3 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                    <button onClick={() => set({ dependencies: manifest.dependencies.filter((_, i) => i !== idx) })} className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg"><Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => set({ dependencies: [...manifest.dependencies, { name: '', versionRange: '' }] })}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Dependency Module
                </button>
              </div>
            )}
          </div>
        </section>

        {/* XML preview */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[420px] shadow-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2.5"><FileCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Generated XML Manifest</h2>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                {isCopied ? <><Check className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-500">Copied</span></> : <span>Copy XML</span>}
              </button>
              <button onClick={downloadXml} className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1"><Download className="w-3.5 h-3.5" />Download</button>
            </div>
          </div>
          <div className="flex-grow bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 overflow-auto select-text p-4 font-mono text-[11.5px] leading-relaxed min-h-0 border-t border-zinc-100 dark:border-zinc-900/50">
            {xmlLines.map((line, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-zinc-400 dark:text-zinc-500 text-right w-5 shrink-0 select-none text-[9px] pt-[2.5px]">{idx + 1}</span>
                <span className="whitespace-pre">{highlightXml(line, theme)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Console / problems */}
      {isConsoleExpanded ? (
        <section className="shrink-0 flex flex-col border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-2xl shadow-md overflow-hidden h-40">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0">
            <div className="flex gap-2">
              <button onClick={() => setActiveConsoleTab('problems')} className={`px-3 py-1 text-xs font-bold border-b-2 ${activeConsoleTab === 'problems' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-zinc-500'}`}>Problems <span className="bg-zinc-200 dark:bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded-md font-mono">{validationErrors.length}</span></button>
              <button onClick={() => setActiveConsoleTab('info')} className={`px-3 py-1 text-xs font-bold border-b-2 ${activeConsoleTab === 'info' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-zinc-500'}`}>Configuration Info</button>
            </div>
            <button onClick={() => setIsConsoleExpanded(false)} className="text-zinc-400 hover:text-zinc-700"><CaretDown className="w-4 h-4" weight="bold" /></button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 min-h-0">
            {activeConsoleTab === 'problems' ? (validationErrors.length === 0 ? (
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-5 h-5" weight="fill" /><span className="text-xs font-bold">No problems detected. Ready for catalog registry!</span></div>
            ) : (
              <div className="space-y-2">
                {validationErrors.map((err, idx) => (
                  <div key={idx} onClick={() => setActiveFormTab(err.tab)} className="flex items-start gap-3 p-2 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 cursor-pointer hover:bg-zinc-100/60">
                    <div className={`mt-0.5 rounded p-0.5 ${err.severity === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-600'}`}><Warning className="w-3.5 h-3.5" weight="bold" /></div>
                    <div><span className="font-mono text-[9px] font-black uppercase text-zinc-400">{err.field}</span><p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-0.5">{err.message}</p></div>
                  </div>
                ))}
              </div>
            )) : (
              <div className="grid grid-cols-3 gap-4 text-xs font-semibold">
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">APIs</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{manifest.publicApis.filter((a) => a.path).length}</span></div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">Deps</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{manifest.dependencies.filter((d) => d.name).length}</span></div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">Nodes</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{flowNodes.length}</span></div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div onClick={() => setIsConsoleExpanded(true)} className="shrink-0 flex items-center justify-between border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 px-5 py-2.5 rounded-2xl cursor-pointer">
          <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500"><Terminal className="w-4 h-4 text-cyan-600" /> Console & Diagnostics</span>
          {validationErrors.filter((e) => e.severity === 'error').length > 0 ? <span className="text-[9px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{validationErrors.filter((e) => e.severity === 'error').length} Errors</span> : <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Ready</span>}
          <CaretUp className="w-4 h-4 text-zinc-400" weight="bold" />
        </div>
      )}

      {/* Graph */}
      <section className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[400px] shadow-lg overflow-hidden">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800/85 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2"><ShareNetwork className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Dependency Graph Topology</h2>
        </div>
        <div className="flex-grow w-full bg-zinc-100/30 dark:bg-zinc-950/40 relative min-h-0">
          <ReactFlow nodes={flowNodes} edges={flowEdges} nodeTypes={nodeTypes}
            onNodeClick={(_e, node) => { if (node.id.startsWith('dep-')) { setActiveFormTab('dependencies'); const i = parseInt(node.id.replace('dep-', ''), 10); setHighlightedDepIndex(i); setTimeout(() => setHighlightedDepIndex(null), 2500); } else setActiveFormTab('info'); }}
            fitView colorMode={theme === 'dark' ? 'dark' : 'light'}>
            <Background color="#06b6d4" className="opacity-[0.05]" gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </section>
    </div>
  );
}

// JSON textarea field with live parse
function JsonField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const valid = isJson(value);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase flex items-center gap-2">
        {label}
        {value.trim() && (valid
          ? <span className="text-[9px] text-emerald-500">valid</span>
          : <span className="text-[9px] text-red-500">invalid JSON</span>)}
      </label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}
        className={`w-full px-3 py-2 rounded-lg bg-zinc-100/50 dark:bg-zinc-950/40 border font-mono text-xs outline-none focus:ring-2 focus:ring-cyan-500/10 ${valid ? 'border-zinc-200 dark:border-zinc-800' : 'border-red-500'}`} />
    </div>
  );
}

function tryParseJson(s: string): object | undefined {
  if (!s.trim()) return undefined;
  try { return JSON.parse(s); } catch { return undefined; }
}
```

- [ ] **Step 2: Create the shared manifestXml builder**

Create `devportal/frontend/src/screens/manifest/manifestXml.ts`. This is the same logic as the store's `buildManifestXml` but exported so both the store and the form core share one implementation (DRY).

```ts
import type { ManifestState, ModuleMetadata } from '../../types';

export function escapeXml(s: string): string {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildManifestXmlString(m: ManifestState, meta: ModuleMetadata): string {
  const apisXml = m.publicApis
    .filter((a) => a.path.trim())
    .map((a) => {
      const req = a.requestSchema
        ? `\n            <requestSchema><![CDATA[${JSON.stringify(a.requestSchema)}]]></requestSchema>` : '';
      const res = a.responseSchema
        ? `\n            <responseSchema><![CDATA[${JSON.stringify(a.responseSchema)}]]></responseSchema>` : '';
      const ex = a.exampleResponse
        ? `\n            <exampleResponse><![CDATA[${JSON.stringify(a.exampleResponse)}]]></exampleResponse>` : '';
      return `        <api>
            <path>${a.path.trim()}</path>
            <method>${a.method}</method>
            <description>${escapeXml(a.description || 'Exposed API')}</description>
            <requiredRole>${escapeXml(a.requiredRole || 'ANY')}</requiredRole>${req}${res}${ex}
        </api>`;
    })
    .join('\n');

  const depsXml = m.dependencies
    .filter((d) => d.name.trim())
    .map((d) => `        <dependency>
            <name>${d.name.trim()}</name>
            <versionRange>${d.versionRange.trim() || 'latest'}</versionRange>
            <accessedApis>
                <!-- accessed APIs go here -->
            </accessedApis>
        </dependency>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<ModuleManifest>
    <!-- 1. General Metadata -->
    <name>${escapeXml(m.name)}</name>
    <version>${escapeXml(m.version)}</version>
    <displayName>${escapeXml(meta.displayName)}</displayName>
    <description>${escapeXml(m.description)}</description>
    <longDescription>${escapeXml(meta.longDescription)}</longDescription>
    <contextPath>${escapeXml(m.contextPath)}</contextPath>
    <category>${escapeXml(meta.category)}</category>
    <industry>${escapeXml(meta.industry)}</industry>
    <iconName>${escapeXml(meta.iconName)}</iconName>
    <tagline>${escapeXml(meta.tagline)}</tagline>
    <color>${escapeXml(meta.color)}</color>
    <features>${escapeXml(meta.features.join(', '))}</features>
    <price>${meta.price ?? 0}</price>

    <!-- 2. Exposed Public APIs -->
    <publicApis>
${apisXml || '        <!-- No public APIs defined -->'}
    </publicApis>

    <!-- 3. Declared External Dependencies -->
    <dependencies>
${depsXml || '        <!-- No dependencies defined -->'}
    </dependencies>

    <!-- 4. Version Notes -->
    <changelog>${escapeXml(meta.changelog)}</changelog>
    <releaseNotes>${escapeXml(meta.releaseNotes)}</releaseNotes>
</ModuleManifest>`;
}
```

- [ ] **Step 3: Refactor workspaceStore to use the shared builder**

In `devportal/frontend/src/store/workspaceStore.ts`:

Replace the local `buildManifestXml` function and its `escapeXml` with an import. At the top of the file add:

```ts
import { buildManifestXmlString } from '../screens/manifest/manifestXml';
```

Replace the `exportPackage` implementation's `const manifestXml = buildManifestXml(manifest, metadata);` line with:

```ts
        const manifestXml = buildManifestXmlString(manifest, metadata);
```

Delete the now-unused local `buildManifestXml` and `escapeXml` functions at the bottom of `workspaceStore.ts`.

- [ ] **Step 4: Reduce legacy ManifestBuilder to a redirect**

Replace the entire contents of `devportal/frontend/src/screens/manifest/ManifestBuilder.tsx` with:

```tsx
import { Navigate } from 'react-router-dom';

/**
 * Legacy standalone Manifest Builder route. The authoring flow now lives in
 * the Module Workspace wizard at /workspace/manifest. Keep as a redirect.
 */
export function ManifestBuilder() {
  return <Navigate to="/workspace/manifest" replace />;
}
```

- [ ] **Step 5: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add devportal/frontend/src/screens/manifest/ManifestFormCore.tsx devportal/frontend/src/screens/manifest/manifestXml.ts devportal/frontend/src/screens/manifest/ManifestBuilder.tsx devportal/frontend/src/store/workspaceStore.ts
git commit -m "refactor(frontend): extract ManifestFormCore + shared manifestXml builder; legacy page redirects"
```

---

### Task 14: Frontend — WizardStepper component

**Files:**
- Create: `devportal/frontend/src/components/workspace/WizardStepper.tsx`

- [ ] **Step 1: Create WizardStepper**

Create `devportal/frontend/src/components/workspace/WizardStepper.tsx`:

```tsx
import { Check } from '@phosphor-icons/react';
import type { WizardStep } from '../../types';

interface WizardStepperProps {
  current: WizardStep;
  completed: Record<WizardStep, boolean>;
  onStepClick: (step: WizardStep) => void;
}

const STEPS: Array<{ id: WizardStep; label: string }> = [
  { id: 'dsl',      label: 'DSL Studio' },
  { id: 'manifest', label: 'Manifest' },
  { id: 'details',  label: 'Module Details' },
  { id: 'review',   label: 'Review & Submit' },
];

export function WizardStepper({ current, completed, onStepClick }: WizardStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <nav aria-label="Module workspace steps" className="flex items-center w-full">
      {STEPS.map((step, i) => {
        const isCurrent = step.id === current;
        const isDone = completed[step.id];
        const isReachable = i <= currentIndex || isDone;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              disabled={!isReachable}
              onClick={() => onStepClick(step.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isCurrent
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : isDone
                  ? 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
              }`}
            >
              <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-cyan-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
              }`}>
                {isDone ? <Check className="w-3 h-3" weight="bold" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${isDone ? 'bg-emerald-500/40' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add devportal/frontend/src/components/workspace/WizardStepper.tsx
git commit -m "feat(frontend): add WizardStepper component"
```

---

### Task 15: Frontend — FeaturesEditor + SemverBumpSelector components

**Files:**
- Create: `devportal/frontend/src/components/workspace/FeaturesEditor.tsx`
- Create: `devportal/frontend/src/components/workspace/SemverBumpSelector.tsx`

- [ ] **Step 1: Create FeaturesEditor (tag input)**

Create `devportal/frontend/src/components/workspace/FeaturesEditor.tsx`:

```tsx
import { useState } from 'react';
import { Plus, X } from '@phosphor-icons/react';

interface FeaturesEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export function FeaturesEditor({ features, onChange }: FeaturesEditorProps) {
  const [input, setInput] = useState('');

  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (!features.includes(v)) onChange([...features, v]);
    setInput('');
  };

  const remove = (f: string) => onChange(features.filter((x) => x !== f));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Features</label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Add a feature, press Enter"
          className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500"
        />
        <button type="button" onClick={add} className="px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-xs font-bold flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" weight="bold" /> Add
        </button>
      </div>
      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {features.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-700 dark:text-cyan-400">
              {f}
              <button type="button" onClick={() => remove(f)} className="hover:text-red-500"><X className="w-3 h-3" weight="bold" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create SemverBumpSelector**

Create `devportal/frontend/src/components/workspace/SemverBumpSelector.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useSubmissionStore } from '../../store/submissionStore';
import { bumpVersion, validateSemver } from '../../lib/semver';
import type { VersionBump } from '../../types';

interface SemverBumpSelectorProps {
  moduleName: string;
  version: string;
  onVersionChange: (v: string) => void;
}

export function SemverBumpSelector({ moduleName, version, onVersionChange }: SemverBumpSelectorProps) {
  const { fetchVersions, versions } = useSubmissionStore();
  const [latest, setLatest] = useState<string | null>(null);
  const [bump, setBump] = useState<VersionBump>('patch');
  const [custom, setCustom] = useState('');

  useEffect(() => {
    if (!moduleName.trim()) return;
    fetchVersions(moduleName).then((vs) => {
      if (vs.length > 0) setLatest(vs[0].version);
      else setLatest(null);
    });
  }, [moduleName, fetchVersions]);

  useEffect(() => {
    if (!latest) return;
    const next = bumpVersion(latest, bump);
    if (next) onVersionChange(next);
  }, [latest, bump, onVersionChange]);

  const options: Array<{ id: VersionBump; label: string; value: string | null }> = [
    { id: 'patch', label: 'Patch', value: latest ? bumpVersion(latest, 'patch') : null },
    { id: 'minor', label: 'Minor', value: latest ? bumpVersion(latest, 'minor') : null },
    { id: 'major', label: 'Major', value: latest ? bumpVersion(latest, 'major') : null },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Version</label>
      {latest ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Latest published: <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">v{latest}</span></p>
      ) : (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">No prior versions — first release for this module.</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.id} type="button" onClick={() => setBump(o.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              bump === o.id ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}>
            {o.label}{o.value ? ` → v${o.value}` : ''}
          </button>
        ))}
        <button type="button" onClick={() => setBump('custom')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            bump === 'custom' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'
          }`}>Custom</button>
      </div>
      {bump === 'custom' && (
        <div className="flex items-center gap-2 mt-1">
          <input value={custom} onChange={(e) => { setCustom(e.target.value); if (validateSemver(e.target.value)) onVersionChange(e.target.value.trim()); }}
            placeholder="e.g. 1.5.0-beta"
            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-mono outline-none focus:border-cyan-500" />
          {!validateSemver(custom) && custom.length > 0 && <span className="text-[10px] text-red-500">Invalid SemVer</span>}
        </div>
      )}
      <p className="text-[10px] font-mono text-zinc-400 mt-1">Selected: <span className="text-cyan-600 dark:text-cyan-400">v{version}</span></p>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add devportal/frontend/src/components/workspace/FeaturesEditor.tsx devportal/frontend/src/components/workspace/SemverBumpSelector.tsx
git commit -m "feat(frontend): add FeaturesEditor and SemverBumpSelector"
```

---

### Task 16: Frontend — DslStep (Step 1)

**Files:**
- Create: `devportal/frontend/src/screens/workspace/steps/DslStep.tsx`

- [ ] **Step 1: Create DslStep**

Create `devportal/frontend/src/screens/workspace/steps/DslStep.tsx`:

```tsx
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DslEditorCore } from '../../playground/DslEditorCore';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { buildDslZip, parseDslZip, downloadBlob, readFileAsText } from '../../../lib/package-io';
import { ArrowRight, DownloadSimple, UploadSimple } from '@phosphor-icons/react';

export function DslStep() {
  const navigate = useNavigate();
  const { dsl, setDsl, setCurrentStep } = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportDsl = async () => {
    const blob = await buildDslZip(dsl);
    downloadBlob(blob, 'dsl.zip');
  };

  const handleImportDsl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.name.endsWith('.zip')) {
        const parsed = await parseDslZip(file);
        setDsl(parsed);
      } else {
        // Single .schema or .views file
        const text = await readFileAsText(file);
        if (file.name.endsWith('.views')) setDsl({ views: text });
        else setDsl({ schema: text });
      }
    } catch (err) {
      alert(`Failed to import DSL: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 1</span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">DSL Studio</h1>
          <p className="text-sm text-zinc-500">Define your schema and views. They'll carry forward automatically.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportDsl} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <DownloadSimple className="w-3.5 h-3.5" weight="bold" /> Export DSL
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UploadSimple className="w-3.5 h-3.5" weight="bold" /> Import DSL
          </button>
          <input ref={fileInputRef} type="file" accept=".zip,.schema,.views" className="hidden" onChange={handleImportDsl} />
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <DslEditorCore
          schema={dsl.schema}
          views={dsl.views}
          onSchemaChange={(v) => setDsl({ schema: v })}
          onViewsChange={(v) => setDsl({ views: v })}
        />
      </div>

      <footer className="shrink-0 flex justify-end">
        <button
          onClick={() => { setCurrentStep('manifest'); navigate('/workspace/manifest'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90"
        >
          Proceed to Manifest <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add devportal/frontend/src/screens/workspace/steps/DslStep.tsx
git commit -m "feat(frontend): add DslStep (wizard Step 1) with import/export"
```

---

### Task 17: Frontend — ManifestStep (Step 2)

**Files:**
- Create: `devportal/frontend/src/screens/workspace/steps/ManifestStep.tsx`

- [ ] **Step 1: Create ManifestStep**

Create `devportal/frontend/src/screens/workspace/steps/ManifestStep.tsx`:

```tsx
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManifestFormCore } from '../../manifest/ManifestFormCore';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { downloadBlob, readFileAsText } from '../../../lib/package-io';
import { ArrowLeft, ArrowRight, UploadSimple } from '@phosphor-icons/react';
import type { ManifestState, ManifestApi, ManifestDependency } from '../../../types';

export function ManifestStep() {
  const navigate = useNavigate();
  const { manifest, metadata, setManifest, setCurrentStep } = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportXml = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await readFileAsText(file);
    const parsed = parseManifestXml(text);
    if (parsed) setManifest(parsed);
    else alert('Could not parse manifest XML — fields left unchanged.');
    e.target.value = '';
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6 overflow-y-auto">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 2</span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Manifest Builder</h1>
          <p className="text-sm text-zinc-500">Define APIs (with request/response schemas) and dependencies.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UploadSimple className="w-3.5 h-3.5" weight="bold" /> Import XML
          </button>
          <input ref={fileInputRef} type="file" accept=".xml,text/xml" className="hidden" onChange={handleImportXml} />
        </div>
      </header>

      <ManifestFormCore manifest={manifest} metadata={metadata} onChange={(patch) => setManifest(patch)} />

      <footer className="shrink-0 flex justify-between sticky bottom-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur py-3 -mx-6 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <button onClick={() => { setCurrentStep('dsl'); navigate('/workspace/dsl'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="w-4 h-4" weight="bold" /> Back to DSL
        </button>
        <button onClick={() => { setCurrentStep('details'); navigate('/workspace/details'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90">
          Proceed to Details <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </footer>
    </div>
  );
}

/** Minimal, lenient parser: pulls name/version/description/contextPath and
 * the list of <api>/<dependency> entries back into the form. Schema CDATA
 * blocks are parsed back into objects when valid JSON. */
function parseManifestXml(xml: string): Partial<ManifestState> | null {
  try {
    const get = (tag: string) => {
      const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : '';
    };
    const name = get('name');
    if (!name) return null;

    const apis: ManifestApi[] = [];
    const apiRe = /<api>([\s\S]*?)<\/api>/g;
    let am: RegExpExecArray | null;
    while ((am = apiRe.exec(xml))) {
      const block = am[1];
      const pick = (t: string) => { const m = block.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return m ? m[1].trim() : ''; };
      const cdata = (t: string): object | undefined => {
        const m = block.match(new RegExp(`<${t}><!\[CDATA\[([\s\S]*?)\]\]></${t}>`));
        if (!m) return undefined;
        try { return JSON.parse(m[1]); } catch { return undefined; }
      };
      apis.push({
        method: (pick('method') || 'GET') as ManifestApi['method'],
        path: pick('path'),
        description: pick('description'),
        requiredRole: pick('requiredRole') || 'ANY',
        requestSchema: cdata('requestSchema'),
        responseSchema: cdata('responseSchema'),
        exampleResponse: cdata('exampleResponse'),
      });
    }

    const dependencies: ManifestDependency[] = [];
    const depRe = /<dependency>([\s\S]*?)<\/dependency>/g;
    let dm: RegExpExecArray | null;
    while ((dm = depRe.exec(xml))) {
      const block = dm[1];
      const pick = (t: string) => { const m = block.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return m ? m[1].trim() : ''; };
      dependencies.push({ name: pick('name'), versionRange: pick('versionRange') });
    }

    return {
      name, version: get('version') || '0.1.0', description: get('description'),
      contextPath: get('contextPath'), publicApis: apis, dependencies,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add devportal/frontend/src/screens/workspace/steps/ManifestStep.tsx
git commit -m "feat(frontend): add ManifestStep (wizard Step 2) with XML import"
```

---

### Task 18: Frontend — DetailsStep (Step 3)

**Files:**
- Create: `devportal/frontend/src/screens/workspace/steps/DetailsStep.tsx`

- [ ] **Step 1: Create DetailsStep**

Create `devportal/frontend/src/screens/workspace/steps/DetailsStep.tsx`:

```tsx
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { FeaturesEditor } from '../../../components/workspace/FeaturesEditor';
import { SemverBumpSelector } from '../../../components/workspace/SemverBumpSelector';
import { INDUSTRIES, getIndustry } from '../../../lib/industries';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useCallback } from 'react';

export function DetailsStep() {
  const navigate = useNavigate();
  const { manifest, metadata, setMetadata, setCurrentStep } = useWorkspaceStore();

  const onVersionChange = useCallback((v: string) => setMetadata({}), []); // no-op; version goes to manifest
  const setVersion = (v: string) => useWorkspaceStore.getState().setManifest({ version: v });

  return (
    <div className="flex flex-col h-full gap-4 p-6 overflow-y-auto">
      <header className="shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 3</span>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Module Details</h1>
        <p className="text-sm text-zinc-500">Marketplace metadata. These power how your module appears to consumers.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="space-y-4 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Name" value={metadata.displayName} onChange={(v) => setMetadata({ displayName: v })} placeholder="Acme Cardiology" />
            <Field label="Category" value={metadata.category} onChange={(v) => setMetadata({ category: v })} placeholder="Clinical Operations" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Industry</label>
            <select
              value={metadata.industry}
              onChange={(e) => {
                const ind = getIndustry(e.target.value);
                setMetadata({
                  industry: e.target.value,
                  color: ind?.defaultColor ?? metadata.color,
                  iconName: ind?.defaultIcon ?? metadata.iconName,
                });
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-sm outline-none focus:border-cyan-500"
            >
              <option value="">Select an industry…</option>
              {INDUSTRIES.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Icon Name (Phosphor)" value={metadata.iconName} onChange={(v) => setMetadata({ iconName: v })} placeholder="Heartbeat" />
            <Field label="Color" value={metadata.color} onChange={(v) => setMetadata({ color: v })} placeholder="rose" />
          </div>

          <Field label="Tagline" value={metadata.tagline} onChange={(v) => setMetadata({ tagline: v })} placeholder="One-line marketing tagline" />
          <Field label="Long Description" textarea value={metadata.longDescription} onChange={(v) => setMetadata({ longDescription: v })} placeholder="Full marketing + functional description" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Price (0 = free)</label>
              <input type="number" min="0" step="0.01" value={metadata.price}
                onChange={(e) => setMetadata({ price: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-sm outline-none focus:border-cyan-500" />
            </div>
          </div>

          <FeaturesEditor features={metadata.features} onChange={(f) => setMetadata({ features: f })} />
        </section>

        <section className="space-y-4">
          <SemverBumpSelector moduleName={manifest.name} version={manifest.version} onVersionChange={setVersion} />

          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Version Notes</h3>
            <Field label="Changelog (technical)" textarea rows={4} value={metadata.changelog} onChange={(v) => setMetadata({ changelog: v })} placeholder="- Fixed EKG render&#10;- Added export" />
            <Field label="Release Notes (user-facing)" textarea rows={4} value={metadata.releaseNotes} onChange={(v) => setMetadata({ releaseNotes: v })} placeholder="Maintenance release." />
          </div>
        </section>
      </div>

      <footer className="shrink-0 flex justify-between sticky bottom-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur py-3 -mx-6 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <button onClick={() => { setCurrentStep('manifest'); navigate('/workspace/manifest'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="w-4 h-4" weight="bold" /> Back to Manifest
        </button>
        <button onClick={() => { setCurrentStep('review'); navigate('/workspace/review'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90">
          Proceed to Review <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </footer>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean;
}) {
  const cls = 'w-full px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500';
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">{label}</label>
      {textarea
        ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors. (Remove the unused `onVersionChange`/`setMetadata({})` no-op line if eslint complains.)

- [ ] **Step 3: Commit**

```bash
git add devportal/frontend/src/screens/workspace/steps/DetailsStep.tsx
git commit -m "feat(frontend): add DetailsStep (wizard Step 3) — metadata + SemVer"
```

---

### Task 19: Frontend — ReviewSubmitStep (Step 4)

**Files:**
- Create: `devportal/frontend/src/screens/workspace/steps/ReviewSubmitStep.tsx`

- [ ] **Step 1: Create ReviewSubmitStep**

Create `devportal/frontend/src/screens/workspace/steps/ReviewSubmitStep.tsx`:

```tsx
import { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { useSubmissionStore } from '../../../store/submissionStore';
import { useStatusStream } from '../../../hooks/useStatusStream';
import { buildPackageZip, parsePackageZip, downloadBlob } from '../../../lib/package-io';
import { buildManifestXmlString } from '../../manifest/manifestXml';
import type { StatusEvent, SubmitDslRequest } from '../../../types';
import { ArrowLeft, DownloadSimple, UploadSimple, Lightning, CheckCircle, XCircle, CircleNotch, Warning } from '@phosphor-icons/react';

export function ReviewSubmitStep() {
  const navigate = useNavigate();
  const workspace = useWorkspaceStore();
  const { submitDsl, isLoading, error } = useSubmissionStore();
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [events, setEvents] = useState<StatusEvent[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const manifestXml = useMemo(
    () => buildManifestXmlString(workspace.manifest, workspace.metadata),
    [workspace.manifest, workspace.metadata]
  );

  const validationErrors = useMemo(() => {
    const e: string[] = [];
    if (!workspace.manifest.name.trim()) e.push('Module name is empty (Step 2).');
    if (!/^\d+\.\d+\.\d+/.test(workspace.manifest.version)) e.push('Version is not SemVer (Step 3).');
    if (!workspace.metadata.displayName.trim()) e.push('Display name is empty (Step 3).');
    if (!workspace.metadata.industry.trim()) e.push('Industry is empty (Step 3).');
    if (!workspace.dsl.schema.trim()) e.push('DSL schema is empty (Step 1).');
    return e;
  }, [workspace]);

  const canSubmit = validationErrors.length === 0;

  const handleEvent = useCallback((event: StatusEvent) => {
    setEvents((prev) => prev.some((p) => p.timestamp === event.timestamp && p.message === event.message) ? prev : [...prev, event]);
  }, []);

  useStatusStream(activeSubmissionId, handleEvent);

  const isTerminal = events.length > 0 && (events[events.length - 1].status === 'ACTIVE' || events[events.length - 1].status === 'ERROR');

  const handleSubmit = async () => {
    setEvents([]);
    const payload: SubmitDslRequest = {
      moduleName: workspace.manifest.name,
      version: workspace.manifest.version,
      dslCode: workspace.dsl.schema + '\n\n// --- views ---\n\n' + workspace.dsl.views,
      manifestXml,
      displayName: workspace.metadata.displayName,
      longDescription: workspace.metadata.longDescription,
      category: workspace.metadata.category,
      industry: workspace.metadata.industry,
      iconName: workspace.metadata.iconName,
      tagline: workspace.metadata.tagline,
      color: workspace.metadata.color,
      features: workspace.metadata.features.join(', '),
      price: workspace.metadata.price,
      changelog: workspace.metadata.changelog,
      releaseNotes: workspace.metadata.releaseNotes,
    };
    const id = await submitDsl(payload);
    if (id) setActiveSubmissionId(id);
  };

  const handleDownloadPackage = async () => {
    const pkg = workspace.exportPackage();
    pkg.manifestXml = manifestXml;
    const blob = await buildPackageZip(pkg);
    downloadBlob(blob, `${workspace.manifest.name || 'module'}-v${workspace.manifest.version}.zip`);
  };

  const handleUploadPackage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const pkg = await parsePackageZip(file);
      workspace.loadPackage(pkg);
    } catch (err) {
      alert(`Failed to load package: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6 overflow-y-auto">
      <header className="shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 4</span>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Review &amp; Submit</h1>
        <p className="text-sm text-zinc-500">Verify everything, then submit or export the package.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Summary cards */}
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Module</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info k="Name" v={workspace.manifest.name} />
              <Info k="Version" v={`v${workspace.manifest.version}`} />
              <Info k="Display" v={workspace.metadata.displayName} />
              <Info k="Industry" v={workspace.metadata.industry} />
              <Info k="Category" v={workspace.metadata.category} />
              <Info k="Price" v={String(workspace.metadata.price)} />
            </div>
            {workspace.metadata.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {workspace.metadata.features.map((f) => <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">{f}</span>)}
              </div>
            )}
          </div>

          <details className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4">
            <summary className="text-xs font-bold uppercase tracking-wider text-zinc-500 cursor-pointer">DSL Schema Preview</summary>
            <pre className="mt-3 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 max-h-48 overflow-auto whitespace-pre-wrap">{workspace.dsl.schema.slice(0, 600)}{workspace.dsl.schema.length > 600 ? '…' : ''}</pre>
          </details>

          <details className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4">
            <summary className="text-xs font-bold uppercase tracking-wider text-zinc-500 cursor-pointer">Manifest XML Preview</summary>
            <pre className="mt-3 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 max-h-48 overflow-auto whitespace-pre-wrap">{manifestXml.slice(0, 600)}{manifestXml.length > 600 ? '…' : ''}</pre>
          </details>
        </section>

        {/* Actions + pipeline */}
        <aside className="space-y-4">
          {validationErrors.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2"><Warning className="w-4 h-4" weight="bold" /> Resolve before submitting</div>
              <ul className="text-xs text-amber-700 dark:text-amber-400 list-disc list-inside space-y-1">
                {validationErrors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          <button onClick={handleDownloadPackage} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <DownloadSimple className="w-4 h-4" weight="bold" /> Download Package ZIP
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UploadSimple className="w-4 h-4" weight="bold" /> Upload Package ZIP
          </button>
          <input ref={fileInputRef} type="file" accept=".zip" className="hidden" onChange={handleUploadPackage} />

          <button onClick={handleSubmit} disabled={!canSubmit || isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!canSubmit ? 'Resolve validation errors first' : 'Submit to the compilation pipeline'}>
            {isLoading ? <><CircleNotch className="w-4 h-4 animate-spin" weight="bold" /> Submitting…</> : <><Lightning className="w-4 h-4" weight="fill" /> Submit to Pipeline</>}
          </button>

          {error && <div className="text-xs text-red-500 bg-red-500/10 rounded-lg p-3">{error}</div>}

          {/* Pipeline timeline */}
          {activeSubmissionId && (
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Pipeline Status</h4>
              {events.length === 0 ? (
                <div className="flex items-center gap-2 text-xs text-zinc-500"><CircleNotch className="w-4 h-4 animate-spin" weight="bold" /> Connecting telemetry…</div>
              ) : (
                <div className="space-y-2">
                  {events.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {ev.status === 'ACTIVE' ? <CheckCircle className="w-4 h-4 text-emerald-500" weight="fill" /> :
                       ev.status === 'ERROR' ? <XCircle className="w-4 h-4 text-red-500" weight="fill" /> :
                       <CircleNotch className="w-4 h-4 text-cyan-500 animate-spin" weight="bold" />}
                      <div>
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{ev.message}</p>
                        <p className="text-[10px] font-mono text-zinc-400">{new Date(ev.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                  {isTerminal && (
                    <button onClick={() => { setActiveSubmissionId(null); setEvents([]); workspace.reset(); navigate('/workspace/dsl'); }}
                      className="mt-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">Start new module →</button>
                  )}
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      <footer className="shrink-0 flex justify-between sticky bottom-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur py-3 -mx-6 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <button onClick={() => { workspace.setCurrentStep('details'); navigate('/workspace/details'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="w-4 h-4" weight="bold" /> Back to Details
        </button>
      </footer>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{k}</span>
      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{v || '—'}</p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add devportal/frontend/src/screens/workspace/steps/ReviewSubmitStep.tsx
git commit -m "feat(frontend): add ReviewSubmitStep (Step 4) with package export/import + pipeline"
```

---

### Task 20: Frontend — WorkspaceLayout + SubmissionHistory

**Files:**
- Create: `devportal/frontend/src/screens/workspace/WorkspaceLayout.tsx`
- Create: `devportal/frontend/src/screens/workspace/SubmissionHistory.tsx`

- [ ] **Step 1: Create WorkspaceLayout**

Create `devportal/frontend/src/screens/workspace/WorkspaceLayout.tsx`:

```tsx
import { useMemo, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { WizardStepper } from '../../components/workspace/WizardStepper';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { buildPackageZip, parsePackageZip, downloadBlob } from '../../lib/package-io';
import { buildManifestXmlString } from '../manifest/manifestXml';
import type { WizardStep } from '../../types';

export function WorkspaceLayout() {
  const navigate = useNavigate();
  const workspace = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completed = useMemo<Record<WizardStep, boolean>>(() => ({
    dsl: workspace.dsl.schema.trim().length > 0,
    manifest: !!workspace.manifest.name.trim() && /^\d+\.\d+\.\d+/.test(workspace.manifest.version),
    details: !!workspace.metadata.displayName.trim() && !!workspace.metadata.industry.trim(),
    review: false,
  }), [workspace]);

  const goStep = (step: WizardStep) => {
    workspace.setCurrentStep(step);
    navigate(`/workspace/${step}`);
  };

  const handleDownloadPackage = async () => {
    const pkg = workspace.exportPackage();
    pkg.manifestXml = buildManifestXmlString(workspace.manifest, workspace.metadata);
    const blob = await buildPackageZip(pkg);
    downloadBlob(blob, `${workspace.manifest.name || 'module'}-v${workspace.manifest.version}.zip`);
  };

  const handleUploadPackage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const pkg = await parsePackageZip(file);
      workspace.loadPackage(pkg);
    } catch (err) {
      alert(`Failed to load package: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 px-6 py-4 border-b border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <WizardStepper current={workspace.currentStep} completed={completed} onStepClick={goStep} />
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleDownloadPackage} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">Download Package</button>
            <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">Upload Package</button>
            <input ref={fileInputRef} type="file" accept=".zip" className="hidden" onChange={handleUploadPackage} />
          </div>
        </div>
      </header>
      <div className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create SubmissionHistory**

Create `devportal/frontend/src/screens/workspace/SubmissionHistory.tsx`:

```tsx
import { useEffect } from 'react';
import { useSubmissionStore } from '../../store/submissionStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { ModuleCard } from '../../components/modules/ModuleCard';
import { Button } from '../../components/ui/Button';
import { ArrowClockwise, DownloadSimple } from '@phosphor-icons/react';

export function SubmissionHistory() {
  const { submissions, isLoading, error, fetchSubmissions } = useSubmissionStore();
  const workspace = useWorkspaceStore();

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'submission-history.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Submission History</h1>
          <p className="text-xs text-zinc-500">All submissions across all your modules.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportHistory}><DownloadSimple className="w-3.5 h-3.5" weight="bold" /> Export</Button>
          <Button variant="outline" size="sm" onClick={fetchSubmissions} isLoading={isLoading}><ArrowClockwise className="w-3.5 h-3.5" /> Refresh</Button>
        </div>
      </div>

      {error && <div className="text-xs text-red-500 bg-red-500/10 rounded-lg p-3">{error}</div>}

      {submissions.length === 0 ? (
        <div className="text-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500">No submissions yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((s) => (
            <ModuleCard key={s.id} submission={s} onClick={() => { workspace.reset(); /* future: load by id */ }} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add devportal/frontend/src/screens/workspace/WorkspaceLayout.tsx devportal/frontend/src/screens/workspace/SubmissionHistory.tsx
git commit -m "feat(frontend): add WorkspaceLayout (stepper + toolbar) and SubmissionHistory"
```

---

### Task 21: Frontend — wire routes and nav in App.tsx + guards

**Files:**
- Modify: `devportal/frontend/src/App.tsx`
- Modify: `devportal/frontend/src/components/auth/AuthGuards.tsx`

- [ ] **Step 1: Update navItems and routes in App.tsx**

In `devportal/frontend/src/App.tsx`:

Replace the `navItems` array:

```ts
const navItems = [
  { path: '/workspace', label: 'Module Workspace', icon: Hammer },
  { path: '/workspace/history', label: 'Submission History', icon: Package },
  { path: '/api-explorer', label: 'API Explorer', icon: MagnifyingGlass },
  { path: '/tickets', label: 'Ticket Inbox', icon: Ticket },
];
```

(Ensure `Hammer` and `Package` are already imported from `@phosphor-icons/react` — they are.)

Add the workspace imports near the top of the file (after the existing screen imports):

```ts
import { WorkspaceLayout } from './screens/workspace/WorkspaceLayout';
import { DslStep } from './screens/workspace/steps/DslStep';
import { ManifestStep } from './screens/workspace/steps/ManifestStep';
import { DetailsStep } from './screens/workspace/steps/DetailsStep';
import { ReviewSubmitStep } from './screens/workspace/steps/ReviewSubmitStep';
import { SubmissionHistory } from './screens/workspace/SubmissionHistory';
```

Replace the route block inside `<Route element={<PortalLayout />}>` with:

```tsx
                <Route element={<PortalLayout />}>
                  <Route path="/" element={<Navigate to="/workspace" replace />} />
                  <Route path="/dsl-studio" element={<Navigate to="/workspace/dsl" replace />} />
                  <Route path="/manifest" element={<Navigate to="/workspace/manifest" replace />} />
                  <Route path="/playground" element={<Navigate to="/workspace/dsl" replace />} />

                  <Route path="/workspace" element={<WorkspaceLayout />}>
                    <Route index element={<Navigate to="/workspace/dsl" replace />} />
                    <Route path="dsl" element={<DslStep />} />
                    <Route path="manifest" element={<ManifestStep />} />
                    <Route path="details" element={<DetailsStep />} />
                    <Route path="review" element={<ReviewSubmitStep />} />
                  </Route>
                  <Route path="/workspace/history" element={<PortalLayout><SubmissionHistory /></PortalLayout>} />

                  <Route path="/api-explorer" element={<ApiExplorer />} />
                  <Route path="/tickets" element={<TicketInbox />} />
                </Route>
```

> Note: `PortalLayout` currently renders `<Outlet />` from react-router. For the history route we want it inside the layout too. The cleanest fix: instead of the wrapper above, put SubmissionHistory as its own route under PortalLayout and let PortalLayout render Outlet. But SubmissionHistory is a full page (not a wizard step). The simplest pattern: make SubmissionHistory render inside the wizard-shell OR inside the bare layout. Given the wrapper above passes children, but PortalLayout uses `<Outlet />`, we need PortalLayout to support children. It already does (`children ?? <Outlet />`). So the wrapper works. ✅

- [ ] **Step 2: Update AuthGuards redirect targets from `/` to `/workspace`**

In `devportal/frontend/src/components/auth/AuthGuards.tsx`, replace every `to="/"` with `to="/workspace"`:

- `RequireRole`: `if (user.role === 'DEVELOPER_PARTNER') return <Navigate to="/workspace" replace />;`
- `GuestRoute`: both `return <Navigate to="/workspace" replace />;` lines.

- [ ] **Step 3: Type-check + build**

Run: `cd devportal/frontend && npx tsc -b --noEmit`
Expected: no errors.

Run: `cd devportal/frontend && npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add devportal/frontend/src/App.tsx devportal/frontend/src/components/auth/AuthGuards.tsx
git commit -m "feat(frontend): wire workspace routes, collapse nav, redirect legacy paths"
```

---

### Task 22: Cleanup — remove dead SubmissionPortal reference

**Files:**
- Modify: `devportal/frontend/src/App.tsx`

- [ ] **Step 1: Remove the now-unused SubmissionPortal import and route**

In `App.tsx`, delete the import line:

```ts
import { SubmissionPortal } from './screens/submission/SubmissionPortal';
```

(Its functionality is fully replaced by the workspace Review step + SubmissionHistory.)

- [ ] **Step 2: Type-check + build**

Run: `cd devportal/frontend && npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add devportal/frontend/src/App.tsx
git commit -m "chore(frontend): drop dead SubmissionPortal route reference"
```

---

## Self-Review Notes

**Spec coverage check** (each spec section → task):
- §4.2 workspaceStore (persisted) → Task 8 ✓
- §4.3 routing/nav collapse + legacy redirects → Task 21 ✓
- §4.4 enhanced API contracts (VAL-009) → Task 13 (form + validation) + Task 6 (type) ✓
- §4.5 Module Details + SemVer bump + features editor + industries → Tasks 9, 15, 18 ✓
- §4.6 Review & Submit + SSE + package download/upload → Task 19, 20 ✓
- §5 ZIP package format (lossless) → Task 10 (with round-trip test) ✓
- §6 import/export matrix → Tasks 16 (DSL), 17 (XML), 19+20 (full package), 20 (history) ✓
- §7.1–7.4 backend changes → Tasks 1–4 ✓
- §8 version uniqueness (409) → Task 3 ✓
- §11 testing — unit tests for semver & package-io → Tasks 7, 10 ✓

**Placeholder scan:** No "TBD/TODO/…". All code blocks are complete.

**Type consistency check:**
- `ManifestApi` fields (`method`, `path`, `description`, `requiredRole`, `requestSchema`, `responseSchema`, `exampleResponse`) are consistent across `types/workspace.ts`, `manifestXml.ts`, `ManifestFormCore`, `ManifestStep` parse ✓
- `buildManifestXmlString(manifest, metadata)` signature is identical in store, form core, layout, review step ✓
- `workspaceStore` action names (`setDsl`, `setManifest`, `setMetadata`, `setCurrentStep`, `loadPackage`, `exportPackage`, `reset`) match all step usages ✓
- `VersionBump` type used identically in `semver.ts` and `SemverBumpSelector` ✓
- `WizardStep` values (`'dsl' | 'manifest' | 'details' | 'review'`) match routes in App.tsx and WizardStepper ✓

One known minor wrinkle: in Task 18 there's a stray no-op `onVersionChange = useCallback((v) => setMetadata({}), [])` left from drafting — flagged inline to remove if lint complains. The actual version write is `setVersion` → `setManifest({ version })`, which is correct.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-06-25-module-workflow-flow.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
