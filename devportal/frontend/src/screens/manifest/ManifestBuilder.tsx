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
  IdentificationCard
} from '@phosphor-icons/react';
import { ManifestBuilderFigure } from '../../components/ui/LineArt';

// Local Custom FormField to enable full premium style and light/dark theme compatibility
interface LocalFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}

function LocalFormField({ label, error, textarea, rows, ...props }: LocalFormFieldProps) {
  const inputClasses = `w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-950 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-accent/30 focus:border-cyan-accent ${error
    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-800'
    }`;

  return (
    <div className="flex flex-col gap-1.5 font-sans">
      <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">{label}</label>
      {textarea ? (
        <textarea
          className={`${inputClasses} resize-y font-sans`}
          rows={rows ?? 3}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

// Custom Main Module Node for React Flow Canvas
function MainModuleNode({ data }: { data: { name: string; version: string; author: string } }) {
  return (
    <div className="relative group rounded-lg border border-cyan-accent/40 bg-white dark:bg-zinc-950 px-5 py-4 shadow-[0_0_15px_rgba(0,240,255,0.08)] dark:shadow-[0_0_20px_rgba(0,240,255,0.05)] transition-all duration-300 hover:border-cyan-accent hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]">
      <div className="absolute inset-0 -z-10 rounded-lg bg-cyan-accent/[0.02] dark:bg-cyan-accent/[0.01]" />

      <div className="flex flex-col gap-2 min-w-[160px]">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Active Module</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse shadow-[0_0_8px_#00f0ff]" />
        </div>
        <h4 className="font-mono font-bold text-sm text-zinc-900 dark:text-white tracking-tight">
          {data.name || 'unnamed'}
        </h4>
        <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 rounded border border-zinc-100 dark:border-zinc-800/80 px-2 py-0.5">
          <span className="font-semibold text-cyan-600 dark:text-cyan-accent">v{data.version || '0.0.0'}</span>
          <span className="text-zinc-400 dark:text-zinc-500">{data.author || 'anon'}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-accent !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

// Custom Dependency Node for React Flow Canvas
function DependencyNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-cyan-accent/40 dark:hover:border-cyan-accent/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
      <div className="flex flex-col gap-1.5 min-w-[130px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Dependency</span>
        <h5 className="font-mono font-semibold text-xs text-zinc-800 dark:text-zinc-200">
          {data.name}
        </h5>
        <div className="inline-block self-start font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/40 px-1.5 py-0.5 rounded border border-zinc-100 dark:border-zinc-800/40">
          {data.version}
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

export function ManifestBuilder() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: 'acme-cardiology',
    version: '1.2.4',
    description: 'Cardiology diagnostic viewer and reporting module.',
    contextPath: '/api/acme/cardiology',
    publicApis: 'GET /reports/{reportId}, GET /reports/search',
    dependencies: 'patient-registration@[1.0.0, 2.0.0), hospital-onboarding@^1.0.0',
  });

  const [isCopied, setIsCopied] = useState(false);

  const manifestXml = useMemo(() => {
    const apis = formData.publicApis
      .split(',')
      .map(api => api.trim())
      .filter(Boolean)
      .map(api => {
        const parts = api.split(' ');
        const method = parts[0]?.toUpperCase() || 'GET';
        const path = parts.slice(1).join(' ') || '/';
        return `        <api>\n            <path>${path}</path>\n            <method>${method}</method>\n            <description>Exposed API</description>\n            <requiredRole>ANY</requiredRole>\n        </api>`;
      })
      .join('\n');

    const deps = formData.dependencies
      .split(',')
      .map(d => d.trim())
      .filter(Boolean)
      .map(d => {
        const [name, version] = d.split('@');
        return `        <dependency>\n            <name>${name}</name>\n            <versionRange>${version || 'latest'}</versionRange>\n            <accessedApis>\n                <!-- accessed APIs go here -->\n            </accessedApis>\n        </dependency>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<ModuleManifest>
    <!-- 1. General Metadata -->
    <name>${formData.name}</name>
    <version>${formData.version}</version>
    <description>${formData.description}</description>
    <contextPath>${formData.contextPath}</contextPath>

    <!-- 2. Exposed Public APIs -->
    <publicApis>
${apis || '        <!-- No public APIs defined -->'}
    </publicApis>

    <!-- 3. Declared External Dependencies -->
    <dependencies>
${deps || '        <!-- No dependencies defined -->'}
    </dependencies>
</ModuleManifest>`;
  }, [formData]);

  const validationErrors = useMemo(() => {
    const errors: Array<{ field: string; message: string; severity: 'error' | 'warning' }> = [];

    // VAL-001: Validate Module Name
    const reservedNames = ['wrapper', 'saasController', 'config'];
    if (!formData.name.trim()) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Module Name cannot be empty.', severity: 'error' });
    } else if (!/^[a-z0-9]+-[a-z0-9\-]+$/.test(formData.name)) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Must follow the [vendor]-[name] structure (lowercase alphanumeric and hyphens only).', severity: 'error' });
    } else if (reservedNames.includes(formData.name)) {
      errors.push({ field: 'Module Name', message: 'VAL-001: Name matches a platform-reserved word.', severity: 'error' });
    }

    // VAL-002: Context Path
    const parts = formData.name.split('-');
    const vendor = parts[0] || '';
    const identifier = parts.slice(1).join('-');
    const expectedContextPath = `/api/${vendor}/${identifier}`;

    if (formData.contextPath !== expectedContextPath) {
      errors.push({ field: 'Context Path', message: `VAL-002: Must be exactly ${expectedContextPath} matching the module name.`, severity: 'error' });
    }

    // VAL-003: Validate Version
    if (!formData.version.trim()) {
      errors.push({ field: 'Version', message: 'VAL-003: Version cannot be empty.', severity: 'error' });
    } else if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-zA-Z0-9-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-zA-Z0-9-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.test(formData.version)) {
      errors.push({ field: 'Version', message: 'VAL-003: Must be valid Semantic Versioning (SemVer 2.0.0).', severity: 'error' });
    }

    // VAL-004 & VAL-005: Public APIs
    if (formData.publicApis.trim()) {
      const apis = formData.publicApis.split(',');
      apis.forEach((api) => {
        const trimmed = api.trim();
        if (trimmed) {
          const apiParts = trimmed.split(' ');
          const path = apiParts.slice(1).join(' ') || '/';

          if (/:\w+/.test(path)) {
            errors.push({ field: 'Public APIs', message: `VAL-004: Path variables must use curly braces {variableName} in "${path}".`, severity: 'error' });
          }
          if (path.includes('?')) {
            errors.push({ field: 'Public APIs', message: `VAL-005: No query parameters (?key=val) allowed in paths in "${path}".`, severity: 'error' });
          }
        }
      });
    }

    // VAL-006, VAL-007, VAL-008: Dependencies
    if (formData.dependencies.trim()) {
      const deps = formData.dependencies.split(',');
      deps.forEach((d) => {
        const trimmed = d.trim();
        if (trimmed) {
          const depParts = trimmed.split('@');
          if (depParts.length !== 2 || !depParts[0].trim() || !depParts[1].trim()) {
            errors.push({
              field: 'Dependencies',
              message: `VAL-007: Dependency format "${trimmed}" is invalid. Use name@versionRange syntax.`,
              severity: 'error'
            });
          } else {
            const versionRange = depParts[1].trim();
            // Basic SemVer range check for VAL-007
            if (!/^[~^\[]/.test(versionRange) && !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/.test(versionRange)) {
              errors.push({
                field: 'Dependencies',
                message: `VAL-007: Version range "${versionRange}" must match standard SemVer range specifications.`,
                severity: 'error'
              });
            }
          }
        }
      });

      errors.push({
        field: 'Dependencies',
        message: 'VAL-006 & VAL-008: Target modules and accessed APIs will be cross-checked against the portal catalog upon upload.',
        severity: 'warning'
      });
    }

    return errors;
  }, [formData]);

  const flowNodes = useMemo(() => {
    const nodes = [
      {
        id: 'main',
        type: 'mainModule',
        data: { name: formData.name, version: formData.version, author: formData.name.split('-')[0] || 'vendor' },
        position: { x: 250, y: 30 },
      }
    ];

    const deps = formData.dependencies.split(',').map(d => d.trim()).filter(Boolean);
    const spacing = 180;

    deps.forEach((d, i) => {
      const [name, version] = d.split('@');
      const totalWidth = (deps.length - 1) * spacing;
      const x = 250 + 60 - (totalWidth / 2) + (i * spacing);
      nodes.push({
        id: `dep-${i}`,
        type: 'dependency',
        data: { name, version: version || 'latest', author: '' },
        position: { x, y: 190 },
      });
    });

    return nodes;
  }, [formData]);

  const flowEdges = useMemo(() => {
    const deps = formData.dependencies.split(',').map(d => d.trim()).filter(Boolean);
    return deps.map((_, i) => ({
      id: `e-main-dep-${i}`,
      source: 'main',
      target: `dep-${i}`,
      animated: true,
      type: 'smoothstep',
      style: {
        stroke: '#00f0ff',
        strokeWidth: 2,
        opacity: 0.8,
      },
    }));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manifestXml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const xmlLines = manifestXml.split('\n');

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 flex flex-col p-6 gap-6 transition-colors duration-300">
      {/* Top Header */}
      <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 pb-8 relative">
        <div className="absolute right-6 bottom-[-14px] w-32 h-24 text-zinc-500 dark:text-zinc-500 pointer-events-none hidden xl:block">
          <ManifestBuilderFigure
            className="w-full h-full"
            opacity={0.85}
            isActive={validationErrors.length > 0}
            hasError={validationErrors.length > 0}
          />
        </div>
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
            Manifest Builder
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm font-medium">
            Generate production-ready XML deployment manifests and visualize dependency topologies.
          </p>
        </div>
      </header>

      {/* Grid view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0">

        {/* Left column (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-h-0">

          {/* Metadata Form Card */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm shrink-0">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2 font-sans">
              <IdentificationCard className="w-5 h-5 text-zinc-800 dark:text-zinc-300" weight="bold" />
              Module Metadata
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <LocalFormField label="Module Name" name="name" value={formData.name} onChange={handleChange} />
                <LocalFormField label="Version" name="version" value={formData.version} onChange={handleChange} />
              </div>
              <LocalFormField label="Context Path" name="contextPath" value={formData.contextPath} onChange={handleChange} />
              <LocalFormField label="Description" name="description" value={formData.description} onChange={handleChange} textarea rows={2} />
              <LocalFormField
                label="Public APIs (comma-separated, METHOD /path)"
                name="publicApis"
                value={formData.publicApis}
                onChange={handleChange}
                placeholder="GET /reports/{id}, POST /reports"
              />
              <LocalFormField
                label="Dependencies (comma-separated, name@versionRange)"
                name="dependencies"
                value={formData.dependencies}
                onChange={handleChange}
                placeholder="patient-registration@[1.0.0, 2.0.0)"
              />
            </div>
          </section>

          {/* Compile Warnings / Validation Errors */}
          {validationErrors.length > 0 && (
            <section className="shrink-0 flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest font-mono">
                Manifest Diagnostics
              </h3>
              <div className="flex flex-col gap-3">
                {validationErrors.map((err, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-lg border p-4 transition-all duration-200 active:scale-[0.99] ${err.severity === 'error'
                      ? 'border-zinc-200 hover:border-red-500/50 dark:border-zinc-800/80 dark:hover:border-red-500/40 bg-zinc-50/30 dark:bg-zinc-950/20'
                      : 'border-zinc-200 hover:border-amber-500/50 dark:border-zinc-800/80 dark:hover:border-amber-500/40 bg-zinc-50/30 dark:bg-zinc-950/20'
                      }`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-[3px] transition-transform duration-200 group-hover:scale-y-110 ${err.severity === 'error' ? 'bg-red-500 dark:bg-red-650' : 'bg-amber-500 dark:bg-amber-650'
                      }`} />

                    <div className="flex items-start gap-3 pl-1">
                      <div className={`mt-0.5 rounded p-1 shrink-0 ${err.severity === 'error'
                        ? 'bg-red-100/60 text-red-650 dark:bg-red-950/80 dark:text-red-400/90'
                        : 'bg-amber-100/60 text-amber-650 dark:bg-amber-950/80 dark:text-amber-400/90'
                        }`}>
                        <Warning className="w-4 h-4" weight="bold" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${err.severity === 'error' ? 'text-red-600 dark:text-red-400' : 'text-amber-650 dark:text-amber-500'
                            }`}>
                            {err.severity === 'error' ? 'Validation Error' : 'Validation Warning'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                            {err.field}
                          </span>
                        </div>
                        <p className="font-sans text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                          {err.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* XML Output Card */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm flex-grow flex flex-col min-h-[250px] lg:min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-sans">
                <FileCode className="w-5 h-5 text-zinc-800 dark:text-zinc-300" weight="bold" />
                Generated XML
              </h2>
              <button
                onClick={copyToClipboard}
                className="cursor-pointer relative overflow-hidden group border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 px-3.5 py-1.5 rounded-lg font-mono text-xs text-zinc-600 dark:text-zinc-400 transition-all duration-200 active:scale-[0.96] flex items-center gap-2"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" weight="bold" />
                    <span className="text-emerald-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" weight="bold" />
                    <span>Copy XML</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-xl flex-grow overflow-auto min-h-0 shadow-inner">
              <div className="p-4 font-mono text-sm leading-relaxed select-text">
                {xmlLines.map((line, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <span className="text-zinc-400 dark:text-zinc-700 text-right w-6 shrink-0 select-none text-[11px] pt-[2px] font-mono font-medium border-r border-zinc-900/40 pr-3">
                      {idx + 1}
                    </span>
                    <span className="text-cyan-800 dark:text-cyan-accent/95 whitespace-pre font-mono">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right column (col-span-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col min-h-[450px] lg:min-h-0 shadow-sm">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-sans">
              <ShareNetwork className="w-5 h-5 text-zinc-800 dark:text-zinc-300" weight="bold" />
              Dependency Graph
            </h2>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold font-mono">
              topological layout
            </div>
          </div>
          <div className="flex-grow w-full bg-zinc-100/50 dark:bg-zinc-950/70 relative">
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-right"
              colorMode={theme === 'dark' ? 'dark' : 'light'}
            >
              <Background color="#00f0ff" className="opacity-[0.06] dark:opacity-[0.02]" gap={16} size={1} />
              <Controls className="!bg-white dark:!bg-zinc-950 !border-zinc-200 dark:!border-zinc-900 !shadow-sm fill-zinc-800 dark:fill-white shrink-0" />
              <MiniMap
                nodeColor={(n) => n.id === 'main' ? '#00f0ff' : (theme === 'dark' ? '#1e293b' : '#cbd5e1')}
                maskColor={theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.4)'}
                className="!bg-white dark:!bg-zinc-950 !border-zinc-200 dark:!border-zinc-900 rounded-lg !shadow-sm"
                nodeStrokeWidth={0}
                nodeBorderRadius={4}
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
