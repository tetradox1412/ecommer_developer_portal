# Developer Portal Handover & Transition Guide

This document provides a comprehensive handover of the Developer Portal application, detailing the architecture, codebase, flows, and recent improvements for incoming developers.

---

## 🏗️ Architecture Overview

The Developer Portal is a federated management system split into three main components:
1. **Frontend (SPA)**: Built with React, Vite, TypeScript, and TailwindCSS.
2. **Backend (BFF)**: Spring Boot Java microservice acting as a Backend-For-Frontend gateway.
3. **DSL Compiler (Node CLI)**: The semantic validation and code-generation engine that builds full-stack projects out of schema files.

```
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  React Frontend  │ ────────> │ Spring Boot BFF  │ ────────> │   PostgreSQL DB  │
│  (Port 5173)     │ <──────── │ (Port 8084)      │ <──────── │   (Port 5432)    │
└──────────────────┘           └──────────────────┘           └──────────────────┘
                                         │
                                         ▼
                               ┌──────────────────┐
                               │  DSL Compiler    │ (Node CLI in Hospital-DSL-...)
                               │  (Validates AST) │
                               └──────────────────┘
```

---

## 🚦 Quick Start (Start-All Script)

A unified startup script is available in the project root to run both services and set up databases automatically.

```bash
# Run the startup script
./start-all.sh
```

### What `start-all.sh` Does:
1. **Database Setup**: Inspects local PostgreSQL and automatically creates the role `giolitlabs` (password `giolit`), the database `devportal`, and assigns proper ownership.
2. **Spring Boot BFF**: Starts the backend on **[http://localhost:8084](http://localhost:8084)**. DevTools are enabled for hot-swapping changes.
3. **Vite Frontend**: Installs node packages (if `node_modules` is absent) and starts the development server on **[http://localhost:5173](http://localhost:5173)**.
4. **Clean Exit**: Traps the `EXIT` signal. Pressing `Ctrl+C` in the terminal terminates all background tasks cleanly.

---

## 🔑 Authentication & Users

Authentication uses JWT tokens stored in browser `localStorage`.
- **API Endpoint**: `/bff/auth/login` (returns JWT token and User Info).
- **Default Database Seeds** (configured in [schema.sql](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/resources/schema.sql)):
  * **Admin Account**: `admin` / `admin`
  * **Developer Account**: `dev@devportal.com` / `password123` (Note: linked password matches `$2a$10$vQ6Mox8...`)

---

## 🗺️ Key Application Flows

### 1. DSL Validation Flow
* **Path**: `/dsl-studio` on frontend.
* The Monaco editor captures text. Inputs are debounced by `800ms` and sent to the BFF `/bff/dsl/validate-hospital`.
* The BFF writes temporary `.schema` and `.views` files, then invokes the Node CLI (`node cli.js validate <temp_prefix>`).
* The CLI output (ANTLR errors or Semantic warnings) is parsed by [DslController.java](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/java/com/devportal/bff/controller/DslController.java) and returned to the frontend.
* Monaco applies squiggly markers onto the editor text dynamically.

### 2. Module Submission Pipeline Flow
* **Path**: `/` (Submission Portal) on frontend.
* Submitting a module issues a POST request to `/bff/dsl/submit`.
* The backend generates a database record in the `submissions` table (status: `PENDING`) and starts an asynchronous simulation.
* The frontend subscribes to real-time events using Server-Sent Events (SSE) via the [useStatusStream](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/frontend/src/hooks/useStatusStream.ts) hook connected to `/bff/status/stream/{submissionId}`.
* The pipeline transitions from `PENDING` -> `COMPILING` -> `ACTIVE` (or `ERROR`), feeding logs directly to the visual pipeline cards.

### 3. Manifest Validation Flow
* **Path**: `/manifest` on frontend.
* Manifest validation is handled entirely client-side inside [ManifestBuilder.tsx](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/frontend/src/screens/manifest/ManifestBuilder.tsx) to provide instantaneous feedback.
* It parses SemVer syntax, context paths (compares `/api/[vendor]/[name]` structures), and route variables to surface diagnostics.

---

## 🛠️ Codebase Modifications & Handover Notes

For compliance and maintenance, keep in mind the following modifications that were introduced:

### Backend Gateways:
* **Dynamic Compiler Resolution**: Replaced the hardcoded Windows absolute path (`C:/Mridul Joy/...`) in [DslEngineService.java](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/java/com/devportal/bff/service/DslEngineService.java) with a search strategy using `System.getProperty("user.dir")` to resolve the CLI directory (`Hospital-DSL-.../v1/`) on any OS platform.

### Frontend Shell & UX:
* **Default Developer Scope**: Removed the Customer switcher tab in [Login.tsx](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/frontend/src/screens/auth/Login.tsx) to default console logins specifically to the `DEVELOPER_PARTNER` role.
* **Pinned Sidebar Navigation**: Changed the `App.tsx` sidebar toggle mechanism to prevent desktop navigation clicks from collapsing the menu layout. Collapsing only triggers on screens smaller than `1024px`.
* **Safe Monaco Markers**: Modified Monaco compiler validation markers in [DslStudio.tsx](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/frontend/src/screens/playground/DslStudio.tsx) to bound/clamp line-count offsets. Out-of-bounds error markers will not crash the component.
* **Diagnostics Focus Switcher**: Clicking compilation errors in the console log section will now programmatically shift tabs to `schema` and snap focus to the exact line of error in Monaco.
* **Sandbox Monitor**: Temporarily disabled in the sidebar navigation per current requirements.

---

## 🎨 Premium Design System Updates

* **XML Highlighter**: Manifest XML preview has been equipped with a colorized regular-expression regex parser highlighting tags and properties.
* **Ambient Glows**: Added floating radial blur circles behind the layouts for a premium glassmorphic appearance.
* **Interactive Diagnostics**: Replaced generic alerts in the Manifest diagnostics tab with custom status boxes. When a manifest is valid, it displays a success checklist card.
* **Icon Library**: Generic emojis in console logs and info components were fully migrated to clean `@phosphor-icons/react` vector nodes.
