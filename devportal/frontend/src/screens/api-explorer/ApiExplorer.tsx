import { useEffect, useState, useMemo } from 'react';
import { api } from '../../api/bff';
import { Badge } from '../../components/ui/Badge';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import type { ModuleApi } from '../../types';

export function ApiExplorer() {
  const [modules, setModules] = useState<ModuleApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getAllModuleApis();
        setModules(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load APIs');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const toggleEndpoint = (id: string) => {
    setExpandedEndpoints(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'blue';
      case 'POST': return 'green';
      case 'PUT':
      case 'PATCH': return 'amber';
      case 'DELETE': return 'red';
      default: return 'gray';
    }
  };

  const filteredModules = useMemo(() => {
    if (!searchQuery) return modules;
    const q = searchQuery.toLowerCase();
    return modules.map(m => ({
      ...m,
      endpoints: m.endpoints.filter(e => 
        e.path.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) ||
        m.moduleName.toLowerCase().includes(q)
      )
    })).filter(m => m.endpoints.length > 0);
  }, [modules, searchQuery]);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">API Explorer</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Browse and test APIs exposed by the SaaS Controller.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute left-3 top-3 text-slate-500">🔍</span>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-8">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <LoadingSkeleton lines={8} />
        </div>
      ) : filteredModules.length === 0 ? (
        <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
          No endpoints found matching your search.
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredModules.map((mod) => (
            <div key={mod.moduleName} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                <h2 className="text-xl font-bold text-slate-200">{mod.moduleName}</h2>
                <Badge variant="gray">v{mod.version}</Badge>
              </div>
              
              <div className="flex flex-col gap-3">
                {mod.endpoints.map((ep, idx) => {
                  const id = `${mod.moduleName}-${idx}`;
                  const isExpanded = expandedEndpoints.has(id);
                  return (
                    <div key={id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
                      <div 
                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-800/50"
                        onClick={() => toggleEndpoint(id)}
                      >
                        <Badge variant={getMethodColor(ep.method)} className="w-16 justify-center">
                          {ep.method}
                        </Badge>
                        <div className="font-mono text-sm text-slate-300 flex-1 truncate">
                          {ep.path}
                        </div>
                        <div className="text-sm text-slate-500 hidden sm:block truncate flex-1">
                          {ep.description}
                        </div>
                        <div className="text-slate-500">
                          {isExpanded ? '▼' : '▶'}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Required Role</h4>
                            <Badge variant="purple" className="self-start">{ep.requiredRole}</Badge>
                          </div>
                          
                          {ep.requestSchema && (
                            <div className="flex flex-col gap-2">
                              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Request Body Schema</h4>
                              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                                {JSON.stringify(ep.requestSchema, null, 2)}
                              </pre>
                            </div>
                          )}

                          {ep.exampleResponse && (
                            <div className="flex flex-col gap-2">
                              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Example Response</h4>
                              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-green-400 overflow-x-auto">
                                {JSON.stringify(ep.exampleResponse, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
