import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';
import { Warning } from '@phosphor-icons/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('Uncaught error in boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-8 rounded-2xl shadow-xl space-y-6">
            <header className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4 shadow-sm">
                <Warning className="w-6 h-6" weight="bold" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
                Application Runtime Error
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-sans">
                An unexpected error occurred in the portal layout thread.
              </p>
            </header>

            {this.state.error && (
              <div className="p-4 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-xl space-y-2">
                <p className="text-sm font-bold text-red-650 dark:text-red-400 font-mono break-all">
                  Error: {this.state.error.message || this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-zinc-500 dark:text-zinc-400 font-mono cursor-pointer">
                    <summary className="font-semibold select-none hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                      Stack Trace Details
                    </summary>
                    <pre className="mt-2 p-3 bg-zinc-100 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-850 rounded-lg overflow-x-auto max-h-48 whitespace-pre-wrap leading-relaxed select-text">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="primary"
                onClick={this.handleReset}
                className="font-sans active:scale-[0.98] transition-transform"
              >
                Reload Application
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
