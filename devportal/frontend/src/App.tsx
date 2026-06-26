import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ui/ThemeContext';
import { useAuthStore } from './store/authStore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ApiExplorer } from './screens/api-explorer/ApiExplorer';
import { TicketInbox } from './screens/ticket-inbox/TicketInbox';
import { WorkspaceLayout } from './screens/workspace/WorkspaceLayout';
import { DslStep } from './screens/workspace/steps/DslStep';
import { ManifestStep } from './screens/workspace/steps/ManifestStep';
import { DetailsStep } from './screens/workspace/steps/DetailsStep';
import { ReviewSubmitStep } from './screens/workspace/steps/ReviewSubmitStep';
import { SubmissionHistory } from './screens/workspace/SubmissionHistory';
import { Login } from './screens/auth/Login';
import { RequireAuth, RequireRole, GuestRoute } from './components/auth/AuthGuards';
import { FormField } from './components/ui/FormField';
import { Button } from './components/ui/Button';
import { api } from './api/bff';
import { ThinkingFigure } from './components/ui/LineArt';
import {
  MagnifyingGlass,
  Ticket,
  Package,
  Sun,
  Moon,
  SignOut,
  List,
  X,
  User,
  Clock,
  Key,
  Check,
  Hammer
} from '@phosphor-icons/react';

const navItems = [
  { path: '/workspace', label: 'Module Workspace', icon: Hammer },
  { path: '/workspace/history', label: 'Submission History', icon: Package },
  { path: '/api-explorer', label: 'API Explorer', icon: MagnifyingGlass },
  { path: '/tickets', label: 'Ticket Inbox', icon: Ticket },
];

// Guards have been moved to components/auth/AuthGuards

