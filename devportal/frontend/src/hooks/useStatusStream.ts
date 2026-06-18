import { useEffect } from 'react';
import type { StatusEvent } from '../types';

export function useStatusStream(
  submissionId: string | null,
  onEvent: (event: StatusEvent) => void,
  onError?: (error: unknown) => void
) {
  useEffect(() => {
    if (!submissionId) return;

    const bffUrl = import.meta.env.VITE_BFF_URL ?? 'http://localhost:8084';
    const url = `${bffUrl}/bff/status/stream?submissionId=${submissionId}`;
    const es = new EventSource(url);

    es.onmessage = (e) => {
      try {
        const event: StatusEvent = JSON.parse(e.data);
        onEvent(event);
        if (event.status === 'ACTIVE' || event.status === 'ERROR') {
          es.close();
        }
      } catch (err) {
        console.error('Failed to parse SSE event data:', err);
        onError?.(err);
      }
    };

    es.onerror = (e) => {
      console.error('SSE connection lost, browser will retry automatically');
      onError?.(e);
    };

    return () => es.close();
  }, [submissionId, onEvent, onError]);
}