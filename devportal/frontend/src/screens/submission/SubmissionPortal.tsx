import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmissionStore } from '../../store/submissionStore';
import { ModuleCard } from '../../components/modules/ModuleCard';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { LoadingSkeleton, CardSkeleton } from '../../components/ui/LoadingSkeleton';
import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusEvent, SubmitDslRequest } from '../../types';

export function SubmissionPortal() {
  const { submissions, isLoading, error, fetchSubmissions, submitDsl } = useSubmissionStore();
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [events, setEvents] = useState<StatusEvent[]>([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SubmitDslRequest>();

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Listen to SSE events for the actively compiling submission
  useStatusStream(activeSubmissionId, (event) => {
    setEvents((prev) => [...prev, event]);
    // Refresh list if it reaches a terminal state to get the latest status
    if (event.status === 'ACTIVE' || event.status === 'ERROR') {
      fetchSubmissions();
    }
  });

  const onSubmit = async (data: SubmitDslRequest) => {
    setEvents([]);
    const submissionId = await submitDsl(data);
    if (submissionId) {
      setActiveSubmissionId(submissionId);
      reset();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Module Submission Portal</h1>
        <p className="text-slate-400 mt-2 text-lg">
          Submit and track your custom extensions, adapters, and business modules.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-6">Submit New Module</h2>
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
                placeholder="module loyalty { ... }"
                error={errors.dslCode?.message}
                {...register('dslCode', { required: 'DSL code is required' })}
              />
              <FormField
                label="Manifest XML"
                textarea
                rows={5}
                placeholder="<manifest>...</manifest>"
                error={errors.manifestXml?.message}
                {...register('manifestXml', { required: 'Manifest XML is required' })}
              />
              <Button type="submit" variant="primary" size="lg" className="mt-2" isLoading={isSubmitting}>
                Submit to Pipeline
              </Button>
            </form>
          </section>

          {/* Active Compilation Timeline */}
          {activeSubmissionId && (
            <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Pipeline Status</h3>
              <div className="flex flex-col gap-4">
                {events.length === 0 ? (
                  <LoadingSkeleton lines={2} />
                ) : (
                  events.map((ev, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${ev.status === 'ERROR' ? 'bg-red-500' : ev.status === 'ACTIVE' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        {i !== events.length - 1 && <div className="w-0.5 h-full bg-slate-800 my-1" />}
                      </div>
                      <div className="flex flex-col pb-2">
                        <span className="text-sm text-white font-medium">{ev.message}</span>
                        <span className="text-xs text-slate-500">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Submissions List */}
        <div className="lg:col-span-7">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Your Submissions</h2>
              <Button variant="outline" size="sm" onClick={fetchSubmissions} isLoading={isLoading}>
                Refresh
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-6">
                {error}
              </div>
            )}

            {isLoading && submissions.length === 0 ? (
              <CardSkeleton count={4} />
            ) : submissions.length === 0 ? (
              <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
                <p>No submissions found.</p>
                <p className="text-sm mt-1">Submit your first module using the form.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {submissions.map((sub) => (
                  <ModuleCard key={sub.id} submission={sub} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
