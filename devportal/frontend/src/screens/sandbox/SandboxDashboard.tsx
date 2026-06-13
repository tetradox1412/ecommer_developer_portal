import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/Badge';
import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusEvent } from '../../types';

interface SandboxInstance {
  id: string;
  moduleName: string;
  status: 'STARTING' | 'RUNNING' | 'STOPPED' | 'ERROR';
  cpu: number;
  memory: number;
  uptime: string;
}

const MOCK_INSTANCES: SandboxInstance[] = [
  { id: 'sbx-001', moduleName: 'loyalty-points', status: 'RUNNING', cpu: 12.5, memory: 256, uptime: '4d 12h' },
  { id: 'sbx-002', moduleName: 'payment-gateway', status: 'RUNNING', cpu: 45.2, memory: 512, uptime: '1d 4h' },
  { id: 'sbx-003', moduleName: 'auth-adapter', status: 'STOPPED', cpu: 0, memory: 0, uptime: '0m' },
];

export function SandboxDashboard() {
  const [instances, setInstances] = useState(MOCK_INSTANCES);
  const [streamEvents, setStreamEvents] = useState<StatusEvent[]>([]);

  // We use a mock submission ID just to demonstrate the hook usage from the dashboard
  useStatusStream('mock-sandbox-stream', (event) => {
    setStreamEvents(prev => [...prev.slice(-9), event]);
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    const timer = setInterval(() => {
      setInstances(prev => prev.map(inst => {
        if (inst.status !== 'RUNNING') return inst;
        return {
          ...inst,
          cpu: Math.max(1, Math.min(100, inst.cpu + (Math.random() * 10 - 5))),
          memory: Math.max(128, Math.min(1024, inst.memory + (Math.random() * 20 - 10)))
        };
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING': return 'green';
      case 'STARTING': return 'amber';
      case 'STOPPED': return 'gray';
      case 'ERROR': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Sandbox Monitor</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Monitor resource utilization and health of your sandbox instances.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
          <span className="text-sm font-medium text-slate-300">Cluster Connected</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total CPU</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">
              {instances.reduce((acc, i) => acc + i.cpu, 0).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Memory</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">
              {instances.reduce((acc, i) => acc + i.memory, 0).toFixed(0)} MB
            </span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Instances</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">
              {instances.filter(i => i.status === 'RUNNING').length} / {instances.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white mb-2">Instances</h2>
          {instances.map(inst => (
            <div key={inst.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{inst.moduleName}</h3>
                  <span className="text-sm text-slate-500 font-mono">{inst.id}</span>
                </div>
                <Badge variant={getStatusColor(inst.status)}>{inst.status}</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">CPU</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${inst.cpu > 80 ? 'bg-red-500' : inst.cpu > 50 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, inst.cpu)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-300 w-10 text-right">{inst.cpu.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Memory</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${inst.memory > 800 ? 'bg-red-500' : inst.memory > 500 ? 'bg-amber-500' : 'bg-purple-500'}`}
                        style={{ width: `${(inst.memory / 1024) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-300 w-12 text-right">{inst.memory.toFixed(0)}M</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Uptime</span>
                  <span className="text-sm font-medium text-slate-300">{inst.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white mb-2">Event Log</h2>
          <div className="bg-black border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-inner min-h-[300px]">
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs flex flex-col gap-2">
              {streamEvents.length === 0 ? (
                <div className="text-slate-600 h-full flex items-center justify-center">
                  Waiting for events...
                </div>
              ) : (
                streamEvents.map((ev, i) => (
                  <div key={i} className="flex flex-col gap-0.5 border-b border-slate-900 pb-2 mb-1 last:border-0">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>{new Date(ev.timestamp).toLocaleTimeString()}</span>
                      <span className={ev.status === 'ERROR' ? 'text-red-500' : ev.status === 'ACTIVE' ? 'text-green-500' : 'text-blue-500'}>
                        {ev.status}
                      </span>
                    </div>
                    <span className="text-slate-300">{ev.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
