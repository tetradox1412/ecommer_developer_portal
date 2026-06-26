import type { ModuleApi, Submission, SubmitDslRequest, Ticket, VersionInfo } from '../types';

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

  getModuleVersions: (moduleName: string) =>
    request<VersionInfo[]>(`/bff/developer/submissions/${encodeURIComponent(moduleName)}/versions`),

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

  // DSL Studio — live validation (returns line/col errors for Monaco markers)
  validateHospitalDsl: (schemaContent: string, viewsContent: string) =>
    request<{
      valid: boolean;
      errors: Array<{ line: number; column: number; message: string; severity: 'error' | 'warning' }>;
      output: string;
    }>('/bff/dsl/validate-hospital', {
      method: 'POST',
      body: JSON.stringify({ schemaContent, viewsContent }),
    }),

  // DSL Studio — generate full-stack project from .schema + .views
  generateDslProject: async (schemaContent: string, viewsContent: string): Promise<void> => {
    const token = localStorage.getItem('jwt');
    let res: Response;
    try {
      res = await fetch(`${BFF_BASE}/bff/dsl/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ schemaContent, viewsContent }),
      });
    } catch {
      throw new Error(
        `Network error — cannot reach the BFF at ${BFF_BASE}.\n` +
        `Make sure the Spring Boot server is running (mvn spring-boot:run).`
      );
    }
    if (!res.ok) {
      // Try to get the full DSL engine output from the body first
      const bodyText = await res.text().catch(() => '');
      const headerMsg = res.headers.get('X-DSL-Error') ?? '';
      const detail = bodyText || headerMsg || res.statusText;
      throw new Error(`Server error ${res.status}:\n${detail}`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-project.zip';
    a.click();
    URL.revokeObjectURL(url);
  },
};