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

export default async function TransferPage() {
  const balance = await getbalance();
  const Transactions = await getonramptransactions();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8 rounded-4xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-950">Top up your wallet</h1>
            <p className="mt-3 text-slate-600">Add funds and view your balance in a clean, modern interface.</p>
          </div>
          <div className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40">Instant top-up</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <AddMoneyCard />
          <OnRampTransactions transactions={Transactions} />
        </div>
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
    </div>
  );
}

