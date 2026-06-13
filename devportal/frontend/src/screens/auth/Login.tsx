import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { ThinkingFigure, NeuralArt, SignalWaves } from '../../components/ui/LineArt';

export function Login() {
  const { setToken, setLoading, isLoading, error, setError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'DEVELOPER_PARTNER' | 'CUSTOMER'>('DEVELOPER_PARTNER');
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const mockGoogleAccounts = [
    { name: 'Gabriel J.', email: 'gabriel@ecommer.dev', img: 'G1' },
    { name: 'Partner Account', email: 'partner-dev@ecommer.dev', img: 'P2' },
  ];

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Create a mock JWT token for normal login
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        sub: email.split('@')[0],
        email: email,
        role: loginRole,
        licenseActive: true,
      }));
      const mockToken = `${header}.${payload}.mocksignature`;
      
      // Delay to simulate network
      await new Promise((resolve) => setTimeout(resolve, 800));
      setToken(mockToken);
    } catch {
      setError('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAccountSelect = async (selectedEmail: string) => {
    setLoading(true);
    setError(null);
    setShowGoogleModal(false);
    try {
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        sub: selectedEmail.split('@')[0],
        email: selectedEmail,
        role: loginRole,
        licenseActive: true,
      }));
      const mockToken = `${header}.${payload}.mocksignature`;

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setToken(mockToken);
    } catch {
      setError('Google Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Brand panel (Left Side on Large Screens) */}
      <div className="lg:w-1/2 bg-zinc-950 text-white p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Signal waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 text-zinc-600">
          <SignalWaves className="w-full h-full" opacity={1} />
        </div>
        {/* Neural art — top right */}
        <div className="absolute top-0 right-0 w-64 h-64 text-zinc-600">
          <NeuralArt className="w-full h-full" opacity={1} />
        </div>
        {/* Thinking figure — reacts to auth loading/error */}
        <div className="absolute bottom-16 right-16 w-40 h-52 text-zinc-500">
          <ThinkingFigure className="w-full h-full" opacity={1} isThinking={isLoading} hasError={!!error} />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <img src="/logo-dark.png" alt="Giolit Labs Logo" className="h-12 w-auto" />
          <span className="text-lg font-bold tracking-tight text-white font-sans">Developer Portal</span>
        </div>

        <div className="my-auto max-w-sm relative z-10 pt-16 lg:pt-0">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-5">
            Build the future of digital commerce.
          </h1>
          <p className="text-zinc-400 text-sm lg:text-base leading-relaxed">
            Submit modules, test in secure sandboxes, and interface with the unified Core SaaS Wrapper.
          </p>
        </div>

        <div className="text-zinc-500 text-xs relative z-10">
          &copy; 2026 Giolit Labs Inc.
        </div>
      </div>

      {/* Login form panel (Right Side) */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        <div className="w-full max-w-md space-y-8">
          <header className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white transition-all duration-300">
              {loginRole === 'DEVELOPER_PARTNER' ? 'Developer Console' : 'Marketplace'}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium transition-all duration-300">
              {loginRole === 'DEVELOPER_PARTNER' 
                ? 'Sign in to manage your extensions and integrations.'
                : 'Sign in to browse and install extensions.'}
            </p>
          </header>

          <div className="flex p-1 space-x-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl shadow-inner dark:shadow-none">
            <button
              onClick={() => setLoginRole('DEVELOPER_PARTNER')}
              type="button"
              className={`w-full py-2.5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                loginRole === 'DEVELOPER_PARTNER'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Developer Partner
            </button>
            <button
              onClick={() => setLoginRole('CUSTOMER')}
              type="button"
              className={`w-full py-2.5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                loginRole === 'CUSTOMER'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Customer
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <FormField
              label="Email Address"
              type="email"
              placeholder="e.g. developer@ecommer.dev"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            <FormField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              or
            </span>
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>

          {/* Premium Google Sign-in Button */}
          <button
            onClick={() => setShowGoogleModal(true)}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-bold text-sm shadow-sm hover:shadow transition-all duration-200 select-none cursor-pointer transform active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.61 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.76 3.49-4.51 6.76-4.51z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.6z"
              />
              <path
                fill="#FBBC05"
                d="M5.24 10.55c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 2.96C.5 4.77 0 6.83 0 9s.5 4.23 1.39 6.04l3.85-3.05z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.1.74-2.52 1.18-4.26 1.18-3.27 0-5.84-1.75-6.76-4.51L1.39 16.92C3.37 20.81 7.35 23 12 23z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>

      {/* Mock Google Login modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-6 animate-scale-up">
            <header className="text-center space-y-2">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Choose an Account
              </h3>
              <p className="text-xs text-zinc-500">
                to sign in to Giolit Labs Developer Portal
              </p>
            </header>

            <div className="flex flex-col gap-2.5">
              {mockGoogleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleGoogleAccountSelect(account.email)}
                  type="button"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-black text-xs flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                    {account.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {account.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {account.email}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowGoogleModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
