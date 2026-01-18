import { prisma } from "@repo/db";
import axios from "axios";
import express from "express"
import cors from "cors"
const app =express();
app.use(cors({
    origin:["http://localhost:3010","http://localhost:3000"]
}))
app.use(express.json());
app.get('/',async (req,res)=>{console.log("running")
    const users=await prisma.user.findMany({});
    return res.json(users)
})
// fake bank server to take userid,token,amount from app server and make a post req to bankwebhook server with same body
app.post('/bankserver',async(req,res)=>{
    console.log("hii")
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
    const amountmain=amount/100;
   try { 
     await prisma.user.findMany({}); //used for transaction to work
     await prisma.$transaction([
        prisma.balance.updateMany({
            where:{
                userID:userID
            },
            data:{
                amount:{
                    increment:amountmain
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