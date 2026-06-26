# Developer Portal - Quick Start & Developer Guide

## Project Overview

The eCommerce Developer Portal is a federated developer platform for managing custom developer modules, APIs, workflows, and support tickets. The platform features an interactive DSL studio, a visual manifest builder, and support ticket matching panels, utilizing a React frontend communicating with a Spring Boot Backend-For-Frontend (BFF) microservice, which coordinates module validations with a Node-based ANTLR compiler engine.

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Pages](#available-pages)
- [Key Components](#key-components)
- [Documentation Directory](#documentation-directory)
- [Development Workflow](#development-workflow)
- [API Endpoint Reference](#api-endpoint-reference)
- [Troubleshooting](#troubleshooting)

---

## Technology Stack

### Frontend Client
* **Core Framework**: React 18.3, TypeScript 5.x, Vite 5.x
* **State Management**: Zustand
* **Routing**: React Router v6
* **Code Editor**: Monaco Editor (for DSL schemas and views)
* **Graph Engine**: React Flow (for manifest visualization)
* **Icons Library**: Phosphor Icons (`@phosphor-icons/react`)
* **Styling**: TailwindCSS & custom Vanilla CSS

### Backend BFF Gateway
* **Core Framework**: Spring Boot 3.x, Spring Data JPA
* **Security Middleware**: Spring Security (stateless JWT, BCrypt credentials hashing)
* **Database**: PostgreSQL
* **Real-time Pipeline**: Server-Sent Events (SSE) status streaming
* **AST Compiler Integration**: Node CLI ANTLR parser process coordination

---

## Getting Started

### Prerequisites
* **Java JDK**: Version 17 or higher
* **Node.js**: Version 18 or higher (and `npm` package manager)
* **PostgreSQL**: Local or remote instance running on port 5432
* **Build Tools**: Maven (configured in environment path)

### Automated Setup (Recommended)
A root-level startup script automates the database role creation, backend start, dependency installation, and frontend start.

```bash
# From the project root, make the script executable and run it
chmod +x start-all.sh
./start-all.sh
```

**What the script does:**
1. Creates the PostgreSQL user role `giolitlabs` (password: `giolit`) and the database `devportal` if they do not exist.
2. Starts the Spring Boot BFF service in the background, logging outputs to `bff.log`.
3. Checks for `node_modules` in the frontend directory, installs them if missing, and starts the Vite development server, logging to `frontend.log`.
4. Traps execution exit signals; pressing `Ctrl+C` terminates both background tasks cleanly.

### Manual Setup

#### 1. Database Initialization
Verify PostgreSQL is running, then run:
```bash
psql -c "CREATE USER giolitlabs WITH PASSWORD 'giolit';"
psql -c "CREATE DATABASE devportal;"
psql -c "ALTER DATABASE devportal OWNER TO giolitlabs;"
```
Database tables and demo seeds are automatically applied on Spring Boot boot-up via `devportal/bff/src/main/resources/schema.sql`.

#### 2. Start Backend BFF
Configure the environment variables in `devportal/.env` (DB host, port, credentials) and start the Maven Spring Boot plugin:
```bash
cd devportal
./run-postgres.sh
```
The backend will listen on **[http://localhost:8084](http://localhost:8084)**.

#### 3. Start React Frontend
Install dependencies and spin up Vite:
```bash
cd devportal/frontend
npm install
npm run dev
```
The client dashboard opens at **[http://localhost:5173](http://localhost:5173)**.

### Default Login Credentials
* **Developer Account**: `dev@devportal.com` / `password123`
* **Administrator Account**: `admin` / `admin`

---

## Project Structure

```
project-root/
├── docs/                          # 📚 Consolidated Documentation (Project Root)
│   ├── README.md                  # This Quick Start Guide
│   ├── index.md                   # Documentation suite index
│   ├── handover.md                # Transition and recent changes notes
│   ├── backend-architecture.md     # Detailed BFF, DB and subprocess guide
│   ├── takeover-architecture.md   # Detailed React components & store layout
│   ├── dsl-syntax-reference.md    # Domain-Specific Language specs
│   └── function-reference.md      # Frontend functions & hook reference
│
├── devportal/
│   ├── bff/                       # ☕ Spring Boot BFF Source Code
│   │   ├── src/main/java/         # Controllers, services, and repositories
│   │   └── src/main/resources/    # Configuration files and database SQL schemas
│   │
│   └── frontend/                  # ⚛️ Vite React SPA Source Code
│       ├── src/
│       │   ├── api/               # API clients (bff.ts endpoint connector)
│       │   ├── components/        # Shared components (layouts, auth, line art)
│       │   ├── hooks/             # Custom React hooks (useStatusStream.ts)
│       │   ├── screens/           # Main screen modules (Studio, Manifests, Tickets)
│       │   ├── store/             # Zustand global states (auth, submissions, tickets)
│       │   └── types/             # Common TypeScript interfaces
│       │
│       ├── tailwind.config.js
│       └── vite.config.ts
│
├── start-all.sh                   # Unified startup orchestrator
└── Hospital-DSL-.../              # Node ANTLR compiler engine
```

---

## Available Pages

### 1. Submission Portal (`/`)
Allows developers to submit new custom eCommerce modules by providing metadata, DSL syntax, and XML manifests. The submission updates the list in real-time using a Server-Sent Events (SSE) status stream.

### 2. API Explorer (`/api-explorer`)
Displays registered backend endpoints, required roles, query descriptors, and example responses retrieved from the eCommerce SaaS core wrapper.

### 3. Ticket Inbox (`/tickets`)
Allows developers to view pending requests, filter tickets by tabs (All, Open, Mine), and claim tickets to associate them with their active developer user ID.

### 4. DSL Studio (`/dsl-studio`)
An advanced playground containing a side-by-side Monaco editor for writing DSL schemas and views. Offers instant validation with custom ANTLR syntax parse errors highlighted directly inside Monaco, and downloadable generated full-stack project zip packages.

### 5. Manifest Builder (`/manifest`)
Allows developers to configure XML deployment manifests visually. Includes React Flow dependency graphs, semantic syntax validation, and color-coded XML code viewers.

### 6. Sandbox Monitor (`/sandbox`)
*Note: Currently disabled in navigation controls for updates during Phase 3.*

---

## 📚 Documentation Directory

Consult the root `docs/` folder for deeper information:
1. **[Documentation Index](index.md)** (`docs/index.md`): Sitemap and role-based learning tracks.
2. **[Backend BFF Guide](backend-architecture.md)** (`docs/backend-architecture.md`): Deep-dive into controllers, Spring Security settings, database schema structures, and compiler coordination.
3. **[Frontend Takeover Guide](takeover-architecture.md)** (`docs/takeover-architecture.md`): Deep-dive into React structure, state containers, layouts, styling rules, and hooks.
4. **[Handover Transitions](handover.md)** (`docs/handover.md`): Setup notes, database scripts, and summary of changes.
5. **[DSL syntax](dsl-syntax-reference.md)** (`docs/dsl-syntax-reference.md`): Complete rules for writing schemas and views.
6. **[Function Reference](function-reference.md)** (`docs/function-reference.md`): Client-side API functions, props, and actions.

---

## Development Workflow

### Frontend Linting & Typing Checks
Before pushing frontend modifications, execute the following commands in `devportal/frontend`:
```bash
# Run ESLint validation
npm run lint

# Validate TypeScript type safety
npx tsc --noEmit
```

### Backend Compiler Checks
To verify the Spring Boot codebase compiles successfully:
```bash
cd devportal/bff
mvn compile
```

---

## API Endpoint Reference

All endpoints expect the header `Authorization: Bearer <token>` (except public routes).

| Method | Endpoint | Required Role | Description |
|---|---|---|---|
| `POST` | `/bff/auth/login` | *Public* | DB Authenticate and retrieve JWT |
| `POST` | `/bff/auth/google-login` | *Public* | OAuth Authenticate and retrieve JWT |
| `GET` | `/bff/developer/profile` | `DEVELOPER_PARTNER` | Get current user's profile metadata |
| `PUT` | `/bff/developer/profile` | `DEVELOPER_PARTNER` | Update user email or name |
| `POST` | `/bff/developer/change-password` | `DEVELOPER_PARTNER` | Change user password |
| `GET` | `/bff/developer/activities` | `DEVELOPER_PARTNER` | Fetch user session activity logs |
| `GET` | `/bff/developer/submissions` | `DEVELOPER_PARTNER` | Fetch developer's submission history |
| `POST` | `/bff/dsl/submit` | `DEVELOPER_PARTNER` | Create module and queue compile |
| `POST` | `/bff/dsl/validate` | `DEVELOPER_PARTNER` | Check basic DSL code syntax |
| `POST` | `/bff/dsl/validate-hospital` | `DEVELOPER_PARTNER` | Validate schema + view files using ANTLR CLI |
| `POST` | `/bff/dsl/generate` | `DEVELOPER_PARTNER` | Generate and download full-stack package zip |
| `POST` | `/bff/dsl/sandbox/run` | `DEVELOPER_PARTNER` | Dry-run code in isolated environment |
| `GET` | `/bff/status/stream` | *Public* | Connect to SSE stream for submission status |
| `GET` | `/bff/tickets` | `DEVELOPER_PARTNER` | Fetch all support tickets |
| `POST` | `/bff/tickets/{id}/claim` | `DEVELOPER_PARTNER` | Claim support ticket |
| `GET` | `/bff/wrapper/modules/apis` | `DEVELOPER_PARTNER` | Fetch list of SaaS endpoints for Explorer |

---

## Troubleshooting

* **Issue: Frontend fails to retrieve submissions list (404 Error)**
  * *Reason*: The endpoint `/bff/developer/submissions` was previously missing from the Spring Boot controllers.
  * *Solution*: Make sure `DeveloperController.java` is updated and has the `@GetMapping("/submissions")` method mappings compiled.

* **Issue: Monaco editor shows error markers out-of-bounds**
  * *Reason*: Syntax warnings returning columns or line numbers exceeding code length.
  * *Solution*: The `DslStudio.tsx` component bounds column and line metrics. Ensure dependency packages are updated.

* **Issue: "giolitlabs" role authentication fails on Postgres**
  * *Reason*: Port or password mismatch in the configuration profiles.
  * *Solution*: Verify `devportal/.env` matches `devportal/bff/src/main/resources/application-postgres.yml`.
