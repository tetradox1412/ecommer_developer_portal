import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Funnel, Star, ArrowRight, Package, Clock, CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';
import { Badge } from '../../components/ui/Badge';
import { NeuralArt } from '../../components/ui/LineArt';

const MOCK_MODULES = [
  { id: 'loyalty-001', name: 'Loyalty Points Engine', developer: 'CoreTech Labs', version: '2.4.1', status: 'ACTIVE', category: 'Customer Retention', rating: 4.9, installs: 1240, description: 'Fully configurable points-based rewards system with tiered membership levels, expiry management, and real-time balance sync.' },
  { id: 'payment-002', name: 'Smart Payment Gateway', developer: 'FinStack Inc.', version: '3.1.0', status: 'ACTIVE', category: 'Payments', rating: 4.8, installs: 3102, description: 'Unified payment orchestration layer supporting 40+ payment methods. Automatic retry logic, 3DS2, and PCI-DSS compliant vault.' },
  { id: 'inventory-003', name: 'Inventory Intelligence', developer: 'StockAI', version: '1.9.5', status: 'COMPILING', category: 'Operations', rating: 4.7, installs: 892, description: 'ML-powered demand forecasting with automated reorder triggers, multi-warehouse sync, and dead-stock detection.' },
  { id: 'search-004', name: 'Vector Search Pro', developer: 'SearchLab', version: '4.0.0', status: 'ACTIVE', category: 'Discovery', rating: 4.9, installs: 2100, description: 'Semantic product search using embedding models. Zero-latency typo correction, synonym detection, and A/B test framework built-in.' },
  { id: 'fraud-005', name: 'Fraud Shield', developer: 'SecureEdge', version: '2.2.3', status: 'ACTIVE', category: 'Security', rating: 4.6, installs: 567, description: 'Real-time transaction scoring with behavioral biometrics, device fingerprinting, and velocity checks. Decisioning in under 20ms.' },
  { id: 'review-006', name: 'Review Aggregator', developer: 'TrustLayer', version: '1.2.0', status: 'INACTIVE', category: 'Social Proof', rating: 4.4, installs: 310, description: 'Sync reviews from Google, Trustpilot, and native channels. Sentiment tagging, response templates, and SEO schema injection.' },
];

const CATEGORIES = ['All', 'Customer Retention', 'Payments', 'Operations', 'Discovery', 'Security', 'Social Proof'];

const statusIcon = (status: string) => {
  switch (status) {
    case 'ACTIVE': return <CheckCircle className="w-3.5 h-3.5" weight="fill" />;
    case 'COMPILING': return <Spinner className="w-3.5 h-3.5 animate-spin" weight="bold" />;
    case 'INACTIVE': return <XCircle className="w-3.5 h-3.5" weight="fill" />;
    default: return null;
  }
};

const statusVariant = (status: string): 'green' | 'amber' | 'gray' | 'red' => {
  switch (status) {
    case 'ACTIVE': return 'green';
    case 'COMPILING': return 'amber';
    case 'INACTIVE': return 'gray';
    default: return 'gray';
  }
};

export function MarketplaceDashboard() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = MOCK_MODULES.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.developer.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || m.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      
      {/* Hero header with neural art */}
      <div className="relative overflow-hidden border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 px-8 pt-10 pb-8">
        <div className="absolute right-0 top-0 w-80 h-full text-zinc-400 dark:text-zinc-600 opacity-60">
          <NeuralArt className="w-full h-full" opacity={1} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">Module Marketplace</p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Browse the ecosystem
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Discover, subscribe to, and manage platform modules built by verified Developer Partners.
          </p>
        </div>
      </div>

      <div className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" weight="bold" />
            <input
              type="text"
              placeholder="Search modules…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-0 transition-all"
            />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <Funnel className="w-4 h-4 text-zinc-400 mr-1 shrink-0" weight="bold" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {filtered.length} module{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(mod => (
            <Link
              key={mod.id}
              to={`/marketplace/module/${mod.id}`}
              className="group relative bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-zinc-600 dark:text-zinc-400" weight="bold" />
                </div>
                <Badge variant={statusVariant(mod.status)} className="flex items-center gap-1 text-[10px] px-2 py-0.5 font-mono uppercase">
                  {statusIcon(mod.status)}
                  {mod.status}
                </Badge>
              </div>

              {/* Name + developer */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug group-hover:text-zinc-700 dark:group-hover:text-white transition-colors">
                  {mod.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 font-mono">{mod.developer} · v{mod.version}</p>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 flex-1">
                {mod.description}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" weight="fill" />
                    {mod.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" weight="bold" />
                    {mod.installs.toLocaleString()} installs
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all" weight="bold" />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <Package className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" weight="thin" />
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">No modules found</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
