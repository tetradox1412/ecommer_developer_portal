import { create } from 'zustand';
import type { Ticket } from '../types';
import { api } from '../api/bff';

interface TicketState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  claimTicket: (ticketId: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  isLoading: false,
  error: null,
  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getTickets();
      set({ tickets: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tickets';
      set({ error: message, isLoading: false });
    }
  },
  claimTicket: async (ticketId) => {
    try {
      const updated = await api.claimTicket(ticketId);
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t)),
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to claim ticket';
      set({ error: message });
    }
  },
}));
