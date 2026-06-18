import type { Ticket, TicketStatus } from '../../types';
import { useState } from 'react';
import { Clock, User, CaretDown, CaretUp, Check, CheckCircle, ArrowClockwise } from '@phosphor-icons/react';

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

  const getStatusDetails = (status: TicketStatus) => {
    switch (status) {
      case 'OPEN':
        return {
          bg: 'bg-cyan-500/5 dark:bg-cyan-500/5',
          text: 'text-cyan-700 dark:text-cyan-400',
          border: 'border-cyan-500/20',
          dot: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]',
          label: 'Open'
        };
      case 'CLAIMED':
        return {
          bg: 'bg-indigo-500/5 dark:bg-indigo-500/5',
          text: 'text-indigo-700 dark:text-indigo-400',
          border: 'border-indigo-500/20',
          dot: 'bg-indigo-500',
          label: 'Claimed'
        };
      case 'IN_PROGRESS':
        return {
          bg: 'bg-purple-500/5 dark:bg-purple-500/5',
          text: 'text-purple-700 dark:text-purple-400',
          border: 'border-purple-500/20',
          dot: 'bg-purple-500',
          label: 'In Progress'
        };
      case 'SUBMITTED':
        return {
          bg: 'bg-emerald-500/5 dark:bg-emerald-500/5',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-500/20',
          dot: 'bg-emerald-500',
          label: 'Resolved'
        };
    }
  };

  const statusStyle = getStatusDetails(ticket.status);

  return (
    <div className="relative group bg-white dark:bg-zinc-950/30 border border-zinc-200 dark:border-zinc-900 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800/80 hover:shadow-md hover:bg-zinc-50/20 dark:hover:bg-zinc-900/10">
      {/* Decorative Cyan Left-Bar for Open Tickets */}
      {ticket.status === 'OPEN' && (
        <div className="absolute left-0 top-4 bottom-4 w-[2.5px] bg-cyan-500 dark:bg-cyan-400 rounded-r opacity-80 group-hover:opacity-100 transition-opacity" />
      )}

      {/* Header Row */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight font-sans transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
          {ticket.title}
        </h3>
        
        {/* Customized Status Badge */}
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} select-none`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {statusStyle.label}
        </span>
      </div>

      {/* Description Body */}
      <p className={`text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans transition-colors ${!expanded ? 'line-clamp-3' : ''}`}>
        {ticket.description}
      </p>
      
      {ticket.description.length > 150 && (
        <button 
          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 self-start flex items-center gap-1 cursor-pointer transition-all active:scale-[0.98] outline-none group-hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
          {expanded ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </button>
      )}

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/60 my-0.5" />

      {/* Footer Info Row */}
      <div className="flex justify-between items-center mt-0.5">
        <div className="flex items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <User size={13} className="text-zinc-450 dark:text-zinc-500" />
            <span>Tenant: {ticket.requestedBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-zinc-450 dark:text-zinc-500" />
            <span>{timeAgo(ticket.postedAt)}</span>
          </div>
        </div>

        {/* Claim Action / Status Badges */}
        <div className="flex items-center gap-2">
          {ticket.status === 'OPEN' && !ticket.claimedByMe && onClaim && (
            <button
              onClick={handleClaim}
              disabled={isClaiming}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 cursor-pointer shadow-sm active:translate-y-[1px] active:scale-[0.98] border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 dark:border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {isClaiming ? (
                <ArrowClockwise size={12} className="animate-spin" />
              ) : (
                <Check size={12} />
              )}
              {isClaiming ? 'Claiming...' : 'Claim Ticket'}
            </button>
          )}

          {ticket.claimedByMe && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-lg select-none">
              <CheckCircle size={14} weight="fill" className="text-emerald-500" />
              Claimed by You
            </span>
          )}

          {ticket.status === 'CLAIMED' && !ticket.claimedByMe && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-500/5 border border-zinc-200/40 dark:border-zinc-800 rounded-lg select-none">
              <User size={13} className="text-zinc-450 dark:text-zinc-500" />
              Claimed by Agent
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
