import { useEffect, useState, useMemo } from 'react';
import { useTicketStore } from '../../store/ticketStore';
import { TicketCard } from '../../components/modules/TicketCard';
import { Button } from '../../components/ui/Button';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

type Tab = 'ALL' | 'OPEN' | 'MINE';

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
    <div className="p-8 max-w-5xl mx-auto w-full flex flex-col h-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Support Tickets</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Manage incoming requests from SaaS tenants and consumers.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchTickets} isLoading={isLoading}>
          Refresh
        </Button>
      </header>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-6 shrink-0">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-px mb-6 shrink-0">
        {(['ALL', 'OPEN', 'MINE'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            {tab === 'ALL' ? 'All Tickets' : tab === 'OPEN' ? 'Open' : 'My Tickets'}
            <span className="ml-2 text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {tab === 'ALL' 
                ? tickets.length 
                : tab === 'OPEN' 
                  ? tickets.filter(t => t.status === 'OPEN').length 
                  : tickets.filter(t => t.claimedByMe).length}
            </span>
          </button>
        ))}
      </div>

      {isLoading && tickets.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <LoadingSkeleton lines={6} />
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 flex-1">
          <p>No tickets found in this category.</p>
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
  );
}
