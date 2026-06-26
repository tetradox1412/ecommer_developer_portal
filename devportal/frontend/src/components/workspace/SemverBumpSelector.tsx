import { useEffect, useState } from 'react';
import { useSubmissionStore } from '../../store/submissionStore';
import { bumpVersion, compareSemver, validateSemver } from '../../lib/semver';
import type { VersionBump } from '../../types';

interface SemverBumpSelectorProps {
  moduleName: string;
  version: string;
  onVersionChange: (v: string) => void;
}

// Statuses that "occupy" a (moduleName, version) slot — mirrors the backend.
const OCCUPYING_STATUSES = ['PENDING', 'COMPILING', 'ACTIVE'];

export function SemverBumpSelector({ moduleName, version, onVersionChange }: SemverBumpSelectorProps) {
  const { fetchVersions } = useSubmissionStore();
  const [latest, setLatest] = useState<string | null>(null);
  const [bump, setBump] = useState<VersionBump>('patch');
  const [custom, setCustom] = useState('');

  // Determine the highest occupying version for this module.
  useEffect(() => {
    if (!moduleName.trim()) return;
    fetchVersions(moduleName).then((vs) => {
      const occupying = vs
        .filter((v) => OCCUPYING_STATUSES.includes(v.status))
        .map((v) => v.version)
        .sort(compareSemver);
      setLatest(occupying.length > 0 ? occupying[occupying.length - 1] : null);
    });
  }, [moduleName, fetchVersions]);

  // Apply the chosen bump. Depends only on latest + bump (onVersionChange is
  // stable from the parent via useCallback, and its identity isn't a trigger).
  useEffect(() => {
    if (!latest) return;
    if (bump === 'custom') return; // custom is driven by the text input below
    const next = bumpVersion(latest, bump);
    if (next) onVersionChange(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latest, bump]);

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
