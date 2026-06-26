import { useMemo, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { WizardStepper } from '../../components/workspace/WizardStepper';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { buildPackageZip, parsePackageZip, downloadBlob } from '../../lib/package-io';
import { buildManifestXmlString } from '../manifest/manifestXml';
import { validateSemver } from '../../lib/semver';
import type { WizardStep } from '../../types';

export function WorkspaceLayout() {
  const navigate = useNavigate();
  const workspace = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completed = useMemo<Record<WizardStep, boolean>>(() => ({
    dsl: workspace.dsl.schema.trim().length > 0,
    manifest: !!workspace.manifest.name.trim() && validateSemver(workspace.manifest.version),
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
