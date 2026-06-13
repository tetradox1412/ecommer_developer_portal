import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { SubmissionPortal } from './screens/submission/SubmissionPortal';
import { ApiExplorer } from './screens/api-explorer/ApiExplorer';
import { TicketInbox } from './screens/ticket-inbox/TicketInbox';
import { DslPlayground } from './screens/playground/DslPlayground';
import { ManifestBuilder } from './screens/manifest/ManifestBuilder';
import { SandboxDashboard } from './screens/sandbox/SandboxDashboard';

const navItems = [
  { path: '/', label: 'Submission Portal', icon: '📝' },
  { path: '/api-explorer', label: 'API Explorer', icon: '🔍' },
  { path: '/tickets', label: 'Ticket Inbox', icon: '🎫' },
  { path: '/playground', label: 'DSL Playground', icon: '⚡' },
  { path: '/manifest', label: 'Manifest Builder', icon: '📦' },
  { path: '/sandbox', label: 'Sandbox Monitor', icon: '🖥️' },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
            <h1 className="text-lg font-bold text-white tracking-wide">Developer Portal</h1>
            <button className="text-slate-400 hover:text-white p-1" onClick={() => setIsSidebarOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                D1
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-300">dev-001</span>
                <span className="text-xs text-slate-500">Partner</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full min-w-0 h-screen">
          <header className="h-16 flex items-center px-4 border-b border-slate-800 shrink-0 bg-slate-950 z-30">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<SubmissionPortal />} />
            <Route path="/api-explorer" element={<ApiExplorer />} />
            <Route path="/tickets" element={<TicketInbox />} />
            <Route path="/playground" element={<DslPlayground />} />
            <Route path="/manifest" element={<ManifestBuilder />} />
            <Route path="/sandbox" element={<SandboxDashboard />} />
          </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
