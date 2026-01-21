import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
 async function getbalance() {
    const session=await getServerSession(authOptions);
    const balance=await prisma.balance.findFirst({
      where:{
        userID:session?.user?.id
      }
    })
    return {
      amount:balance?.amount||0,
      locked:balance?.locked||0
    }
  }
 export async function getonramptransactions() {
    const session=await getServerSession(authOptions);
    if (!session?.user?.id) return [];
    const transactions=await prisma.onRampTransaction.findMany({
      where:{
        userID:session?.user?.id
      },
      orderBy:{
        startTime:"desc"
      }
    })
    return transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
  }
export default async function transfer(){
 const balance=await getbalance();
 const Transactions=await getonramptransactions()
     return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={Transactions} />
                </div>
            </div>
        </div>
    </div>
}
