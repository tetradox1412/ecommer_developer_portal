import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-cyan-accent dark:text-zinc-950 dark:hover:bg-cyan-100 border border-zinc-900/10 dark:border-cyan-accent/20 focus-visible:ring-zinc-500 dark:focus-visible:ring-cyan-accent shadow-sm',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/85 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500',
  outline: 'bg-transparent text-zinc-700 border border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800/50 dark:hover:text-white focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-zinc-950 dark:hover:bg-red-400 border border-red-700/20 dark:border-red-500/20 focus-visible:ring-red-500',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md',
  md: 'px-5 py-2.5 text-sm font-semibold tracking-wide rounded-lg',
  lg: 'px-6 py-3.5 text-base font-semibold tracking-wide rounded-xl',
};

export function Button({ variant = 'primary', size = 'md', isLoading = false, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] motion-safe:active:translate-y-[1px] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="w-4 h-4 animate-spin text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}
