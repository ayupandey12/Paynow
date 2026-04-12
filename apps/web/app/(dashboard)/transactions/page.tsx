import { getServerSession } from "next-auth";
import { gettransfer } from "../p2p/page";
import { getonramptransactions } from "../transfer/page";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { Transactioncard } from "../../../components/Transactioncard";

export async function getrecieved() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id;
  if (!user) return [];
  const recieved = await prisma.p2ptransfer.findMany({
    where: {
      touserID: user,
    },
    select: {
      startdate: true,
      amount: true,
    },
    orderBy: {
      startdate: "desc",
    },
  });
  return recieved;
}

export default async function TransactionsPage() {
  const onramp = await getonramptransactions();
  const transfer = await gettransfer();
  const recieved = await getrecieved();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8 rounded-4xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <h1 className="text-4xl font-semibold text-slate-950">Transaction history</h1>
        <p className="mt-3 text-slate-600">View all your recent activity across transfers, top-ups, and received payments.</p>
      </div>
      <Transactioncard onramp={onramp} recieved={recieved} transfer={transfer} />
    </div>
  );
}
