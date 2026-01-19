"use server"
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

export async function P2pTransfer({to,amount}:{to:string,amount:number}) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            phone: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        const fromBalance = await tx.balance.findFirst({
            where: { userID: from },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            return {message:"Insufficient funds"}
          }

          await tx.balance.updateMany({
            where: { userID: from },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.updateMany({
            where: { userID: toUser.id },
            data: { amount: { increment: amount } },
          });
    });
}