import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
 const user=await getServerSession(authOptions)
  if(user) redirect('/dashboard');
  else redirect('/api/auth/signin')
}