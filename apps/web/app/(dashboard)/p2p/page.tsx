import { getServerSession } from "next-auth";
import { P2Pcard } from "../../../components/P2Pcard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { Transfercard } from "../../../components/TransferCard";

export async function gettransfer() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id;
  if (!user) return [];
  const transfers = await prisma.p2ptransfer.findMany({
    where: {
      fromuserID: user,
    },
    select: {
      startdate: true,
      amount: true,
    },
    orderBy: {
      startdate: "desc",
    },
  });
  return transfers;
}

export default async function P2P() {
  const Transfer = await gettransfer();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-950">P2P Transfer</h1>
            <p className="mt-3 text-slate-600">Send money directly to someone else with a simple payment flow.</p>
          </div>
          <div className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/30">Secure P2P</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <P2Pcard />
        </div>
        <div>
          <Transfercard transfer={Transfer} />
        </div>
      </div>
    </div>
  );
}
