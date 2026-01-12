"use client"
import {Appbar} from "@repo/ui/Appbar"
import { signIn,signOut,useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export const Appbarprovider=()=>{
    const session=useSession();
    return <div>
        <Appbar onSignin={signIn} onSignout={async ()=>{ await signOut({redirect:false}) //should use redirect to false so not to send callback url
        redirect('/api/auth/signin')
    }} user={session.data?.user}/>
    </div>
}