"use client"
import {Appbar} from "@repo/ui/Appbar"
import { signIn,signOut,useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export const Appbarprovider=()=>{
    const session=useSession();
    const route=useRouter();
    return <div>
        <Appbar onSignin={signIn} onSignout={async ()=>{ await signOut({redirect:false}) //should use redirect to false so not to send callback url
        route.push('/api/auth/signin')
    }} user={session.data?.user}/>
    </div>
}