import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Funnel, Star, ArrowRight, Package, Clock, CheckCircle, Spinner, XCircle, SignOut, Sun, Moon, Storefront } from '@phosphor-icons/react';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../components/ui/ThemeContext';
import { WalkingFigures, NeuralArt } from '../../components/ui/LineArt';

const MOCK_MODULES = [
  { id: 'loyalty-001', name: 'Loyalty Points Engine', developer: 'CoreTech Labs', version: '2.4.1', status: 'ACTIVE', category: 'Customer Retention', rating: 4.9, installs: 1240, description: 'Fully configurable points-based rewards system with tiered membership levels, expiry management, and real-time balance sync.' },
  { id: 'payment-002', name: 'Smart Payment Gateway', developer: 'FinStack Inc.', version: '3.1.0', status: 'ACTIVE', category: 'Payments', rating: 4.8, installs: 3102, description: 'Unified payment orchestration layer supporting 40+ payment methods with PCI-DSS compliant vault.' },
  { id: 'inventory-003', name: 'Inventory Intelligence', developer: 'StockAI', version: '1.9.5', status: 'COMPILING', category: 'Operations', rating: 4.7, installs: 892, description: 'ML-powered demand forecasting with automated reorder triggers, multi-warehouse sync, and dead-stock detection.' },
  { id: 'search-004', name: 'Vector Search Pro', developer: 'SearchLab', version: '4.0.0', status: 'ACTIVE', category: 'Discovery', rating: 4.9, installs: 2100, description: 'Semantic product search using embedding models. Zero-latency typo correction and A/B test framework built-in.' },
  { id: 'fraud-005', name: 'Fraud Shield', developer: 'SecureEdge', version: '2.2.3', status: 'ACTIVE', category: 'Security', rating: 4.6, installs: 567, description: 'Real-time transaction scoring with behavioral biometrics and device fingerprinting in under 20ms.' },
  { id: 'review-006', name: 'Review Aggregator', developer: 'TrustLayer', version: '1.2.0', status: 'INACTIVE', category: 'Social Proof', rating: 4.4, installs: 310, description: 'Sync reviews from Google, Trustpilot, and native channels with sentiment tagging and SEO schema injection.' },
  { id: 'shipping-007', name: 'Shipping Optimizer', developer: 'RouteIQ', version: '1.5.2', status: 'ACTIVE', category: 'Operations', rating: 4.7, installs: 680, description: 'Multi-carrier rate shopping with real-time tracking, automated label generation, and return flow management.' },
  { id: 'analytics-008', name: 'Revenue Analytics', developer: 'DataPulse', version: '2.0.1', status: 'ACTIVE', category: 'Analytics', rating: 4.8, installs: 1540, description: 'Cohort analysis, LTV modeling, funnel visualizations, and daily revenue digest via webhooks.' },
];

const CATEGORIES = ['All', 'Customer Retention', 'Payments', 'Operations', 'Discovery', 'Security', 'Social Proof', 'Analytics'];

function statusVariant(status: string): 'green' | 'amber' | 'gray' {
  if (status === 'ACTIVE') return 'green';
  if (status === 'COMPILING') return 'amber';
  return 'gray';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'ACTIVE') return <CheckCircle className="w-3 h-3" weight="fill" />;
  if (status === 'COMPILING') return <Spinner className="w-3 h-3 animate-spin" weight="bold" />;
  return <XCircle className="w-3 h-3" weight="fill" />;
}

export function Marketplace() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set());

  const filtered = MOCK_MODULES.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.developer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  const toggleSubscribe = (id: string) => {
    setSubscribed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">

      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="/logo-dark.png" alt="Giolit Labs Logo" className="hidden dark:block h-10 w-auto" />
          <img src="/logo-light.png" alt="Giolit Labs Logo" className="block dark:hidden h-10 w-auto" />
          <span className="text-zinc-300 dark:text-zinc-700 text-sm select-none">/</span>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Storefront className="w-4 h-4" weight="bold" />
            Marketplace
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-zinc-500 dark:text-zinc-400">
            {user?.sub}
          </span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" weight="bold" /> : <Moon className="w-4 h-4" weight="bold" />}
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors cursor-pointer"
            title="Sign out"
          >
            <SignOut className="w-4 h-4" weight="bold" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 px-6 pt-12 pb-10">
        {/* Walking figures background art — quickens when filtered */}
        <div className="absolute bottom-0 left-0 right-0 h-36 text-zinc-600 dark:text-zinc-500">
          <WalkingFigures className="w-full h-full" opacity={1} searchActive={search.length > 0 || activeCategory !== 'All'} />
        </div>
        {/* Neural art top right */}
        <div className="absolute top-0 right-0 w-72 h-full text-zinc-500 dark:text-zinc-600">
          <NeuralArt className="w-full h-full" opacity={1} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
            {MOCK_MODULES.filter(m => m.status === 'ACTIVE').length} modules available
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-3">
            The eCommerce<br />Module Marketplace
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-lg">
            Extend your store with verified modules built by professional Developer Partners. Subscribe in one click and activate instantly.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full flex flex-col gap-6">

        {/* Subscribed count pill */}
        {subscribed.size > 0 && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-1.5 w-fit">
            <CheckCircle className="w-4 h-4 text-green-500" weight="fill" />
            {subscribed.size} module{subscribed.size > 1 ? 's' : ''} subscribed
          </div>
        )}

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" weight="bold" />
            <input
              type="text"
              placeholder="Search modules or developers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Funnel className="w-4 h-4 text-zinc-400 shrink-0" weight="bold" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map(mod => {
            const isSub = subscribed.has(mod.id);
            return (
              <div
                key={mod.id}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200"
              >
                {/* Card top */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-zinc-500 dark:text-zinc-400" weight="bold" />
                  </div>
                  <Badge variant={statusVariant(mod.status)} className="flex items-center gap-1 text-[10px] px-2 py-0.5 font-mono uppercase shrink-0">
                    <StatusIcon status={mod.status} />
                    {mod.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">{mod.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 font-mono">{mod.developer} · v{mod.version}</p>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 flex-1">
                  {mod.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" weight="fill" />{mod.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" weight="bold" />{mod.installs.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSubscribe(mod.id)}
                    disabled={mod.status === 'INACTIVE'}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isSub
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/60'
                        : mod.status === 'INACTIVE'
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                          : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200'
                    }`}
                  >
                    {isSub ? 'Subscribed' : mod.status === 'INACTIVE' ? 'Unavailable' : 'Subscribe'}
                  </button>
                  <Link
                    to={`/marketplace/module/${mod.id}`}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                    title="View details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
            <Package className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" weight="thin" />
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">No modules match your search</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Try a different search term or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
