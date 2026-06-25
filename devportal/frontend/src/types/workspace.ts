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
