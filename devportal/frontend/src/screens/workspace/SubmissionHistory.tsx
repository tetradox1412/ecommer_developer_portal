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
