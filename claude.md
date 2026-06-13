# Developer Portal - Implementation Tasks

## Phase 1: Environment & Foundation
- [x] Create `claude.md` to track progress.
- [x] Update root `.gitignore` to include `.agents`, `.env.local`, etc.
- [x] Add `.env` file with `VITE_USE_MOCK_SANDBOX=true`.
- [x] Process `GIOLIT_logo_upscaled_4x.png` into cropped monochrome variants.
- [x] Replace Vite favicon and update `index.html` title/icons.

## Phase 2: Frontend Subagents Execution
- [x] `dev_frontend_shell`: Global layout, Theme switcher, Sidebar, Header, Typography.
- [x] `dev_frontend_marketplace`: Customer Dashboard (Marketplace, Module Detail, My Subscriptions).
- [x] `dev_frontend_developer`: Developer Console (DSL Playground, Manifest Builder, API Explorer).
- [x] `dev_frontend_sandbox`: ERP Simulation Portal & Sandbox Dashboard (with mock env toggle).
- [x] `dev_frontend_auth`: Google Login authentication flow and Route Protection.

## Phase 3: QA & Judging Subagents
- [x] `judge_visual_design`: Typography, spacing, and anti-slop rules compliance.
- [x] `judge_ux_accessibility`: WCAG AA contrast, empty/loading states, keyboard focus.
- [x] `judge_functional_integrity`: Auth flows, sandbox mock toggle, routing.

## Phase 4: Documentation
- [x] `usage_guide.md`: Plain English guide for customers and developers.
- [x] `backend_guide.md`: Technical reference for BFF architecture.
