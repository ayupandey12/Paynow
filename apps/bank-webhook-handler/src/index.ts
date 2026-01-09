
import { prisma } from "@repo/db";
import express from "express"
const app =express();


app.post('/bankserver',async (req,res)=>{
    const {userID,token,amount}=req.body;
    await prisma.$transaction([
         prisma.balance.updateMany({
            where:{
                userID:userID
            },
            data:{
                amount:{
                    increment:amount
                }
            }
        })
    ])
})