import type { Ticket } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface TicketCardProps {
  ticket: Ticket;
  onClaim?: (ticketId: string) => Promise<void>;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function TicketCard({ ticket, onClaim }: TicketCardProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClaim = async () => {
    if (!onClaim) return;
    setIsClaiming(true);
    try {
      await onClaim(ticket.id);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:border-slate-600">
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-base font-semibold text-white">{ticket.title}</h3>
        <StatusBadge status={ticket.status} />
      </div>
      <p className={`text-sm text-slate-400 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
        {ticket.description}
      </p>
      {ticket.description.length > 150 && (
        <button className="text-xs text-blue-400 hover:text-blue-300 self-start" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>From: {ticket.requestedBy}</span>
          <span>{timeAgo(ticket.postedAt)}</span>
        </div>
        {ticket.status === 'OPEN' && !ticket.claimedByMe && onClaim && (
          <Button size="sm" variant="primary" onClick={handleClaim} isLoading={isClaiming}>
            Claim
          </Button>
        )}
        {ticket.claimedByMe && (
          <span className="text-xs text-green-400 font-medium">Claimed by you</span>
        )}
      </div>
    </div>
  );
}
