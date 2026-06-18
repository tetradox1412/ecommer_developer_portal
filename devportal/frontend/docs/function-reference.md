# Developer Portal - Function Reference Guide

## Table of Contents

1. [API Functions](#api-functions)
2. [Store Actions](#store-actions)
3. [Custom Hooks](#custom-hooks)
4. [Utility Functions](#utility-functions)
5. [Component Props](#component-props)

---

## API Functions

### Location: `src/api/bff.ts`

All API functions return Promises and handle errors internally.

---

#### `api.login(email: string, password: string)`

**Description**: Authenticates user and returns JWT token

**Parameters:**
- `email` (string): User email address
- `password` (string): User password

**Returns**: `Promise<{ token: string }>`

**Example:**
```typescript
const { token } = await api.login('dev@example.com', 'password123');
localStorage.setItem('jwt', token);
```

**Error Handling:**
- Throws error if credentials invalid
- Network errors propagate to caller

---

#### `api.getAllSubmissions()`

**Description**: Fetches all module submissions for the authenticated user

**Parameters**: None

**Returns**: `Promise<Submission[]>`

**Response Type:**
```typescript
interface Submission {
  id: string;
  moduleName: string;
  version: string;
  status: 'PENDING' | 'COMPILING' | 'ACTIVE' | 'ERROR' | 'INACTIVE';
  submittedAt: string;
  lastUpdated: string;
  dslCode: string;
  manifestXml: string;
  errorMessage?: string;
}
```

**Example:**
```typescript
const submissions = await api.getAllSubmissions();
console.log(submissions.length); // Number of submissions
```

---

#### `api.submitDsl(data: SubmitDslRequest)`

**Description**: Submits a new module for compilation and deployment

**Parameters:**
```typescript
interface SubmitDslRequest {
  moduleName: string;
  version: string;
  dslCode: string;
  manifestXml: string;
}
```

**Returns**: `Promise<{ submissionId: string }>`

**Example:**
```typescript
const result = await api.submitDsl({
  moduleName: 'loyalty-points',
  version: '1.0.0',
  dslCode: 'module loyalty-points { ... }',
  manifestXml: '<manifest>...</manifest>'
});
console.log(result.submissionId); // "sub-123"
```

**Validation:**
- Module name must be alphanumeric with hyphens
- Version must follow semantic versioning
- DSL code must be valid syntax
- Manifest XML must be well-formed

---

#### `api.getStatusStream(submissionId: string)`

**Description**: Opens Server-Sent Events (SSE) stream for real-time compilation status

**Parameters:**
- `submissionId` (string): ID of submission to monitor

**Returns**: `EventSource`

**Example:**
```typescript
const eventSource = api.getStatusStream('sub-123');

eventSource.onmessage = (event) => {
  const data: StatusEvent = JSON.parse(event.data);
  console.log(data.status, data.message);
};

// Clean up
eventSource.close();
```

**Event Types:**
```typescript
interface StatusEvent {
  submissionId: string;
  status: 'PENDING' | 'COMPILING' | 'ACTIVE' | 'ERROR';
  message: string;
  timestamp: string;
}
```

---

#### `api.getAllTickets()`

**Description**: Fetches all support tickets

**Parameters**: None

**Returns**: `Promise<Ticket[]>`

**Response Type:**
```typescript
interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  submittedBy: string;
  submittedAt: string;
  claimedBy?: string;
  claimedByMe: boolean;
}
```

**Example:**
```typescript
const tickets = await api.getAllTickets();
const openTickets = tickets.filter(t => t.status === 'OPEN');
```

---

#### `api.claimTicket(id: string)`

**Description**: Assigns ticket to current user

**Parameters:**
- `id` (string): Ticket ID

**Returns**: `Promise<void>`

**Example:**
```typescript
await api.claimTicket('ticket-456');
```

---

#### `api.getAllModuleApis()`

**Description**: Fetches all registered module API endpoints

**Parameters**: None

**Returns**: `Promise<ModuleApi[]>`

**Response Type:**
```typescript
interface ModuleApi {
  moduleName: string;
  version: string;
  endpoints: ApiEndpoint[];
}

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  requiredRole: string;
  requestSchema?: object;
  responseSchema?: object;
  exampleResponse?: object;
}
```

**Example:**
```typescript
const modules = await api.getAllModuleApis();
modules.forEach(mod => {
  console.log(`${mod.moduleName} v${mod.version}`);
  mod.endpoints.forEach(ep => {
    console.log(`  ${ep.method} ${ep.path}`);
  });
});
```

---

#### `api.validateDsl(code: string)`

**Description**: Validates DSL syntax without deployment

**Parameters:**
- `code` (string): DSL source code

**Returns**: `Promise<{ errors: ValidationError[] }>`

**Response Type:**
```typescript
interface ValidationError {
  line: number;
  message: string;
}
```

**Example:**
```typescript
const result = await api.validateDsl(dslCode);
if (result.errors.length > 0) {
  console.error('Validation failed:', result.errors);
}
```

---

#### `api.runSandbox(dslCode: string, manifestXml: string)`

**Description**: Executes DSL in isolated sandbox for testing

**Parameters:**
- `dslCode` (string): DSL source code
- `manifestXml` (string): Manifest XML

**Returns**: `Promise<{ steps: StatusEvent[] }>`

**Example:**
```typescript
const result = await api.runSandbox(dslCode, manifestXml);
result.steps.forEach(step => {
  console.log(`[${step.status}] ${step.message}`);
});
```

---

## Store Actions

### Authentication Store (`store/authStore.ts`)

#### `login(email: string, password: string)`

**Description**: Authenticates user and updates store state

**Side Effects:**
- Stores JWT in localStorage
- Updates `user` and `isAuthenticated`
- Redirects to dashboard on success

**Example:**
```typescript
const { login } = useAuthStore();
await login('dev@example.com', 'password123');
```

---

#### `logout()`

**Description**: Logs out user and clears authentication state

**Side Effects:**
- Removes JWT from localStorage
- Resets `user` to null
- Sets `isAuthenticated` to false
- Redirects to login page

**Example:**
```typescript
const { logout } = useAuthStore();
logout();
```

---

#### `setUser(user: User)`

**Description**: Updates user information in store

**Parameters:**
```typescript
interface User {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
```

**Example:**
```typescript
const { setUser } = useAuthStore();
setUser({ sub: 'dev-001', email: 'dev@example.com', role: 'DEVELOPER_PARTNER', iat: 0, exp: 0 });
```

---

#### `checkAuth()`

**Description**: Validates JWT token and restores user session

**Side Effects:**
- Decodes JWT from localStorage
- Updates user state if valid
- Clears state if token expired

**Example:**
```typescript
const { checkAuth } = useAuthStore();
checkAuth();
```

---

### Submission Store (`store/submissionStore.ts`)

#### `fetchSubmissions()`

**Description**: Loads all submissions from API

**Side Effects:**
- Sets `isLoading` to true during fetch
- Updates `submissions` array on success
- Sets `error` on failure

**Example:**
```typescript
const { fetchSubmissions } = useSubmissionStore();
await fetchSubmissions();
```

---

#### `submitDsl(data: SubmitDslRequest)`

**Description**: Submits new module for compilation

**Parameters:**
```typescript
interface SubmitDslRequest {
  moduleName: string;
  version: string;
  dslCode: string;
  manifestXml: string;
}
```

**Returns**: `Promise<string | null>` (submission ID or null on error)

**Side Effects:**
- Sets `isLoading` during submission
- Returns submission ID for SSE tracking

**Example:**
```typescript
const { submitDsl } = useSubmissionStore();
const submissionId = await submitDsl({
  moduleName: 'my-module',
  version: '1.0.0',
  dslCode: 'module my-module { ... }',
  manifestXml: '<manifest>...</manifest>'
});
```

---

### Ticket Store (`store/ticketStore.ts`)

#### `fetchTickets()`

**Description**: Loads all tickets from API

**Side Effects:**
- Sets `isLoading` to true during fetch
- Updates `tickets` array on success
- Sets `error` on failure

**Example:**
```typescript
const { fetchTickets } = useTicketStore();
await fetchTickets();
```

---

#### `claimTicket(id: string)`

**Description**: Claims ticket for current user

**Parameters:**
- `id` (string): Ticket ID

**Side Effects:**
- Marks ticket as claimed by user
- Refreshes ticket list

**Example:**
```typescript
const { claimTicket } = useTicketStore();
await claimTicket('ticket-123');
```

---

## Custom Hooks

### `useStatusStream(submissionId, onEvent, onError)`

**Location**: `src/hooks/useStatusStream.ts`

**Description**: Manages SSE connection for real-time status updates

**Parameters:**
- `submissionId` (string | null): ID to track (null disables)
- `onEvent` (function): Callback for status events
- `onError` (function): Callback for connection errors

**Type Signature:**
```typescript
function useStatusStream(
  submissionId: string | null,
  onEvent: (event: StatusEvent) => void,
  onError?: () => void
): void
```

**Example:**
```typescript
import { useStatusStream } from '../../hooks/useStatusStream';

const [events, setEvents] = useState<StatusEvent[]>([]);
const [connectionError, setConnectionError] = useState(false);

const handleEvent = useCallback((event: StatusEvent) => {
  setConnectionError(false);
  setEvents(prev => [...prev, event]);
}, []);

const handleError = useCallback(() => {
  setConnectionError(true);
}, []);

useStatusStream(activeSubmissionId, handleEvent, handleError);
```

**Features:**
- Automatic connection management
- Reconnection on error
- Cleanup on unmount
- Event deduplication

---

### `useTheme()`

**Location**: `src/components/ui/ThemeContext.tsx`

**Description**: Access and control theme state

**Returns:**
```typescript
{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Example:**
```typescript
import { useTheme } from '../../components/ui/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

---

## Utility Functions

### `getStatusBadgeVariant(status: string)`

**Description**: Maps submission status to badge color variant

**Parameters:**
- `status` (string): Submission status

**Returns**: `'green' | 'amber' | 'gray' | 'red'`

**Example:**
```typescript
const variant = getStatusBadgeVariant('ACTIVE'); // 'green'
const variant = getStatusBadgeVariant('COMPILING'); // 'amber'
const variant = getStatusBadgeVariant('ERROR'); // 'red'
```

---

### `formatTimestamp(isoString: string)`

**Description**: Formats ISO timestamp to human-readable string

**Parameters:**
- `isoString` (string): ISO 8601 timestamp

**Returns**: `string`

**Example:**
```typescript
const formatted = formatTimestamp('2024-01-15T10:30:00Z');
// Output: "Jan 15, 2024 at 10:30 AM"
```

---

### `debounce(func: Function, wait: number)`

**Description**: Creates debounced version of function

**Parameters:**
- `func` (Function): Function to debounce
- `wait` (number): Delay in milliseconds

**Returns**: Debounced function

**Example:**
```typescript
const debouncedValidate = debounce((code: string) => {
  validateDsl(code);
}, 500);

// Call multiple times, only last call executes after 500ms
debouncedValidate(code);
```

---

## Component Props

### ModuleCard Props

**Location**: `src/components/modules/ModuleCard.tsx`

```typescript
interface ModuleCardProps {
  submission: Submission;
  onClick?: () => void;
}
```

**Usage:**
```tsx
<ModuleCard 
  submission={submission} 
  onClick={() => setActiveSubmission(submission.id)} 
/>
```

---

### TicketCard Props

**Location**: `src/components/modules/TicketCard.tsx`

```typescript
interface TicketCardProps {
  ticket: Ticket;
  onClaim?: (id: string) => Promise<void>;
}
```

**Usage:**
```tsx
<TicketCard 
  ticket={ticket} 
  onClaim={ticket.status === 'OPEN' ? claimTicket : undefined} 
/>
```

---

### Button Props

**Location**: `src/components/ui/Button.tsx`

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Usage:**
```tsx
<Button 
  variant="primary" 
  size="md" 
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit Module
</Button>
```

---

### Badge Props

**Location**: `src/components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  variant?: 'green' | 'amber' | 'red' | 'gray' | 'blue';
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<Badge variant="green">ACTIVE</Badge>
<Badge variant="amber">COMPILING</Badge>
<Badge variant="red">ERROR</Badge>
```

---

### FormField Props

**Location**: `src/components/ui/FormField.tsx`

```typescript
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}
```

**Usage:**
```tsx
<FormField 
  label="Module Name" 
  placeholder="e.g. loyalty-points"
  error={errors.moduleName?.message}
  {...register('moduleName')}
/>

<FormField 
  label="DSL Code" 
  textarea
  rows={10}
  {...register('dslCode')}
/>
```

---

### LineArt Component Props

**Location**: `src/components/ui/LineArt.tsx`

#### CodingFigure
```typescript
interface CodingFigureProps {
  className?: string;
  opacity?: number;
  isTyping?: boolean;
  hasError?: boolean;
}
```

**Usage:**
```tsx
<CodingFigure 
  opacity={0.35} 
  isTyping={isTyping} 
  hasError={errors.length > 0} 
/>
```

#### PresentingFigure
```typescript
interface PresentingFigureProps {
  className?: string;
  opacity?: number;
  isActive?: boolean;
  isDone?: boolean;
}
```

**Usage:**
```tsx
<PresentingFigure 
  opacity={0.35} 
  isActive={isCompiling} 
  isDone={isTerminal} 
/>
```

---

## Error Handling Patterns

### Try-Catch with State Update

```typescript
const handleSubmit = async (data: FormData) => {
  try {
    setIsLoading(true);
    setError(null);
    await api.submitDsl(data);
    // Success handling
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setIsLoading(false);
  }
};
```

### Error Boundary

```typescript
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

## Performance Tips

1. **Memoize Expensive Calculations:**
```typescript
const filteredData = useMemo(() => {
  return data.filter(item => item.status === 'ACTIVE');
}, [data]);
```

2. **Debounce User Input:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    validateInput(value);
  }, 500);
  return () => clearTimeout(timer);
}, [value]);
```

3. **Cleanup SSE Connections:**
```typescript
useEffect(() => {
  const eventSource = api.getStatusStream(id);
  return () => eventSource.close();
}, [id]);
```

---

## Testing Examples

### Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

### Store Test
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthStore } from './authStore';

test('login updates user state', async () => {
  const { result } = renderHook(() => useAuthStore());
  
  await act(async () => {
    await result.current.login('test@example.com', 'password');
  });
  
  expect(result.current.isAuthenticated).toBe(true);
});
```

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained by**: Developer Platform Team
