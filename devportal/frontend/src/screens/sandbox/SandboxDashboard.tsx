import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge } from '../../components/ui/Badge';
import { useStatusStream } from '../../hooks/useStatusStream';
import type { StatusEvent } from '../../types';
import { Cpu, TerminalWindow, Play, Square, Clock, MagnifyingGlass, ChartLine, HardDrives, TrashSimple, Flask } from '@phosphor-icons/react';
import { NeuralArt, DeployingFigure } from '../../components/ui/LineArt';

const USE_MOCK_SANDBOX = (import.meta.env.VITE_USE_MOCK_SANDBOX ?? 'true') === 'true';

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

const INITIAL_LOGS: StatusEvent[] = [
  {
    submissionId: 'sub-init',
    status: 'ACTIVE',
    message: '[COMPILER] Core sandbox orchestrator online. Node: node-us-east-1a.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  },
  {
    submissionId: 'sbx-001',
    status: 'COMPILING',
    message: '[BUILD] Resolving dsl dependency hierarchy for loyalty-points...',
    timestamp: new Date(Date.now() - 1000 * 60 * 9).toISOString()
  },
  {
    submissionId: 'sbx-001',
    status: 'ACTIVE',
    message: '[DEPLOY] Module loyalty-points successfully mounted to isolated VM sandbox.',
    timestamp: new Date(Date.now() - 1000 * 60 * 8.5).toISOString()
  },
  {
    submissionId: 'sbx-002',
    status: 'COMPILING',
    message: '[BUILD] Compiling payment-gateway. Parsing manifest XML config schema...',
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString()
  },
  {
    submissionId: 'sbx-002',
    status: 'ACTIVE',
    message: '[DEPLOY] Hot swap deployment succeeded for module: payment-gateway.',
    timestamp: new Date(Date.now() - 1000 * 60 * 3.7).toISOString()
  }
];

// Sparkline Micro-chart using pure inline SVGs and bezier curved interpolation
function Sparkline({ values, color = 'cyan', max = 100 }: { values: number[]; color?: 'cyan' | 'purple'; max?: number }) {
  const width = 80;
  const height = 24;
  
  if (!values || values.length < 2) {
    return (
      <div className="w-[80px] h-[24px] flex items-center justify-center text-[10px] text-zinc-400 dark:text-zinc-600 font-mono select-none">
        static
      </div>
    );
  }

  // Calculate SVG point coords
  const pointsStr = values.map((val, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - (Math.min(max, Math.max(0, val)) / max) * (height - 4) - 2; // leave 2px padding top/bottom
    return { x, y };
  });

  let pathD = '';
  let areaD = '';
  if (pointsStr.length > 0) {
    pathD = `M ${pointsStr[0].x.toFixed(1)},${pointsStr[0].y.toFixed(1)}`;
    for (let i = 1; i < pointsStr.length; i++) {
      const p0 = pointsStr[i - 1];
      const p1 = pointsStr[i];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      pathD += ` C ${cpX1.toFixed(1)},${cpY1.toFixed(1)} ${cpX2.toFixed(1)},${cpY2.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
    areaD = `M 0,${height} L ${pointsStr[0].x.toFixed(1)},${pointsStr[0].y.toFixed(1)} ${pathD.replace(/^M [^ ]+/, '')} L ${width},${height} Z`;
  }

  const strokeColor = color === 'cyan' ? '#06b6d4' : '#a855f7';
  const fillGradient = color === 'cyan' ? 'url(#cyan-grad)' : 'url(#purple-grad)';

  return (
    <svg width={width} height={height} className="overflow-visible select-none">
      <defs>
        <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="purple-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={fillGradient} />
      <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pulse current endpoint dot */}
      <circle
        cx={width}
        cy={pointsStr[pointsStr.length - 1].y}
        r="2.5"
        fill={strokeColor}
        className="animate-ping opacity-75"
      />
      <circle
        cx={width}
        cy={pointsStr[pointsStr.length - 1].y}
        r="2"
        fill={strokeColor}
      />
    </svg>
  );
}

// Segmented LED Progress Bar
function SegmentedBar({ value, max = 100, color = 'cyan' }: { value: number; max?: number; color?: 'cyan' | 'purple' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const totalSegments = 12;
  const filledSegments = Math.round((percentage / 100) * totalSegments);

  return (
    <div className="flex gap-[2px] items-center select-none bg-zinc-950/35 dark:bg-zinc-950/75 p-1 rounded-md border border-zinc-200/50 dark:border-zinc-900/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
      {Array.from({ length: totalSegments }).map((_, i) => {
        const isFilled = i < filledSegments;
        let segmentBg = 'bg-zinc-200/20 dark:bg-zinc-800/20';
        let shadow = '';
        
        if (isFilled) {
          if (color === 'cyan') {
            if (value > 80) {
              segmentBg = 'bg-red-500';
              shadow = 'shadow-[0_0_6px_#ef4444]';
            } else if (value > 50) {
              segmentBg = 'bg-amber-500';
              shadow = 'shadow-[0_0_6px_#f59e0b]';
            } else {
              segmentBg = 'bg-cyan-400';
              shadow = 'shadow-[0_0_6px_#22d3ee]';
            }
          } else {
            if (value > 80) {
              segmentBg = 'bg-red-500';
              shadow = 'shadow-[0_0_6px_#ef4444]';
            } else if (value > 50) {
              segmentBg = 'bg-amber-500';
              shadow = 'shadow-[0_0_6px_#f59e0b]';
            } else {
              segmentBg = 'bg-purple-400';
              shadow = 'shadow-[0_0_6px_#c084fc]';
            }
          }
        }
        return (
          <div
            key={i}
            className={`w-[4.5px] h-3 rounded-[1px] transition-all duration-300 ${segmentBg} ${shadow} ${
              isFilled && value > 80 ? 'animate-pulse' : ''
            }`}
          />
        );
      })}
    </div>
  );
}

export function SandboxDashboard() {
  const [instances, setInstances] = useState(MOCK_INSTANCES);
  const [streamEvents, setStreamEvents] = useState<StatusEvent[]>(INITIAL_LOGS);
  const [filterText, setFilterText] = useState('');
  const logTerminalEndRef = useRef<HTMLDivElement>(null);

  // Seed initial histories for sparklines
  const [history, setHistory] = useState<Record<string, { cpu: number[]; memory: number[] }>>(() => {
    const initial: Record<string, { cpu: number[]; memory: number[] }> = {};
    MOCK_INSTANCES.forEach(inst => {
      if (inst.status === 'RUNNING') {
        initial[inst.id] = {
          cpu: Array.from({ length: 12 }, () => Math.max(5, inst.cpu + (Math.random() * 10 - 5))),
          memory: Array.from({ length: 12 }, () => Math.max(128, inst.memory + (Math.random() * 40 - 20)))
        };
      } else {
        initial[inst.id] = {
          cpu: Array.from({ length: 12 }, () => 0),
          memory: Array.from({ length: 12 }, () => 0)
        };
      }
    });
    return initial;
  });

  const [totalsHistory, setTotalsHistory] = useState<{ cpu: number[]; memory: number[] }>(() => {
    const cpuTotal = MOCK_INSTANCES.reduce((acc, inst) => acc + inst.cpu, 0);
    const memTotal = MOCK_INSTANCES.reduce((acc, inst) => acc + inst.memory, 0);
    return {
      cpu: Array.from({ length: 12 }, () => Math.max(10, cpuTotal + (Math.random() * 16 - 8))),
      memory: Array.from({ length: 12 }, () => Math.max(256, memTotal + (Math.random() * 80 - 40)))
    };
  });

  // Listen for compilation event SSE stream
  useStatusStream('mock-sandbox-stream', (event) => {
    setStreamEvents(prev => [...prev.slice(-49), event]);
  });

  // Auto scroll terminal to the bottom when new logs arrive
  useEffect(() => {
    logTerminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [streamEvents]);

  // Simulate real-time metrics updates
  useEffect(() => {
    const timer = setInterval(() => {
      setInstances(prev => {
        const next = prev.map(inst => {
          if (inst.status !== 'RUNNING') return inst;
          return {
            ...inst,
            cpu: Math.max(1, Math.min(99, inst.cpu + (Math.random() * 8 - 4))),
            memory: Math.max(128, Math.min(1000, inst.memory + (Math.random() * 16 - 8)))
          };
        });

        // Update history vectors
        setHistory(hPrev => {
          const hNext = { ...hPrev };
          next.forEach(inst => {
            const cHist = hPrev[inst.id]?.cpu || [];
            const mHist = hPrev[inst.id]?.memory || [];
            hNext[inst.id] = {
              cpu: [...cHist, inst.cpu].slice(-15),
              memory: [...mHist, inst.memory].slice(-15)
            };
          });
          return hNext;
        });

        // Update totals history vectors
        const currentTotalCpu = next.reduce((acc, i) => acc + i.cpu, 0);
        const currentTotalMemory = next.reduce((acc, i) => acc + i.memory, 0);
        setTotalsHistory(tPrev => ({
          cpu: [...tPrev.cpu, currentTotalCpu].slice(-15),
          memory: [...tPrev.memory, currentTotalMemory].slice(-15)
        }));

        return next;
      });
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

  // Action to toggle start/stop on instance
  const toggleInstance = (id: string) => {
    setInstances(prev => prev.map(inst => {
      if (inst.id !== id) return inst;
      const willRun = inst.status === 'STOPPED' || inst.status === 'ERROR';
      const nextStatus = willRun ? 'RUNNING' : 'STOPPED';

      // Push manual cluster event to terminal
      const event: StatusEvent = {
        submissionId: id,
        status: willRun ? 'ACTIVE' : 'INACTIVE',
        message: `[CLUSTER] Instance '${inst.moduleName}' ${willRun ? 'activated' : 'deactivated'} manually. Reallocating system threads.`,
        timestamp: new Date().toISOString()
      };
      setStreamEvents(prevLogs => [...prevLogs, event]);

      // Handle history update
      setHistory(hPrev => {
        const hNext = { ...hPrev };
        hNext[inst.id] = {
          cpu: Array.from({ length: 15 }, () => willRun ? Math.max(5, 10 + Math.random() * 20) : 0),
          memory: Array.from({ length: 15 }, () => willRun ? Math.max(128, 256 + Math.random() * 100) : 0)
        };
        return hNext;
      });

      return {
        ...inst,
        status: nextStatus,
        cpu: willRun ? 15.0 : 0,
        memory: willRun ? 256 : 0,
        uptime: willRun ? '0s' : '0m'
      };
    }));
  };

  // Filter logs based on search text
  const filteredEvents = useMemo(() => {
    if (!filterText.trim()) return streamEvents;
    const query = filterText.toLowerCase();
    return streamEvents.filter(ev => 
      ev.message.toLowerCase().includes(query) || 
      ev.status.toLowerCase().includes(query) ||
      ev.submissionId.toLowerCase().includes(query)
    );
  }, [streamEvents, filterText]);

  return (
    <div className="min-h-full w-full bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
      {/* Header Block */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative overflow-hidden">
          {/* Neural art background */}
          <div className="absolute right-0 top-0 h-full w-60 text-zinc-400 dark:text-zinc-600 pointer-events-none">
            <NeuralArt className="w-full h-full" opacity={1} />
          </div>
          {/* Deploying figure — hidden on mobile */}
          <div className="absolute left-0 top-0 h-full w-20 text-zinc-400 dark:text-zinc-600 pointer-events-none hidden lg:block">
            <DeployingFigure
              className="w-full h-full"
              opacity={1}
              isDeploying={instances.some(i => i.status === 'RUNNING')}
              isDone={instances.every(i => i.status === 'STOPPED')}
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Sandbox Monitor
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm">
              Real-time resource graphs, thread telemetry, and compiler pipeline logs.
            </p>
          </div>
          
          <div className="flex items-center gap-3 relative z-10 flex-wrap">
            {/* Sandbox mode indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium select-none ${
              USE_MOCK_SANDBOX
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400'
                : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'
            }`}>
              <Flask className="w-3 h-3" weight="bold" />
              {USE_MOCK_SANDBOX ? 'MOCK MODE' : 'LIVE MODE'}
            </div>
            {/* Cluster connected state */}
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full shadow-sm select-none">
              <Cpu size={13} className="text-cyan-500" weight="bold" />
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">cluster::sandbox-01</span>
            </div>
          </div>
        </header>

        {/* Aggregate Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 select-none">
          {/* Card: Total CPU */}
          <div className="bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:border-zinc-300 dark:hover:border-zinc-850 transition-all">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                <Cpu size={14} className="text-cyan-500" />
                <span>Total CPU Util</span>
              </div>
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-sans mt-1">
                {instances.reduce((acc, i) => acc + i.cpu, 0).toFixed(1)}%
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-900/60 p-2.5 rounded-xl">
              <Sparkline values={totalsHistory.cpu} color="cyan" max={180} />
            </div>
          </div>

          {/* Card: Total Memory */}
          <div className="bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:border-zinc-300 dark:hover:border-zinc-850 transition-all">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                <HardDrives size={14} className="text-purple-500" />
                <span>Total Memory RAM</span>
              </div>
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-sans mt-1">
                {instances.reduce((acc, i) => acc + i.memory, 0).toFixed(0)} MB
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-900/60 p-2.5 rounded-xl">
              <Sparkline values={totalsHistory.memory} color="purple" max={1800} />
            </div>
          </div>

          {/* Card: Active Instances */}
          <div className="bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex items-center justify-between shadow-sm hover:border-zinc-300 dark:hover:border-zinc-850 transition-all">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                <ChartLine size={14} className="text-emerald-500" />
                <span>Orchestrated Pods</span>
              </div>
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-sans mt-1">
                {instances.filter(i => i.status === 'RUNNING').length} <span className="text-zinc-450 dark:text-zinc-500 text-lg font-medium">/ {instances.length} active</span>
              </span>
            </div>
            
            {/* Pill block indicators structured as server rack slots */}
            <div className="flex gap-1.5 bg-zinc-950/40 p-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-900/85">
              {instances.map(i => (
                <div 
                  key={i.id} 
                  className={`w-3.5 h-6 rounded border transition-all duration-300 ${
                    i.status === 'RUNNING' 
                      ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.25)]' 
                      : i.status === 'ERROR'
                        ? 'bg-red-500/10 border-red-500/40 animate-pulse'
                        : 'bg-zinc-100 dark:bg-zinc-850/60 border-zinc-200 dark:border-zinc-800'
                  }`}
                  title={`${i.moduleName}: ${i.status}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Instances Monitor */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight font-sans mb-1 flex items-center gap-2">
              <HardDrives size={20} className="text-cyan-500" />
              Isolated Instances
            </h2>

            {/* List of VMs */}
            <div className="flex flex-col gap-4">
              {instances.map(inst => (
                <div 
                  key={inst.id} 
                  className="group bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800/80 hover:shadow-sm"
                >
                  {/* Left status colored accent line */}
                  <div className={`absolute left-0 top-4 bottom-4 w-[2.5px] rounded-r transition-colors ${
                    inst.status === 'RUNNING' 
                      ? 'bg-cyan-500 dark:bg-cyan-400' 
                      : inst.status === 'ERROR' 
                        ? 'bg-red-500 dark:bg-red-400' 
                        : 'bg-zinc-300 dark:bg-zinc-700'
                  }`} />

                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 tracking-tight font-sans transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                        {inst.moduleName}
                      </h3>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono tracking-tight">{inst.id}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Badge indicator */}
                      <Badge variant={getStatusColor(inst.status)} className="font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 select-none">
                        {inst.status}
                      </Badge>

                      {/* Start / Stop Toggle Button */}
                      <button
                        onClick={() => toggleInstance(inst.id)}
                        className={`p-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer ${
                          inst.status === 'RUNNING'
                            ? 'text-red-500 hover:bg-red-50 hover:border-red-200 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:border-red-900/40 border-transparent'
                            : 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200 dark:text-emerald-400 dark:hover:bg-emerald-950/20 dark:hover:border-emerald-900/40 border-transparent'
                        }`}
                        title={inst.status === 'RUNNING' ? 'Deallocate Resource' : 'Allocate & Start'}
                      >
                        {inst.status === 'RUNNING' ? (
                          <Square size={15} weight="fill" />
                        ) : (
                          <Play size={15} weight="fill" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Resource telemetry graphs grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-100 dark:border-zinc-900/60 pt-4">
                    {/* CPU Metrics Block */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono select-none">
                        <span>CPU Thread</span>
                        <span className="text-zinc-600 dark:text-zinc-400 font-semibold">{inst.cpu.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <SegmentedBar value={inst.cpu} max={100} color="cyan" />
                        <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-900/60 p-1.5 rounded-lg">
                          <Sparkline values={history[inst.id]?.cpu} color="cyan" max={100} />
                        </div>
                      </div>
                    </div>

                    {/* Memory Metrics Block */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono select-none">
                        <span>Memory RAM</span>
                        <span className="text-zinc-600 dark:text-zinc-400 font-semibold">{inst.memory.toFixed(0)}M</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <SegmentedBar value={inst.memory} max={1024} color="purple" />
                        <div className="bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-900/60 p-1.5 rounded-lg">
                          <Sparkline values={history[inst.id]?.memory} color="purple" max={1024} />
                        </div>
                      </div>
                    </div>

                    {/* Uptime Metric Block */}
                    <div className="flex flex-col gap-1.5 justify-center sm:pl-4 sm:border-l border-zinc-200 dark:border-zinc-900/60 select-none">
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Uptime Duration</span>
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-mono flex items-center gap-1.5">
                        <Clock size={14} className="text-zinc-450 dark:text-zinc-500" />
                        {inst.uptime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Console Compiler Feed Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-4 h-full">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight font-sans mb-1 flex items-center gap-2">
              <TerminalWindow size={20} className="text-cyan-500" />
              Terminal Console Logs
            </h2>

            {/* MacOS style Terminal Window */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col shadow-xl min-h-[500px] h-[550px] font-mono select-text relative">
              
              {/* Terminal Window Header Bar */}
              <div className="bg-zinc-900 border-b border-zinc-800/70 px-4 py-3 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="text-[11px] text-zinc-450 dark:text-zinc-500 font-mono ml-2">sandbox-compiler-feed.log</span>
                </div>
                <div>
                  <button
                    onClick={() => setStreamEvents([])}
                    className="text-zinc-400 hover:text-white text-[10px] uppercase font-mono px-2.5 py-1 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-950 transition-all active:scale-[0.97] cursor-pointer flex items-center gap-1.5"
                  >
                    <TrashSimple size={12} />
                    Clear
                  </button>
                </div>
              </div>

              {/* Sub-Header Input Search Bar */}
              <div className="bg-zinc-950 border-b border-zinc-900 px-4 py-2.5 flex items-center shrink-0">
                <MagnifyingGlass size={14} className="text-zinc-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter log output..."
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  className="bg-transparent border-0 text-zinc-300 placeholder-zinc-650 text-xs font-mono w-full focus:outline-none focus:ring-0 outline-none"
                />
              </div>

              {/* Log stream output wrapper */}
              <div className="flex-1 overflow-y-auto p-1 py-3 flex flex-col bg-zinc-950/80 backdrop-blur-md">
                {filteredEvents.length === 0 ? (
                  <div className="text-zinc-700 h-full flex items-center justify-center text-xs font-mono select-none">
                    NO LOGS FOUND MATCHING FILTER
                  </div>
                ) : (
                  filteredEvents.map((ev, idx) => {
                    const timeStr = new Date(ev.timestamp).toLocaleTimeString();
                    const lineNo = String(idx + 1).padStart(2, '0');
                    const isError = ev.status === 'ERROR';
                    const isCompiling = ev.status === 'COMPILING';
                    const isActive = ev.status === 'ACTIVE';

                    return (
                      <div 
                        key={idx} 
                        className={`flex gap-3 text-xs leading-relaxed py-1 px-4 border-b border-zinc-900/20 hover:bg-zinc-900/40 transition-colors font-mono ${
                          isError ? 'bg-red-950/15 border-l-2 border-l-red-500' : ''
                        }`}
                      >
                        {/* Line number block */}
                        <span className="text-zinc-700 select-none w-6 text-right font-medium pr-1.5 border-r border-zinc-900/60 mr-1">{lineNo}</span>
                        {/* Timestamp */}
                        <span className="text-zinc-600 select-none font-medium">{timeStr}</span>
                        
                        {/* Status Label badge */}
                        <span className={`px-1.5 py-0.5 text-[9px] rounded-md border uppercase font-bold tracking-wider select-none shrink-0 inline-block h-fit ${
                          isError 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' 
                            : isCompiling 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                              : isActive 
                                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}>
                          {ev.status === 'ACTIVE' ? 'DEPLOYED' : ev.status}
                        </span>

                        {/* Log Text message */}
                        <span className={`flex-1 break-all ${
                          isError 
                            ? 'text-red-400 font-medium' 
                            : isCompiling 
                              ? 'text-amber-300/95' 
                              : isActive
                                ? 'text-cyan-300'
                                : 'text-zinc-400'
                        }`}>
                          {ev.message}
                        </span>
                      </div>
                    );
                  })
                )}
                {/* Reference point to stick log scrolling */}
                <div ref={logTerminalEndRef} />
              </div>
              
              {/* Terminal status bar */}
              <div className="bg-zinc-900/90 border-t border-zinc-800/80 px-4 py-2 flex items-center justify-between select-none text-[10px] text-zinc-550 dark:text-zinc-500 font-mono shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span>Live Terminal stream connected</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>Lines: {filteredEvents.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
