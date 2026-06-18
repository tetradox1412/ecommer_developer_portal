import { useEffect, useState, useMemo } from 'react';
import { api } from '../../api/bff';
import type { ModuleApi, ApiEndpoint } from '../../types';
import { 
  MagnifyingGlass, 
  Copy, 
  Check, 
  CaretRight, 
  Shield, 
  Globe, 
  Plus, 
  PencilSimple, 
  Trash,
  X 
} from '@phosphor-icons/react';
import { ReviewingFigure } from '../../components/ui/LineArt';

interface JsonHighlighterProps {
  data: object;
}

function JsonHighlighter({ data }: JsonHighlighterProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Regex matching JSON keys, strings, booleans, null, numbers, and punctuation
  const tokens = useMemo(() => {
    const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}[\],])/g;
    const parts: { text: string; type: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(jsonString)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          text: jsonString.substring(lastIndex, match.index),
          type: 'whitespace',
        });
      }

      const value = match[0];
      let type = 'punctuation';

      if (value.startsWith('"')) {
        if (value.endsWith(':')) {
          type = 'key';
        } else {
          type = 'string';
        }
      } else if (/^(true|false)$/.test(value)) {
        type = 'boolean';
      } else if (value === 'null') {
        type = 'null';
      } else if (/^-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?$/.test(value)) {
        type = 'number';
      }

      parts.push({ text: value, type });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < jsonString.length) {
      parts.push({
        text: jsonString.substring(lastIndex),
        type: 'whitespace',
      });
    }

    return parts;
  }, [jsonString]);

  const getStyleClass = (type: string) => {
    switch (type) {
      case 'key':
        return 'text-indigo-600 dark:text-sky-300 font-semibold';
      case 'string':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'number':
        return 'text-amber-700 dark:text-amber-400';
      case 'boolean':
        return 'text-rose-700 dark:text-rose-400 font-medium';
      case 'null':
        return 'text-zinc-500 dark:text-zinc-500';
      case 'punctuation':
        return 'text-zinc-500 dark:text-zinc-400';
      default:
        return 'text-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="relative group">
      <pre className="bg-zinc-100/60 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-4 text-[11.5px] font-mono overflow-x-auto leading-relaxed shadow-sm max-h-96">
        <code>
          {tokens.map((token, i) => (
            <span key={i} className={getStyleClass(token.type)}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
      
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
        type="button"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-500 animate-pulse" weight="bold" />
            <span className="text-emerald-600 dark:text-emerald-500 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" weight="bold" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

function ExplorerSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {[1, 2].map((groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              <div className="h-5 w-32 bg-zinc-300 dark:bg-zinc-800/80 rounded-md" />
              <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-850 rounded-full" />
            </div>
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800/60 rounded-xl bg-white/40 dark:bg-zinc-900/5"
              >
                <div className="w-20 h-6 bg-zinc-300 dark:bg-zinc-800 rounded-md" />
                <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded-md hidden md:block" />
                <div className="ml-auto flex items-center gap-3">
                  <div className="w-24 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md hidden sm:block" />
                  <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface EndpointRowProps {
  ep: ApiEndpoint;
  moduleName: string;
  idx: number;
}

function EndpointRow({ ep, moduleName: _moduleName, idx: _idx }: EndpointRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeResponseTab, setActiveResponseTab] = useState<'schema' | 'example'>('schema');

  const hasRequest = !!ep.requestSchema;
  const hasResponse = !!ep.responseSchema || !!ep.exampleResponse;

  useEffect(() => {
    if (!ep.responseSchema && ep.exampleResponse) {
      setActiveResponseTab('example');
    } else {
      setActiveResponseTab('schema');
    }
  }, [ep.responseSchema, ep.exampleResponse]);

  const getMethodBadgeStyle = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-cyan-50/80 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-800/50';
      case 'POST':
        return 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50';
      case 'PUT':
      case 'PATCH':
        return 'bg-amber-50/80 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50';
      case 'DELETE':
        return 'bg-rose-50/80 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/50';
      default:
        return 'bg-zinc-100/80 dark:bg-zinc-800/30 text-zinc-700 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-700/50';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return <Globe className="w-3.5 h-3.5" weight="bold" />;
      case 'POST':
        return <Plus className="w-3.5 h-3.5" weight="bold" />;
      case 'PUT':
      case 'PATCH':
        return <PencilSimple className="w-3.5 h-3.5" weight="bold" />;
      case 'DELETE':
        return <Trash className="w-3.5 h-3.5" weight="bold" />;
      default:
        return <Globe className="w-3.5 h-3.5" weight="bold" />;
    }
  };


  return (
    <div 
      className={`group/row border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-all duration-200 bg-white dark:bg-zinc-900/10 ${
        isExpanded 
          ? 'shadow-sm border-zinc-300 dark:border-zinc-700 bg-zinc-50/20 dark:bg-zinc-900/20' 
          : 'hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 hover:-translate-y-[1px]'
      }`}
    >
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold font-sans tracking-wide border w-22 ${getMethodBadgeStyle(ep.method)}`}>
          {getMethodIcon(ep.method)}
          {ep.method}
        </span>
        
        <div className="font-mono text-sm text-zinc-800 dark:text-zinc-200 flex-1 truncate font-medium">
          {ep.path}
        </div>
        
        <div className="text-sm text-zinc-500 dark:text-zinc-400 hidden md:block truncate flex-1">
          {ep.description}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium font-sans bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/40">
            <Shield className="w-3 h-3 text-zinc-400 dark:text-zinc-500" weight="bold" />
            {ep.requiredRole}
          </span>
          
          <div className="flex items-center justify-center w-6 h-6 rounded-md group-hover/row:bg-zinc-100 dark:group-hover/row:bg-zinc-800 transition-colors">
            <CaretRight 
              className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover/row:text-zinc-700 dark:group-hover/row:text-zinc-300 transition-transform duration-200 ease-out"
              style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
              weight="bold"
            />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-950/25 flex flex-col gap-6">
          {/* Mobile Description & Access Rights */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold block mb-1 text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Description</span>
              {ep.description}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Required Role:</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <Shield className="w-3 h-3 text-zinc-400 dark:text-zinc-500" weight="bold" />
                {ep.requiredRole}
              </span>
            </div>
          </div>

          {/* Desktop Access Rights */}
          <div className="hidden md:flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Access Rights</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80">
                <Shield className="w-3 h-3 text-zinc-400 dark:text-zinc-500" weight="bold" />
                {ep.requiredRole}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">is required to invoke this endpoint.</span>
            </div>
          </div>

          {/* Payload and Response Grid */}
          <div className={`grid grid-cols-1 ${hasRequest && hasResponse ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
            {/* Request Payload Schema */}
            {ep.requestSchema && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Request Payload Schema</span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">application/json</span>
                </div>
                <JsonHighlighter data={ep.requestSchema} />
              </div>
            )}

            {/* Response Content with Tabs */}
            {hasResponse && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center gap-3">
                    {ep.responseSchema && ep.exampleResponse ? (
                      <div className="flex gap-4">
                        <button
                          onClick={() => setActiveResponseTab('schema')}
                          className={`text-[10px] font-semibold uppercase tracking-wider pb-1 border-b-2 transition-all cursor-pointer ${
                            activeResponseTab === 'schema'
                              ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                              : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400'
                          }`}
                        >
                          Response Schema
                        </button>
                        <button
                          onClick={() => setActiveResponseTab('example')}
                          className={`text-[10px] font-semibold uppercase tracking-wider pb-1 border-b-2 transition-all cursor-pointer ${
                            activeResponseTab === 'example'
                              ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                              : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400'
                          }`}
                        >
                          Example Response
                        </button>
                      </div>
                    ) : ep.responseSchema ? (
                      <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Response Schema</span>
                    ) : (
                      <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Example Response</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                    {activeResponseTab === 'schema' ? 'application/json' : '200 OK'}
                  </span>
                </div>
                {activeResponseTab === 'schema' && ep.responseSchema && (
                  <JsonHighlighter data={ep.responseSchema} />
                )}
                {activeResponseTab === 'example' && ep.exampleResponse && (
                  <JsonHighlighter data={ep.exampleResponse} />
                )}
                {!ep.responseSchema && ep.exampleResponse && (
                  <JsonHighlighter data={ep.exampleResponse} />
                )}
                {ep.responseSchema && !ep.exampleResponse && (
                  <JsonHighlighter data={ep.responseSchema} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ApiExplorer() {
  const [modules, setModules] = useState<ModuleApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          document.getElementById('api-search-input')?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    <div className="p-8 max-w-5xl mx-auto w-full min-h-screen transition-colors duration-300">
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-8 relative">
        <div className="absolute right-[340px] bottom-[-23px] h-24 w-20 text-zinc-500 dark:text-zinc-500 pointer-events-none hidden xl:block">
          <ReviewingFigure
            className="w-full h-full"
            opacity={0.85}
            isReviewing={isLoading}
            isComplete={!isLoading && modules.length > 0}
            isSearching={isSearchFocused}
          />
        </div>
        <div className="space-y-2.5 flex-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            API REFERENCE
          </div>
          <h1 className="text-4xl font-extrabold font-sans text-zinc-900 dark:text-white tracking-tight leading-none">
            API Explorer
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[50ch] leading-relaxed">
            Browse, inspect schemas, and verify integration points for the SaaS Controller.
          </p>
        </div>

        <div className="relative flex items-center w-full md:w-80 group">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">
            <MagnifyingGlass className="w-4 h-4" weight="bold" />
          </div>
          <input
            id="api-search-input"
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full px-4 py-2.5 pl-10 pr-12 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm font-sans"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 flex items-center justify-center w-5 h-5 rounded-full text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all cursor-pointer"
              type="button"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" weight="bold" />
            </button>
          ) : (
            <div className="absolute right-3.5 pointer-events-none hidden sm:flex items-center gap-0.5">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded border border-zinc-300 dark:border-zinc-700/60 shadow-sm">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded border border-zinc-300 dark:border-zinc-700/60 shadow-sm">
                K
              </kbd>
            </div>
          )}
        </div>
      </header>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400 text-sm mb-8 font-sans">
          {error}
        </div>
      )}

      {isLoading ? (
        <ExplorerSkeleton />
      ) : filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-16 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/20 dark:bg-zinc-900/5 select-none">
          <div className="w-32 h-44 text-zinc-400 dark:text-zinc-600 transition-colors mb-2">
            <ReviewingFigure
              className="w-full h-full"
              opacity={0.85}
              isSearching={true}
              isReviewing={true}
            />
          </div>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No endpoints found</h3>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs">
            We couldn't find any endpoints matching "{searchQuery}". Try refinement or resetting the query.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.97] cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {filteredModules.map((mod) => (
            <div key={mod.moduleName} className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-cyan-500" />
                  <h2 className="text-lg font-bold font-sans text-zinc-800 dark:text-zinc-100 tracking-tight">
                    {mod.moduleName}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400">
                    v{mod.version}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                  {mod.endpoints.length} {mod.endpoints.length === 1 ? 'endpoint' : 'endpoints'}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {mod.endpoints.map((ep, idx) => (
                  <EndpointRow 
                    key={`${mod.moduleName}-${idx}`} 
                    ep={ep} 
                    moduleName={mod.moduleName} 
                    idx={idx} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
