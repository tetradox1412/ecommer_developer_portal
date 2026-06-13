import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, ShieldCheck, Globe, Database, Lock, CheckCircle, XCircle } from '@phosphor-icons/react';
import { Badge } from '../../components/ui/Badge';

const MOCK_MODULES: Record<string, {
  id: string; name: string; developer: string; version: string;
  status: string; category: string; rating: number; installs: number;
  description: string; longDescription: string;
  permissions: { resource: string; access: 'read' | 'write'; public: boolean }[];
  changelog: { version: string; date: string; notes: string }[];
}> = {
  'loyalty-001': {
    id: 'loyalty-001', name: 'Loyalty Points Engine', developer: 'CoreTech Labs', version: '2.4.1',
    status: 'ACTIVE', category: 'Customer Retention', rating: 4.9, installs: 1240,
    description: 'Fully configurable points-based rewards system with tiered membership levels.',
    longDescription: 'The Loyalty Points Engine provides a complete, multi-tier rewards infrastructure. Configure point accrual rules based on order value, product category, or customer segment. Set up tier thresholds (Bronze, Silver, Gold, Platinum) with automatic progression logic. Points expiry policies, referral bonuses, and promotional multipliers are all managed through the manifest configuration. The module emits real-time balance update events that the Customer Dashboard subscribes to via SSE.',
    permissions: [
      { resource: 'Order History API', access: 'read', public: true },
      { resource: 'Customer Profile API', access: 'read', public: true },
      { resource: 'Points Ledger Database', access: 'write', public: false },
      { resource: 'Notification Service', access: 'write', public: true },
    ],
    changelog: [
      { version: '2.4.1', date: '2026-06-01', notes: 'Fix: Edge case in expiry calculation for leap years.' },
      { version: '2.4.0', date: '2026-05-12', notes: 'Feature: Referral bonus engine. Configurable referral chains with fraud detection.' },
      { version: '2.3.0', date: '2026-04-02', notes: 'Feature: Tier progression webhooks. SSE event emission on tier upgrade.' },
    ],
  },
  'payment-002': {
    id: 'payment-002', name: 'Smart Payment Gateway', developer: 'FinStack Inc.', version: '3.1.0',
    status: 'ACTIVE', category: 'Payments', rating: 4.8, installs: 3102,
    description: 'Unified payment orchestration supporting 40+ methods with PCI-DSS compliance.',
    longDescription: 'Smart Payment Gateway abstracts all payment complexity behind a single, clean API surface. Route transactions intelligently across providers using configurable waterfall logic. Built-in retry with exponential backoff, 3DS2 authentication flow, and automatic currency conversion. All card data is tokenized on first capture and never stored in the module scope — PCI-DSS compliance is enforced at the manifest level.',
    permissions: [
      { resource: 'Payment Methods API', access: 'read', public: true },
      { resource: 'Transaction Vault API', access: 'write', public: false },
      { resource: 'Order State API', access: 'write', public: true },
      { resource: 'Fraud Score API', access: 'read', public: false },
    ],
    changelog: [
      { version: '3.1.0', date: '2026-05-28', notes: 'Feature: Apple Pay and Google Pay support. New payment method manifest schema.' },
      { version: '3.0.1', date: '2026-05-01', notes: 'Fix: 3DS2 challenge flow timeout handling in Safari.' },
    ],
  },
};

const accessIcon = (access: string) => access === 'read'
  ? <Globe className="w-3.5 h-3.5 text-blue-500" weight="bold" />
  : <Database className="w-3.5 h-3.5 text-amber-500" weight="bold" />;

export function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const mod = id ? MOCK_MODULES[id] : null;

  if (!mod) {
    return (
      <div className="min-h-full flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center space-y-4">
          <XCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" weight="thin" />
          <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">Module not found</h2>
          <Link to="/marketplace" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center justify-center gap-1.5">
            <ArrowLeft className="w-4 h-4" weight="bold" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const statusVariant = mod.status === 'ACTIVE' ? 'green' : mod.status === 'COMPILING' ? 'amber' : 'gray';

  return (
    <div className="min-h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-8 py-8 flex flex-col gap-8">

        {/* Back link */}
        <Link to="/marketplace" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" weight="bold" />
          Marketplace
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-zinc-500 dark:text-zinc-400" weight="bold" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{mod.name}</h1>
              <Badge variant={statusVariant} className="text-[10px] font-mono uppercase px-2 py-0.5">
                {mod.status}
              </Badge>
            </div>
            <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">{mod.developer} · v{mod.version} · {mod.category}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1"><Star className="w-3 h-3" weight="fill" />{mod.rating}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" weight="bold" />{mod.installs.toLocaleString()} installs</span>
            </div>
          </div>
          <button 
            type="button"
            className="shrink-0 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" weight="bold" />
            Subscribe
          </button>
        </div>

        {/* Description */}
        <section className="border border-zinc-100 dark:border-zinc-900 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 font-mono">Overview</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{mod.longDescription}</p>
        </section>

        {/* Glass Box: Data Access Map */}
        <section className="border border-zinc-100 dark:border-zinc-900 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 font-mono">Glass Box Architecture</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5">Every resource this module can access is declared below — nothing is hidden.</p>
          <div className="flex flex-col gap-2.5">
            {mod.permissions.map((perm, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                {accessIcon(perm.access)}
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex-1">{perm.resource}</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  perm.access === 'read'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40'
                    : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40'
                }`}>{perm.access}</span>
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  {perm.public ? <Globe className="w-3 h-3 text-green-500" weight="bold" /> : <Lock className="w-3 h-3 text-zinc-400" weight="bold" />}
                  {perm.public ? 'Public' : 'Private'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Changelog */}
        <section className="border border-zinc-100 dark:border-zinc-900 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5 font-mono">Changelog</h2>
          <div className="flex flex-col gap-4">
            {mod.changelog.map((entry, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-1.5 shrink-0" />
                  {i < mod.changelog.length - 1 && <div className="w-px flex-1 bg-zinc-100 dark:bg-zinc-900 mt-1" />}
                </div>
                <div className="pb-4 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">v{entry.version}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{entry.date}</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{entry.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
