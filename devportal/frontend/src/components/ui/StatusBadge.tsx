import { 
  CheckCircle, 
  XCircle, 
  CircleNotch, 
  Clock, 
  Circle, 
  FileText, 
  MinusCircle 
} from '@phosphor-icons/react';
import { STATUS_COLORS } from './tokens';
import type { ModuleStatus } from './tokens';

export function StatusBadge({ status }: { status: string }) {
  const key = status.toUpperCase().replace(/ /g, '_') as ModuleStatus;
  const colors = STATUS_COLORS[key] ?? STATUS_COLORS.INACTIVE;

  const getIcon = () => {
    switch (key) {
      case 'ACTIVE':
      case 'SUBMITTED':
        return <CheckCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />;
      case 'ERROR':
        return <XCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />;
      case 'COMPILING':
      case 'IN_PROGRESS':
        return <CircleNotch className="w-3.5 h-3.5 shrink-0 animate-spin" weight="bold" />;
      case 'PENDING':
        return <Clock className="w-3.5 h-3.5 shrink-0" weight="regular" />;
      case 'OPEN':
        return <Circle className="w-3.5 h-3.5 shrink-0" weight="regular" />;
      case 'CLAIMED':
        return <FileText className="w-3.5 h-3.5 shrink-0" weight="regular" />;
      default:
        return <MinusCircle className="w-3.5 h-3.5 shrink-0" weight="regular" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} transition-colors duration-200`}>
      {getIcon()}
      <span className="font-sans tracking-wide">{status}</span>
    </span>
  );
}