import { useState, useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FormField } from '../../components/ui/FormField';

export function ManifestBuilder() {
  const [formData, setFormData] = useState({
    name: 'my-module',
    version: '1.0.0',
    description: 'A custom business logic module',
    author: 'dev-001',
    dependencies: 'auth-service@1.0, user-service@2.1',
  });

  const manifestXml = useMemo(() => {
    const deps = formData.dependencies
      .split(',')
      .map(d => d.trim())
      .filter(Boolean)
      .map(d => {
        const [name, version] = d.split('@');
        return `    <dependency name="${name}" version="${version || 'latest'}" />`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <metadata>
    <name>${formData.name}</name>
    <version>${formData.version}</version>
    <description>${formData.description}</description>
    <author>${formData.author}</author>
  </metadata>
  <dependencies>
${deps}
  </dependencies>
</manifest>`;
  }, [formData]);

  const flowNodes = useMemo(() => {
    const nodes = [
      {
        id: 'main',
        data: { label: `${formData.name} (v${formData.version})` },
        position: { x: 250, y: 50 },
        className: 'bg-blue-600 text-white border-none rounded-lg shadow-lg font-bold px-4 py-2',
      }
    ];

    const deps = formData.dependencies.split(',').map(d => d.trim()).filter(Boolean);
    
    deps.forEach((d, i) => {
      const [name, version] = d.split('@');
      nodes.push({
        id: `dep-${i}`,
        data: { label: `${name}\n@${version || 'latest'}` },
        position: { x: 100 + (i * 150), y: 200 },
        className: 'bg-slate-700 text-slate-200 border-none rounded-lg shadow font-medium px-4 py-2 text-center text-xs',
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
      style: { stroke: '#64748b', strokeWidth: 2 },
    }));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <header className="mb-8 shrink-0">
        <h1 className="text-3xl font-bold text-white tracking-tight">Manifest Builder</h1>
        <p className="text-slate-400 mt-2 text-lg">
          Generate deployment manifests and visualize dependencies.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="flex flex-col gap-8 min-h-0">
          {/* Form */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm shrink-0">
            <h2 className="text-xl font-semibold text-white mb-6">Module Metadata</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Module Name" name="name" value={formData.name} onChange={handleChange} />
                <FormField label="Version" name="version" value={formData.version} onChange={handleChange} />
              </div>
              <FormField label="Author" name="author" value={formData.author} onChange={handleChange} />
              <FormField label="Description" name="description" value={formData.description} onChange={handleChange} textarea rows={2} />
              <FormField 
                label="Dependencies (comma-separated, name@version)" 
                name="dependencies" 
                value={formData.dependencies} 
                onChange={handleChange} 
                placeholder="auth@1.0, database@2.1"
              />
            </div>
          </section>

          {/* XML Preview */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-semibold text-white mb-4 shrink-0">Generated XML</h2>
            <div className="bg-slate-950 border border-slate-800 rounded-xl flex-1 overflow-auto p-4">
              <pre className="text-sm font-mono text-blue-300">
                {manifestXml}
              </pre>
            </div>
          </section>
        </div>

        {/* Graph Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
          <div className="p-4 border-b border-slate-800 shrink-0">
            <h2 className="text-xl font-semibold text-white">Dependency Graph</h2>
          </div>
          <div className="flex-1 w-full bg-slate-950">
            <ReactFlow 
              nodes={flowNodes} 
              edges={flowEdges}
              fitView
              attributionPosition="bottom-right"
              colorMode="dark"
            >
              <Background color="#334155" gap={16} />
              <Controls className="bg-slate-800 border-slate-700 fill-white" />
              <MiniMap 
                nodeStrokeColor={(n) => n.id === 'main' ? '#2563eb' : '#475569'}
                nodeColor={(n) => n.id === 'main' ? '#1e40af' : '#334155'}
                maskColor="rgba(15, 23, 42, 0.7)"
                className="bg-slate-900"
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
