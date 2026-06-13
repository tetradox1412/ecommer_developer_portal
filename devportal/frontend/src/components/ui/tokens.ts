export const STATUS_COLORS = {
  ACTIVE:      { bg: 'bg-green-100',   text: 'text-green-800',   dot: 'bg-green-500'   },
  INACTIVE:    { bg: 'bg-gray-100',    text: 'text-gray-600',    dot: 'bg-gray-400'    },
  COMPILING:   { bg: 'bg-amber-100',   text: 'text-amber-800',   dot: 'bg-amber-500'   },
  ERROR:       { bg: 'bg-red-100',     text: 'text-red-800',     dot: 'bg-red-500'     },
  PENDING:     { bg: 'bg-blue-100',    text: 'text-blue-800',    dot: 'bg-blue-500'    },
  IN_PROGRESS: { bg: 'bg-purple-100',  text: 'text-purple-800',  dot: 'bg-purple-500'  },
  OPEN:        { bg: 'bg-sky-100',     text: 'text-sky-800',     dot: 'bg-sky-500'     },
  CLAIMED:     { bg: 'bg-indigo-100',  text: 'text-indigo-800',  dot: 'bg-indigo-500'  },
  SUBMITTED:   { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
} as const;

export type ModuleStatus = keyof typeof STATUS_COLORS;