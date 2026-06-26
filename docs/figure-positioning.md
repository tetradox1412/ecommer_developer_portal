# Stick Figure Positioning Guide

## Visual Layout Reference

This document shows the exact positioning of all animated line art figures across different pages.

---

## Page Layouts

### 1. Submission Portal (`/`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  SignalWaves (bottom, full width)                         │
│  ═══════════════════════════════════════════════════      │
│                                                            │
│  [Title]                              CollaboratingFigure │
│  Module Submission Portal               (right-52, top)   │
│  Deploy, validate, and orchestrate        [figure]        │
│  custom extensions...                                      │
│                                            PresentingFigure│
│                                          (right-16, top)   │
│                                               [figure]     │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                                 │
     │ No overlap                      │ Figures on right
     ▼                                 ▼
  [Text Content]              [Animated Figures]
```

**Implementation**:
- `SignalWaves`: `absolute bottom-0 left-10 right-0 h-16`
- `PresentingFigure`: `absolute right-16 top-0 w-24 h-full hidden md:block`
- `CollaboratingFigure`: `absolute right-52 top-0 w-20 h-full hidden lg:block`
- Title: No left padding, positioned naturally

**Opacity**: 0.35 (darker than before)

---

### 2. API Explorer (`/api-explorer`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  [Title]                                  ReviewingFigure  │
│  API Explorer                               (right-0, top) │
│  Browse, inspect schemas, and                 [figure]     │
│  verify integration points...                              │
│                                                            │
│  [Search Bar]                                              │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                                 │
     │ Clear separation                │ Figure on right edge
     ▼                                 ▼
  [Content]                      [Reviewing Animation]
```

**Implementation**:
- `ReviewingFigure`: `absolute right-0 top-0 h-full w-20 hidden md:block`
- Title/Search: No left padding

**Opacity**: 0.35

---

### 3. Ticket Inbox (`/tickets`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  [Title]                                  ReviewingFigure  │
│  Support Tickets                            (right-16, top)│
│  Review and manage developer                  [figure]     │
│  tickets...                                                │
│                                                            │
│  [Tab Controls: All | Open | Mine]                         │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                                 │
     │ No interference                 │ Figure watching
     ▼                                 ▼
  [Ticket List]                  [Animated Clipboard]
```

**Implementation**:
- `ReviewingFigure`: `absolute right-16 top-0 h-full w-20 hidden md:block`
- Title: No left padding

**Opacity**: 0.35

---

### 4. DSL Playground (`/playground`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  [Title]                                    CodingFigure   │
│  DSL Playground                              (right-16)    │
│  Write, validate, and dry-run                 [figure]     │
│  your module DSL...                        (at computer)   │
│                                                            │
│  [Run Sandbox Button]                                      │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                                 │
     │ Editor area clear               │ Coding animation
     ▼                                 ▼
  [Monaco Editor]              [Typing/Error reactions]
```

**Implementation**:
- `CodingFigure`: `absolute right-16 top-0 h-full w-28 hidden lg:block`
- Title: No left padding
- **Reactive**: Changes based on `isTyping` and `hasError` states

**Opacity**: 0.35

---

### 5. Manifest Builder (`/manifest`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  [Title]                             CollaboratingFigure   │
│  Manifest Builder                         (right-16, top)  │
│  Generate production-ready XML              [figure]       │
│  deployment manifests...                 (two figures)     │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                                 │
     │ Form + Graph visible            │ Collaboration visual
     ▼                                 ▼
  [Form & Graph]                [Two Figures Working]
