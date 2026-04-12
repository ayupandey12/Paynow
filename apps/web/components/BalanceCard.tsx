import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    return (
      <Card title="Balance Summary">
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Total balance</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950">₹{(amount + locked) / 100}</p>
            </div>
            <div className="rounded-3xl bg-slate-950 px-5 py-4 text-right text-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Available</p>
              <p className="mt-2 text-2xl font-semibold">₹{amount / 100}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Unlocked</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">₹{amount / 100}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Locked</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">₹{locked / 100}</p>
            </div>
          </div>
        </div>
      </Card>
    );
}