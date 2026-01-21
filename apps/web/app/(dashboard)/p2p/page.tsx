import { getServerSession } from "next-auth";
import { P2Pcard } from "../../../components/P2Pcard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { Transfercard } from "../../../components/TransferCard";

export default async function P2P() {
   async function gettransfer() {
        const session=await getServerSession(authOptions);
        const user=session.user.id;
        const transfers=await prisma.p2ptransfer.findMany({
            where:{
                fromuserID:user
            },
            select:{
                startdate:true,
                amount:true
            }
        })
        return transfers
    }
    const Transfer=await gettransfer()
    return <div>
        <P2Pcard/>
        <Transfercard transfer={Transfer}/>
    </div>
}