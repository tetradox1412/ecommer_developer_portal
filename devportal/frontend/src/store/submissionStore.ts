import { create } from 'zustand';
import type { Submission, SubmitDslRequest } from '../types';
import { api } from '../api/bff';

interface SubmissionState {
  submissions: Submission[];
  isLoading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  submitDsl: (request: SubmitDslRequest) => Promise<string | null>;
}

export const useSubmissionStore = create<SubmissionState>((set) => ({
  submissions: [],
  isLoading: false,
  error: null,
  fetchSubmissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getSubmissions();
      set({ submissions: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch submissions';
      set({ error: message, isLoading: false });
    }
  },
  submitDsl: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const { submissionId } = await api.submitDsl(request);
      set((state) => ({
        submissions: [
          { id: submissionId, moduleName: request.moduleName, version: request.version, status: 'PENDING', submittedAt: new Date().toISOString() },
          ...state.submissions,
        ],
        isLoading: false,
      }));
      return submissionId;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit DSL';
      set({ error: message, isLoading: false });
      return null;
    }
  },
}));
