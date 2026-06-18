export const STATUS_COLORS = {
  ACTIVE: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200/50 dark:border-emerald-800/30',
    text: 'text-emerald-800 dark:text-emerald-400',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
  INACTIVE: {
    bg: 'bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50',
    text: 'text-zinc-600 dark:text-zinc-400',
    dot: 'bg-zinc-400 dark:bg-zinc-500',
  },
  COMPILING: {
    bg: 'bg-amber-50 dark:bg-amber-950/35 border border-amber-200/50 dark:border-amber-800/30',
    text: 'text-amber-800 dark:text-amber-400',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  ERROR: {
    bg: 'bg-red-50 dark:bg-red-950/35 border border-red-200/50 dark:border-red-800/30',
    text: 'text-red-800 dark:text-red-400',
    dot: 'bg-red-500 dark:bg-red-400',
  },
  PENDING: {
    bg: 'bg-sky-50 dark:bg-sky-950/35 border border-sky-200/50 dark:border-sky-800/30',
    text: 'text-sky-800 dark:text-sky-400',
    dot: 'bg-sky-500 dark:bg-sky-400',
  },
  IN_PROGRESS: {
    bg: 'bg-purple-50 dark:bg-purple-950/35 border border-purple-200/50 dark:border-purple-800/30',
    text: 'text-purple-800 dark:text-purple-400',
    dot: 'bg-purple-500 dark:bg-purple-400',
  },
  OPEN: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/35 border border-cyan-200/50 dark:border-cyan-800/30',
    text: 'text-cyan-800 dark:text-cyan-400',
    dot: 'bg-cyan-500 dark:bg-cyan-400',
  },
  CLAIMED: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/35 border border-indigo-200/50 dark:border-indigo-800/30',
    text: 'text-indigo-800 dark:text-indigo-400',
    dot: 'bg-indigo-500 dark:bg-indigo-400',
  },
  SUBMITTED: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200/50 dark:border-emerald-800/30',
    text: 'text-emerald-800 dark:text-emerald-400',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
} as const;

export type ModuleStatus = keyof typeof STATUS_COLORS;