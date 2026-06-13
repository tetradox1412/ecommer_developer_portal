import { useEffect, useState, useMemo } from 'react';
import { useTicketStore } from '../../store/ticketStore';
import { TicketCard } from '../../components/modules/TicketCard';
import { ArrowClockwise, WarningCircle, Ticket } from '@phosphor-icons/react';

type Tab = 'ALL' | 'OPEN' | 'MINE';

function TicketSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900 rounded-xl p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-5 bg-zinc-200 dark:bg-zinc-800/60 rounded w-1/3" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800/60 rounded-full w-16" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800/60 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800/60 rounded w-5/6" />
      </div>
      <div className="border-t border-zinc-100 dark:border-zinc-900/60 my-0.5" />
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800/60 rounded w-20" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800/60 rounded w-16" />
        </div>
        <div className="h-7 bg-zinc-200 dark:bg-zinc-800/60 rounded-lg w-20" />
      </div>
    </div>
  );
}

export function TicketInbox() {
  const { tickets, isLoading, error, fetchTickets, claimTicket } = useTicketStore();
  const [activeTab, setActiveTab] = useState<Tab>('ALL');

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    switch (activeTab) {
      case 'OPEN':
        return tickets.filter(t => t.status === 'OPEN');
      case 'MINE':
        return tickets.filter(t => t.claimedByMe);
      case 'ALL':
      default:
        return tickets;
    }
  }, [tickets, activeTab]);

  return (
    <div className="min-h-full w-full bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="p-8 max-w-5xl mx-auto w-full flex flex-col h-full">
        {/* Header Block */}
        <header className="mb-8 flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-sans">
              Support Tickets
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-base max-w-[65ch] font-sans">
              Review and manage developer tickets. Coordinate support requests from SaaS tenants and partner integrations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <button 
              onClick={fetchTickets} 
              disabled={isLoading}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold font-sans transition-all duration-200 cursor-pointer shadow-sm active:translate-y-[1px] active:scale-[0.98] border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ArrowClockwise 
                size={14} 
                className={`${isLoading ? 'animate-spin text-cyan-500' : 'text-zinc-500 dark:text-zinc-400'}`} 
              />
              {isLoading ? 'Syncing...' : 'Refresh'}
            </button>
          </div>
        </header>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/20 rounded-xl text-red-700 dark:text-red-400 mb-6 flex items-center gap-3 text-sm shrink-0">
            <WarningCircle size={18} className="text-red-500 dark:text-red-450 shrink-0" weight="fill" />
            <span className="font-medium font-sans">{error}</span>
          </div>
        )}

        {/* Segmented Tab Control */}
        <div className="bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 p-1 rounded-xl flex gap-1 self-start mb-6 shrink-0 select-none">
          {(['ALL', 'OPEN', 'MINE'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium font-sans text-xs transition-all rounded-lg flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
                activeTab === tab
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700/30'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-transparent'
              }`}
            >
              {tab === 'ALL' ? 'All Tickets' : tab === 'OPEN' ? 'Open' : 'My Tickets'}
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                activeTab === tab 
                  ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold' 
                  : 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400'
              }`}>
                {tab === 'ALL' 
                  ? tickets.length 
                  : tab === 'OPEN' 
                    ? tickets.filter(t => t.status === 'OPEN').length 
                    : tickets.filter(t => t.claimedByMe).length}
              </span>
            </button>
          ))}
        </div>

        {/* Tickets Stream List */}
        {isLoading && tickets.length === 0 ? (
          <div className="flex flex-col gap-4">
            <TicketSkeleton />
            <TicketSkeleton />
            <TicketSkeleton />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-zinc-950/15 border border-zinc-200 dark:border-zinc-900 rounded-2xl text-zinc-500 dark:text-zinc-400 flex flex-col items-center justify-center gap-4 shadow-sm select-none">
            <div className="w-12 h-12 rounded-full bg-zinc-150 dark:bg-zinc-900 flex items-center justify-center text-zinc-450 dark:text-zinc-550 border border-zinc-200 dark:border-zinc-850">
              <Ticket size={24} className="text-zinc-400 dark:text-zinc-500" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 font-sans">No tickets found</p>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 font-mono">No support cases are active in this tab view.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto pb-8">
            {filteredTickets.map((ticket) => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onClaim={ticket.status === 'OPEN' && !ticket.claimedByMe ? claimTicket : undefined} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
