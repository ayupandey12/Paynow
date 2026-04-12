import { type JSX } from "react";

export function Card({
  title,
  children,
  className = ""
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={`rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] p-6 ${className}`}>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      </div>
      {children}
    </div>
  );
}

