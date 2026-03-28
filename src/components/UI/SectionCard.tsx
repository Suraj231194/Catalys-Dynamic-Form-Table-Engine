import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function SectionCard({ title, subtitle, icon, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-surface-800/70 bg-surface-900/50 backdrop-blur-md p-6 md:p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:border-surface-700/80 hover:shadow-2xl hover:shadow-black/30">
      <div className="flex items-center gap-4 mb-7">
        {icon && (
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/15 to-primary-600/10 text-primary-400 border border-primary-500/10 shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-white font-display tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-sm text-surface-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
