import { getServerSession } from "next-auth";
import { gettransfer } from "../p2p/page"
import { getonramptransactions } from "../transfer/page"
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { Transactioncard } from "../../../components/Transactioncard";
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
export default async function transactions(){
 
  async function getalltransaction() {
    if(true)
    {
      const onramp=await getonramptransactions()
      const transfer=await gettransfer()
      const recieved=await getrecieved()
    return {onramp,transfer,recieved}
    }
  }
  const {onramp,transfer,recieved}=await getalltransaction();
  return <Transactioncard onramp={onramp} recieved={recieved} transfer={transfer}/>

}