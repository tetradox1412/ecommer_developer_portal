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
  const inputClasses = `w-full px-4 py-2.5 rounded-lg bg-slate-800 border text-white placeholder-slate-500 outline-none transition-colors duration-200 focus:ring-2 focus:ring-blue-500/40 ${
    error ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
  }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      {textarea ? (
        <textarea
          className={`${inputClasses} resize-y`}
          rows={rows ?? 4}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClasses}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
