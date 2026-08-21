import type { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow">{children}</div>;
}
