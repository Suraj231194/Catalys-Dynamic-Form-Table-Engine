import type { ReactNode } from 'react';
import { ThemeToggle } from '../UI/ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950 text-surface-200 font-sans antialiased selection:bg-primary-500/30">
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-100">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/10 dark:bg-primary-600/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[350px] h-[350px] rounded-full bg-primary-500/8 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-surface-800/60 bg-surface-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-600/30">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-surface-50 font-display tracking-tight">
                  FormTable<span className="text-primary-500 underline decoration-primary-500/30 underline-offset-4">Pro</span>
                </h1>
                <p className="text-[10px] text-surface-400 uppercase tracking-[0.15em] font-bold leading-none mt-0.5">
                  Config-Driven UI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-500/10 text-primary-600 dark:text-primary-300 border border-primary-500/20">
                React + TypeScript
              </span>
              <div className="h-6 w-px bg-surface-800 hidden sm:block" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 lg:px-8 py-10 space-y-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-surface-800/50 mt-12 bg-surface-950/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-surface-400">
            <p className="font-medium">Built with React 19 · TypeScript · TailwindCSS 4 · TanStack Table</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-primary-500 transition-colors cursor-default">Context API</span>
              <span className="w-1 h-1 rounded-full bg-surface-700" />
              <span className="hover:text-primary-500 transition-colors cursor-default">Strict Mode</span>
              <span className="w-1 h-1 rounded-full bg-surface-700" />
              <span className="hover:text-primary-500 transition-colors cursor-default">Dynamic Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
