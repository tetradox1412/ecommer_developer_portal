# Developer Portal - Complete Architecture & Flow Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Directory Structure](#directory-structure)
5. [Core Components](#core-components)
6. [State Management](#state-management)
7. [API Layer](#api-layer)
8. [Routing & Authentication](#routing--authentication)
9. [Feature Modules](#feature-modules)
10. [Data Flow](#data-flow)
11. [Integration Points](#integration-points)
12. [Deployment Pipeline](#deployment-pipeline)

---

## Project Overview

**Developer Portal** is a comprehensive web application for managing custom eCommerce modules, APIs, and developer workflows. It enables partners to:

- Submit and deploy custom modules using DSL
- Explore and test APIs
- Monitor sandbox environments
- Build deployment manifests
- Manage support tickets
- Test DSL code in an interactive playground

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (FRONTEND)                        │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   React 18   │  │  TypeScript  │  │   Vite 5.x   │          │
│  │ (UI Library) │  │   (Types)    │  │(Build Tool)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              ROUTING (React Router v6)                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │    │
│  │  │ Submission│ │   API    │ │ Tickets  │ │Playground│ │    │
│  │  │  Portal   │ │ Explorer │ │  Inbox   │ │          │ │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │    │
│  │  ┌──────────┐ ┌──────────┐                             │    │
│  │  │ Manifest │ │  Sandbox │                             │    │
│  │  │ Builder  │ │  Monitor │                             │    │
│  │  └──────────┘ └──────────┘                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         STATE MANAGEMENT (Zustand Stores)               │    │
│  │  • authStore       • submissionStore    • ticketStore  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              API CLIENT LAYER (Axios)                   │    │
│  │  • Authentication  • Submissions  • Tickets  • Modules │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (BFF - Spring Boot)                   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              REST API CONTROLLERS                       │    │
│  │  • AuthController  • SubmissionController              │    │
│  │  • TicketController  • ModuleApiController             │    │
│  │  • SandboxController                                    │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              SERVICE LAYER                              │    │
│  │  • DSL Compiler  • Manifest Parser  • Sandbox Manager  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           SERVER-SENT EVENTS (SSE) STREAMS              │    │
│  │  • Real-time compilation status                         │    │
│  │  • Sandbox telemetry                                    │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE LAYER                        │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Database   │  │ Sandbox VMs  │  │   Message    │         │
│  │  (Postgres)  │  │  (Isolated)  │  │    Queue     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **React 18.3**: UI library with hooks and functional components
- **TypeScript 5.x**: Static type checking
- **Vite 5.x**: Fast build tool and dev server
- **React Router v6**: Client-side routing
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **TailwindCSS**: Utility-first CSS framework
- **Phosphor Icons**: Icon library
- **Monaco Editor**: Code editor for DSL playground
- **React Flow**: Graph visualization for manifest builder

### Backend
- **Spring Boot 3.x**: Java framework for REST APIs
- **PostgreSQL**: Primary database
- **Docker**: Container orchestration for sandboxes
- **Server-Sent Events (SSE)**: Real-time streaming

---

## Directory Structure

```
devportal/frontend/
├── docs/                          # Documentation files
│   ├── dsl-syntax-reference.md    # DSL language guide
│   └── takeover-architecture.md    # This file
├── public/                        # Static assets
│   ├── logo-light.png
│   ├── logo-dark.png
│   └── favicon.svg
├── src/
│   ├── api/                       # API client layer
│   │   └── bff.ts                 # Backend-for-Frontend client
│   ├── assets/                    # Images and media
│   ├── components/                # Reusable React components
│   │   ├── auth/
│   │   │   └── AuthGuards.tsx     # Route protection guards
│   │   ├── modules/
│   │   │   ├── ModuleCard.tsx     # Submission display card
│   │   │   └── TicketCard.tsx     # Ticket display card
│   │   └── ui/
│   │       ├── Badge.tsx          # Status badge component
│   │       ├── Button.tsx         # Button component
│   │       ├── ErrorBoundary.tsx  # Error handling wrapper
│   │       ├── FormField.tsx      # Input field component
│   │       ├── LineArt.tsx        # Animated SVG figures
│   │       ├── LoadingSkeleton.tsx # Loading placeholder
│   │       ├── StatusBadge.tsx    # Status indicator
│   │       ├── ThemeContext.tsx   # Dark/light theme provider
│   │       └── tokens.ts          # Design tokens
│   ├── hooks/                     # Custom React hooks
│   │   └── useStatusStream.ts     # SSE event stream hook
│   ├── screens/                   # Page-level components
│   │   ├── api-explorer/
│   │   │   └── ApiExplorer.tsx    # API documentation viewer
│   │   ├── auth/
│   │   │   └── Login.tsx          # Login page
│   │   ├── manifest/
│   │   │   └── ManifestBuilder.tsx # XML manifest generator
│   │   ├── playground/
│   │   │   └── DslPlayground.tsx  # Interactive DSL editor
│   │   ├── sandbox/
│   │   │   └── SandboxDashboard.tsx # Resource monitor
│   │   ├── submission/
│   │   │   └── SubmissionPortal.tsx # Module submission UI
│   │   └── ticket-inbox/
│   │       └── TicketInbox.tsx    # Support ticket viewer
│   ├── store/                     # Zustand state stores
│   │   ├── authStore.ts           # Authentication state
│   │   ├── submissionStore.ts     # Submission management
│   │   └── ticketStore.ts         # Ticket management
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Root component & routing
│   ├── main.tsx                   # React app entry point
│   └── index.css                  # Global styles
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite build config
└── tailwind.config.js             # TailwindCSS config
```

---

## Core Components

### 1. LineArt Components (`components/ui/LineArt.tsx`)

Animated SVG figures that react to user interactions and application state.

**Components:**
- `ThinkingFigure`: Reactive to validation state
- `NeuralArt`: Pulsing network visualization
- `WalkingFigures`: Animate faster during search
- `DataParticles`: Floating particle field
- `SignalWaves`: Flowing wave patterns
- `CodingFigure`: Reacts to typing and errors
- `PresentingFigure`: Gestures during active state
- `CollaboratingFigure`: Two figures working together
- `ReviewingFigure`: Figure with clipboard
- `DeployingFigure`: Figure with deployment box

**Usage:**
```tsx
<CodingFigure 
  opacity={0.35} 
  isTyping={isTyping} 
  hasError={errors.length > 0} 
/>
```

### 2. Auth Guards (`components/auth/AuthGuards.tsx`)

Route protection based on authentication and roles.

**Guards:**
- `RequireAuth`: Ensures user is logged in
- `RequireRole`: Checks user has required role
- `GuestRoute`: Redirects authenticated users

**Usage:**
```tsx
<Route element={<RequireAuth />}>
  <Route element={<RequireRole allowedRoles={['DEVELOPER_PARTNER']} />}>
    <Route path="/" element={<SubmissionPortal />} />
  </Route>
</Route>
```

### 3. Theme Provider (`components/ui/ThemeContext.tsx`)

Manages dark/light theme switching with persistence.

**API:**
```tsx
const { theme, toggleTheme } = useTheme();
```

---

## State Management

### Authentication Store (`store/authStore.ts`)

**State:**
```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean
}
```

**Actions:**
```typescript
- login(email: string, password: string): Promise<void>
- logout(): void
- setUser(user: User): void
- checkAuth(): void
```

### Submission Store (`store/submissionStore.ts`)

**State:**
```typescript
{
  submissions: Submission[],
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
```typescript
- fetchSubmissions(): Promise<void>
- submitDsl(data: SubmitDslRequest): Promise<string | null>
```

### Ticket Store (`store/ticketStore.ts`)

**State:**
```typescript
{
  tickets: Ticket[],
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
```typescript
- fetchTickets(): Promise<void>
- claimTicket(id: string): Promise<void>
```

---

## API Layer

### BFF Client (`api/bff.ts`)

Axios-based HTTP client for backend communication.

**Endpoints:**

#### Authentication
```typescript
login(email, password): Promise<{ token: string }>
```

#### Submissions
```typescript
getAllSubmissions(): Promise<Submission[]>
submitDsl(data: SubmitDslRequest): Promise<{ submissionId: string }>
getStatusStream(submissionId): EventSource
```

#### Tickets
```typescript
getAllTickets(): Promise<Ticket[]>
claimTicket(id): Promise<void>
```

#### Modules
```typescript
getAllModuleApis(): Promise<ModuleApi[]>
```

#### Sandbox
```typescript
validateDsl(code): Promise<{ errors: ValidationError[] }>
runSandbox(dslCode, manifestXml): Promise<{ steps: StatusEvent[] }>
```

---

## Routing & Authentication

### Route Structure

```
/login (public)           → Login page

/ (protected)             → Submission Portal
/api-explorer             → API Explorer
/tickets                  → Ticket Inbox
/playground               → DSL Playground
/manifest                 → Manifest Builder
/sandbox                  → Sandbox Monitor
```

### Authentication Flow

```
1. User submits credentials via Login page
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. authStore updates user state
5. Protected routes become accessible
6. Token included in all API requests
```

---

## Feature Modules

### 1. Submission Portal (`screens/submission/SubmissionPortal.tsx`)

**Purpose**: Submit and manage DSL modules

**Features:**
- DSL code and manifest XML input forms
- Real-time compilation status via SSE
- Module status cards (ACTIVE, COMPILING, ERROR)
- Pipeline visualization

**Key Functions:**
- `submitDsl(data)`: Submit module for compilation
- `fetchSubmissions()`: Load user's modules
- `useStatusStream()`: Real-time event updates

**Data Flow:**
```
User Form Input → submitDsl() → BFF API → Compiler
                                          ↓
Compilation Events ← SSE Stream ← Status Updates
```

### 2. API Explorer (`screens/api-explorer/ApiExplorer.tsx`)

**Purpose**: Browse and test module APIs

**Features:**
- Endpoint listing by module
- Request/response schema display
- JSON syntax highlighting
- Search and filter

**Key Functions:**
- `getAllModuleApis()`: Fetch all endpoints
- `JsonHighlighter`: Syntax coloring for JSON

**Data Flow:**
```
Load APIs → Fetch from BFF → Display endpoints → Expand details
```

### 3. Ticket Inbox (`screens/ticket-inbox/TicketInbox.tsx`)

**Purpose**: Manage support tickets

**Features:**
- Tab filtering (All, Open, Mine)
- Claim ticket functionality
- Status badges

**Key Functions:**
- `fetchTickets()`: Load tickets
- `claimTicket(id)`: Assign ticket to user

**Data Flow:**
```
Fetch Tickets → Display List → Filter by Tab → Claim Action
```

### 4. DSL Playground (`screens/playground/DslPlayground.tsx`)

**Purpose**: Interactive DSL testing environment

**Features:**
- Monaco code editor with syntax highlighting
- Real-time validation (debounced)
- Dry-run sandbox execution
- Error highlighting with line numbers

**Key Functions:**
- `validateDsl(code)`: Check syntax
- `runSandbox(code)`: Execute in isolated VM
- `revealLine(lineNum)`: Navigate to error

**Data Flow:**
```
User Types Code → Debounced Validation → Show Errors
                → Run Sandbox → Trace Logs
```

### 5. Manifest Builder (`screens/manifest/ManifestBuilder.tsx`)

**Purpose**: Generate deployment manifests

**Features:**
- Form-based metadata input
- Dependency graph visualization (React Flow)
- Real-time XML generation
- Validation errors

**Key Functions:**
- `generateManifestXml()`: Create XML from form
- Dependency graph rendering

**Data Flow:**
```
Form Input → Validate → Generate XML → Visualize Graph
```

### 6. Sandbox Monitor (`screens/sandbox/SandboxDashboard.tsx`)

**Purpose**: Monitor sandbox resource usage

**Features:**
- CPU/memory sparkline charts
- Instance start/stop controls
- Real-time terminal logs
- Log filtering

**Key Functions:**
- `toggleInstance(id)`: Start/stop sandbox
- Sparkline charting
- SSE log streaming

**Data Flow:**
```
Poll Metrics → Update Charts → Display Logs → Control Actions
```

---

## Data Flow

### Complete Module Submission Flow

```
┌─────────────────┐
│  User Submits   │
│   DSL Module    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Submission Form │──────────┐
│  Validation     │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│  API Call to    │          │
│   BFF Service   │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│ DSL Compiler    │          │
│   (Backend)     │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│ Manifest Parser │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│  AST Generation │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│ Code Generation │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│ Docker Container│          │
│   Deployment    │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│  Route          │          │
│  Registration   │          │
└────────┬────────┘          │
         │                   │
         ▼                   │
┌─────────────────┐          │
│   Module        │          │
│    ACTIVE       │          │
└─────────────────┘          │
                              │
         SSE Stream Updates   │
         ─────────────────────┘
         (Real-time status)
```

---

## Integration Points

### Frontend ↔ Backend

**Authentication:**
- Endpoint: `POST /api/auth/login`
- Returns: JWT token
- Storage: localStorage

**Submissions:**
- Endpoint: `POST /api/submissions`
- Payload: `{ moduleName, version, dslCode, manifestXml }`
- Returns: `{ submissionId }`

**Status Stream:**
- Endpoint: `GET /api/status/stream/{submissionId}`
- Protocol: Server-Sent Events (SSE)
- Events: `PENDING`, `COMPILING`, `ACTIVE`, `ERROR`

**Module APIs:**
- Endpoint: `GET /api/modules/apis`
- Returns: Array of module endpoints with schemas

---

## Deployment Pipeline

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Production Build

```bash
# Build optimized bundle
npm run build

# Output: dist/
# - Minified JavaScript
# - Optimized CSS
# - Static assets
```

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK_SANDBOX=true
```

---

## Module Interaction Flow

### Cross-Module Communication

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Module A   │─────▶│  API Gateway │─────▶│   Module B   │
│ (Submitter)  │      │  (Routing)   │      │  (Handler)   │
└──────────────┘      └──────────────┘      └──────────────┘
       │                                            │
       │                                            │
       ▼                                            ▼
┌──────────────┐                            ┌──────────────┐
│  Auth Layer  │                            │   Response   │
└──────────────┘                            └──────────────┘
```

---

## Key Design Patterns

### 1. Component Composition
Modular UI components composed to build complex features

### 2. Custom Hooks
Encapsulate reusable logic (e.g., `useStatusStream`)

### 3. State Colocation
State stored closest to where it's used

### 4. Server-Sent Events
Real-time updates without WebSocket complexity

### 5. Optimistic UI
Immediate feedback while requests process

---

## Testing Strategy

### Unit Tests
- Component rendering
- State management logic
- Utility functions

### Integration Tests
- API client interactions
- Form submission flows
- Authentication guards

### E2E Tests
- Complete user journeys
- Module submission workflow
- Authentication flow

---

## Performance Optimizations

1. **Code Splitting**: Lazy load route components
2. **Debouncing**: Validation and search inputs
3. **Memoization**: Expensive calculations (useMemo)
4. **Virtual Scrolling**: Large lists (future enhancement)
5. **Image Optimization**: Compressed assets

---

## Security Considerations

1. **JWT Authentication**: Secure token-based auth
2. **Role-Based Access**: Route protection by user role
3. **Input Validation**: Frontend and backend validation
4. **XSS Prevention**: React's built-in escaping
5. **CSRF Protection**: Token-based API requests

---

## Future Enhancements

1. Real-time collaboration on DSL editing
2. Version control for module submissions
3. A/B testing framework
4. Advanced analytics dashboard
5. GraphQL API layer
6. Webhook management UI
7. Module marketplace (reinstated with improvements)

---

## Troubleshooting Guide

### Common Issues

**Issue**: Routes not loading
- **Solution**: Check authentication state and role permissions

**Issue**: SSE stream not connecting
- **Solution**: Verify backend URL and CORS configuration

**Issue**: Build fails
- **Solution**: Clear node_modules and reinstall dependencies

**Issue**: Dark mode not persisting
- **Solution**: Check localStorage permissions

---

## Support & Maintenance

**Contact**: Developer Platform Team  
**Documentation**: `/docs` directory  
**Issue Tracking**: GitHub Issues  
**Version**: 1.0.0  
**Last Updated**: 2024

---

## Glossary

- **BFF**: Backend-for-Frontend, API aggregation layer
- **DSL**: Domain-Specific Language for module definitions
- **SSE**: Server-Sent Events for real-time streaming
- **AST**: Abstract Syntax Tree from DSL compilation
- **JWT**: JSON Web Token for authentication
- **RBAC**: Role-Based Access Control

---

**End of Documentation**
