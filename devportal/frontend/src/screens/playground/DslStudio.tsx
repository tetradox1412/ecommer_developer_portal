import { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { useTheme } from '../../components/ui/ThemeContext';
import { api } from '../../api/bff';
import {
  ArrowLineUpRight,
  Terminal,
  Code,
  CircleNotch,
  CheckCircle,
  XCircle,
  Warning,
} from '@phosphor-icons/react';

// ── Placeholders ──────────────────────────────────────────────────────────────

const SCHEMA_PLACEHOLDER = `// Sunflower Clinic — HospitalDSL v3
Hospital SunflowerClinic {

  Module Patient {
    Label: "Patients";
    Icon: "🧑‍⚕️";
    Color: blue;
    Fields {
      name:       String  required  label "Full Name";
      age:        Number  required  label "Age"  min 0  max 150;
      gender:     String  optional  label "Gender"  options "Male","Female","Other";
      phone:      Phone   optional  label "Phone";
      email:      Email   optional  label "Email";
    }
    APIs {
      List   /all { name: all; roles: Admin, Doctor; }
      Get    /:id { name: get; roles: Admin, Doctor; }
      Create /    { name: new; roles: Admin; }
      Update /:id { name: edit; roles: Admin; }
      Delete /:id { name: del; roles: Admin; }
      Get    /me  { name: me; roles: {Patient, filter id = auth.id}; }
    }
  }

  Module Doctor {
    Label: "Doctors";
    Icon: "👨‍⚕️";
    Color: green;
    Fields {
      name:           String  required  label "Full Name";
      specialization: String  required  label "Specialization";
      available:      Boolean optional  label "Accepting Patients"  default "true";
    }
    APIs {
      List   /all { name: all; roles: Admin, Patient; }
      Get    /:id { name: get; roles: Admin, Patient; }
      Create /    { name: new; roles: Admin; }
      Update /:id { name: edit; roles: Admin; }
      Delete /:id { name: del; roles: Admin; }
    }
  }

  Role Patient { Me: Patient; }
  Role Doctor  { Me: Doctor; }
  Role Admin   { }

  Auth {
    Type: JWT;
    Expiry: "7d";
    Roles: Admin, Doctor, Patient;
  }

}`;

const VIEWS_PLACEHOLDER = `import "project.schema";

LoginGroups {
  Group "Patient" {
    roles:          Patient;
    selfRegister:   true;
    registerFields: name, age, gender, phone, email, password;
  }
  Group "Staff" {
    roles:        Admin, Doctor;
    selfRegister: false;
  }
}

Portal AdminPortal {
  for: Admin;

  Page Dashboard {
    Route: "/";
    Table Patients {
      from:    Patient.all;
      columns: name, age, gender, phone;
      View {
        get:    Patient.get;
        fields: name, age, gender, phone, email;
      }
      actions: Patient.del "Delete" { onSuccess: refresh; };
    }
  }

  Page Doctors {
    Route: "/doctors";
    Table {
      from:    Doctor.all;
      columns: name, specialization, available;
      View {
        get:    Doctor.get;
        fields: name, specialization, available;
      }
      actions: Doctor.del "Delete" { onSuccess: refresh; };
    }
  }
}`;

// ── Types ─────────────────────────────────────────────────────────────────────

type EditorTab = 'schema' | 'views';
type GenStatus = 'idle' | 'loading' | 'success' | 'error';
type ValStatus = 'idle' | 'validating' | 'valid' | 'invalid';
interface LogLine { text: string; kind: 'info' | 'success' | 'error' }
interface DslError { line: number; column: number; message: string; severity: 'error' | 'warning' }

// ── Component ─────────────────────────────────────────────────────────────────

export function DslStudio() {
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const [activeTab, setActiveTab] = useState<EditorTab>('schema');
  const [schema, setSchema]       = useState(SCHEMA_PLACEHOLDER);
  const [views,  setViews]        = useState(VIEWS_PLACEHOLDER);
  const [genStatus, setGenStatus] = useState<GenStatus>('idle');
  const [valStatus, setValStatus] = useState<ValStatus>('idle');
  const [logs, setLogs]           = useState<LogLine[]>([]);
  const [dslErrors, setDslErrors] = useState<DslError[]>([]);

  // Monaco refs — one per tab (schema / views each get their own model)
  const schemaEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const viewsEditorRef  = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addLog = (text: string, kind: LogLine['kind'] = 'info') =>
    setLogs(prev => [...prev, { text, kind }]);

  // ── Apply Monaco markers to the schema editor ──────────────────────────────
  const applyMarkers = useCallback((errors: DslError[]) => {
    const monaco = monacoRef.current;
    const schemaEditor = schemaEditorRef.current;
    if (!monaco || !schemaEditor) return;

    const model = schemaEditor.getModel();
    if (!model) return;

    const markers: Monaco.editor.IMarkerData[] = errors.map(e => ({
      startLineNumber: e.line,
      endLineNumber:   e.line,
      startColumn:     e.column,
      endColumn:       model.getLineMaxColumn(Math.min(e.line, model.getLineCount())),
      message:         e.message,
      severity: e.severity === 'error'
        ? monaco.MarkerSeverity.Error
        : monaco.MarkerSeverity.Warning,
    }));

    monaco.editor.setModelMarkers(model, 'hospital-dsl', markers);
  }, []);

  // ── Debounced live validation ──────────────────────────────────────────────
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
        // BFF not running — don't disrupt the editor, just clear status
        setValStatus('idle');
      }
    }, 800); // 800ms debounce
  }, [applyMarkers]);

  // Re-run validation when schema/views change
  useEffect(() => {
    runValidation(schema, views);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [schema, views, runValidation]);

  // ── Monaco onMount handlers ────────────────────────────────────────────────
  const handleSchemaMount: OnMount = (editor, monaco) => {
    schemaEditorRef.current = editor;
    monacoRef.current = monaco;
    // Apply any existing markers immediately
    applyMarkers(dslErrors);
  };

  const handleViewsMount: OnMount = (editor) => {
    viewsEditorRef.current = editor;
  };

  // ── Generate & Download ────────────────────────────────────────────────────
  const handleGenerate = async () => {
    setGenStatus('loading');
    setLogs([]);
    addLog('▶  Initializing DSL engine…');
    addLog('⏳  Parsing schema and views…');
    try {
      await api.generateDslProject(schema, views);
      addLog('✅  Generation complete — your project ZIP is downloading.', 'success');
      setGenStatus('success');
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
      addLog('── Generation failed ──────────────────', 'error');
      lines.forEach(line => addLog(line, 'error'));
      setGenStatus('error');
    }
  };

  // ── UI helpers ─────────────────────────────────────────────────────────────
  const GenStatusDot = () => {
    if (genStatus === 'loading') return <CircleNotch className="w-3 h-3 animate-spin text-amber-500" weight="bold" />;
    if (genStatus === 'success') return <CheckCircle className="w-3 h-3 text-emerald-500" weight="fill" />;
    if (genStatus === 'error')   return <XCircle     className="w-3 h-3 text-red-500"     weight="fill" />;
    return <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 inline-block" />;
  };

  const ValBadge = () => {
    if (valStatus === 'validating') return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
        <CircleNotch className="w-2.5 h-2.5 animate-spin" weight="bold" /> Validating…
      </span>
    );
    if (valStatus === 'valid') return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
        <CheckCircle className="w-2.5 h-2.5" weight="fill" /> Valid
      </span>
    );
    if (valStatus === 'invalid') return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 dark:text-red-400">
        <Warning className="w-2.5 h-2.5" weight="fill" /> {dslErrors.length} {dslErrors.length === 1 ? 'error' : 'errors'}
      </span>
    );
    return null;
  };

  const logColor = (kind: LogLine['kind']) =>
    kind === 'error'   ? 'text-red-500 dark:text-red-400' :
    kind === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
                         'text-zinc-600 dark:text-zinc-300';

  return (
    <div className="flex flex-col h-[calc(100dvh-theme(spacing.16))] p-6 gap-4 bg-white dark:bg-zinc-950 transition-colors duration-300">

      {/* ── Header ── */}
      <header className="shrink-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
            <Code className="w-3.5 h-3.5" weight="bold" />
            DSL Studio
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-sans">
            Code Generator
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Define your Hospital schema and generate a full-stack Spring Boot + React project instantly.
          </p>
        </div>

        <button
          id="dsl-generate-btn"
          onClick={handleGenerate}
          disabled={genStatus === 'loading'}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shrink-0 mt-1
            ${genStatus === 'loading'
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
              : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 active:scale-95 shadow-sm'
            }`}
        >
          {genStatus === 'loading' ? (
            <><CircleNotch className="w-4 h-4 animate-spin" weight="bold" /> Generating…</>
          ) : (
            <><ArrowLineUpRight className="w-4 h-4" weight="bold" /> Generate &amp; Download</>
          )}
        </button>
      </header>

      {/* ── Split Pane ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LEFT — Monaco Editor */}
        <div className="flex flex-col min-h-0 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          {/* Tab Bar */}
          <div className="shrink-0 flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 pt-2 gap-1">
            {(['schema', 'views'] as EditorTab[]).map(tab => (
              <button
                key={tab}
                id={`dsl-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-t-md text-xs font-medium transition-colors duration-200 border-b-2
                  ${activeTab === tab
                    ? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950'
                    : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
              >
                {tab === 'schema' ? 'project.schema' : 'project.views'}
              </button>
            ))}
            {/* Validation badge */}
            <div className="ml-auto flex items-center gap-3 pb-1.5 pr-1">
              <ValBadge />
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            </div>
          </div>

          {/* Editors — keep both mounted (hidden) so markers persist across tab switches */}
          <div className="flex-1 min-h-0 relative">
            <div className={`absolute inset-0 ${activeTab === 'schema' ? 'block' : 'hidden'}`}>
              <Editor
                height="100%"
                defaultLanguage="plaintext"
                theme={editorTheme}
                value={schema}
                onChange={v => setSchema(v ?? '')}
                onMount={handleSchemaMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                }}
              />
            </div>
            <div className={`absolute inset-0 ${activeTab === 'views' ? 'block' : 'hidden'}`}>
              <Editor
                height="100%"
                defaultLanguage="plaintext"
                theme={editorTheme}
                value={views}
                onChange={v => setViews(v ?? '')}
                onMount={handleViewsMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Console + Errors + Info cards */}
        <div className="flex flex-col gap-4 min-h-0">

          {/* Console */}
          <div className="flex-1 min-h-0 flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <GenStatusDot />
                <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" weight="bold" />
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Console</span>
              </div>
              {logs.length > 0 && (
                <button
                  onClick={() => { setLogs([]); setGenStatus('idle'); }}
                  className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  clear
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs p-4 space-y-1.5 bg-zinc-50/50 dark:bg-[#0d1117]">
              {logs.length === 0 ? (
                <p className="text-zinc-400 dark:text-zinc-600 pt-6 text-center select-none">
                  Hit <span className="text-zinc-600 dark:text-zinc-400 font-semibold">Generate &amp; Download</span> to run the engine
                </p>
              ) : (
                logs.map((l, i) => (
                  <div key={i} className={`flex gap-3 ${logColor(l.kind)}`}>
                    <span className="text-zinc-300 dark:text-zinc-600 shrink-0 select-none">{String(i + 1).padStart(2, '0')}</span>
                    <span>{l.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Error list (only when invalid) */}
          {valStatus === 'invalid' && dslErrors.length > 0 && (
            <div className="shrink-0 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900/50 flex items-center gap-2">
                <Warning className="w-3.5 h-3.5 text-red-500" weight="fill" />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  {dslErrors.length} {dslErrors.length === 1 ? 'Error' : 'Errors'}
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto divide-y divide-red-100 dark:divide-red-900/30">
                {dslErrors.map((e, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 flex items-start gap-3 bg-white dark:bg-zinc-950 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    onClick={() => {
                      // Jump to the line in the schema editor
                      if (schemaEditorRef.current && activeTab === 'schema') {
                        schemaEditorRef.current.revealLineInCenter(e.line);
                        schemaEditorRef.current.setPosition({ lineNumber: e.line, column: e.column });
                        schemaEditorRef.current.focus();
                      } else {
                        setActiveTab('schema');
                      }
                    }}
                  >
                    <span className={`shrink-0 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded mt-0.5
                      ${e.severity === 'error'
                        ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
                        : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                      }`}>
                      L{e.line}
                    </span>
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">{e.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info cards */}
          <div className="shrink-0 grid grid-cols-3 gap-3">
            {[
              { icon: '🏥', label: 'Modules',  desc: 'Entities + CRUD APIs' },
              { icon: '🔐', label: 'Auth',     desc: 'JWT + Role-based'     },
              { icon: '⚛️', label: 'Output',   desc: 'Spring Boot + React'  },
            ].map(c => (
              <div key={c.label} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex flex-col gap-1 bg-white dark:bg-zinc-950">
                <span className="text-lg">{c.icon}</span>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 font-sans">{c.label}</span>
                <span className="text-[11px] text-zinc-500">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
