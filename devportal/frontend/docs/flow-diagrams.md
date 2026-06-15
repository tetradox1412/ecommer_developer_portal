# Developer Portal - Visual Flow Diagrams

## Complete System Flow Diagrams

This document provides visual representations of all major flows in the Developer Portal application.

---

## Table of Contents

1. [Application Architecture](#application-architecture)
2. [User Authentication Flow](#user-authentication-flow)
3. [Module Submission Flow](#module-submission-flow)
4. [Real-Time Status Updates (SSE)](#real-time-status-updates-sse)
5. [API Explorer Flow](#api-explorer-flow)
6. [Ticket Management Flow](#ticket-management-flow)
7. [DSL Compilation Pipeline](#dsl-compilation-pipeline)
8. [Sandbox Execution Flow](#sandbox-execution-flow)
9. [Component Communication](#component-communication)
10. [State Management Flow](#state-management-flow)

---

## Application Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                                 │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                        React Application                         │ │
│  │                                                                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │ │
│  │  │   Routing    │  │    State     │  │   Theme      │         │ │
│  │  │ React Router │  │   Zustand    │  │   Context    │         │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘         │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────┐   │ │
│  │  │                    Page Components                       │   │ │
│  │  │                                                           │   │ │
│  │  │  • Submission Portal    • API Explorer                  │   │ │
│  │  │  • Ticket Inbox         • DSL Playground                │   │ │
│  │  │  • Manifest Builder     • Sandbox Monitor               │   │ │
│  │  └─────────────────────────────────────────────────────────┘   │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────┐   │ │
│  │  │                  API Client (Axios)                      │   │ │
│  │  │  • REST Calls  • SSE Streams  • Error Handling          │   │ │
│  │  └─────────────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS / SSE
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Spring Boot)                          │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                      REST Controllers                            │ │
│  │  • AuthController     • SubmissionController                    │ │
│  │  • TicketController   • ModuleApiController                     │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                    │                                   │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                      Service Layer                               │ │
│  │  • DSL Compiler     • Manifest Parser                           │ │
│  │  • Sandbox Manager  • API Registry                              │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                    │                                   │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                         Database                                 │ │
│  │  PostgreSQL: Users, Modules, Tickets, API Endpoints             │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                      Infrastructure Layer                              │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Sandbox    │  │   Message    │  │    Cache     │               │
│  │   Docker     │  │    Queue     │  │    Redis     │               │
│  │  Containers  │  │   RabbitMQ   │  │   (Future)   │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└───────────────────────────────────────────────────────────────────────┘
```

---

## User Authentication Flow

```
┌─────────────┐
│   User      │
│ Visits App  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐        No        ┌─────────────────┐
│ Authenticated?  │────────────────▶ │  Redirect to    │
│ Check JWT Token │                  │   Login Page    │
└──────┬──────────┘                  └─────────┬───────┘
       │ Yes                                    │
       │                                        │
       ▼                                        ▼
┌─────────────────┐                  ┌─────────────────┐
│   Decode JWT    │                  │  User Enters    │
│  Extract User   │                  │  Credentials    │
└──────┬──────────┘                  └─────────┬───────┘
       │                                        │
       ▼                                        ▼
┌─────────────────┐                  ┌─────────────────┐
│  Update Auth    │                  │   POST /login   │
│     Store       │                  │   to Backend    │
└──────┬──────────┘                  └─────────┬───────┘
       │                                        │
       │                               ┌────────┴────────┐
       │                          Valid│            Invalid│
       │                               │                  │
       │                               ▼                  ▼
       │                      ┌─────────────────┐  ┌──────────┐
       │                      │  Return JWT     │  │   Show   │
       │                      │     Token       │  │  Error   │
       │                      └─────────┬───────┘  └──────────┘
       │                                │
       │                                ▼
       │                      ┌─────────────────┐
       │                      │  Store Token    │
       │                      │  in localStorage│
       │                      └─────────┬───────┘
       │                                │
       │◀───────────────────────────────┘
       │
       ▼
┌─────────────────┐
│  Access Portal  │
│  (Protected)    │
└─────────────────┘
```

---

## Module Submission Flow

```
┌─────────────────────┐
│  User Fills Form    │
│  • Module Name      │
│  • Version          │
│  • DSL Code         │
│  • Manifest XML     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Frontend Validation│
│  • Name format      │
│  • Semver version   │
│  • Required fields  │
└──────────┬──────────┘
           │
           ├─── Fail ────▶ Show Validation Errors
           │
           │ Pass
           ▼
┌─────────────────────┐
│ POST /submissions   │
│   to Backend        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend Receives   │
│   Submission        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Create Submission  │
│  Record (PENDING)   │
└──────────┬──────────┘
           │
           ├────────────────────────────────┐
           │                                │
           ▼                                ▼
┌─────────────────────┐        ┌─────────────────────┐
│ Return submissionId │        │  Start Async        │
│   to Frontend       │        │  Compilation        │
└──────────┬──────────┘        └──────────┬──────────┘
           │                              │
           ▼                              ▼
┌─────────────────────┐        ┌─────────────────────┐
│ Frontend Opens SSE  │        │  DSL Lexer/Parser   │
│  /status/stream/{id}│        │   Generate AST      │
└──────────┬──────────┘        └──────────┬──────────┘
           │                              │
           │                              ▼
           │                   ┌─────────────────────┐
           │                   │  Manifest Parser    │
           │                   │  Validate Schema    │
           │                   └──────────┬──────────┘
           │                              │
           │                              ▼
           │                   ┌─────────────────────┐
           │                   │  Code Generator     │
           │                   │  Create Handlers    │
           │                   └──────────┬──────────┘
           │                              │
           │                              ▼
           │                   ┌─────────────────────┐
           │                   │ Docker Container    │
           │                   │    Deployment       │
           │                   └──────────┬──────────┘
           │                              │
           │◀─── SSE Events ──────────────┤
           │     (Real-time)              │
           │                              ▼
           │                   ┌─────────────────────┐
           │                   │  Register Routes    │
           │                   │   in API Gateway    │
           │                   └──────────┬──────────┘
           │                              │
           │                              ▼
           │                   ┌─────────────────────┐
           │                   │  Update Status to   │
           │                   │      ACTIVE         │
           │                   └──────────┬──────────┘
           │                              │
           │◀─── Final SSE Event ─────────┘
           │
           ▼
┌─────────────────────┐
│  Show Success UI    │
│  Display Module     │
└─────────────────────┘
```

---

## Real-Time Status Updates (SSE)

```
Frontend                         Backend
   │                                │
   │  Open SSE Connection          │
   ├───────────────────────────────▶│
   │  GET /status/stream/{id}       │
   │                                │
   │                                │  Compilation Start
   │                                ├──────────────────┐
   │◀───────────────────────────────┤                  │
   │  Event: PENDING                │                  │
   │  "Module queued..."            │                  │
   │                                │                  │
   │                                │  Parse DSL       │
   │                                ├──────────────────┤
   │◀───────────────────────────────┤                  │
   │  Event: COMPILING              │                  │
   │  "Parsing DSL syntax..."       │                  │
   │                                │                  │
   │                                │  Validate        │
   │                                ├──────────────────┤
   │◀───────────────────────────────┤                  │
   │  Event: COMPILING              │                  │
   │  "Validating manifest..."      │                  │
   │                                │                  │
   │                                │  Generate Code   │
   │                                ├──────────────────┤
   │◀───────────────────────────────┤                  │
   │  Event: COMPILING              │                  │
   │  "Generating handlers..."      │                  │
   │                                │                  │
   │                                │  Deploy          │
   │                                ├──────────────────┤
   │◀───────────────────────────────┤                  │
   │  Event: COMPILING              │                  │
   │  "Deploying to sandbox..."     │                  │
   │                                │                  │
   │                                │  Success         │
   │                                ├──────────────────┘
   │◀───────────────────────────────┤
   │  Event: ACTIVE                 │
   │  "Module deployed!"            │
   │                                │
   │  Close Connection              │
   ├───────────────────────────────▶│
   │                                │
   ▼                                ▼
```

---

## API Explorer Flow

```
┌─────────────────────┐
│  User Opens API     │
│     Explorer        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  useEffect Triggers │
│  API Call on Mount  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ GET /modules/apis   │
│   Fetch All APIs    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend Returns    │
│  ModuleApi[]        │
│  • moduleName       │
│  • version          │
│  • endpoints[]      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Store in Component │
│     State           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Group Endpoints    │
│   by Module         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Render List       │
│  • Module Cards     │
│  • Endpoint Rows    │
└──────────┬──────────┘
           │
           ├────── User Searches ─────┐
           │                          │
           ▼                          ▼
┌─────────────────────┐   ┌─────────────────────┐
│  User Clicks        │   │  Filter Endpoints   │
│   Endpoint          │   │  by Search Query    │
└──────────┬──────────┘   └──────────┬──────────┘
           │                          │
           ▼                          │
┌─────────────────────┐              │
│  Expand Details     │◀─────────────┘
│  • Request Schema   │
│  • Response Schema  │
│  • Example Response │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Render JSON with   │
│  Syntax Highlighting│
└─────────────────────┘
```

---

## Ticket Management Flow

```
┌─────────────────────┐
│  User Opens Ticket  │
│       Inbox         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Fetch All Tickets  │
│  GET /tickets       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Display Tickets    │
│  • All Tab          │
│  • Open Tab         │
│  • My Tickets Tab   │
└──────────┬──────────┘
           │
           ├───── User Switches Tab ────┐
           │                            │
           │                            ▼
           │                 ┌─────────────────────┐
           │                 │  Filter Tickets     │
           │                 │   by Tab Logic      │
           │                 └──────────┬──────────┘
           │                            │
           │◀───────────────────────────┘
           │
           ├───── User Clicks "Claim" ──┐
           │                            │
           │                            ▼
           │                 ┌─────────────────────┐
           │                 │  POST /tickets/{id} │
           │                 │       /claim        │
           │                 └──────────┬──────────┘
           │                            │
           │                            ▼
           │                 ┌─────────────────────┐
           │                 │  Backend Updates    │
           │                 │  Ticket Owner       │
           │                 └──────────┬──────────┘
           │                            │
           │                            ▼
           │                 ┌─────────────────────┐
           │                 │  Refresh Ticket     │
           │                 │       List          │
           │                 └──────────┬──────────┘
           │                            │
           │◀───────────────────────────┘
           │
           ▼
┌─────────────────────┐
│  Show Updated UI    │
│  Badge: "Mine"      │
└─────────────────────┘
```

---

## DSL Compilation Pipeline

```
┌─────────────────────┐
│   DSL Source Code   │
│  "module foo { ... }│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Lexical Analysis  │
│  • Tokenize Keywords│
│  • Identify Symbols │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Syntax Parsing    │
│  • Build AST Tree   │
│  • Check Grammar    │
└──────────┬──────────┘
           │
           ├── Syntax Error? ───▶ Return Errors
           │
           │ Valid
           ▼
┌─────────────────────┐
│ Semantic Validation │
│  • Type Checking    │
│  • Role Validation  │
│  • Dependency Check │
└──────────┬──────────┘
           │
           ├── Semantic Error? ──▶ Return Errors
           │
           │ Valid
           ▼
┌─────────────────────┐
│   AST Traversal     │
│  Extract Routes     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Code Generation   │
│  • Spring Boot      │
│  • Route Handlers   │
│  • Request Mapping  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Manifest Parse    │
│  • XML Validation   │
│  • Dependencies     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Package & Deploy   │
│  • Docker Image     │
│  • Container Start  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Register in Gateway │
│  • Route Mapping    │
│  • Auth Middleware  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Module ACTIVE     │
│  Ready for Requests │
└─────────────────────┘
```

---

## Sandbox Execution Flow

```
┌─────────────────────┐
│  User Types DSL     │
│   in Playground     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Debounced          │
│  Validation (500ms) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ POST /validate      │
│   Check Syntax      │
└──────────┬──────────┘
           │
           ├── Errors? ──▶ Display Inline
           │
           │ Valid
           ▼
┌─────────────────────┐
│  User Clicks        │
│  "Run Sandbox"      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ POST /sandbox/run   │
│  • DSL Code         │
│  • Manifest XML     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend Creates    │
│  Isolated Container │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Compile in Sandbox │
│  • Parse DSL        │
│  • Generate Code    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Execute Test Cases │
│  • Mock Requests    │
│  • Handler Response │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Return Trace Steps │
│  { steps: [...] }   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Display in UI      │
│  • Trace Timeline   │
│  • Status Colors    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Destroy Container  │
│   (Cleanup)         │
└─────────────────────┘
```

---

## Component Communication

```
┌──────────────────────────────────────────────────────────────────┐
│                          App.tsx (Root)                           │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ ThemeContext │  │ ErrorBoundary│  │ BrowserRouter│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────┬──────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │ AuthGuards   │ │ PortalLayout │ │ Page Routes  │
    │ (Protected)  │ │ (Sidebar)    │ │              │
    └──────────────┘ └──────────────┘ └──────────────┘
            │               │               │
            │               │               └────────────┐
            │               │                            │
            ▼               ▼                            ▼
    ┌──────────────┐ ┌──────────────┐         ┌─────────────────┐
    │  authStore   │ │   User Info  │         │  Page Component │
    │  (Zustand)   │ │   Display    │         │                 │
    └──────────────┘ └──────────────┘         └────────┬────────┘
                                                        │
                            ┌───────────────────────────┼────────────────┐
                            │                           │                │
                            ▼                           ▼                ▼
                    ┌──────────────┐          ┌──────────────┐  ┌──────────────┐
                    │  API Client  │          │    Store     │  │  UI Components│
                    │  (bff.ts)    │          │   Actions    │  │  (LineArt)   │
                    └──────┬───────┘          └──────┬───────┘  └──────────────┘
                           │                         │
                           ▼                         ▼
                    ┌──────────────┐          ┌──────────────┐
                    │   Backend    │          │  Component   │
                    │     API      │          │    State     │
                    └──────────────┘          └──────────────┘
```

---

## State Management Flow

```
User Action
     │
     ▼
┌────────────────┐
│  UI Component  │
│  Event Handler │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│  Store Action  │
│  (Zustand)     │
└────────┬───────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌────────────────┐  ┌────────────────┐
│  Update State  │  │   API Call     │
│   Optimistic   │  │   to Backend   │
└────────────────┘  └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │    Backend     │
                    │   Processing   │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │    Response    │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Update Store  │
                    │  with Result   │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Re-render UI  │
                    │   (Reactive)   │
                    └────────────────┘
```

---

## Module Lifecycle

```
┌─────────────┐
│   PENDING   │  ←── Initial state after submission
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  COMPILING  │  ←── DSL parsing and code generation
└──────┬──────┘
       │
       ├──── Success ────▶ ┌─────────────┐
       │                   │   ACTIVE    │  ←── Routes live
       │                   └──────┬──────┘
       │                          │
       │                          ├── Admin Action ──▶ ┌─────────────┐
       │                          │                     │  INACTIVE   │
       │                          │                     └─────────────┘
       │                          │
       │                          └── Hot Reload ─────▶ (Update)
       │
       └──── Failure ────▶ ┌─────────────┐
                           │    ERROR    │  ←── Compilation failed
                           └─────────────┘
```

---

**End of Flow Diagrams**

These diagrams provide a comprehensive visual understanding of how data flows through the Developer Portal application. For detailed function documentation, see `function-reference.md`.

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained by**: Developer Platform Team
