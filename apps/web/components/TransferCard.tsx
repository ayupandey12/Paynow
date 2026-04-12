import { Card } from "@repo/ui/card"

interface transfer {
    startdate: Date,
    amount: number
}
export const Transfercard = ({ transfer }: { transfer: transfer[] }) => {
    if (!transfer.length) {
        return (
          <Card title="Recent Transfers">
            <div className="flex min-h-56 items-center justify-center text-center text-slate-500">
              No recent transfers yet.
            </div>
          </Card>
        );
    }

    return (
      <Card title="Recent Transfers">
        <div className="space-y-4 pt-2">
          {transfer.map((t, index) => (
            <div key={`${t.startdate.toISOString()}-${index}`} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm transition hover:border-orange-300/60">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Sent payment</p>
                  <p className="mt-1 text-xs text-slate-500">{t.startdate.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-rose-600">- ₹{t.amount / 100}</p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Success
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
}