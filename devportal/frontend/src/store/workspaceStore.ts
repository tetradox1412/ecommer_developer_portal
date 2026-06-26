import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  DslState, ManifestState, ModuleMetadata, ModulePackage, WizardStep,
} from '../types';
import { buildManifestXmlString } from '../screens/manifest/manifestXml';

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
        const manifestXml = buildManifestXmlString(manifest, metadata);
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
