import { useState } from 'react';
import { Plus, X } from '@phosphor-icons/react';

interface FeaturesEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export function FeaturesEditor({ features, onChange }: FeaturesEditorProps) {
  const [input, setInput] = useState('');

  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (!features.includes(v)) onChange([...features, v]);
    setInput('');
  };

  const remove = (f: string) => onChange(features.filter((x) => x !== f));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Features</label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Add a feature, press Enter"
          className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500"
        />
        <button type="button" onClick={add} className="px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-xs font-bold flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" weight="bold" /> Add
        </button>
      </div>
      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {features.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-700 dark:text-cyan-400">
              {f}
              <button type="button" onClick={() => remove(f)} className="hover:text-red-500"><X className="w-3 h-3" weight="bold" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
