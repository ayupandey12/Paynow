import { Card } from "@repo/ui/card"
import { OnRampStatus } from "@repo/db";

interface Transaction {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
}
export const OnRampTransactions = ({transactions}:{transactions:Transaction[]}) => {
    if (!transactions.length) {
        return (
          <Card title="Recent Transactions">
            <div className="flex min-h-56 items-center justify-center text-center text-slate-500">
              No recent transactions yet.
            </div>
          </Card>
        );
    }

    return (
      <Card title="Recent Transactions">
        <div className="space-y-4 pt-2">
          {transactions.map((t, index) => (
            <div key={`${t.provider}-${index}`} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm transition hover:border-orange-300/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Received INR</p>
                  <p className="mt-1 text-xs text-slate-500">{t.time.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-emerald-600">+ ₹{t.amount / 100}</p>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      t.status === OnRampStatus.Success ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
}