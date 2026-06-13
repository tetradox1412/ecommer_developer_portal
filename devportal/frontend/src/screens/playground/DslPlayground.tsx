import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { api } from '../../api/bff';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../components/ui/ThemeContext';
import { 
  Play, 
  Warning, 
  CheckCircle, 
  ShieldCheck, 
  Terminal, 
  ArrowRight 
} from '@phosphor-icons/react';

export function DslPlayground() {
  const [code, setCode] = useState('module example {\n  version "1.0.0"\n  // Write your DSL here\n}');
  const [errors, setErrors] = useState<Array<{ line: number; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runTrace, setRunTrace] = useState<Array<{ timestamp: string; description: string; status: string }>>([]);

  const [activeTab, setActiveTab] = useState<'validation' | 'trace'>('validation');
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  // Debounced Validation
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await api.validateDsl(code);
        setErrors(res.errors || []);
        if (res.errors && res.errors.length > 0) {
          setActiveTab('validation');
        }
      } catch (err) {
        console.error('Validation failed', err);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [code]);

  const handleRunDry = async () => {
    setIsRunning(true);
    setRunTrace([]);
    setActiveTab('trace');
    try {
      const res = await api.runSandbox(code, '<manifest/>');
      setRunTrace(res.steps || []);
    } catch {
      setRunTrace([{ timestamp: new Date().toISOString(), description: 'Sandbox execution failed', status: 'ERROR' }]);
    } finally {
      setIsRunning(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const revealLine = (lineNum: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(lineNum);
      editorRef.current.setPosition({ lineNumber: lineNum, column: 1 });
      editorRef.current.focus();
    }
  };

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-[#060814] text-zinc-800 dark:text-zinc-100 flex flex-col p-6 gap-6 transition-colors duration-300">
      {/* Top Header */}
      <header className="shrink-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            DSL Playground
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm font-medium">
            Write, validate, and dry-run your module DSL inside an isolated sandbox environment.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button 
            onClick={handleRunDry} 
            isLoading={isRunning} 
            className="cursor-pointer relative overflow-hidden group border border-cyan-accent/25 hover:border-cyan-accent text-zinc-950 dark:text-zinc-950 bg-cyan-accent hover:bg-cyan-accent/90 px-5 py-2.5 rounded-lg font-semibold tracking-wide shadow-[0_0_15px_var(--color-cyan-glow)] hover:shadow-[0_0_25px_var(--color-cyan-glow)] active:scale-[0.98] transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <Play weight="fill" className="w-4 h-4" />
              Run Dry Sandbox
            </span>
          </Button>
        </div>
      </header>

      {/* Main split dashboard */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left column: Editor (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col min-h-[500px] lg:min-h-0 bg-white dark:bg-[#0b0e1a]/80 border border-zinc-200 dark:border-zinc-900 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
          {/* Header */}
          <div className="bg-zinc-100 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-900 px-4 py-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/25 border border-red-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/25 border border-amber-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/25 border border-green-500/50"></span>
              <span className="ml-2 font-semibold tracking-wide">module.dsl</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              DSL editor
            </div>
          </div>
          
          {/* Monaco Editor Container */}
          <div className="flex-1 w-full bg-[#1e1e1e] dark:bg-[#090b11]">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme={editorTheme}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                fontLigatures: true,
                padding: { top: 12, bottom: 12 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                renderLineHighlight: 'all',
                lineHeight: 20,
                cursorStyle: 'line',
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 10,
                folding: false,
                glyphMargin: false,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                  useShadows: false,
                },
                guides: {
                  indentation: true,
                  bracketPairs: true
                }
              }}
            />
          </div>
        </div>

        {/* Right column: Tabs & Info (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col min-h-[400px] lg:min-h-0 gap-4">
          
          {/* Tab Navigation buttons */}
          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('validation')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'validation' 
                  ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Validation
              {errors.length > 0 && (
                <span className="bg-red-500/90 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-zinc-900">
                  {errors.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('trace')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'trace' 
                  ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Execution Trace
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="flex-grow bg-white dark:bg-[#0b0e1a]/85 border border-zinc-200 dark:border-zinc-900 rounded-xl overflow-hidden flex flex-col shadow-sm backdrop-blur-sm min-h-0">
            
            {/* Validation Tab */}
            {activeTab === 'validation' && (
              <div className="flex-1 flex flex-col h-full min-h-0">
                <div className="bg-zinc-100 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-900 px-4 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest flex justify-between items-center shrink-0">
                  <span>Validation Results</span>
                  {errors.length === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-450 font-semibold flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-900/50">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" weight="fill" />
                      DSL Valid
                    </span>
                  ) : (
                    <span className="text-red-650 dark:text-red-400 font-semibold flex items-center gap-1.5 text-xs bg-red-50 dark:bg-red-950/30 px-2.5 py-0.5 rounded border border-red-200/50 dark:border-red-900/50">
                      <Warning className="w-3.5 h-3.5 text-red-500" weight="fill" />
                      {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
                    </span>
                  )}
                </div>
                <div className="p-4 flex-grow overflow-y-auto min-h-0">
                  {errors.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-3">
                        <CheckCircle className="w-6 h-6" weight="fill" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No Syntax Errors</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-xs">
                        Your module DSL compiles cleanly with zero diagnostics. You can proceed with running the dry sandbox.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {errors.map((err, i) => {
                        const lines = code.split('\n');
                        const codeSnippet = lines[err.line - 1]?.trim() || '';
                        return (
                          <div 
                            key={i} 
                            onClick={() => revealLine(err.line)}
                            className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-200 hover:border-red-500/50 dark:border-zinc-800/80 dark:hover:border-red-500/45 bg-zinc-50/30 hover:bg-white dark:bg-zinc-950/20 dark:hover:bg-zinc-950/60 p-4 transition-all duration-200 active:scale-[0.99]"
                          >
                            <div className="absolute inset-y-0 left-0 w-[3px] bg-red-500 dark:bg-red-650 transition-transform duration-200 group-hover:scale-y-110"></div>
                            
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 pl-1">
                                <div className="mt-0.5 rounded bg-red-100/60 p-1 text-red-600 dark:bg-red-950/80 dark:text-red-400/90 shrink-0">
                                  <Warning className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                                      Compilation Error
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                    <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                                      Line {err.line}
                                    </span>
                                  </div>
                                  <p className="font-sans text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                                    {err.message}
                                  </p>
                                </div>
                              </div>
                              <button className="shrink-0 flex items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2 py-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-zinc-200 group-hover:border-cyan-accent/40 dark:group-hover:border-cyan-accent/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-accent active:scale-95">
                                <span>Locate</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                            
                            {codeSnippet && (
                              <div className="mt-3 ml-8 overflow-hidden rounded border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                <div className="flex border-b border-zinc-100 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-950/80 px-3 py-1 text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold font-mono">
                                  Context preview
                                </div>
                                <div className="p-2.5 flex gap-3 select-none overflow-x-auto">
                                  <span className="text-zinc-300 dark:text-zinc-700 text-right w-6 shrink-0 font-medium">{err.line}</span>
                                  <span className="text-red-650 dark:text-red-405/90 whitespace-pre font-mono font-medium">{codeSnippet}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trace Tab */}
            {activeTab === 'trace' && (
              <div className="flex-1 flex flex-col h-full min-h-0 bg-zinc-950 dark:bg-black/90">
                <div className="bg-zinc-900/80 border-b border-zinc-850 px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center justify-between shrink-0">
                  <span>Sandbox Trace Logs</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_8px_#00f0ff]"></span>
                </div>
                <div className="p-4 flex-grow overflow-y-auto font-mono text-xs min-h-0">
                  {runTrace.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                      <div className="w-12 h-12 rounded-full bg-zinc-900/60 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-450 flex items-center justify-center mb-3 border border-zinc-800/80">
                        <Terminal className="w-6 h-6 text-cyan-accent animate-pulse" />
                      </div>
                      <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider">No Sandbox Execution</h3>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-500 mt-1.5 max-w-xs leading-relaxed">
                        Trigger "Run Dry Sandbox" to compile and execute your DSL in the isolated developer sandbox.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {runTrace.map((trace, i) => (
                        <div key={i} className="flex gap-4 text-zinc-400 dark:text-zinc-350 border-l border-zinc-850 pl-4 py-2 relative group hover:bg-zinc-900/30">
                          {/* Dot indicator on vertical line */}
                          <span className={`absolute -left-[4.5px] top-[14px] w-2 h-2 rounded-full ${
                            trace.status === 'ERROR' ? 'bg-red-500' : trace.status === 'COMPLETE' ? 'bg-emerald-500' : 'bg-zinc-600'
                          }`}></span>
                          
                          <span className="text-zinc-500 font-semibold select-none shrink-0 text-[10px] pt-[2.5px] font-mono">
                            {new Date(trace.timestamp).toISOString().split('T')[1].replace('Z', '')}
                          </span>
                          <span className={`flex-1 text-[12.5px] leading-relaxed font-mono ${
                            trace.status === 'ERROR' ? 'text-red-400 font-medium' : trace.status === 'COMPLETE' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'
                          }`}>
                            {trace.description}
                          </span>
                          <span className={`shrink-0 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border self-center font-mono ${
                            trace.status === 'OK' 
                              ? 'text-cyan-accent border-cyan-accent/20 bg-cyan-accent/5' 
                              : trace.status === 'ERROR' 
                              ? 'text-red-500 border-red-500/20 bg-red-500/5' 
                              : 'text-emerald-400 border-emerald-400/25 bg-emerald-400/5'
                          }`}>
                            {trace.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
