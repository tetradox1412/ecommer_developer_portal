import { STATUS_COLORS } from './tokens';
import type { ModuleStatus } from './tokens';

export function StatusBadge({ status }: { status: string }) {
  const key = status.toUpperCase().replace(/ /g, '_') as ModuleStatus;
  const colors = STATUS_COLORS[key] ?? STATUS_COLORS.INACTIVE;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {status}
    </span>
  );
}