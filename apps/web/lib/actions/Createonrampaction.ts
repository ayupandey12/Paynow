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
     try {
        await axios.post("http://localhost:3010/bankserver", {
             userID: session?.user?.id,
            token: token,
            amount: amount
        });
        return { message: "Done" };

    } catch (error) {
        console.error("Payment Initiation Failed, updating status to Failure:", error);
        await prisma.onRampTransaction.update({
            where: { token: token },
            data: { status: "Failure" }
        });
        
        return { 
            message: "Error", 
            error: "Could not communicate with bank, transaction failed instantly." 
        };
    }
}