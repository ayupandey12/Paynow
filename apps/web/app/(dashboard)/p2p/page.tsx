import { getServerSession } from "next-auth";
import { P2Pcard } from "../../../components/P2Pcard";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@repo/db";

export default function P2P() {
   async function gettransfer() {
        const session=await getServerSession(authOptions);
        const user=session.user.id;
        if(!user) return {messsage:"unautheticated user"};
        const trasfers=await prisma.p2ptransfer.findMany({
            where:{
                fromuserID:user
            },
            select:{
                startdate:true,
                amount:true
            }
        })
        console.log(trasfers)
    }
    gettransfer()
    return <div><P2Pcard/></div>
}