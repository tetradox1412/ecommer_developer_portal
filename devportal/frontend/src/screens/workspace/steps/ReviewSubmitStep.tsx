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
