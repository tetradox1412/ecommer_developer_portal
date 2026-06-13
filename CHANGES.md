# Developer Portal & Marketplace - Revamp Changes

## Completed Work & Revamp Checklist

All tasks in the frontend revamp have been successfully executed and audited:

### 1. Unified Design System & Typography
*   **Fonts**: Configured `Outfit` for body/display sans-serif text and `JetBrains Mono` for code, logs, and monospaced components in `index.css`.
*   **Palette**: Standardized on the cool neutral `zinc-*` Tailwind colors globally. Removed all `slate-*` occurrences.
*   **Accent Color**: Normalized electric cyan (`#00f0ff` / `cyan-accent`) as the primary highlight color with subtle glow styling.
*   **Decorative Line Art**: Integrated animated geometric line art (`ThinkingFigure`, `NeuralArt`, `SignalWaves`, and `WalkingFigures`) across the landing login screens, developer dashboard header, simulation portal, and marketplace header.
*   **Line Art Scaling**: Fixed the SVG `viewBox` in `LineArt.tsx` of the `ThinkingFigure` to prevent Y-coordinate clipping at the top.

### 2. Component Auditing & Accessibility (WCAG AA)
*   **Form Inputs**: Checked focus rings and border states in `FormField.tsx`. Inputs use a custom border-zinc transition and a clear electric-cyan focus ring shadow.
*   **Buttons**: Declared explicit HTML `type="button"` attributes on non-submitting elements (e.g. Google Sign-In buttons in `Login.tsx` and custom Subscribe buttons in `ModuleDetail.tsx`) to avoid default submit events in forms.
*   **Loading & Empty States**: Implemented animated card skeleton skeletons in `TicketInbox.tsx` and unified `Archive`/`Package` empty state indicators on filtered tables and module listings.

### 3. Routing Revisions (Dynamic Resolver)
*   **Conflict Resolution**: Created dynamic resolvers (`MarketplaceResolver` and `ModuleDetailResolver` in `App.tsx`) to route `/marketplace` based on the user's role. This avoids the route redirect collision where a customer trying to access a developer-owned marketplace route was trapped in a redirection loop.
*   **Improved Catch-All**: The wildcard `*` route now queries the auth store state:
    *   Unauthenticated → `/login`
    *   Authenticated `CUSTOMER` → `/marketplace`
    *   Authenticated `DEVELOPER_PARTNER` → `/` (Submission Portal)

### 4. Technical Telemetry (SSE & Mocking)
*   **Sandbox Toggles**: Supported the `VITE_USE_MOCK_SANDBOX` toggle indicator in `SandboxDashboard.tsx`.
*   **SSE Log Telemetry**: Ensured that the compiler log stream reconnects gracefully on timeouts, utilizing a memoized SSE callback to suppress redundant connection updates.

### 5. Latest UI/UX Polish & Interactive Features
*   **Branding & Title Text**: Added the missing "Developer Portal" title adjacent to the logo in the sidebar (`App.tsx`) and login screens (`Login.tsx`). Increased the logo height from `h-6`/`h-7` to `h-10`/`h-12` for better visibility.
*   **Typography & Spacing Adjustments**: Updated the steps pipeline numbers above the verification pipeline in `SubmissionPortal.tsx` to use `font-sans` (`Outfit` font family) and added clean padding/margin constraints to fix vertical spacing inside the step cards.
*   **Interactive Profile Management**: Integrated a profile editor modal in `App.tsx` that triggers when clicking the user footer at the bottom of the sidebar. This allows developers to modify their username and email, which updates the Zustand store and persists the changes directly back into the mock JWT payload in `localStorage`.
*   **Copyright Details**: Updated the company copy to read `2026 Giolit Labs Inc.` across all credentials screens.
*   **Monotone Logo Aspect Ratio**: Adjusted `process_logo.py` to process and save the full uncropped image for `logo-color.png`, `logo-dark.png` (white on transparent), and `logo-light.png` (black on transparent), preserving original aspect ratios, while retaining a cropped square layout only for `favicon.png`. Styled the logos inside headers and sidebars with `w-auto` to scale correctly without distortion.
*   **Empty Space Layout Fix**: Changed the flex direction justification of the Automated Verification Pipeline cards in `SubmissionPortal.tsx` from `justify-between` to `justify-start`. This allows the header, step cards, and the DSL reference block to stack naturally without generating an excessively large blank space in the middle of the container.
