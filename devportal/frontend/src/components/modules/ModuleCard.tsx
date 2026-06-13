import type { Submission } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

interface ModuleCardProps {
  submission: Submission;
  onClick?: () => void;
}

export function ModuleCard({ submission, onClick }: ModuleCardProps) {
  return (
    <div
      className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">{submission.moduleName}</h3>
          <span className="text-sm text-slate-400">v{submission.version}</span>
        </div>
        <StatusBadge status={submission.status} />
      </div>
      {submission.errorMessage && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {submission.errorMessage}
        </p>
      )}
      <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
        <span>ID: {submission.id}</span>
        <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
