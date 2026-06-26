import { useState, useMemo } from 'react';
import {
  FileCode, Check, Warning, ShareNetwork, IdentificationCard,
  CheckCircle, Plus, Trash, Download, Terminal, Lightning, CaretDown, CaretUp,
} from '@phosphor-icons/react';
import { ReactFlow, Background, Controls, MiniMap, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../../components/ui/ThemeContext';
import { buildManifestXmlString, type ManifestApi } from './manifestXml';
import { validateSemver } from '../../lib/semver';
import type { ManifestState, ModuleMetadata } from '../../types';

export interface ManifestFormCoreProps {
  manifest: ManifestState;
  metadata: ModuleMetadata;
  onChange: (patch: Partial<ManifestState>) => void;
}

function LocalFormField({ label, textarea, rows, ...props }: any) {
  const inputClasses = `w-full px-4 py-2.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500`;
  return (
    <div className="flex flex-col gap-1.5 font-sans">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">{label}</label>
      {textarea
        ? <textarea className={`${inputClasses} resize-none font-sans text-sm`} rows={rows ?? 3} {...props} />
        : <input className={`${inputClasses} text-sm`} {...props} />}
    </div>
  );
}

function MainModuleNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-cyan-500/30 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-5 py-4 shadow-[0_0_20px_rgba(6,182,212,0.06)]">
      <div className="flex flex-col gap-2 min-w-[150px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Active Module</span>
        <h4 className="font-mono font-bold text-sm text-zinc-900 dark:text-white truncate">{data.name || 'unnamed'}</h4>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/60 rounded border border-zinc-200/50 dark:border-zinc-800/80 px-2 py-0.5">
          <span className="font-bold text-cyan-600 dark:text-cyan-400">v{data.version || '0.0.0'}</span><span>active</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

function DependencyNode({ data }: { data: { name: string; version: string } }) {
  return (
    <div className="relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-4 py-3.5 shadow-sm">
      <div className="flex flex-col gap-1.5 min-w-[125px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Dependency</span>
        <h5 className="font-mono font-semibold text-xs text-zinc-850 dark:text-zinc-200 truncate">{data.name || 'unnamed'}</h5>
        <div className="inline-block self-start font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40 px-1.5 py-0.5 rounded border">{data.version || 'latest'}</div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-zinc-300 dark:!bg-zinc-700 !w-2 !h-2 !border-zinc-200 dark:!border-zinc-800" />
    </div>
  );
}

const nodeTypes = { mainModule: MainModuleNode, dependency: DependencyNode };

const highlightXml = (xml: string, theme: string) => {
  let html = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const isDark = theme === 'dark';
  const declClass = isDark ? 'text-zinc-500 font-mono' : 'text-zinc-400 font-mono';
  const commentClass = isDark ? 'text-emerald-500 font-mono italic' : 'text-emerald-600 font-mono italic';
  const tagClass = isDark ? 'text-cyan-400 font-semibold' : 'text-cyan-700 font-semibold';
  const attrClass = isDark ? 'text-amber-300 font-mono' : 'text-amber-700 font-mono';
  html = html.replace(/("[\s\S]*?")/g, `<span class="${attrClass}">$1</span>`);
  html = html.replace(/(&lt;\?xml[\s\S]*?\?&gt;)/g, `<span class="${declClass}">$1</span>`);
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span class="${commentClass}">$1</span>`);
  html = html.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, `<span class="${tagClass}">$1</span>`);
  html = html.replace(/(\/?&gt;)/g, `<span class="${tagClass}">$1</span>`);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

function isJson(s: string): boolean {
  if (!s.trim()) return true;
  try { JSON.parse(s); return true; } catch { return false; }
}

function tryParseJson(s: string): object | undefined {
  if (!s.trim()) return undefined;
  try { return JSON.parse(s); } catch { return undefined; }
}

function JsonField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const valid = isJson(value);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase flex items-center gap-2">
        {label}
        {value.trim() && (valid
          ? <span className="text-[9px] text-emerald-500">valid</span>
          : <span className="text-[9px] text-red-500">invalid JSON</span>)}
      </label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}
        className={`w-full px-3 py-2 rounded-lg bg-zinc-100/50 dark:bg-zinc-950/40 border font-mono text-xs outline-none focus:ring-2 focus:ring-cyan-500/10 ${valid ? 'border-zinc-200 dark:border-zinc-800' : 'border-red-500'}`} />
    </div>
  );
}

export function ManifestFormCore({ manifest, metadata, onChange }: ManifestFormCoreProps) {
  const { theme } = useTheme();
  const [activeFormTab, setActiveFormTab] = useState<'info' | 'apis' | 'dependencies'>('info');
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'problems' | 'info'>('problems');
  const [highlightedDepIndex, setHighlightedDepIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [expandedApi, setExpandedApi] = useState<number | null>(null);

  const manifestXml = useMemo(() => buildManifestXmlString(manifest, metadata), [manifest, metadata]);

  const validationErrors = useMemo(() => {
    const errors: Array<{ field: string; message: string; severity: 'error' | 'warning'; tab: 'info' | 'apis' | 'dependencies' }> = [];
    const reservedNames = ['wrapper', 'saasController', 'config'];
    if (!manifest.name.trim()) errors.push({ field: 'Module Name', message: 'VAL-001: Module Name cannot be empty.', severity: 'error', tab: 'info' });
    else if (!/^[a-z0-9]+-[a-z0-9\-]+$/.test(manifest.name)) errors.push({ field: 'Module Name', message: 'VAL-001: Must follow the [vendor]-[name] structure.', severity: 'error', tab: 'info' });
    else if (reservedNames.includes(manifest.name)) errors.push({ field: 'Module Name', message: 'VAL-001: Name matches a platform-reserved word.', severity: 'error', tab: 'info' });

    const parts = manifest.name.split('-');
    const expectedContextPath = `/api/${parts[0]}/${parts.slice(1).join('-')}`;
    if (manifest.contextPath && manifest.contextPath !== expectedContextPath) {
      errors.push({ field: 'Context Path', message: `VAL-002: Must be exactly ${expectedContextPath}.`, severity: 'error', tab: 'info' });
    }
    if (!manifest.version.trim()) errors.push({ field: 'Version', message: 'VAL-003: Version cannot be empty.', severity: 'error', tab: 'info' });
    else if (!validateSemver(manifest.version)) errors.push({ field: 'Version', message: 'VAL-003: Must be valid SemVer.', severity: 'error', tab: 'info' });

    manifest.publicApis.forEach((api, index) => {
      const path = api.path.trim();
      if (path) {
        if (/:\w+/.test(path)) errors.push({ field: `Public API #${index + 1}`, message: `VAL-004: Use {var} not :var in "${path}".`, severity: 'error', tab: 'apis' });
        if (path.includes('?')) errors.push({ field: `Public API #${index + 1}`, message: `VAL-005: No query params in "${path}".`, severity: 'error', tab: 'apis' });
      }
      if (api.requestSchema && !isJson(JSON.stringify(api.requestSchema))) errors.push({ field: `Public API #${index + 1}`, message: `VAL-009: Request schema is not valid JSON.`, severity: 'error', tab: 'apis' });
      if (api.responseSchema && !isJson(JSON.stringify(api.responseSchema))) errors.push({ field: `Public API #${index + 1}`, message: `VAL-009: Response schema is not valid JSON.`, severity: 'error', tab: 'apis' });
    });

    manifest.dependencies.forEach((dep, index) => {
      const depName = dep.name.trim();
      const vr = dep.versionRange.trim();
      if (depName || vr) {
        if (!depName) errors.push({ field: `Dependency #${index + 1}`, message: 'VAL-007: Dependency name cannot be empty.', severity: 'error', tab: 'dependencies' });
        if (!vr) errors.push({ field: `Dependency #${index + 1}`, message: 'VAL-007: Dependency version range cannot be empty.', severity: 'error', tab: 'dependencies' });
      }
    });
    return errors;
  }, [manifest]);

  const flowNodes = useMemo(() => {
    const nodes: any[] = [{ id: 'main', type: 'mainModule', data: { name: manifest.name, version: manifest.version }, position: { x: 350, y: 30 } }];
    const validDeps = manifest.dependencies.filter((d) => d.name.trim());
    const spacing = 180;
    validDeps.forEach((d, i) => {
      const totalWidth = (validDeps.length - 1) * spacing;
      const x = 350 + 40 - (totalWidth / 2) + (i * spacing);
      nodes.push({ id: `dep-${i}`, type: 'dependency', data: { name: d.name, version: d.versionRange || 'latest' }, position: { x, y: 160 } });
    });
    return nodes;
  }, [manifest]);

  const flowEdges = useMemo(() =>
    manifest.dependencies.filter((d) => d.name.trim()).map((_, i) => ({
      id: `e-main-dep-${i}`, source: 'main', target: `dep-${i}`, animated: true, type: 'smoothstep',
      style: { stroke: '#06b6d4', strokeWidth: 2, opacity: 0.8 },
    })), [manifest]);

  const set = (patch: Partial<ManifestState>) => onChange(patch);
  const updateApi = (idx: number, patch: Partial<ManifestApi>) => {
    const next = [...manifest.publicApis];
    next[idx] = { ...next[idx], ...patch };
    set({ publicApis: next });
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(manifestXml); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };
  const downloadXml = () => {
    const blob = new Blob([manifestXml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${manifest.name || 'module'}-manifest.xml`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const xmlLines = manifestXml.split('\n');
  const errorCount = validationErrors.filter((e) => e.severity === 'error').length;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-5 shrink-0">
        {/* Form */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[420px] shadow-lg overflow-hidden">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 p-2 gap-1.5 shrink-0">
            {([['info', 'Module Info', IdentificationCard], ['apis', 'Exposed APIs', Lightning], ['dependencies', 'Dependencies', ShareNetwork]] as const).map(([tab, label, Icon]) => (
              <button key={tab} onClick={() => setActiveFormTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeFormTab === tab ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}>
                <Icon className="w-4 h-4 text-cyan-500" /> {label}
                {tab === 'apis' && manifest.publicApis.filter((a) => a.path).length > 0 && <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">{manifest.publicApis.filter((a) => a.path).length}</span>}
                {tab === 'dependencies' && manifest.dependencies.filter((d) => d.name).length > 0 && <span className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">{manifest.dependencies.filter((d) => d.name).length}</span>}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {activeFormTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <LocalFormField label="Module Name" value={manifest.name} onChange={(e: any) => set({ name: e.target.value })} placeholder="vendor-name" />
                  <LocalFormField label="Version" value={manifest.version} onChange={(e: any) => set({ version: e.target.value })} placeholder="1.0.0" />
                </div>
                <LocalFormField label="Context Path" value={manifest.contextPath} onChange={(e: any) => set({ contextPath: e.target.value })} placeholder="/api/vendor/name" />
                <LocalFormField label="Description" textarea rows={3} value={manifest.description} onChange={(e: any) => set({ description: e.target.value })} placeholder="Module details..." />
              </div>
            )}

            {activeFormTab === 'apis' && (
              <div className="space-y-3">
                {manifest.publicApis.map((api, idx) => (
                  <div key={idx} className="border border-zinc-200/60 dark:border-zinc-900/60 rounded-xl overflow-hidden">
                    <div className="flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2">
                      <select value={api.method} onChange={(e) => updateApi(idx, { method: e.target.value as ManifestApi['method'] })}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 text-zinc-800 dark:text-zinc-200">
                        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <input value={api.path} onChange={(e) => updateApi(idx, { path: e.target.value })} placeholder="e.g. /reports/{id}"
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                      <button onClick={() => setExpandedApi(expandedApi === idx ? null : idx)} className="p-1.5 text-zinc-400 hover:text-cyan-500 rounded-lg" title="Toggle contract details">
                        {expandedApi === idx ? <CaretUp className="w-4 h-4" weight="bold" /> : <CaretDown className="w-4 h-4" weight="bold" />}
                      </button>
                      <button onClick={() => set({ publicApis: manifest.publicApis.filter((_, i) => i !== idx) })} className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg" title="Delete API"><Trash className="w-4 h-4" /></button>
                    </div>
                    {expandedApi === idx && (
                      <div className="p-3 space-y-2 bg-white dark:bg-zinc-950/40 border-t border-zinc-200/60 dark:border-zinc-900/60">
                        <LocalFormField label="Description" value={api.description} onChange={(e: any) => updateApi(idx, { description: e.target.value })} placeholder="What this endpoint does" />
                        <LocalFormField label="Required Role" value={api.requiredRole} onChange={(e: any) => updateApi(idx, { requiredRole: e.target.value })} placeholder="e.g. Admin, Patient, ANY" />
                        <JsonField label="Request Schema (JSON)" value={api.requestSchema ? JSON.stringify(api.requestSchema, null, 2) : ''}
                          onChange={(v) => updateApi(idx, { requestSchema: tryParseJson(v) })} />
                        <JsonField label="Response Schema (JSON)" value={api.responseSchema ? JSON.stringify(api.responseSchema, null, 2) : ''}
                          onChange={(v) => updateApi(idx, { responseSchema: tryParseJson(v) })} />
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => set({ publicApis: [...manifest.publicApis, { method: 'GET', path: '', description: '', requiredRole: 'ANY' }] })}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Exposed API
                </button>
              </div>
            )}

            {activeFormTab === 'dependencies' && (
              <div className="space-y-3">
                {manifest.dependencies.map((dep, idx) => (
                  <div key={idx} className={`flex gap-2 items-center bg-zinc-100/40 dark:bg-zinc-950/40 p-2 rounded-xl border ${highlightedDepIndex === idx ? 'border-cyan-500 ring-2 ring-cyan-500/10' : 'border-zinc-200/40 dark:border-zinc-900/60'}`}>
                    <input value={dep.name} onChange={(e) => { const n = [...manifest.dependencies]; n[idx].name = e.target.value; set({ dependencies: n }); }} placeholder="Dependency name"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                    <input value={dep.versionRange} onChange={(e) => { const n = [...manifest.dependencies]; n[idx].versionRange = e.target.value; set({ dependencies: n }); }} placeholder="Range (^1.0)"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-3 py-1.5 w-1/3 focus:outline-none focus:border-cyan-500 font-mono text-zinc-800 dark:text-zinc-200" />
                    <button onClick={() => set({ dependencies: manifest.dependencies.filter((_, i) => i !== idx) })} className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg"><Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => set({ dependencies: [...manifest.dependencies, { name: '', versionRange: '' }] })}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-250 dark:border-zinc-800 hover:border-cyan-500/40 text-xs font-semibold py-2 rounded-xl text-zinc-500 hover:text-cyan-500 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Dependency Module
                </button>
              </div>
            )}
          </div>
        </section>

        {/* XML preview */}
        <section className="col-span-12 lg:col-span-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[420px] shadow-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2.5"><FileCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Generated XML Manifest</h2>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                {isCopied ? <><Check className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-500">Copied</span></> : <span>Copy XML</span>}
              </button>
              <button onClick={downloadXml} className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1"><Download className="w-3.5 h-3.5" />Download</button>
            </div>
          </div>
          <div className="flex-grow bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 overflow-auto select-text p-4 font-mono text-[11.5px] leading-relaxed min-h-0 border-t border-zinc-100 dark:border-zinc-900/50">
            {xmlLines.map((line, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-zinc-400 dark:text-zinc-500 text-right w-5 shrink-0 select-none text-[9px] pt-[2.5px]">{idx + 1}</span>
                <span className="whitespace-pre">{highlightXml(line, theme)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Console / problems */}
      {isConsoleExpanded ? (
        <section className="shrink-0 flex flex-col border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-2xl shadow-md overflow-hidden h-40">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0">
            <div className="flex gap-2">
              <button onClick={() => setActiveConsoleTab('problems')} className={`px-3 py-1 text-xs font-bold border-b-2 ${activeConsoleTab === 'problems' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-zinc-500'}`}>Problems <span className="bg-zinc-200 dark:bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded-md font-mono">{validationErrors.length}</span></button>
              <button onClick={() => setActiveConsoleTab('info')} className={`px-3 py-1 text-xs font-bold border-b-2 ${activeConsoleTab === 'info' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-zinc-500'}`}>Configuration Info</button>
            </div>
            <button onClick={() => setIsConsoleExpanded(false)} className="text-zinc-400 hover:text-zinc-700"><CaretDown className="w-4 h-4" weight="bold" /></button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 min-h-0">
            {activeConsoleTab === 'problems' ? (validationErrors.length === 0 ? (
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-5 h-5" weight="fill" /><span className="text-xs font-bold">No problems detected. Ready for catalog registry!</span></div>
            ) : (
              <div className="space-y-2">
                {validationErrors.map((err, idx) => (
                  <div key={idx} onClick={() => setActiveFormTab(err.tab)} className="flex items-start gap-3 p-2 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 cursor-pointer hover:bg-zinc-100/60">
                    <div className={`mt-0.5 rounded p-0.5 ${err.severity === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-600'}`}><Warning className="w-3.5 h-3.5" weight="bold" /></div>
                    <div><span className="font-mono text-[9px] font-black uppercase text-zinc-400">{err.field}</span><p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-0.5">{err.message}</p></div>
                  </div>
                ))}
              </div>
            )) : (
              <div className="grid grid-cols-3 gap-4 text-xs font-semibold">
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">APIs</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{manifest.publicApis.filter((a) => a.path).length}</span></div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">Deps</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{manifest.dependencies.filter((d) => d.name).length}</span></div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/40 p-2.5 rounded-xl"><span className="text-[9px] text-zinc-400 block uppercase">Nodes</span><span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{flowNodes.length}</span></div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div onClick={() => setIsConsoleExpanded(true)} className="shrink-0 flex items-center justify-between border border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 px-5 py-2.5 rounded-2xl cursor-pointer">
          <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500"><Terminal className="w-4 h-4 text-cyan-600" /> Console & Diagnostics</span>
          {errorCount > 0 ? <span className="text-[9px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{errorCount} Errors</span> : <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Ready</span>}
          <CaretUp className="w-4 h-4 text-zinc-400" weight="bold" />
        </div>
      )}

      {/* Graph */}
      <section className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col h-[400px] shadow-lg overflow-hidden">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800/85 bg-zinc-50/50 dark:bg-zinc-950/40 shrink-0 flex items-center justify-between">
          <h2 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2"><ShareNetwork className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Dependency Graph Topology</h2>
        </div>
        <div className="flex-grow w-full bg-zinc-100/30 dark:bg-zinc-950/40 relative min-h-0">
          <ReactFlow nodes={flowNodes} edges={flowEdges} nodeTypes={nodeTypes}
            onNodeClick={(_e, node) => { if (node.id.startsWith('dep-')) { setActiveFormTab('dependencies'); const i = parseInt(node.id.replace('dep-', ''), 10); setHighlightedDepIndex(i); setTimeout(() => setHighlightedDepIndex(null), 2500); } else setActiveFormTab('info'); }}
            fitView colorMode={theme === 'dark' ? 'dark' : 'light'}>
            <Background color="#06b6d4" className="opacity-[0.05]" gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </section>
    </div>
  );
}