```

**Implementation**:
- `CollaboratingFigure`: `absolute right-16 top-0 h-full w-20 hidden lg:block`
- Title: No left padding
- **Reactive**: More animated when `validationErrors.length > 0`

**Opacity**: 0.35

---

### 6. Sandbox Monitor (`/sandbox`)

```
┌────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                            │
│                                                            │
│  DeployingFigure          [Title]              NeuralArt   │
│   (left-0, top)      Sandbox Monitor          (right-0)    │
│     [figure]         Real-time resource          [art]     │
│  (deploying box)     graphs, thread                        │
│                      telemetry...                          │
│                                                            │
│  ──────────────────────────────────────────────────────   │
└────────────────────────────────────────────────────────────┘
     │                     │                   │
     │ Left placement      │ Center title      │ Right art
     ▼                     ▼                   ▼
  [Deployment]        [Content]          [Neural Network]
```

**Implementation**:
- `DeployingFigure`: `absolute left-0 top-0 h-full w-20 hidden lg:block`
- `NeuralArt`: `absolute right-0 top-0 h-full w-60`
- Title: Naturally positioned in center

**Note**: DeployingFigure stays on left because it doesn't overlap with text.

**Opacity**: 0.35 (DeployingFigure), 0.3 (NeuralArt)

---

## Responsive Behavior

### Mobile (< 768px)
```
┌────────────────────┐
│   PAGE HEADER      │
│                    │
│   [Title]          │
│   Description      │
│                    │
│   ────────────     │
│                    │
│   [Content]        │
│                    │
└────────────────────┘

❌ Figures hidden
✅ Full width content
✅ No overlap issues
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────┐
│     PAGE HEADER              │
│                              │
│  [Title]           [Figure]  │
│  Description         (md)    │
│                              │
│  ──────────────────────      │
│                              │
│  [Content]                   │
│                              │
└──────────────────────────────┘

✅ Figures appear (hidden md:block)
✅ Positioned on right
✅ Smaller size
```

### Desktop (> 1024px)
```
┌────────────────────────────────────────┐
│        PAGE HEADER                     │
│                                        │
│  [Title]              [Fig2]  [Fig1]   │
│  Description           (lg)    (md)    │
│                                        │
│  ─────────────────────────────────     │
│                                        │
│  [Content - Full Width]                │
│                                        │
└────────────────────────────────────────┘

✅ Multiple figures visible
✅ Larger size figures
✅ Maximum visual appeal
```

---

## Figure States & Reactions

### CodingFigure (DSL Playground)
```
State: isTyping = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Cursor   │ ← Blinks faster
│    blinks   │
│  • Head     │ ← Leans forward
│    leans    │
│  • Fingers  │ ← Tap on keyboard
│    tap      │
└─────────────┘

State: hasError = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Figure   │ ← Slumps back
│    slumps   │
│  • Screen   │ ← Red flash
│    flashes  │
└─────────────┘
```

### PresentingFigure (Submission Portal)
```
State: isActive = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Arm      │ ← Points actively
│    gestures │
│  • Board    │ ← Pulses
│    pulses   │
│  • Leans    │ ← Forward stance
│    forward  │
└─────────────┘

State: isDone = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Arm      │ ← Lowers
│    lowers   │
│  • Relaxed  │ ← Calm pose
│    pose     │
└─────────────┘
```

### ReviewingFigure (API Explorer / Tickets)
```
State: isReviewing = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Clipboard│ ← Pulses
│    pulses   │
│  • Figure   │ ← Leans in
│    leans    │
│  • Glasses  │ ← Visible
│    on       │
└─────────────┘

State: isComplete = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Checkmark│ ← Appears
│    shows    │
│  • Figure   │ ← Straightens
│    relaxes  │
└─────────────┘
```

### DeployingFigure (Sandbox Monitor)
```
State: isDeploying = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Box      │ ← Moves up/down
│    moves    │
│  • Arrow    │ ← Animated
│    pulses   │
│  • Figure   │ ← Active
│    animated │
└─────────────┘

State: isDone = true
┌─────────────┐
│   [Figure]  │
│             │
│  • Checkmark│ ← On box
│    appears  │
│  • Figure   │ ← Stops moving
│    stops    │
└─────────────┘
```

---

## CSS Classes Used

### Positioning
```css
/* Absolute positioning within relative parent */
.absolute

