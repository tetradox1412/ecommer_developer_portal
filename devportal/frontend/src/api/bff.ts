import type { ModuleApi, Submission, SubmitDslRequest, Ticket } from '../types';

const BFF_BASE = import.meta.env.VITE_BFF_URL ?? 'http://localhost:8084';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${BFF_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Request failed');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: { sub: string; email: string; role: string } }>('/bff/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  googleLogin: (email: string, name: string, role: string) =>
    request<{ token: string; user: { sub: string; email: string; role: string } }>('/bff/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({ email, name, role }),
    }),

  getProfile: () =>
    request<{ id: string; email: string; name: string; role: string; googleLinked: boolean }>('/bff/developer/profile'),

  updateProfile: (name: string, email: string) =>
    request<{ message: string }>('/bff/developer/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    }),

  changePassword: (oldPassword: string, newPassword: string) =>
    request<{ message: string }>('/bff/developer/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    }),

  getActivities: () =>
    request<Array<{ id: string; activity: string; timestamp: string }>>('/bff/developer/activities'),

  // Submission Portal
  submitDsl: (body: SubmitDslRequest) =>
    request<{ submissionId: string }>('/bff/dsl/submit', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getSubmissions: () =>
    request<Submission[]>('/bff/developer/submissions'),

  // API Explorer
  getAllModuleApis: () =>
    request<ModuleApi[]>('/bff/wrapper/modules/apis'),

  // Ticket Inbox
  getTickets: () =>
    request<Ticket[]>('/bff/tickets'),

  claimTicket: (ticketId: string) =>
    request<Ticket>(`/bff/tickets/${ticketId}/claim`, { method: 'POST' }),

  // Sandbox (Phase 3)
  runSandbox: (dslCode: string, manifestXml: string) =>
    request<{ runId: string; steps: Array<{ timestamp: string; description: string; status: string }> }>('/bff/dsl/sandbox/run', {
      method: 'POST',
      body: JSON.stringify({ dslCode, manifestXml }),
    }),

  // DSL Validation
  validateDsl: (dslCode: string) =>
    request<{ errors: Array<{ line: number; message: string }> }>('/bff/dsl/validate', {
      method: 'POST',
      body: JSON.stringify({ dslCode }),
    }),
};