
import { prisma } from "@repo/db";
import express from "express"
const app =express();
app.use(express.json());

app.post('/bankserver',async (req,res)=>{
    const {userID,token,amount}:{userID:string,token:string,amount:string}=req.body;
   try {
     await prisma.$transaction([
         prisma.balance.updateMany({
            where:{
                userID:userID
            },
            data:{
                amount:{
                    increment:Number(amount)
                }
            }
        }),
        prisma.onRampTransaction.update({
            where:{
                token:token
            },
            data:{
                status:"Success"
            }
        })
    ])
      res.json({
            message: "Captured"
        })
   } catch (e) {
      console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
   }
})
   app.listen(3010);