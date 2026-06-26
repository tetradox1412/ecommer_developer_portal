import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DslEditorCore } from '../../playground/DslEditorCore';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { buildDslZip, parseDslZip, downloadBlob, readFileAsText } from '../../../lib/package-io';
import { ArrowRight, DownloadSimple, UploadSimple } from '@phosphor-icons/react';

export function DslStep() {
  const navigate = useNavigate();
  const { dsl, setDsl, setCurrentStep } = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportDsl = async () => {
    const blob = await buildDslZip(dsl);
    downloadBlob(blob, 'dsl.zip');
  };

  const handleImportDsl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.name.endsWith('.zip')) {
        const parsed = await parseDslZip(file);
        setDsl(parsed);
      } else {
        const text = await readFileAsText(file);
        if (file.name.endsWith('.views')) setDsl({ views: text });
        else setDsl({ schema: text });
      }
    } catch (err) {
      alert(`Failed to import DSL: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 1</span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">DSL Studio</h1>
          <p className="text-sm text-zinc-500">Define your schema and views. They'll carry forward automatically.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportDsl} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <DownloadSimple className="w-3.5 h-3.5" weight="bold" /> Export DSL
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UploadSimple className="w-3.5 h-3.5" weight="bold" /> Import DSL
          </button>
          <input ref={fileInputRef} type="file" accept=".zip,.schema,.views" className="hidden" onChange={handleImportDsl} />
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <DslEditorCore
          schema={dsl.schema}
          views={dsl.views}
          onSchemaChange={(v) => setDsl({ schema: v })}
          onViewsChange={(v) => setDsl({ views: v })}
        />
      </div>

      <footer className="shrink-0 flex justify-end">
        <button
          onClick={() => { setCurrentStep('manifest'); navigate('/workspace/manifest'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90"
        >
          Proceed to Manifest <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </footer>
    </div>
  );
}