function PortalLayout({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, setUser } = useAuthStore();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'activities'>('profile');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [googleLinked, setGoogleLinked] = useState(false);
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [activities, setActivities] = useState<Array<{ id: string; activity: string; timestamp: string }>>([]);
  
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    if (showProfileModal) {
      setIsLoadingProfile(true);
      setModalError(null);
      setModalSuccess(null);
      setActiveTab('profile');
      
      api.getProfile()
        .then((profile) => {
          setEditName(profile.name);
          setEditEmail(profile.email);
          setGoogleLinked(profile.googleLinked);
        })
        .catch((err) => {
          console.error("Error loading profile:", err);
          setModalError("Failed to fetch profile details.");
        })
        .finally(() => {
          setIsLoadingProfile(false);
        });

      api.getActivities()
        .then((data) => {
          setActivities(data);
        })
        .catch((err) => {
          console.error("Error loading activities:", err);
        });
    }
  }, [showProfileModal]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editEmail) return;
    setIsSaving(true);
    setModalError(null);
    setModalSuccess(null);
    try {
      await api.updateProfile(editName, editEmail);
      if (user) {
        setUser({
          ...user,
          sub: editName,
          email: editEmail,
        });
      }
      setModalSuccess("Profile updated successfully!");
      const updatedActivities = await api.getActivities();
      setActivities(updatedActivities);
    } catch (err: any) {
      setModalError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setModalError("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalError("New passwords do not match.");
      return;
    }
    setIsSaving(true);
    setModalError(null);
    setModalSuccess(null);
    try {
      await api.changePassword(oldPassword, newPassword);
      setModalSuccess("Password changed successfully!");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      const updatedActivities = await api.getActivities();
      setActivities(updatedActivities);
    } catch (err: any) {
      setModalError(err.message || "Failed to change password. Make sure current password is correct.");
    } finally {
      setIsSaving(false);
    }
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
      <aside className={`fixed inset-y-0 left-0 z-50 bg-zinc-50 dark:bg-zinc-950 flex flex-col transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-64 border-r border-zinc-200 dark:border-zinc-900' : '-translate-x-full w-64 lg:w-0 lg:translate-x-0 overflow-hidden lg:border-none'} lg:static lg:h-screen shrink-0`}>
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
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
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
      <main className="flex-1 flex flex-col w-full min-w-0 h-[100dvh] overflow-hidden bg-zinc-50 dark:bg-zinc-950 grid-bg relative isolate">
        {/* Background ambient lighting */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/[0.015] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/[0.015] rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md shrink-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 rounded-lg transition-colors duration-200"
            aria-label="Toggle Sidebar"
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
          <div className={`relative w-full ${activeTab === 'security' ? 'max-w-2xl' : 'max-w-lg'} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl z-10 m-4 transition-all duration-300 ease-out animate-in fade-in zoom-in-95`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
                  Account Settings
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                  Manage your developer profile and portal security credentials.
                </p>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-6 mt-4">
              <button
                type="button"
                onClick={() => { setActiveTab('profile'); setModalError(null); setModalSuccess(null); }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-accent'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <User className="w-4 h-4" weight="bold" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('security'); setModalError(null); setModalSuccess(null); }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer ${
                  activeTab === 'security'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-accent'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Key className="w-4 h-4" weight="bold" />
                <span>Security</span>
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('activities'); setModalError(null); setModalSuccess(null); }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer ${
                  activeTab === 'activities'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-accent'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Clock className="w-4 h-4" weight="bold" />
                <span>Activity History</span>
              </button>
            </div>

            {/* Notifications */}
            {modalError && (
              <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold">
                {modalError}
              </div>
            )}
            {modalSuccess && (
              <div className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold">
                {modalSuccess}
              </div>
            )}

            {/* Tab content */}
            {isLoadingProfile ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-cyan-500 animate-spin" />
                <span className="text-xs text-zinc-500">Loading your profile data...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSave} className="space-y-5">
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

                    {/* Google connection info */}
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-2.5">
                      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Connected Accounts</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#ea4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.61 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.76 3.49-4.51 6.76-4.51z" />
                            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.6z" />
                            <path fill="#FBBC05" d="M5.24 10.55c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 2.96C.5 4.77 0 6.83 0 9s.5 4.23 1.39 6.04l3.85-3.05z" />
                            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.1.74-2.52 1.18-4.26 1.18-3.27 0-5.84-1.75-6.76-4.51L1.39 16.92C3.37 20.81 7.35 23 12 23z" />
                          </svg>
                          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Google Authentication</span>
                        </div>
                        {googleLinked ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <Check className="w-2.5 h-2.5" weight="bold" /> Linked
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                            Not Linked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowProfileModal(false)}
                        className="flex-1"
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        className="flex-1"
                        isLoading={isSaving}
                      >
                        Save Details
                      </Button>
                    </div>
                  </form>
                )}

                {activeTab === 'security' && (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Form column (col-span-3) */}
                    <form onSubmit={handlePasswordChange} className="md:col-span-3 space-y-4">
                      <FormField
                        label="Current Password"
                        type="password"
                        value={oldPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                      />
                      <FormField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                      />
                      <FormField
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                      />

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setShowProfileModal(false)}
                          className="flex-1"
                        >
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          className="flex-1"
                          isLoading={isSaving}
                        >
                          Change Password
                        </Button>
                      </div>
                    </form>

                    {/* Figure illustration column (col-span-2) */}
                    <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center border-l border-zinc-100 dark:border-zinc-800/80 pl-6 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40 rounded-xl p-4">
                      <div className="w-36 h-44 text-zinc-400 dark:text-zinc-600 transition-colors">
                        <ThinkingFigure
                          className="w-full h-full"
                          opacity={1}
                          isThinking={isSaving}
                          isHiding={isPasswordFocused}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center font-sans mt-3 max-w-[15ch]">
                        {isPasswordFocused 
                          ? "Hiding credentials from prying eyes!" 
                          : "Guardian active. Your keys are encrypted."}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'activities' && (
                  <div className="space-y-4">
                    <div className="max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {activities.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-12">
                          No activities logged for this developer account.
                        </p>
                      ) : (
                        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 pl-5 space-y-5 py-2">
                          {activities.map((act) => (
                            <div key={act.id} className="relative group">
                              <span className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-accent ring-4 ring-white dark:ring-zinc-900 transition-colors" />
                              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                {act.activity}
                              </p>
                              <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                                {new Date(act.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex pt-2">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowProfileModal(false)}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CatchAllRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to="/workspace" replace />;
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
                  <Route path="/" element={<Navigate to="/workspace" replace />} />
                  <Route path="/dsl-studio" element={<Navigate to="/workspace/dsl" replace />} />
                  <Route path="/manifest" element={<Navigate to="/workspace/manifest" replace />} />
                  <Route path="/playground" element={<Navigate to="/workspace/dsl" replace />} />

                  <Route path="/workspace" element={<WorkspaceLayout />}>
                    <Route index element={<Navigate to="/workspace/dsl" replace />} />
                    <Route path="dsl" element={<DslStep />} />
                    <Route path="manifest" element={<ManifestStep />} />
                    <Route path="details" element={<DetailsStep />} />
                    <Route path="review" element={<ReviewSubmitStep />} />
                  </Route>
                  <Route path="/workspace/history" element={<SubmissionHistory />} />

                  <Route path="/api-explorer" element={<ApiExplorer />} />
                  <Route path="/tickets" element={<TicketInbox />} />
                </Route>
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
