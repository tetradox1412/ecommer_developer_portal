import { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { useTheme } from '../../components/ui/ThemeContext';
import { api } from '../../api/bff';
import {
  ArrowLineUpRight, Terminal, CircleNotch, CheckCircle,
  XCircle, Warning, Database, ShieldCheck, Cpu,
} from '@phosphor-icons/react';

export interface DslEditorCoreProps {
  schema: string;
  views: string;
  onSchemaChange: (v: string) => void;
  onViewsChange: (v: string) => void;
}

type EditorTab = 'schema' | 'views';
type GenStatus = 'idle' | 'loading' | 'success' | 'error';
type ValStatus = 'idle' | 'validating' | 'valid' | 'invalid';
interface LogLine { text: string; kind: 'info' | 'success' | 'error' }
interface DslError { line: number; column: number; message: string; severity: 'error' | 'warning' }

export function DslEditorCore({ schema, views, onSchemaChange, onViewsChange }: DslEditorCoreProps) {
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const [activeTab, setActiveTab] = useState<EditorTab>('schema');
  const [genStatus, setGenStatus] = useState<GenStatus>('idle');
  const [valStatus, setValStatus] = useState<ValStatus>('idle');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [dslErrors, setDslErrors] = useState<DslError[]>([]);

  const schemaEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addLog = (text: string, kind: LogLine['kind'] = 'info') =>
    setLogs((prev) => [...prev, { text, kind }]);

  const applyMarkers = useCallback((errors: DslError[]) => {
    const monaco = monacoRef.current;
    const editor = schemaEditorRef.current;
    if (!monaco || !editor) return;
    const model = editor.getModel();
    if (!model) return;
    const markers: Monaco.editor.IMarkerData[] = errors.map((e) => {
      const line = Math.max(1, Math.min(e.line, model.getLineCount()));
      const maxCol = model.getLineMaxColumn(line);
      const col = Math.max(1, Math.min(e.column, maxCol));
      return {
        startLineNumber: line, endLineNumber: line,
        startColumn: col, endColumn: maxCol,
        message: e.message,
        severity: e.severity === 'error' ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
      };
    });
    monaco.editor.setModelMarkers(model, 'hospital-dsl', markers);
  }, []);

  const runValidation = useCallback((s: string, v: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setValStatus('validating');
      try {
        const res = await api.validateHospitalDsl(s, v);
        setDslErrors(res.errors);
        applyMarkers(res.errors);
        setValStatus(res.valid ? 'valid' : 'invalid');
      } catch {
        setValStatus('idle');
      }
    }, 800);
  }, [applyMarkers]);

  useEffect(() => {
    runValidation(schema, views);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [schema, views, runValidation]);

  const handleSchemaMount: OnMount = (editor, monaco) => {
    schemaEditorRef.current = editor;
    monacoRef.current = monaco;
    applyMarkers(dslErrors);
  };

  const handleGenerate = async () => {
    setGenStatus('loading');
    setLogs([]);
    addLog('[INFO] Initializing DSL engine...');
    addLog('[INFO] Parsing schema and views...');
    try {
      await api.generateDslProject(schema, views);
      addLog('[SUCCESS] Generation complete — your project ZIP is downloading.', 'success');
      setGenStatus('success');
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      raw.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => addLog(line, 'error'));
      setGenStatus('error');
    }
  };

  const logColor = (k: LogLine['kind']) =>
    k === 'error' ? 'text-red-500 dark:text-red-400' :
    k === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-300';

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    padding: { top: 16, bottom: 16 },
    scrollBeyondLastLine: false,
    lineNumbers: 'on' as const,
    wordWrap: 'on' as const,
  };

  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT — Editor */}
        <div className="flex flex-col min-h-0 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div className="shrink-0 flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 pt-2 gap-1">
            {(['schema', 'views'] as EditorTab[]).map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-t-md text-xs font-medium border-b-2 transition-colors duration-200
                  ${activeTab === tab ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950' : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
                {tab === 'schema' ? 'project.schema' : 'project.views'}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3 pb-1.5 pr-1">
              {valStatus === 'validating' && <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400"><CircleNotch className="w-2.5 h-2.5 animate-spin" weight="bold" /> Validating…</span>}
              {valStatus === 'valid' && <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-2.5 h-2.5" weight="fill" /> Valid</span>}
              {valStatus === 'invalid' && <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 dark:text-red-400"><Warning className="w-2.5 h-2.5" weight="fill" /> {dslErrors.length} {dslErrors.length === 1 ? 'error' : 'errors'}</span>}
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            <div className={`absolute inset-0 ${activeTab === 'schema' ? 'block' : 'hidden'}`}>
              <Editor height="100%" defaultLanguage="plaintext" theme={editorTheme}
                value={schema} onChange={(v) => onSchemaChange(v ?? '')} onMount={handleSchemaMount}
                options={editorOptions} />
            </div>
            <div className={`absolute inset-0 ${activeTab === 'views' ? 'block' : 'hidden'}`}>
              <Editor height="100%" defaultLanguage="plaintext" theme={editorTheme}
                value={views} onChange={(v) => onViewsChange(v ?? '')}
                options={editorOptions} />
            </div>
          </div>
        </div>

        {/* RIGHT — Console + info */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0 flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                {genStatus === 'loading' ? <CircleNotch className="w-3 h-3 animate-spin text-amber-500" weight="bold" /> :
                  genStatus === 'success' ? <CheckCircle className="w-3 h-3 text-emerald-500" weight="fill" /> :
                  genStatus === 'error' ? <XCircle className="w-3 h-3 text-red-500" weight="fill" /> :
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 inline-block" />}
                <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" weight="bold" />
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Console</span>
              </div>
              <div className="flex items-center gap-2">
                {logs.length > 0 && <button onClick={() => { setLogs([]); setGenStatus('idle'); }} className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">clear</button>}
                <button onClick={handleGenerate} disabled={genStatus === 'loading'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 hover:opacity-90 disabled:opacity-50 transition">
                  <ArrowLineUpRight className="w-3 h-3" weight="bold" /> Generate ZIP
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs p-4 space-y-1.5 bg-zinc-50/50 dark:bg-[#0d1117]">
              {logs.length === 0 ? (
                <p className="text-zinc-400 dark:text-zinc-600 pt-6 text-center select-none">Hit Generate to run the engine.</p>
              ) : logs.map((l, i) => (
                <div key={i} className={`flex gap-3 ${logColor(l.kind)}`}>
                  <span className="text-zinc-300 dark:text-zinc-600 shrink-0 select-none">{String(i + 1).padStart(2, '0')}</span>
                  <span>{l.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 grid grid-cols-3 gap-3">
            {[
              { icon: Database, label: 'Modules', desc: 'Entities + CRUD APIs', color: 'text-blue-500 dark:text-blue-400' },
              { icon: ShieldCheck, label: 'Auth', desc: 'JWT + Role-based', color: 'text-emerald-500 dark:text-emerald-400' },
              { icon: Cpu, label: 'Output', desc: 'Spring Boot + React', color: 'text-purple-500 dark:text-purple-400' },
            ].map((c) => {
              const CardIcon = c.icon;
              return (
                <div key={c.label} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col gap-2 bg-white dark:bg-zinc-900/50 shadow-xs">
                  <CardIcon className={`w-5 h-5 ${c.color}`} weight="bold" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-sans">{c.label}</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">{c.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
