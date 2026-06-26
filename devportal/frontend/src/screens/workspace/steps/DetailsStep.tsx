import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { FeaturesEditor } from '../../../components/workspace/FeaturesEditor';
import { SemverBumpSelector } from '../../../components/workspace/SemverBumpSelector';
import { INDUSTRIES, getIndustry } from '../../../lib/industries';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

export function DetailsStep() {
  const navigate = useNavigate();
  const { manifest, metadata, setMetadata, setManifest, setCurrentStep } = useWorkspaceStore();

  // Stable identity so SemverBumpSelector's effect doesn't re-fire on every render.
  const setVersion = useCallback((v: string) => setManifest({ version: v }), [setManifest]);

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
          </div>

          <Field label="Tagline" value={metadata.tagline} onChange={(v) => setMetadata({ tagline: v })} placeholder="One-line marketing tagline" />
          <Field label="Long Description" textarea value={metadata.longDescription} onChange={(v) => setMetadata({ longDescription: v })} placeholder="Full marketing + functional description" />



          <FeaturesEditor features={metadata.features} onChange={(f) => setMetadata({ features: f })} />
        </section>

        <section className="space-y-4">
          <SemverBumpSelector moduleName={manifest.name} version={manifest.version} onVersionChange={setVersion} />

          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Version Notes</h3>
            <Field label="Changelog (technical)" textarea rows={4} value={metadata.changelog} onChange={(v) => setMetadata({ changelog: v })} placeholder={'- Fixed EKG render\n- Added export'} />
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

function Field({ label, value, onChange, placeholder, textarea, rows }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean; rows?: number;
}) {
  const cls = 'w-full px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500';
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">{label}</label>
      {textarea
        ? <textarea rows={rows ?? 3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}
