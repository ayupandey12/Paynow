import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
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
  async function getonramptransactions() {
    const session=await getServerSession(authOptions);
    const transactions=await prisma.onRampTransaction.findMany({
      where:{
        userID:session?.user?.id
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
 const transactons=await getonramptransactions()
  return <AddMoneyCard/>
}