import { prisma } from "@repo/db";
import axios from "axios";
import express from "express"
const app =express();
app.use(express.json());
app.get('/',()=>{console.log("running")})
// fake bank server to take userid,token,amount from app server and make a post req to bankwebhook server with same body
app.post('/bankserver',async(req,res)=>{
   const {userID,token,amount}:{userID:string,token:string,amount:number}=req.body;
   try {
    const rest=await axios.post("http://localhost:3010/bankwebhook",{userID,token,amount})
    return res.json({message:"done"})
   } catch (error) {
    return res.json({message:"error on while sending to webhookserver"})
   }
})
app.post('/bankwebhook',async (req,res)=>{
    const {userID,token,amount}:{userID:string,token:string,amount:number}=req.body;
   try {
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
       await prisma.onRampTransaction.update({data:{
         status:"Failure",
       },
     where:{
        token:token
     }})
        res.status(411).json({
            message: "Error while processing webhook"
        })
   }
})
   app.listen(3010,()=>{
    console.log("server is running")
   });