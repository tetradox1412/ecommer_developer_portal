import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManifestFormCore } from '../../manifest/ManifestFormCore';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { readFileAsText } from '../../../lib/package-io';
import { ArrowLeft, ArrowRight, UploadSimple } from '@phosphor-icons/react';
import type { ManifestState, ManifestApi, ManifestDependency } from '../../../types';

export function ManifestStep() {
  const navigate = useNavigate();
  const { manifest, metadata, setManifest, setCurrentStep } = useWorkspaceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportXml = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await readFileAsText(file);
    const parsed = parseManifestXml(text);
    if (parsed) setManifest(parsed);
    else alert('Could not parse manifest XML — fields left unchanged.');
    e.target.value = '';
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6 overflow-y-auto">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Step 2</span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Manifest Builder</h1>
          <p className="text-sm text-zinc-500">Define APIs (with request/response schemas) and dependencies.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UploadSimple className="w-3.5 h-3.5" weight="bold" /> Import XML
          </button>
          <input ref={fileInputRef} type="file" accept=".xml,text/xml" className="hidden" onChange={handleImportXml} />
        </div>
      </header>

      <ManifestFormCore manifest={manifest} metadata={metadata} onChange={(patch) => setManifest(patch)} />

      <footer className="shrink-0 flex justify-between sticky bottom-0 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur py-3 -mx-6 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <button onClick={() => { setCurrentStep('dsl'); navigate('/workspace/dsl'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="w-4 h-4" weight="bold" /> Back to DSL
        </button>
        <button onClick={() => { setCurrentStep('details'); navigate('/workspace/details'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-cyan-accent dark:text-zinc-950 text-sm font-bold hover:opacity-90">
          Proceed to Details <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </footer>
    </div>
  );
}

/** Lenient parser: pulls name/version/description/contextPath and the list of
 * <api>/<dependency> entries back into the form. Schema CDATA blocks are
 * parsed back into objects when valid JSON. */
function parseManifestXml(xml: string): Partial<ManifestState> | null {
  try {
    const get = (tag: string) => {
      const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : '';
    };
    const name = get('name');
    if (!name) return null;

    const apis: ManifestApi[] = [];
    const apiRe = /<api>([\s\S]*?)<\/api>/g;
    let am: RegExpExecArray | null;
    while ((am = apiRe.exec(xml))) {
      const block = am[1];
      const pick = (t: string) => { const m = block.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return m ? m[1].trim() : ''; };
      const cdata = (t: string): object | undefined => {
        const m = block.match(new RegExp(`<${t}><!\[CDATA\[([\s\S]*?)\]\]></${t}>`));
        if (!m) return undefined;
        try { return JSON.parse(m[1]); } catch { return undefined; }
      };
      apis.push({
        method: (pick('method') || 'GET') as ManifestApi['method'],
        path: pick('path'),
        description: pick('description'),
        requiredRole: pick('requiredRole') || 'ANY',
        requestSchema: cdata('requestSchema'),
        responseSchema: cdata('responseSchema'),
        exampleResponse: cdata('exampleResponse'),
      });
    }

    const dependencies: ManifestDependency[] = [];
    const depRe = /<dependency>([\s\S]*?)<\/dependency>/g;
    let dm: RegExpExecArray | null;
    while ((dm = depRe.exec(xml))) {
      const block = dm[1];
      const pick = (t: string) => { const m = block.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return m ? m[1].trim() : ''; };
      dependencies.push({ name: pick('name'), versionRange: pick('versionRange') });
    }

    return {
      name, version: get('version') || '0.1.0', description: get('description'),
      contextPath: get('contextPath'), publicApis: apis, dependencies,
    };
  } catch {
    return null;
  }
}
