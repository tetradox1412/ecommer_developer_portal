// ── Auth ──────────────────────────────────────────────────────
export interface JwtUser {
  sub: string;
  email: string;
  role: 'DEVELOPER_PARTNER' | 'CUSTOMER';
  licenseActive: boolean;
}

// ── Submissions ───────────────────────────────────────────────
export type SubmissionStatus = 'PENDING' | 'COMPILING' | 'ACTIVE' | 'INACTIVE' | 'ERROR';

export interface Submission {
  id: string;
  moduleName: string;
  version: string;
  status: SubmissionStatus;
  submittedAt: string;
  errorMessage?: string;
}

export interface SubmitDslRequest {
  moduleName: string;
  version: string;
  dslCode: string;
  manifestXml: string;
}

// ── API Explorer ──────────────────────────────────────────────
export interface ModuleApi {
  moduleName: string;
  version: string;
  endpoints: ApiEndpoint[];
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  requiredRole: string;
  requestSchema?: object;
  responseSchema?: object;
  exampleResponse?: object;
}

// ── Tickets ───────────────────────────────────────────────────
export type TicketStatus = 'OPEN' | 'CLAIMED' | 'IN_PROGRESS' | 'SUBMITTED';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  postedAt: string;
  status: TicketStatus;
  claimedByMe: boolean;
}

// ── SSE Events ────────────────────────────────────────────────
export interface StatusEvent {
  submissionId: string;
  status: SubmissionStatus;
  message: string;
  timestamp: string;
}