"use client"
import { useSession } from "next-auth/react";
import { signIn,signOut}from "next-auth/react";
export default function Home() {
 const user=useSession()
  return (
    <div >
       <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      {JSON.stringify(user.data?.user?.name)??"no data"}
    </div>
  );
}