import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ui/ThemeContext';
import { useAuthStore } from './store/authStore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { SubmissionPortal } from './screens/submission/SubmissionPortal';
import { ApiExplorer } from './screens/api-explorer/ApiExplorer';
import { TicketInbox } from './screens/ticket-inbox/TicketInbox';
import { DslPlayground } from './screens/playground/DslPlayground';
import { ManifestBuilder } from './screens/manifest/ManifestBuilder';
import { SandboxDashboard } from './screens/sandbox/SandboxDashboard';
import { ModuleDetail } from './screens/marketplace/ModuleDetail';
import { Login } from './screens/auth/Login';
import { Marketplace } from './screens/marketplace/Marketplace';
import { MarketplaceDashboard } from './screens/marketplace/MarketplaceDashboard';
import { RequireAuth, RequireRole, GuestRoute } from './components/auth/AuthGuards';
import { FormField } from './components/ui/FormField';
import { Button } from './components/ui/Button';
import { 
  FileText, 
  MagnifyingGlass, 
  Ticket, 
  Lightning, 
  Package, 
  Desktop, 
  Sun, 
  Moon, 
  SignOut, 
  List, 
  X,
  Storefront
} from '@phosphor-icons/react';

const navItems = [
  { path: '/', label: 'Submission Portal', icon: FileText },
  { path: '/marketplace', label: 'Marketplace', icon: Storefront },
  { path: '/api-explorer', label: 'API Explorer', icon: MagnifyingGlass },
  { path: '/tickets', label: 'Ticket Inbox', icon: Ticket },
  { path: '/playground', label: 'DSL Playground', icon: Lightning },
  { path: '/manifest', label: 'Manifest Builder', icon: Package },
  { path: '/sandbox', label: 'Sandbox Monitor', icon: Desktop },
];

// Guards have been moved to components/auth/AuthGuards

function PortalLayout({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, setUser } = useAuthStore();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editEmail) return;

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      ...user,
      sub: editName,
      email: editEmail,
    }));
    const newToken = `${header}.${payload}.mocksignature`;

    localStorage.setItem('jwt', newToken);
    setUser({
      ...user!,
      sub: editName,
      email: editEmail,
    });
    setShowProfileModal(false);
  };

  return (
    <div className="flex min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 overflow-hidden font-sans">
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/40 dark:bg-zinc-950/60 z-40 transition-opacity backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen shrink-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo-dark.png" alt="Giolit Labs Logo" className="hidden dark:block h-10 w-auto" />
            <img src="/logo-light.png" alt="Giolit Labs Logo" className="block dark:hidden h-10 w-auto" />
            <span className="text-sm font-bold tracking-tight font-sans text-zinc-900 dark:text-white">Developer Portal</span>
          </div>
          <button 
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 p-1 transition-colors duration-200 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" weight="bold" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    isActive
                      ? 'bg-zinc-200/50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-200/30 dark:hover:bg-zinc-900/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" weight="bold" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        {/* User Info Footer in Sidebar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-2 px-2">
            <button
              onClick={() => {
                setEditName(user?.sub || '');
                setEditEmail(user?.email || '');
                setShowProfileModal(true);
              }}
              type="button"
              className="flex items-center gap-3 min-w-0 text-left hover:bg-zinc-200/50 dark:hover:bg-zinc-900 rounded-lg p-1.5 -ml-1.5 transition-all duration-205 cursor-pointer flex-1"
              title="Update account details"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold font-mono text-zinc-700 dark:text-zinc-300 shrink-0 border border-zinc-300 dark:border-zinc-700">
                {user?.sub ? user.sub.substring(0, 2).toUpperCase() : 'DV'}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{user?.sub || 'dev-partner'}</span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">{user?.role || 'Partner'}</span>
              </div>
            </button>
            <button 
              onClick={logout}
              type="button"
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200 cursor-pointer"
              title="Logout"
            >
              <SignOut className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full min-w-0 h-[100dvh] overflow-hidden bg-white dark:bg-zinc-950">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shrink-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 rounded-lg transition-colors duration-200 lg:hidden"
            aria-label="Open Sidebar"
          >
            <List className="w-5 h-5" weight="bold" />
          </button>
          
          <div className="hidden lg:block flex-1">
            {/* Contextual actions or breadcrumbs could go here */}
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="ml-auto p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all duration-200 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" weight="bold" />
            ) : (
              <Moon className="w-4 h-4" weight="bold" />
            )}
          </button>
        </header>
        
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto w-full h-full">
            {children ?? <Outlet />}
          </div>
        </div>
      </main>

      {/* Account Settings / Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
            onClick={() => setShowProfileModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl z-10 m-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 font-sans">
              Account Settings
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-sans">
              Update your profile information and email address.
            </p>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <FormField
                label="Username / Name"
                value={editName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
                required
              />
              <FormField
                label="Email Address"
                type="email"
                value={editEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditEmail(e.target.value)}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MarketplaceResolver() {
  const { user } = useAuthStore();
  if (user?.role === 'DEVELOPER_PARTNER') {
    return (
      <PortalLayout>
        <MarketplaceDashboard />
      </PortalLayout>
    );
  }
  return <Marketplace />;
}

function ModuleDetailResolver() {
  const { user } = useAuthStore();
  if (user?.role === 'DEVELOPER_PARTNER') {
    return (
      <PortalLayout>
        <ModuleDetail />
      </PortalLayout>
    );
  }
  return <ModuleDetail />;
}

function CatchAllRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === 'CUSTOMER') {
    return <Navigate to="/marketplace" replace />;
  }
  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Guest routes */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              
              {/* Developer Portal Routes */}
              <Route element={<RequireRole allowedRoles={['DEVELOPER_PARTNER']} />}>
                <Route element={<PortalLayout />}>
                  <Route path="/" element={<SubmissionPortal />} />
                  <Route path="/api-explorer" element={<ApiExplorer />} />
                  <Route path="/tickets" element={<TicketInbox />} />
                  <Route path="/playground" element={<DslPlayground />} />
                  <Route path="/manifest" element={<ManifestBuilder />} />
                  <Route path="/sandbox" element={<SandboxDashboard />} />
                </Route>
              </Route>

              {/* Shared Marketplace routes with dynamic rendering based on role */}
              <Route element={<RequireRole allowedRoles={['DEVELOPER_PARTNER', 'CUSTOMER']} />}>
                <Route path="/marketplace" element={<MarketplaceResolver />} />
                <Route path="/marketplace/module/:id" element={<ModuleDetailResolver />} />
              </Route>

            </Route>

            {/* Catch all */}
            <Route path="*" element={<CatchAllRoute />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
