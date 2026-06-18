import { Warning } from '@phosphor-icons/react';
import type { Submission } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

interface ModuleCardProps {
  submission: Submission;
  onClick?: () => void;
}

export function ModuleCard({ submission, onClick }: ModuleCardProps) {
  const formattedDate = new Date(submission.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-cyan-500/30 dark:hover:border-cyan-accent/30 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
    >
      {/* Visual Accent Glow on Hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Card Header */}
      <div className="flex justify-between items-start gap-4 z-10">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-accent transition-colors truncate font-sans">
            {submission.moduleName}
          </h3>
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
            v{submission.version}
          </span>
        </div>
        <div className="shrink-0">
          <StatusBadge status={submission.status} />
        </div>
      </div>

      {/* Error Message if present */}
      {submission.errorMessage && (
        <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/5 border border-red-200/60 dark:border-red-500/10 rounded-lg p-3 font-mono leading-relaxed z-10">
          <Warning className="w-4 h-4 shrink-0 mt-0.5" weight="fill" />
          <span className="truncate-2-lines">{submission.errorMessage}</span>
        </div>
      )}

      {/* Card Footer Metadata */}
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 z-10">
        <span className="truncate max-w-[150px]" title={submission.id}>
          ID {'//'} <span className="text-zinc-500 dark:text-zinc-400">{submission.id.slice(0, 8)}...</span>
        </span>
        <span className="shrink-0">{formattedDate}</span>
      </div>
    </div>
  );
}