/* Positioning variants */
.left-0    /* Far left edge */
.left-16   /* 4rem from left */
.right-0   /* Far right edge */
.right-16  /* 4rem from right */
.right-52  /* 13rem from right */

/* Vertical */
.top-0     /* Top edge */
.bottom-0  /* Bottom edge */

/* Sizing */
.w-20      /* 5rem width */
.w-24      /* 6rem width */
.w-28      /* 7rem width */
.w-60      /* 15rem width */
.h-full    /* 100% height */
.h-16      /* 4rem height */

/* Responsive visibility */
.hidden           /* Hide by default */
.md:block         /* Show on medium+ screens */
.lg:block         /* Show on large+ screens */

/* Prevent interaction */
.pointer-events-none
.select-none
```

### Colors (TailwindCSS)
```css
/* Light mode */
.text-zinc-300    /* Light figure color */

/* Dark mode */
.dark:text-zinc-700    /* Dark figure color */

/* Opacity */
opacity={0.35}    /* Inline style for figures */
opacity={0.3}     /* Slightly more transparent */
```

---

## Testing Checklist

### ✅ Visual Verification Steps

For each page, verify:

1. **Position**
   - [ ] Figure is on the right side (not left)
   - [ ] Figure doesn't overlap with title text
   - [ ] Figure doesn't overlap with buttons
   - [ ] Figure doesn't cover any interactive elements

2. **Visibility**
   - [ ] Figure is darker than before (more visible)
   - [ ] Figure is visible on medium+ screens
   - [ ] Figure is hidden on mobile devices
   - [ ] Opacity is approximately 0.3-0.35

3. **Animation**
   - [ ] Figure animates smoothly
   - [ ] Breathing animation works (chest expansion)
   - [ ] State-based animations trigger correctly
   - [ ] No animation delay on page load

4. **Responsive**
   - [ ] Mobile: No figures shown
   - [ ] Tablet: Figures appear on right
   - [ ] Desktop: All figures visible
   - [ ] No layout shift when figures load

---

## Before vs After

### Before (Example: Submission Portal)
```
┌────────────────────────────────────────┐
│  [Figure]                              │
│   (left)                               │
│      ╱───────────────────────╲        │
│      │                        │        │
│      │  [Title with padding]  │        │
│      │  Module Submission...  │        │
│      │  ← Had padding left    │        │
│      ╲───────────────────────╱        │
│                                        │
│  Problem: Overlap + wasted space       │
└────────────────────────────────────────┘
```

### After (Example: Submission Portal)
```
┌────────────────────────────────────────┐
│                                        │
│  [Title - Full Width]        [Figure] │
│  Module Submission Portal     (right) │
│  No padding needed!            ╱───╲  │
│                               │     │  │
│  Content has more room         ╲───╱  │
│                                        │
│  ✅ Clean layout, no overlap           │
└────────────────────────────────────────┘
```

---

## Quick Reference Table

| Page               | Figure(s)                  | Position      | Opacity | Responsive |
|--------------------|----------------------------|---------------|---------|------------|
| Submission Portal  | PresentingFigure          | right-16      | 0.35    | md:block   |
|                    | CollaboratingFigure       | right-52      | 0.35    | lg:block   |
|                    | SignalWaves               | bottom, full  | 0.35    | Always     |
| API Explorer       | ReviewingFigure           | right-0       | 0.35    | md:block   |
| Ticket Inbox       | ReviewingFigure           | right-16      | 0.35    | md:block   |
| DSL Playground     | CodingFigure              | right-16      | 0.35    | lg:block   |
| Manifest Builder   | CollaboratingFigure       | right-16      | 0.35    | lg:block   |
| Sandbox Monitor    | DeployingFigure           | left-0        | 0.35    | lg:block   |
|                    | NeuralArt                 | right-0       | 0.3     | Always     |

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Purpose**: Visual positioning guide for stick figure aesthetics
