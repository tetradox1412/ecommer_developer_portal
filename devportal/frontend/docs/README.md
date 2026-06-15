# Developer Portal - Quick Start Guide

## 🚀 Project Overview

A comprehensive web application for managing eCommerce developer modules, APIs, and workflows. Built with React 18, TypeScript, and modern web technologies.

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Pages](#available-pages)
- [Key Components](#key-components)
- [Documentation](#documentation)
- [Development Workflow](#development-workflow)

---

## ✨ Features

### Core Functionality
- **Module Submission Portal**: Submit, compile, and deploy custom DSL modules
- **API Explorer**: Browse and test all registered module endpoints
- **Ticket Inbox**: Manage support tickets with claim functionality
- **DSL Playground**: Interactive code editor with real-time validation
- **Manifest Builder**: Visual dependency graph and XML generation
- **Sandbox Monitor**: Real-time resource monitoring with CPU/memory metrics

### Technical Features
- 🎨 Dark/Light theme with persistence
- 🔐 JWT-based authentication
- 📡 Real-time updates via Server-Sent Events (SSE)
- 💾 Zustand state management
- 🎭 Animated line art aesthetics that react to app state
- 📱 Fully responsive design
- ⚡ Fast build times with Vite

---

## 🛠 Technology Stack

### Frontend
```
React 18.3         - UI Library
TypeScript 5.x     - Type Safety
Vite 5.x           - Build Tool
React Router v6    - Routing
Zustand            - State Management
TailwindCSS        - Styling
Axios              - HTTP Client
Monaco Editor      - Code Editor
React Flow         - Graph Visualization
Phosphor Icons     - Icon Library
```

### Backend (BFF)
```
Spring Boot 3.x    - REST API
PostgreSQL         - Database
Docker             - Sandboxing
SSE                - Real-time Streaming
```

---

## 🚦 Getting Started

### Prerequisites
```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd devportal/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK_SANDBOX=true
```

### Default Login Credentials

```
Email: dev@giolit.com
Password: password
Role: DEVELOPER_PARTNER
```

---

## 📁 Project Structure

```
devportal/frontend/
├── docs/                          # 📚 Documentation
│   ├── dsl-syntax-reference.md    # DSL language guide
│   ├── takeover-architecture.md   # Complete architecture
│   ├── function-reference.md      # API & function docs
│   └── README.md                  # This file
│
├── src/
│   ├── api/                       # 🌐 API Layer
│   │   └── bff.ts                 # Backend client
│   │
│   ├── components/                # 🧩 Reusable Components
│   │   ├── auth/                  # Authentication guards
│   │   ├── modules/               # Module/ticket cards
│   │   └── ui/                    # UI components & line art
│   │
│   ├── hooks/                     # 🪝 Custom Hooks
│   │   └── useStatusStream.ts     # SSE streaming hook
│   │
│   ├── screens/                   # 📄 Pages
│   │   ├── api-explorer/          # API documentation viewer
│   │   ├── auth/                  # Login page
│   │   ├── manifest/              # Manifest builder
│   │   ├── playground/            # DSL playground
│   │   ├── sandbox/               # Resource monitor
│   │   ├── submission/            # Module submission
│   │   └── ticket-inbox/          # Ticket management
│   │
│   ├── store/                     # 📦 State Management
│   │   ├── authStore.ts           # Authentication
│   │   ├── submissionStore.ts     # Submissions
│   │   └── ticketStore.ts         # Tickets
│   │
│   ├── types/                     # 📝 TypeScript Types
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🗺 Available Pages

### 1. Submission Portal (`/`)
Submit and manage custom modules with real-time compilation feedback.

**Key Features:**
- Form-based module submission
- Real-time SSE status updates
- Module status cards
- Pipeline visualization

### 2. API Explorer (`/api-explorer`)
Browse all registered API endpoints with schema documentation.

**Key Features:**
- Endpoint listing by module
- Request/response schemas
- JSON syntax highlighting
- Search and filter

### 3. Ticket Inbox (`/tickets`)
Manage support tickets with filtering and claim functionality.

**Key Features:**
- Tab filtering (All/Open/Mine)
- Claim tickets
- Priority badges
- Status tracking

### 4. DSL Playground (`/playground`)
Interactive code editor for testing DSL syntax.

**Key Features:**
- Monaco code editor
- Real-time validation
- Sandbox execution
- Error highlighting

### 5. Manifest Builder (`/manifest`)
Generate deployment manifests with visual dependency graphs.

**Key Features:**
- Form-based input
- React Flow graph
- Real-time XML generation
- Validation errors

### 6. Sandbox Monitor (`/sandbox`)
Monitor sandbox instances and resource usage.

**Key Features:**
- CPU/memory sparklines
- Instance controls
- Real-time logs
- Log filtering

---

## 🎨 Key Components

### Line Art Figures

Animated SVG figures that react to application state:

```tsx
import { CodingFigure } from './components/ui/LineArt';

<CodingFigure 
  opacity={0.35} 
  isTyping={isTyping} 
  hasError={hasError} 
/>
```

**Available Figures:**
- `ThinkingFigure` - Reacts to validation
- `CodingFigure` - Reacts to typing/errors
- `PresentingFigure` - Gestures during actions
- `ReviewingFigure` - Figure with clipboard
- `DeployingFigure` - Deployment animations
- `CollaboratingFigure` - Two figures working
- `NeuralArt` - Network visualization
- `WalkingFigures` - Walking animations
- `SignalWaves` - Wave patterns
- `DataParticles` - Particle field

### Authentication Guards

```tsx
import { RequireAuth, RequireRole } from './components/auth/AuthGuards';

<Route element={<RequireAuth />}>
  <Route element={<RequireRole allowedRoles={['DEVELOPER_PARTNER']} />}>
    <Route path="/" element={<SubmissionPortal />} />
  </Route>
</Route>
```

### Theme Provider

```tsx
import { useTheme } from './components/ui/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

---

## 📚 Documentation

Comprehensive documentation available in `/docs`:

1. **DSL Syntax Reference** (`dsl-syntax-reference.md`)
   - Complete DSL language guide
   - Syntax examples
   - Validation rules
   - Best practices

2. **Architecture Documentation** (`takeover-architecture.md`)
   - System architecture
   - Data flow diagrams
   - Component hierarchy
   - Integration points
   - Deployment pipeline

3. **Function Reference** (`function-reference.md`)
   - API functions
   - Store actions
   - Custom hooks
   - Component props
   - Testing examples

---

## 🔧 Development Workflow

### Running Locally

```bash
# Start development server (hot reload enabled)
npm run dev

# Access at http://localhost:5173
```

### Building

```bash
# Type check
npm run build

# Output: dist/ directory
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking
tsc --noEmit
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

## 🌊 Data Flow Example

### Module Submission Flow

```
User Form
    ↓
Validation
    ↓
API Call → Backend → Compiler → AST → Code Gen
    ↓                                      ↓
SSE Stream ←───────────── Status Updates ←──┘
    ↓
Real-time UI Updates
```

### Authentication Flow

```
Login Form
    ↓
API Call → Backend Validation
    ↓
JWT Token ← Response
    ↓
Store in localStorage
    ↓
Update Auth Store
    ↓
Protected Routes Accessible
```

---

## 🎯 Key Store Actions

### Authentication

```typescript
import { useAuthStore } from './store/authStore';

const { login, logout, user, isAuthenticated } = useAuthStore();

// Login
await login('dev@giolit.com', 'password');

// Logout
logout();
```

### Submissions

```typescript
import { useSubmissionStore } from './store/submissionStore';

const { submissions, submitDsl, fetchSubmissions } = useSubmissionStore();

// Fetch submissions
await fetchSubmissions();

// Submit new module
const submissionId = await submitDsl({
  moduleName: 'my-module',
  version: '1.0.0',
  dslCode: 'module my-module { ... }',
  manifestXml: '<manifest>...</manifest>'
});
```

### Tickets

```typescript
import { useTicketStore } from './store/ticketStore';

const { tickets, fetchTickets, claimTicket } = useTicketStore();

// Fetch tickets
await fetchTickets();

// Claim ticket
await claimTicket('ticket-123');
```

---

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/login
```

### Submissions
```
GET  /api/submissions
POST /api/submissions
GET  /api/status/stream/{id}  (SSE)
```

### Tickets
```
GET  /api/tickets
POST /api/tickets/{id}/claim
```

### Modules
```
GET  /api/modules/apis
```

### Validation
```
POST /api/validate
POST /api/sandbox/run
```

---

## 🚨 Common Issues & Solutions

### Issue: Build fails with type errors
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: SSE connection fails
**Solution**: Check `VITE_API_BASE_URL` in `.env` file

### Issue: Dark mode not persisting
**Solution**: Check browser localStorage permissions

### Issue: Routes showing 404
**Solution**: Ensure authentication state is valid, check JWT token

### Issue: Module submission stuck at "COMPILING"
**Solution**: Check backend logs, verify manifest XML is valid

---

## 📊 Performance Tips

1. **Code Splitting**: Routes are already lazy-loaded
2. **Debouncing**: Validation inputs debounced at 500ms
3. **Memoization**: Use `useMemo` for expensive calculations
4. **SSE Cleanup**: Connections auto-close on unmount
5. **Image Optimization**: Use WebP format for assets

---

## 🔐 Security Features

- JWT token-based authentication
- Role-based access control (RBAC)
- XSS protection via React
- CSRF protection via tokens
- Input validation (frontend + backend)
- Secure HTTP-only cookies (production)

---

## 🎨 Design System

### Colors
```css
Primary: Zinc (50-950)
Accent: Cyan (#00f0ff)
Success: Green (emerald-500)
Warning: Amber (amber-500)
Error: Red (red-500)
```

### Typography
```css
Font Family: Inter (sans-serif)
Font Sizes: text-xs to text-4xl
Font Weights: normal, medium, semibold, bold
```

### Spacing
```css
Padding: p-1 to p-12
Margin: m-1 to m-12
Gap: gap-1 to gap-12
```

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Output optimized for:
- Modern browsers (ES2020+)
- Tree-shaking enabled
- Minified CSS/JS
- Gzip compression

### Deployment Targets

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3 + CloudFront**: Upload `dist/` folder
- **Docker**: Build container with nginx

---

## 📝 DSL Quick Reference

```dsl
module my-module {
  version "1.0.0"
  
  route POST "/endpoint" {
    handler "my-handler"
    role "DEVELOPER_PARTNER"
    timeout 15s
    
    request_schema {
      field: type
    }
    
    response_schema {
      result: type
    }
  }
}
```

See full documentation in `docs/dsl-syntax-reference.md`

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request
5. Wait for review

---

## 📞 Support

- **Documentation**: Check `/docs` directory
- **Issues**: GitHub Issues
- **Email**: dev-platform@giolit.com

---

## 📜 License

Copyright © 2024 Giolit Labs. All rights reserved.

---

## 🎉 Quick Wins

After cloning, you can immediately:
1. ✅ Run `npm install && npm run dev`
2. ✅ Login with default credentials
3. ✅ Submit a test module
4. ✅ Explore APIs in API Explorer
5. ✅ Test DSL code in Playground
6. ✅ Monitor sandboxes in real-time

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Built with ❤️ by the Developer Platform Team**
