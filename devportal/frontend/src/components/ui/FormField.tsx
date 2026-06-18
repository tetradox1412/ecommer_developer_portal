import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}

type InputProps = FormFieldProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = FormFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormField({ label, error, textarea, rows, ...props }: InputProps | TextareaProps) {
  const inputClasses = `w-full px-4 py-2.5 rounded-lg bg-white dark:bg-zinc-900/50 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/40 dark:focus:ring-cyan-accent/40 ${
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-zinc-300 dark:border-zinc-800 focus:border-cyan-600 dark:focus:border-cyan-accent'
  }`;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight font-sans">
        {label}
      </label>
      {textarea ? (
        <textarea
          className={`${inputClasses} resize-y font-sans`}
          rows={rows ?? 4}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`${inputClasses} font-sans`}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs font-medium text-red-600 dark:text-red-400 tracking-tight">{error}</span>}
    </div>
  );
}
