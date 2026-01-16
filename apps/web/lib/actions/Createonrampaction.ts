"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../../app/api/auth/[...nextauth]/route"
import { prisma } from "@repo/db";

export async function CreateOnRampTransaction({provider,amount}:{provider:string,amount:number}) {
    const session =await getServerSession(authOptions);
    if(!session?.user||!session.user?.id) return {message: "Unauthenticated request"}
    const token=Math.random().toString();
    const user =await prisma.onRampTransaction.create({
        data:{
            userID:session.user.id,
            token:token,
            amount:amount,
            provider:provider,
            startTime:new Date(),
            status:"Processing"
        }
    })
    return {message:"Done"};
}