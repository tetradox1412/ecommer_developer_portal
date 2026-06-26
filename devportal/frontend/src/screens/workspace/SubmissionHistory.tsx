import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmissionStore } from '../../store/submissionStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { ModuleCard } from '../../components/modules/ModuleCard';
import { Button } from '../../components/ui/Button';
import { ArrowClockwise, DownloadSimple, PencilSimple } from '@phosphor-icons/react';
import type { Submission, ManifestState, ModuleMetadata, ModulePackage } from '../../types';

/** Parse a stored manifest XML back into form state (lenient). Shared with ManifestStep. */
function parseManifestXml(xml: string): { manifest: Partial<ManifestState>; metadata: Partial<ModuleMetadata> } | null {
  if (!xml) return null;
  try {
    const get = (tag: string, src = xml) => {
      const m = src.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : '';
    };
    const name = get('name');
    const manifest: Partial<ManifestState> = {
      name,
      version: get('version') || '0.1.0',
      description: get('description'),
      contextPath: get('contextPath'),
      publicApis: [],
      dependencies: [],
    };
    const metadata: Partial<ModuleMetadata> = {
      displayName: get('displayName'),
      longDescription: get('longDescription'),
      category: get('category'),
      industry: get('industry'),
      iconName: get('iconName'),
      tagline: get('tagline'),
      color: get('color'),
      features: get('features') ? get('features').split(',').map((s) => s.trim()).filter(Boolean) : [],
      price: Number(get('price')) || 0,
      changelog: get('changelog'),
      releaseNotes: get('releaseNotes'),
    };
    return { manifest, metadata };
  } catch {
    return null;
  }
}

export function SubmissionHistory() {
  const navigate = useNavigate();
  const { submissions, isLoading, error, fetchSubmissions } = useSubmissionStore();
  const workspace = useWorkspaceStore();

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  // Dedupe by version: for each (moduleName, version) keep only the newest
  // submission by submittedAt. The list is already newest-first from the API.
  const deduped = useMemo(() => {
    const seen = new Map<string, Submission>();
    for (const s of submissions) {
      const key = `${s.moduleName}@${s.version}`;
      const prev = seen.get(key);
      if (!prev || new Date(s.submittedAt).getTime() > new Date(prev.submittedAt).getTime()) {
        seen.set(key, s);
      }
    }
    return Array.from(seen.values());
  }, [submissions]);

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(deduped, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'submission-history.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /** Re-edit: rebuild a workspace package from a past submission and load it,
   *  then jump to the DSL step. Requires dslSchema/dslViews/manifestXml. */
  const reEdit = (s: Submission) => {
    const parsed = s.manifestXml ? parseManifestXml(s.manifestXml) : null;
    const pkg: ModulePackage = {
      packageVersion: 1,
      moduleName: s.moduleName,
      version: s.version,
      createdAt: s.submittedAt,
      dsl: { schema: s.dslSchema ?? '', views: s.dslViews ?? '' },
      manifestXml: s.manifestXml ?? '',
      manifest: {
        name: parsed?.manifest.name ?? s.moduleName,
        version: parsed?.manifest.version ?? s.version,
        description: parsed?.manifest.description ?? '',
        contextPath: parsed?.manifest.contextPath ?? '',
        publicApis: [],
        dependencies: [],
      },
      metadata: {
        displayName: parsed?.metadata.displayName ?? s.displayName ?? '',
        longDescription: parsed?.metadata.longDescription ?? '',
        category: parsed?.metadata.category ?? s.category ?? '',
        industry: parsed?.metadata.industry ?? '',
        iconName: parsed?.metadata.iconName ?? s.iconName ?? '',
        tagline: parsed?.metadata.tagline ?? '',
        color: parsed?.metadata.color ?? '',
        features: parsed?.metadata.features ?? [],
        price: parsed?.metadata.price ?? 0,
        changelog: parsed?.metadata.changelog ?? '',
        releaseNotes: parsed?.metadata.releaseNotes ?? '',
      },
    };
    workspace.loadPackage(pkg);
    navigate('/workspace/dsl');
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Submission History</h1>
          <p className="text-xs text-zinc-500">Latest submission per version across all your modules.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportHistory}><DownloadSimple className="w-3.5 h-3.5" weight="bold" /> Export</Button>
          <Button variant="outline" size="sm" onClick={fetchSubmissions} isLoading={isLoading}><ArrowClockwise className="w-3.5 h-3.5" /> Refresh</Button>
        </div>
      </div>

      {error && <div className="text-xs text-red-500 bg-red-500/10 rounded-lg p-3">{error}</div>}

      {deduped.length === 0 ? (
        <div className="text-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500">No submissions yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deduped.map((s) => (
            <div key={s.id} className="relative group">
              <ModuleCard submission={s} />
              {/* Timestamp + re-edit action overlay */}
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500" title={s.submittedAt}>
                  {fmt(s.submittedAt)}
                </span>
                <button
                  onClick={() => reEdit(s)}
                  disabled={!s.dslSchema && !s.manifestXml}
                  title={(!s.dslSchema && !s.manifestXml) ? 'No package data stored for this submission' : 'Load this submission into the workspace to edit & resubmit'}
                  className="flex items-center gap-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline disabled:text-zinc-400 disabled:no-underline disabled:cursor-not-allowed"
                >
                  <PencilSimple className="w-3 h-3" weight="bold" /> Re-edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
