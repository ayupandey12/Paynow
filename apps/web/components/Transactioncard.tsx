"use client"
import { useState, useMemo } from "react";

type TransactionType = "ALL" | "ADDED" | "RECIEVED" | "TRANSFER";

export const Transactioncard = ({ onramp, transfer, recieved }: { onramp: Array<any>; transfer: Array<any>; recieved: Array<any> }) => {
  const [filter, setFilter] = useState<TransactionType>("ALL");

  const allData = useMemo(() => {
    const merged = [
      ...onramp.map((t: any) => ({
        id: t.id || Math.random().toString(),
        amount: t.amount,
        date: new Date(t.time),
        type: "ADDED",
        status: t.status,
      })),
      ...transfer.map((t: any) => ({
        id: t.id || Math.random().toString(),
        amount: t.amount,
        date: new Date(t.startdate),
        type: "TRANSFER",
        status: "SUCCESS",
      })),
      ...recieved.map((t: any) => ({
        id: t.id || Math.random().toString(),
        amount: t.amount,
        date: new Date(t.startdate),
        type: "RECIEVED",
        status: "SUCCESS",
      })),
    ];
    return merged.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [onramp, transfer, recieved]);

  const filteredData = filter === "ALL" ? allData : allData.filter((t) => t.type === filter);

  const filterButtons: { label: string; value: TransactionType }[] = [
    { label: "All", value: "ALL" },
    { label: "Added", value: "ADDED" },
    { label: "Received", value: "RECIEVED" },
    { label: "Sent", value: "TRANSFER" },
  ];

  return (
    <div className="w-full rounded-4xl border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-4">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
              filter === btn.value ? "bg-orange-500 text-white shadow-lg shadow-orange-200/30" : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="max-h-140 overflow-y-auto p-4 custom-scrollbar">
        {filteredData.length === 0 ? (
          <div className="flex min-h-56 items-center justify-center text-slate-500">No transactions found.</div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((t) => (
              <div key={t.id} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 shadow-sm transition hover:border-orange-300/60">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      t.type === "TRANSFER" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                    }`}>
                      {t.type === "TRANSFER" ? "↗" : "↘"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {t.type === "ADDED" && "Wallet Top-up"}
                        {t.type === "TRANSFER" && "Sent Payment"}
                        {t.type === "RECIEVED" && "Received Payment"}
                      </p>
                      <p className="text-xs text-slate-500">{t.date.toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-lg font-semibold ${t.type === "TRANSFER" ? "text-rose-600" : "text-emerald-600"}`}>
                      {t.type === "TRANSFER" ? "-" : "+"} ₹{t.amount / 100}
                    </p>
                    <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      t.status === "Success" || t.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
