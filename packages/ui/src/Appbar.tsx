"use client"
// import "../global.css"
  import {Button} from "@repo/ui/button"
interface Appbartype{
  user?:{
    name?:string|null
  }
  onSignout:()=>void
  onSignin:()=>void
}

  export const Appbar=({user,onSignout,onSignin}:Appbartype)=>{
   return  <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
  }