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
    return <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
                <div>
                    <P2Pcard/>
                </div>
                <div className=" self-center">
                       <Transfercard transfer={Transfer}/>
                </div>
            </div>
        </div>
}