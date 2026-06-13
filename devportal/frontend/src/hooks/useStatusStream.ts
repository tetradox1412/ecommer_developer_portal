import { useEffect } from 'react';
import type { StatusEvent } from '../types';

export function useStatusStream(
  submissionId: string | null,
  onEvent: (event: StatusEvent) => void
) {
  useEffect(() => {
    if (!submissionId) return;

    const bffUrl = import.meta.env.VITE_BFF_URL ?? 'http://localhost:8084';
    const url = `${bffUrl}/bff/status/stream?submissionId=${submissionId}`;
    const es = new EventSource(url);

    es.onmessage = (e) => {
      const event: StatusEvent = JSON.parse(e.data);
      onEvent(event);
      if (event.status === 'ACTIVE' || event.status === 'ERROR') {
        es.close();
      }
    };

    es.onerror = () => {
      console.error('SSE connection lost, browser will retry automatically');
    };

    return () => es.close();
  }, [submissionId, onEvent]);
}