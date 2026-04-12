"use client"
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export const Sidebar = ({ href, icon, title }: { href: string; icon: ReactNode; title: string }) => {
  const router = useRouter();
  const path = usePathname();
  const active = path === href;

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${
        active
          ? "bg-slate-950 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <span className={`font-semibold ${active ? "text-white" : "text-slate-800"}`}>{title}</span>
    </button>
  );
};