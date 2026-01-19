"use server"
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

export async function P2pTransfer({ to, amount }: { to: string, amount: number }) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        return { message: "Unauthorized" };
    }
    const toUser = await prisma.user.findUnique({
        where: { phone: to }
    });

    if (!toUser) {
        return { message: "Recipient user not found" };
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userID" = ${from} FOR UPDATE`;

            const fromBalance = await tx.balance.findFirst({
                where: { userID: from },
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds");
            }

            await tx.balance.updateMany({
                where: { userID: from },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.updateMany({
                where: { userID: toUser.id },
                data: { amount: { increment: amount } },
            });
        },
             {
        timeout: 30000, // 30 seconds
        });

        return { message: "Transfer successful" };
    } catch (e: any) {
        return {
            message: e.message || "Error while processing transfer"
        };
    }
}
