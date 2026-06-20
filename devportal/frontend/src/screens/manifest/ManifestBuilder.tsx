import React, { useState, useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../../components/ui/ThemeContext';
import {
  FileCode,
  Copy,
  Check,
  Warning,
  ShareNetwork,
  IdentificationCard,
  CheckCircle,
  Plus,
  Trash,
  Download,
  Terminal,
  Lightning,
  ArrowRight,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react';
import { ManifestBuilderFigure } from '../../components/ui/LineArt';

// Local Custom FormField to enable premium styling and theme support
interface LocalFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}

function LocalFormField({ label, error, textarea, rows, ...props }: LocalFormFieldProps) {
  const inputClasses = `w-full px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 ${
    error
      ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500'
      : 'border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80'
  }`;

  return (
    <div className="flex flex-col gap-1.5 font-sans">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">{label}</label>
      {textarea ? (
        <textarea
          className={`${inputClasses} resize-none font-sans text-sm`}
          rows={rows ?? 3}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`${inputClasses} text-sm`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs font-semibold text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

// Custom Main Module Node for React Flow Canvas
function MainModuleNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-cyan-500/30 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-5 py-4 shadow-[0_0_20px_rgba(6,182,212,0.06)] transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]">
      <div className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/[0.01]" />
      <div className="flex flex-col gap-2 min-w-[150px]">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Active Module</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]" />
        </div>
        <h4 className="font-mono font-bold text-sm text-zinc-900 dark:text-white truncate">
          {data.name || 'unnamed'}
        </h4>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/60 rounded border border-zinc-200/50 dark:border-zinc-800/80 px-2 py-0.5">
          <span className="font-bold text-cyan-600 dark:text-cyan-400">v{data.version || '0.0.0'}</span>
          <span>active</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

// Custom Dependency Node for React Flow Canvas
function DependencyNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.04)]">
      <div className="flex flex-col gap-1.5 min-w-[125px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Dependency</span>
        <h5 className="font-mono font-semibold text-xs text-zinc-850 dark:text-zinc-200 truncate">
          {data.name || 'unnamed'}
        </h5>
        <div className="inline-block self-start font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40 px-1.5 py-0.5 rounded border border-zinc-250/50 dark:border-zinc-800/40">
          {data.version || 'latest'}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-zinc-300 dark:!bg-zinc-700 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

const nodeTypes = {
  mainModule: MainModuleNode,
  dependency: DependencyNode,
};

// XML Syntax Highlighting Helper - Cleaned classes to work perfectly on both dark and light backgrounds
const highlightXml = (xml: string, theme: string) => {
  let html = xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const isDark = theme === 'dark';
  const declClass = isDark ? "text-zinc-500 font-mono font-medium" : "text-zinc-400 font-mono font-medium";
  const commentClass = isDark ? "text-emerald-500 font-mono italic" : "text-emerald-600 font-mono italic";
  const tagClass = isDark ? "text-cyan-400 font-semibold" : "text-cyan-700 font-semibold";
  const attrClass = isDark ? "text-amber-300 font-mono" : "text-amber-700 font-mono";

  // 1. Highlight quotes first, while the HTML only contains original XML content
  html = html.replace(/("[\s\S]*?")/g, `<span class="${attrClass}">$1</span>`);
  
  // 2. Apply other XML syntax highlights using standard non-quoted tags
  html = html.replace(/(&lt;\?xml[\s\S]*?\?&gt;)/g, `<span class="${declClass}">$1</span>`);
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span class="${commentClass}">$1</span>`);
  html = html.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, `<span class="${tagClass}">$1</span>`);
  html = html.replace(/(\/?&gt;)/g, `<span class="${tagClass}">$1</span>`);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export function ManifestBuilder() {
  const { theme } = useTheme();

  // Local state properties
  const [name, setName] = useState('acme-cardiology');
  const [version, setVersion] = useState('1.2.4');
  const [description, setDescription] = useState('Cardiology diagnostic viewer and reporting module.');
  const [contextPath, setContextPath] = useState('/api/acme/cardiology');

  const [publicApis, setPublicApis] = useState<Array<{ method: string; path: string }>>([
    { method: 'GET', path: '/reports/{reportId}' },
    { method: 'GET', path: '/reports/search' }
  ]);

  const [dependencies, setDependencies] = useState<Array<{ name: string; versionRange: string }>>([
    { name: 'patient-registration', versionRange: '[1.0.0, 2.0.0)' },
    { name: 'hospital-onboarding', versionRange: '^1.0.0' }
  ]);

  // Layout config
  const [activeFormTab, setActiveFormTab] = useState<'info' | 'apis' | 'dependencies'>('info');
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'problems' | 'info'>('problems');

  const [highlightedDepIndex, setHighlightedDepIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Generate XML Manifest Memo
  const manifestXml = useMemo(() => {
    const apisXml = publicApis
      .filter(api => api.path.trim())
      .map(api => {
        return `        <api>\n            <path>${api.path.trim()}</path>\n            <method>${api.method}</method>\n            <description>Exposed API</description>\n            <requiredRole>ANY</requiredRole>\n        </api>`;
      })
      .join('\n');

    const depsXml = dependencies
      .filter(dep => dep.name.trim())
      .map(dep => {
        return `        <dependency>\n            <name>${dep.name.trim()}</name>\n            <versionRange>${dep.versionRange.trim() || 'latest'}</versionRange>\n            <accessedApis>\n                <!-- accessed APIs go here -->\n            </accessedApis>\n        </dependency>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<ModuleManifest>
    <!-- 1. General Metadata -->
    <name>${name}</name>
    <version>${version}</version>
    <description>${description}</description>
    <contextPath>${contextPath}</contextPath>

    <!-- 2. Exposed Public APIs -->
    <publicApis>
${apisXml || '        <!-- No public APIs defined -->'}
    </publicApis>

    <!-- 3. Declared External Dependencies -->
    <dependencies>
${depsXml || '        <!-- No dependencies defined -->'}
    </dependencies>
</ModuleManifest>`;
  }, [name, version, description, contextPath, publicApis, dependencies]);

  // Validation rules
  const validationErrors = useMemo(() => {
    const errors: Array<{ field: string; message: string; severity: 'error' | 'warning'; tab: 'info' | 'apis' | 'dependencies' }> = [];

    const reservedNames = ['wrapper', 'saasController', 'config'];
    if (!name.trim()) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Module Name cannot be empty.', severity: 'error', tab: 'info' });
    } else if (!/^[a-z0-9]+-[a-z0-9\-]+$/.test(name)) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Must follow the [vendor]-[name] structure (lowercase alphanumeric and hyphens only).', severity: 'error', tab: 'info' });
    } else if (reservedNames.includes(name)) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Name matches a platform-reserved word.', severity: 'error', tab: 'info' });
    }

    const parts = name.split('-');
    const vendor = parts[0] || '';
    const identifier = parts.slice(1).join('-');
    const expectedContextPath = `/api/${vendor}/${identifier}`;

    if (contextPath !== expectedContextPath) {
      errors.push({ field: 'Context Path', message: `VAL-002: Must be exactly ${expectedContextPath} matching the module name.`, severity: 'error', tab: 'info' });
    }

    if (!version.trim()) {
      errors.push({ field: 'Version', message: 'VAL-003: Version cannot be empty.', severity: 'error', tab: 'info' });
    } else if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-zA-Z0-9-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-zA-Z0-9-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.test(version)) {
      errors.push({ field: 'Version', message: 'VAL-003: Must be valid Semantic Versioning (SemVer 2.0.0).', severity: 'error', tab: 'info' });
    }

    publicApis.forEach((api, index) => {
      const path = api.path.trim();
      if (path) {
        if (/:\w+/.test(path)) {
          errors.push({ field: `Public API #${index + 1}`, message: `VAL-004: Path variables must use curly braces {variableName} in "${path}".`, severity: 'error', tab: 'apis' });
        }
        if (path.includes('?')) {
          errors.push({ field: `Public API #${index + 1}`, message: `VAL-005: No query parameters (?key=val) allowed in paths in "${path}".`, severity: 'error', tab: 'apis' });
        }
      }
    });

    dependencies.forEach((dep, index) => {
      const depName = dep.name.trim();
      const versionRange = dep.versionRange.trim();
      if (depName || versionRange) {
        if (!depName) {
          errors.push({ field: `Dependency #${index + 1}`, message: `VAL-007: Dependency name cannot be empty.`, severity: 'error', tab: 'dependencies' });
        }
        if (!versionRange) {
          errors.push({ field: `Dependency #${index + 1}`, message: `VAL-007: Dependency version range cannot be empty.`, severity: 'error', tab: 'dependencies' });
        } else if (!/^[~^\[]/.test(versionRange) && !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/.test(versionRange)) {
          errors.push({ field: `Dependency #${index + 1}`, message: `VAL-007: Version range "${versionRange}" must match standard SemVer range specifications.`, severity: 'error', tab: 'dependencies' });
        }
      }
    });

    if (dependencies.length > 0) {
      errors.push({
        field: 'Cross-Check Catalog',
        message: 'VAL-006 & VAL-008: Target modules and accessed APIs will be cross-checked against the portal catalog upon upload.',
        severity: 'warning',
        tab: 'dependencies'
      });
    }

    return errors;
  }, [name, version, contextPath, publicApis, dependencies]);

  // Topology Nodes calculation
  const flowNodes = useMemo(() => {
    const nodes = [
      {
        id: 'main',
        type: 'mainModule',
        data: { name: name, version: version },
        position: { x: 350, y: 30 },
      }
    ];

    const validDeps = dependencies.filter(d => d.name.trim());
    const spacing = 180;

    validDeps.forEach((d, i) => {
      const totalWidth = (validDeps.length - 1) * spacing;
      const x = 350 + 40 - (totalWidth / 2) + (i * spacing);
      nodes.push({
        id: `dep-${i}`,
        type: 'dependency',
        data: { name: d.name, version: d.versionRange || 'latest' },
        position: { x, y: 160 },
      });
    });

    return nodes;
  }, [name, version, dependencies]);

  // Topology Edges calculation
  const flowEdges = useMemo(() => {
    const validDeps = dependencies.filter(d => d.name.trim());
    return validDeps.map((_, i) => ({
      id: `e-main-dep-${i}`,
      source: 'main',
      target: `dep-${i}`,
      animated: true,
      type: 'smoothstep',
      style: {
        stroke: '#06b6d4',
        strokeWidth: 2,
        opacity: 0.8,
      },
    }));
  }, [dependencies]);

  // Node Click interactions
  const handleNodeClick = (_event: React.MouseEvent, node: any) => {
    if (node.id.startsWith('dep-')) {
      setActiveFormTab('dependencies');
      const idx = parseInt(node.id.replace('dep-', ''), 10);
      setHighlightedDepIndex(idx);
      setTimeout(() => setHighlightedDepIndex(null), 2500);
    } else if (node.id === 'main') {
      setActiveFormTab('info');
    }
  };

  // Smart input paste/type interceptors
  const handleApiPathChange = (idx: number, value: string) => {
    const next = [...publicApis];
    const trimmed = value.trim();
    const match = trimmed.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)$/i);
    if (match) {
      next[idx].method = match[1].toUpperCase();
      next[idx].path = match[2];
    } else {
      next[idx].path = value;
    }
    setPublicApis(next);
  };

  const handleDepNameChange = (idx: number, value: string) => {
    const next = [...dependencies];
    const trimmed = value.trim();
    if (trimmed.includes('@')) {
      const [namePart, rangePart] = trimmed.split('@');
      next[idx].name = namePart.trim();
      next[idx].versionRange = rangePart.trim();
    } else {
      next[idx].name = value;
    }
    setDependencies(next);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manifestXml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadXml = () => {
    const element = document.createElement("a");
    const file = new Blob([manifestXml], { type: 'text/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `${name || 'module'}-manifest.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const xmlLines = manifestXml.split('\n');

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 flex flex-col p-6 gap-5 transition-colors duration-300 overflow-y-auto font-sans grid-bg isolate">
      {/* Background ambient lighting */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/[0.02] rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/[0.02] rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <header className="shrink-0 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-4 relative">
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            Manifest Builder
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-0.5 text-xs font-semibold">
            Edit parameters side-by-side, verify problems, and analyze dependency relationships below.
          </p>
        </div>
        <div className="w-28 h-20 text-zinc-400 dark:text-zinc-700 pointer-events-none hidden xl:block absolute right-0 top-[-10px]">
          <ManifestBuilderFigure
            className="w-full h-full"
            opacity={0.7}
            isActive={validationErrors.length > 0}
            hasError={validationErrors.filter(e => e.severity === 'error').length > 0}
          />
        </div>
      </header>

      {/* Top Split editors Row: Metadata Form (Left) & Generated XML Code (Right) */}
      <div className="grid grid-cols-12 gap-5 shrink-0">
        
        {/* Editor 1: Module Metadata Input (col-span-6) */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[380px] shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 p-2 gap-1.5 shrink-0">
            <button
              onClick={() => setActiveFormTab('info')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFormTab === 'info'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              <IdentificationCard className="w-4 h-4 text-cyan-500" />
              Module Info
            </button>
            <button
              onClick={() => setActiveFormTab('apis')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFormTab === 'apis'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              <Lightning className="w-4 h-4 text-cyan-500" />
              Exposed APIs
              {publicApis.filter(a => a.path).length > 0 && (
                <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-accent text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {publicApis.filter(a => a.path).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveFormTab('dependencies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFormTab === 'dependencies'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              <ShareNetwork className="w-4 h-4 text-cyan-500" />
              Dependencies
              {dependencies.filter(d => d.name).length > 0 && (
                <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-accent text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {dependencies.filter(d => d.name).length}
                </span>
              )}
            </button>
          </div>

          {/* Form scroll view */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {activeFormTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <LocalFormField
                    label="Module Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="vendor-name"
                  />
                  <LocalFormField
                    label="Version"
                    name="version"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="1.0.0"
                  />
                </div>
                <LocalFormField
                  label="Context Path"
                  name="contextPath"
                  value={contextPath}
                  onChange={(e) => setContextPath(e.target.value)}
                  placeholder="/api/vendor/name"
                />
                <LocalFormField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  textarea
                  rows={3}
                  placeholder="Module details..."
                />
              </div>
            )}

            {activeFormTab === 'apis' && (
              <div className="space-y-3">
                {publicApis.map((api, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2 rounded-xl border border-zinc-200/40 dark:border-zinc-900/60 transition-all hover:border-zinc-250 dark:hover:border-zinc-800">
                    <select
                      value={api.method}
                      onChange={(e) => {
                        const next = [...publicApis];
                        next[idx].method = e.target.value;
                        setPublicApis(next);
                      }}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 text-zinc-800 dark:text-zinc-200"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="PATCH">PATCH</option>
                    </select>
                    
                    <input
                      type="text"
                      value={api.path}
                      onChange={(e) => handleApiPathChange(idx, e.target.value)}
                      placeholder="e.g. /reports/{id}"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200"
                    />
                    
                    <button
                      onClick={() => {
                        setPublicApis(publicApis.filter((_, i) => i !== idx));
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-550/10 transition-colors cursor-pointer"
                      title="Delete API"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setPublicApis([...publicApis, { method: 'GET', path: '' }])}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all duration-200 cursor-pointer bg-zinc-50/50 dark:bg-zinc-950/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Exposed API
                </button>
              </div>
            )}

            {activeFormTab === 'dependencies' && (
              <div className="space-y-3">
                {dependencies.map((dep, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2 rounded-xl border transition-all duration-300 ${
                      highlightedDepIndex === idx
                        ? 'border-cyan-500 ring-2 ring-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.15)] bg-cyan-500/[0.02]'
                        : 'border-zinc-200/40 dark:border-zinc-900/60 hover:border-zinc-250 dark:hover:border-zinc-800'
                    }`}
                  >
                    <input
                      type="text"
                      value={dep.name}
                      onChange={(e) => handleDepNameChange(idx, e.target.value)}
                      placeholder="Dependency name (e.g. core-auth)"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200"
                    />
                    
                    <input
                      type="text"
                      value={dep.versionRange}
                      onChange={(e) => {
                        const next = [...dependencies];
                        next[idx].versionRange = e.target.value;
                        setDependencies(next);
                      }}
                      placeholder="Range (^1.0)"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 w-1/3 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200"
                    />

                    <button
                      onClick={() => {
                        setDependencies(dependencies.filter((_, i) => i !== idx));
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-550/10 transition-colors cursor-pointer"
                      title="Delete Dependency"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setDependencies([...dependencies, { name: '', versionRange: '' }])}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all duration-200 cursor-pointer bg-zinc-50/50 dark:bg-zinc-950/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Dependency Module
                  </button>
              </div>
            )}
          </div>
        </section>

        {/* Editor 2: Generated XML Output Card (col-span-6) */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[380px] shadow-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 font-sans">
              <FileCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Generated XML Manifest
            </h2>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="cursor-pointer border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-950 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 transition-all duration-150 active:scale-[0.96] flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <span>Copy XML</span>
                )}
              </button>
              <button
                onClick={downloadXml}
                className="cursor-pointer border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-950 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 transition-all duration-150 active:scale-[0.96] flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Download</span>
              </button>
            </div>
          </div>
          {/* Explicit theme-aware background/text configuration prevents text blending and ensures light/dark compatibility */}
          <div className="flex-grow bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 overflow-auto shadow-inner select-text p-4 font-mono text-[11.5px] leading-relaxed custom-scrollbar min-h-0 border-t border-zinc-100 dark:border-zinc-900/50">
            {xmlLines.map((line, idx) => (
              <div key={idx} className="flex gap-3 group">
                <span className="text-zinc-400 dark:text-zinc-500 text-right w-5 shrink-0 select-none text-[9px] pt-[2.5px] font-mono font-bold border-r border-zinc-200 dark:border-zinc-900/60 pr-2">
                  {idx + 1}
                </span>
                <span className="whitespace-pre font-mono">
                  {highlightXml(line, theme)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Middle Panel: Console & Problems list Drawer (Collapsible) */}
      {isConsoleExpanded ? (
        <section className="shrink-0 flex flex-col border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-2xl shadow-md overflow-hidden h-48">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 select-none shrink-0">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveConsoleTab('problems')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  activeConsoleTab === 'problems'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-accent'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <span>Problems</span>
                <span className="bg-zinc-200 dark:bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded-md text-zinc-600 dark:text-zinc-400 font-mono font-bold">
                  {validationErrors.length}
                </span>
              </button>
              <button
                onClick={() => setActiveConsoleTab('info')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  activeConsoleTab === 'info'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-accent'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <span>Configuration Info</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsConsoleExpanded(false)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1 rounded-md transition-colors cursor-pointer">
                <CaretDown className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-white/40 dark:bg-zinc-950/20 custom-scrollbar min-h-0">
            {activeConsoleTab === 'problems' ? (
              validationErrors.length === 0 ? (
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-5 h-5" weight="fill" />
                  <span className="text-xs font-bold font-sans">No problems have been detected in the manifest. Checked and ready for catalog registry!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {validationErrors.map((err, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleProblemClick(err.tab)}
                      className="group flex items-start gap-3 p-2 rounded-xl bg-zinc-50/50 hover:bg-zinc-100/60 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 cursor-pointer border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800 transition-all font-sans"
                    >
                      <div className={`mt-0.5 rounded p-0.5 shrink-0 ${
                        err.severity === 'error'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        <Warning className="w-3.5 h-3.5" weight="bold" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex gap-2 items-center flex-wrap">
                          <span className="font-mono text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            {err.field}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                          <span className={`font-mono text-[9px] font-bold uppercase ${
                            err.severity === 'error' ? 'text-red-500' : 'text-amber-500'
                          }`}>
                            {err.severity}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-0.5 leading-relaxed">
                          {err.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-3 max-w-xl font-sans">
                <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200 uppercase tracking-wider">Topology Summary Specifications</h4>
                <div className="grid grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-900/60">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold block uppercase tracking-wider">APIs Registered</span>
                    <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-1 block">
                      {publicApis.filter(a => a.path).length}
                    </span>
                  </div>
                  <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-900/60">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold block uppercase tracking-wider">Declared Dependencies</span>
                    <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-1 block">
                      {dependencies.filter(d => d.name).length}
                    </span>
                  </div>
                  <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-900/60">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold block uppercase tracking-wider">Topology Nodes</span>
                    <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-1 block">
                      {flowNodes.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div
          className="shrink-0 flex items-center justify-between border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-md cursor-pointer transition-all hover:bg-zinc-100/40 dark:hover:bg-zinc-900/40"
          onClick={() => setIsConsoleExpanded(true)}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-sans">
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Console & Diagnostics
            </span>
            {validationErrors.filter(e => e.severity === 'error').length > 0 ? (
              <span className="flex items-center gap-1 text-[9px] font-bold text-red-655 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full font-mono">
                {validationErrors.filter(e => e.severity === 'error').length} Errors
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-sans">
                Ready
              </span>
            )}
          </div>
          <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer">
            <CaretUp className="w-4 h-4" weight="bold" />
          </button>
        </div>
      )}

      {/* Bottom Panel: Dependency Graph Canvas (Full-Width, Bottom) */}
      <section className="shrink-0 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[500px] shadow-lg overflow-hidden">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800/85 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-sans">
            <ShareNetwork className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Dependency Graph Topology
          </h2>
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
            active layout graph
          </span>
        </div>
        <div className="flex-grow w-full bg-zinc-100/30 dark:bg-zinc-950/40 relative min-h-0">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
            attributionPosition="bottom-right"
            colorMode={theme === 'dark' ? 'dark' : 'light'}
          >
            <Background color="#06b6d4" className="opacity-[0.05] dark:opacity-[0.01]" gap={16} size={1} />
            <Controls className="!bg-white dark:!bg-zinc-950 !border-zinc-200 dark:!border-zinc-900 !shadow-sm fill-zinc-800 dark:fill-white scale-[0.85] origin-bottom-left" />
            <MiniMap
              nodeColor={(n) => n.id === 'main' ? '#06b6d4' : (theme === 'dark' ? '#27272a' : '#e4e4e7')}
              maskColor={theme === 'dark' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.45)'}
              className="!bg-white dark:!bg-zinc-950 !border-zinc-250 dark:!border-zinc-900 rounded-xl !shadow-xs scale-[0.8] origin-bottom-right"
              nodeStrokeWidth={0}
              nodeBorderRadius={6}
            />
          </ReactFlow>
        </div>
      </section>
    </div>
  );

  function handleProblemClick(tab: 'info' | 'apis' | 'dependencies') {
    setActiveFormTab(tab);
  }
}
