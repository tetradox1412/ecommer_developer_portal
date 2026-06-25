import { Check } from '@phosphor-icons/react';
import type { WizardStep } from '../../types';

interface WizardStepperProps {
  current: WizardStep;
  completed: Record<WizardStep, boolean>;
  onStepClick: (step: WizardStep) => void;
}

const STEPS: Array<{ id: WizardStep; label: string }> = [
  { id: 'dsl',      label: 'DSL Studio' },
  { id: 'manifest', label: 'Manifest' },
  { id: 'details',  label: 'Module Details' },
  { id: 'review',   label: 'Review & Submit' },
];

export function WizardStepper({ current, completed, onStepClick }: WizardStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <nav aria-label="Module workspace steps" className="flex items-center w-full">
      {STEPS.map((step, i) => {
        const isCurrent = step.id === current;
        const isDone = completed[step.id];
        const isReachable = i <= currentIndex || isDone;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              disabled={!isReachable}
              onClick={() => onStepClick(step.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isCurrent
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : isDone
                  ? 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
              }`}
            >
              <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-cyan-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
              }`}>
                {isDone ? <Check className="w-3 h-3" weight="bold" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${isDone ? 'bg-emerald-500/40' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
