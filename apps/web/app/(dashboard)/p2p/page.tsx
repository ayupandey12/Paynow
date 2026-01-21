import { getServerSession } from "next-auth";
import { P2Pcard } from "../../../components/P2Pcard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";
import { Transfercard } from "../../../components/TransferCard";
export async function gettransfer() {
        const session=await getServerSession(authOptions);
        const user=session.user.id;
        if(!user) return [];
        const transfers=await prisma.p2ptransfer.findMany({
            where:{
                fromuserID:user
            },
            select:{
                startdate:true,
                amount:true
            },
            orderBy:{
                startdate:"desc"
            }
        })
        return transfers
    }
export default async function P2P() {
  
    const Transfer=await gettransfer()
return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="text-4xl text-[#6a51a6] pt-4 mb-8 font-bold text-center lg:text-left">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 xl:col-span-4 w-full">
                    <P2Pcard />
                </div>
                <div className="lg:col-span-7 xl:col-span-8 w-full">
                    <Transfercard transfer={Transfer} />
                </div>

            </div>
        </div>
    );
}