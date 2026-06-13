import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { api } from '../../api/bff';
import { Button } from '../../components/ui/Button';

export function DslPlayground() {
  const [code, setCode] = useState('module example {\n  version "1.0.0"\n  // Write your DSL here\n}');
  const [errors, setErrors] = useState<Array<{ line: number; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runTrace, setRunTrace] = useState<Array<{ timestamp: string; description: string; status: string }>>([]);

  const [activeTab, setActiveTab] = useState<'editor' | 'validation' | 'trace'>('editor');

  // Debounced Validation
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await api.validateDsl(code);
        setErrors(res.errors || []);
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
      // Provide a dummy manifest for the dry-run
      const res = await api.runSandbox(code, '<manifest/>');
      setRunTrace(res.steps || []);
    } catch (err) {
      setRunTrace([{ timestamp: new Date().toISOString(), description: 'Sandbox execution failed', status: 'ERROR' }]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] p-6 gap-6">
      <header className="shrink-0 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">DSL Playground</h1>
          <p className="text-slate-400 mt-1">Write, validate, and dry-run your module DSL.</p>
        </div>
        <Button onClick={handleRunDry} isLoading={isRunning} size="lg">
          ▶ Run Dry
        </Button>
      </header>

      <div className="flex-1 flex flex-col min-h-0 gap-4">
        {/* Tabs Header */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'editor' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            module.dsl
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'validation' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Validation
            {errors.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {errors.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('trace')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'trace' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Execution Trace
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-inner">
          {activeTab === 'editor' && (
            <div className="flex-1 flex flex-col h-full bg-[#1e1e1e]">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></span>
                <span className="ml-2">module.dsl</span>
              </div>
              <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="flex-1 flex flex-col h-full">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 uppercase tracking-wider flex justify-between items-center">
                <span>Validation Results</span>
                {errors.length === 0 ? (
                  <span className="text-green-400 flex items-center gap-1">✓ Valid</span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1">⚠️ {errors.length} Errors</span>
                )}
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                {errors.length === 0 ? (
                  <div className="text-slate-500 text-sm h-full flex items-center justify-center text-center px-4">
                    No syntax errors. Your DSL is valid.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full mt-4">
                    {errors.map((err, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex gap-3">
                        <div className="bg-red-500/20 text-red-400 text-xs font-mono px-2 py-1 rounded h-fit shrink-0">
                          Line {err.line}
                        </div>
                        <div className="text-sm text-slate-300 font-mono">
                          {err.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'trace' && (
            <div className="flex-1 flex flex-col h-full bg-black">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Execution Trace
              </div>
              <div className="p-4 flex-1 overflow-y-auto font-mono text-sm max-w-5xl mx-auto w-full mt-4">
                {runTrace.length === 0 ? (
                  <div className="text-slate-600 h-[300px] flex items-center justify-center">
                    Click "Run Dry" to see execution trace
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {runTrace.map((trace, i) => (
                      <div key={i} className="flex gap-4 text-slate-300 border-l-2 border-slate-800 pl-4 py-1">
                        <span className="text-slate-500 shrink-0">
                          {new Date(trace.timestamp).toISOString().split('T')[1].replace('Z', '')}
                        </span>
                        <span className={trace.status === 'ERROR' ? 'text-red-400' : trace.status === 'COMPLETE' ? 'text-green-400' : 'text-slate-300'}>
                          {trace.description}
                        </span>
                        <span className={`ml-auto font-bold ${trace.status === 'OK' ? 'text-blue-400' : trace.status === 'ERROR' ? 'text-red-500' : 'text-green-400'}`}>
                          [{trace.status}]
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
  );
}
