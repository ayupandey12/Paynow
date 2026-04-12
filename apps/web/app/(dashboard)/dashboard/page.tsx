import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getbalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userID: session?.user?.id,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export async function getonramptransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userID: session?.user?.id,
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function DashboardPage() {
  const balance = await getbalance();
  const transactions = await getonramptransactions();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <div className="rounded-4xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Bankon</p>
            <h1 className="mt-6 text-5xl font-semibold text-slate-950 leading-[1.05]">Bank that is always online</h1>
            <p className="mt-6 text-lg text-slate-600">You can easily access your bank account balance on your mobile phone whenever you want to.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-6 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Send money</p>
              <p className="mt-3 text-3xl font-semibold">Fast transfers</p>
              <p className="mt-3 text-sm text-slate-300">Send money to friends and family with one click.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Receive money</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">Instant updates</p>
              <p className="mt-3 text-sm text-slate-600">Monitor incoming payments and stay on top of your cashflow.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <AddMoneyCard />
        </div>
      </section>

      <section className="mt-8">
        <OnRampTransactions transactions={transactions} />
      </section>
    </div>
  );
}
