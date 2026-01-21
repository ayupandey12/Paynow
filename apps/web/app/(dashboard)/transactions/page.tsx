import { getServerSession } from "next-auth";
import { gettransfer } from "../p2p/page"
import { getonramptransactions } from "../transfer/page"
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
export async function getrecieved() {
   const session=await getServerSession(authOptions);
          const user=session.user.id;
          if(!user) return [];
          const recieved=await prisma.p2ptransfer.findMany({
              where:{
                  touserID:user
              },
              select:{
                  startdate:true,
                  amount:true
              },
              orderBy:{
                  startdate:"desc"
              }
          })
          return recieved
}
export default function transactions(){
  interface title{
    title:"ALL"|"TRANSFER"|"RECIEVED"|"ADDED"
  }
  async function getalltransaction({title}:{title:title}) {
    if(title.title==="ALL")
    {
      const onramp=await getonramptransactions()
      const transfer=await gettransfer()
      const added=await getrecieved()
    }
  }
  return <div>all transactions</div>
}