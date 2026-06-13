import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmissionStore } from '../../store/submissionStore';
import { ModuleCard } from '../../components/modules/ModuleCard';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusEvent, SubmitDslRequest } from '../../types';
import { 
  Check, 
  CircleNotch, 
  ArrowClockwise, 
  Archive, 
  Warning, 
  Lightning, 
  CheckCircle, 
  XCircle 
} from '@phosphor-icons/react';

export function SubmissionPortal() {
  const { submissions, isLoading, error, fetchSubmissions, submitDsl } = useSubmissionStore();
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [events, setEvents] = useState<StatusEvent[]>([]);
  const [connectionError, setConnectionError] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SubmitDslRequest>();

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Memoize SSE event handler to prevent reconnect loops
  const handleEvent = useCallback((event: StatusEvent) => {
    setConnectionError(false);
    setEvents((prev) => {
      // Avoid duplicate events
      if (prev.some((e) => e.timestamp === event.timestamp && e.message === event.message)) {
        return prev;
      }
      return [...prev, event];
    });

    if (event.status === 'ACTIVE' || event.status === 'ERROR') {
      fetchSubmissions();
    }
  }, [fetchSubmissions]);

  const handleStreamError = useCallback(() => {
    setConnectionError(true);
  }, []);

  // Listen to SSE events for the actively compiling submission
  useStatusStream(activeSubmissionId, handleEvent, handleStreamError);

  const onSubmit = async (data: SubmitDslRequest) => {
    setEvents([]);
    setConnectionError(false);
    const submissionId = await submitDsl(data);
    if (submissionId) {
      setActiveSubmissionId(submissionId);
      reset();
    }
  };

  const isTerminal = events.length > 0 && (
    events[events.length - 1].status === 'ACTIVE' || 
    events[events.length - 1].status === 'ERROR'
  );

  const isCompiling = activeSubmissionId && !isTerminal;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* CSS Animations style tag */}
      <style>{`
        @keyframes fade-slide-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-in {
          animation: fade-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pulse-cyan {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(0, 240, 255, 0);
          }
        }
        .animate-pulse-cyan {
          animation: pulse-cyan 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }
      `}</style>

      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-sans">
            Module Submission Portal
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm font-sans">
            Deploy, validate, and orchestrate custom extensions and business modules.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs font-mono text-zinc-600 dark:text-zinc-400 shadow-sm">
            {isCompiling ? (
              <CircleNotch className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-accent animate-spin" weight="bold" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
            Pipeline: <span className="font-semibold">{isCompiling ? 'Compiling' : 'Idle'}</span>
          </div>
        </div>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Cell A: Submission Form (col-span-5) */}
        <section className="lg:col-span-5 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">Submit New Module</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                Provide package source files to register endpoints.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <FormField
                label="Module Name"
                placeholder="e.g. loyalty-points"
                error={errors.moduleName?.message}
                {...register('moduleName', { required: 'Module name is required' })}
              />
              <FormField
                label="Version"
                placeholder="1.0.0"
                error={errors.version?.message}
                {...register('version', { 
                  required: 'Version is required',
                  pattern: { value: /^\d+\.\d+\.\d+$/, message: 'Must be semver (e.g. 1.0.0)' }
                })}
              />
              <FormField
                label="DSL Code"
                textarea
                rows={5}
                placeholder="module loyalty-points { ... }"
                error={errors.dslCode?.message}
                {...register('dslCode', { required: 'DSL code is required' })}
              />
              <FormField
                label="Manifest XML"
                textarea
                rows={4}
                placeholder="<manifest>...</manifest>"
                error={errors.manifestXml?.message}
                {...register('manifestXml', { required: 'Manifest XML is required' })}
              />
              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                className="mt-2 w-full active:scale-[0.98] transition-transform duration-100" 
                isLoading={isSubmitting}
              >
                Submit to Pipeline
              </Button>
            </form>
          </div>
        </section>

        {/* Cell B: Active Compilation OR Guide Info Panel (col-span-7) */}
        <section className="lg:col-span-7">
          {activeSubmissionId ? (
            /* Active compilation timeline card */
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">Pipeline Status</h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
                      Real-time compiler feedback from execution agent.
                    </p>
                  </div>
                  {isTerminal && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setActiveSubmissionId(null);
                        setEvents([]);
                      }}
                      className="active:scale-[0.98] transition-transform"
                    >
                      Clear Monitor
                    </Button>
                  )}
                </div>

                {/* Dynamic steps visual timeline */}
                <div className="flex flex-col gap-4 relative pl-3">
                  {/* Connecting active line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-zinc-200 dark:bg-zinc-800" />
                  
                  {events.length === 0 ? (
                    <div className="flex flex-col gap-3 py-4 pl-8">
                      <div className="flex items-center gap-2">
                        <CircleNotch className="w-5 h-5 text-cyan-500 dark:text-cyan-accent animate-spin" weight="bold" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 font-mono">Connecting pipeline telemetry...</span>
                      </div>
                    </div>
                  ) : (
                    events.map((ev, i) => {
                      const isLatest = i === events.length - 1;

                      return (
                        <div key={i} className="flex gap-4 items-start animate-fade-slide-in relative z-10">
                          {/* Status Icon Indicator */}
                          <div className="flex items-center justify-center bg-white dark:bg-zinc-900 rounded-full p-1 border border-zinc-200 dark:border-zinc-800">
                            {ev.status === 'ACTIVE' ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                                <CheckCircle className="w-4.5 h-4.5" weight="fill" />
                              </div>
                            ) : ev.status === 'ERROR' ? (
                              <div className="w-5 h-5 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm">
                                <XCircle className="w-4.5 h-4.5" weight="fill" />
                              </div>
                            ) : isLatest ? (
                              <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-accent flex items-center justify-center animate-pulse-cyan">
                                <CircleNotch className="w-3.5 h-3.5 animate-spin" weight="bold" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
                                <Check className="w-3 h-3" weight="bold" />
                              </div>
                            )}
                          </div>

                          {/* Content text */}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p className={`text-sm font-semibold font-sans ${isLatest ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                              {ev.message}
                            </p>
                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-1 block">
                              {new Date(ev.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Terminal Logs Window */}
              <div className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-accent animate-pulse" />
                    <span>COMPILER STDOUT</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 uppercase">TELEMETRY ON</span>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                  {events.map((ev, i) => (
                    <div key={i} className="flex gap-2 items-start leading-relaxed">
                      <span className="text-zinc-400 shrink-0">[{new Date(ev.timestamp).toLocaleTimeString()}]</span>
                      <span className={`inline-flex items-center gap-1.5 ${ev.status === 'ERROR' ? 'text-red-500 dark:text-red-400' : ev.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                        {ev.status === 'ERROR' ? (
                          <XCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />
                        ) : ev.status === 'ACTIVE' ? (
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />
                        ) : (
                          <Lightning className="w-3.5 h-3.5 shrink-0 text-cyan-500 dark:text-cyan-accent" weight="fill" />
                        )}
                        <span>{ev.message}</span>
                      </span>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="text-zinc-400 italic">// Awaiting compilation trigger...</div>
                  )}
                  {connectionError && !isTerminal && (
                    <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-bold animate-pulse">
                      <Warning className="w-3.5 h-3.5 shrink-0" weight="fill" />
                      <span>[WARNING] Telemetry stream disconnected. Retrying...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Compiler syntax reference guides card (shown when pipeline idle) */
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">Automated Verification Pipeline</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                    The gateway parses and validates extension architectures through automated checks.
                  </p>
                </div>

                {/* Static pipeline guide visuals */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { num: '01', title: 'Manifest Scan', desc: 'Checks XML specs' },
                    { num: '02', title: 'AST Compile', desc: 'Parses route DSL' },
                    { num: '03', title: 'Sandbox VM', desc: 'Deploys container' },
                    { num: '04', title: 'Hot Reload', desc: 'Activates routes' }
                  ].map((step, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-3 text-center space-y-1 hover:border-cyan-500/20 dark:hover:border-cyan-accent/20 transition-all duration-300">
                      <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-accent">{step.num}</span>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-sans truncate">{step.title}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight font-sans">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* DSL Code preview syntax window */}
              <div className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-xs relative overflow-hidden mt-4">
                <div className="absolute top-2 right-3 text-[10px] text-zinc-400 font-mono select-none uppercase">
                  DSL REFERENCE
                </div>
                <pre className="text-zinc-700 dark:text-zinc-300 leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-purple-600 dark:text-purple-400">module</span> loyalty-points {'{\n'}
                    {'  '}<span className="text-purple-600 dark:text-purple-400">version</span> <span className="text-cyan-600 dark:text-cyan-accent">"1.0.0"</span>{'\n\n'}
                    {'  '}<span className="text-zinc-400 dark:text-zinc-500">// Register partner charge webhook</span>{'\n'}
                    {'  '}<span className="text-purple-600 dark:text-purple-400">route</span> POST <span className="text-cyan-600 dark:text-cyan-accent">"/charge"</span> {'{\n'}
                    {'    '}handler <span className="text-cyan-600 dark:text-cyan-accent">"stripe-charge"</span>{'\n'}
                    {'    '}role <span className="text-cyan-600 dark:text-cyan-accent">"DEVELOPER_PARTNER"</span>{'\n'}
                    {'    '}timeout 15s{'\n'}
                    {'  }'}{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </section>

        {/* Cell C: Your Submissions (col-span-12) */}
        <section className="lg:col-span-12 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">Your Submissions</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
                List of submitted extensions currently registered on the server.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSubmissions} 
              isLoading={isLoading}
              className="active:scale-[0.98] transition-transform select-none font-sans flex items-center gap-1.5"
            >
              <ArrowClockwise className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 dark:text-red-400 text-xs font-mono animate-pulse">
              <XCircle className="w-4 h-4 shrink-0 mt-0.5" weight="fill" />
              <div>
                <span className="font-bold">ERROR:</span> {error}
              </div>
            </div>
          )}

          {isLoading && submissions.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5 flex flex-col gap-4 animate-pulse">
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-1/2 h-5 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="w-16 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  </div>
                  <div className="w-1/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-full h-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg" />
                  <div className="flex justify-between items-center mt-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                    <div className="w-24 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="w-20 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center p-12 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-800/40 rounded-2xl text-zinc-500 dark:text-zinc-400 font-sans">
              <Archive className="w-8 h-8 mx-auto text-zinc-400 dark:text-zinc-600 mb-3" weight="light" />
              <p className="font-semibold text-zinc-900 dark:text-white">No submissions found</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Submit your first module using the creator form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((sub) => (
                <ModuleCard 
                  key={sub.id} 
                  submission={sub} 
                  onClick={() => {
                    if (sub.status === 'COMPILING' || sub.status === 'PENDING') {
                      setActiveSubmissionId(sub.id);
                      setEvents([]);
                    }
                  }} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
