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
import { Login } from './screens/auth/Login';
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
  X 
} from '@phosphor-icons/react';

const navItems = [
  { path: '/', label: 'Submission Portal', icon: FileText },
  { path: '/api-explorer', label: 'API Explorer', icon: MagnifyingGlass },
  { path: '/tickets', label: 'Ticket Inbox', icon: Ticket },
  { path: '/playground', label: 'DSL Playground', icon: Lightning },
  { path: '/manifest', label: 'Manifest Builder', icon: Package },
  { path: '/sandbox', label: 'Sandbox Monitor', icon: Desktop },
];

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function GuestRoute() {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function PortalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 transition-opacity backdrop-blur-xs"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen shrink-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-electric-cyan flex items-center justify-center text-white dark:text-zinc-950 font-bold font-sans text-sm shadow-sm dark:shadow-cyan-glow/20">
              E
            </div>
            <span className="font-bold font-sans tracking-tight text-base text-zinc-900 dark:text-white">Developer Portal</span>
          </div>
          <button 
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 transition-colors duration-200 lg:hidden" 
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
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-sans font-bold text-xs tracking-wide uppercase ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-electric-cyan border-l-2 border-zinc-900 dark:border-electric-cyan pl-2.5'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
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
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold font-mono text-zinc-700 dark:text-zinc-300 shrink-0 border border-zinc-300 dark:border-zinc-700">
                {user?.sub ? user.sub.substring(0, 2).toUpperCase() : 'DV'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold font-sans text-zinc-800 dark:text-zinc-200 truncate">{user?.sub || 'dev-partner'}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-zinc-400 truncate">{user?.role || 'Partner'}</span>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/10 transition-colors duration-200 cursor-pointer"
              title="Logout"
            >
              <SignOut className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shrink-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 lg:hidden"
            aria-label="Open Sidebar"
          >
            <List className="w-6 h-6" weight="bold" />
          </button>
          
          <div className="hidden lg:block">
            {/* Title / breadcrumb can go here */}
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="ml-auto p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-electric-cyan" weight="bold" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800" weight="bold" />
            )}
          </button>
        </header>
        
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/30">
          <Outlet />
        </div>
      </main>
    </div>
  );
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
            <Route element={<ProtectedRoute />}>
              <Route element={<PortalLayout />}>
                <Route path="/" element={<SubmissionPortal />} />
                <Route path="/api-explorer" element={<ApiExplorer />} />
                <Route path="/tickets" element={<TicketInbox />} />
                <Route path="/playground" element={<DslPlayground />} />
                <Route path="/manifest" element={<ManifestBuilder />} />
                <Route path="/sandbox" element={<SandboxDashboard />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
