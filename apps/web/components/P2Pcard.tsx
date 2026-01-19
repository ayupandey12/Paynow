"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Text } from "@repo/ui/Text"
import { useEffect, useState } from "react"
import { P2pTransfer } from "../lib/actions/p2ptransfer"

export const P2Pcard=()=>{
    const [amount,setamount]=useState<number|null>()
    const [phone,serphone]=useState<string|null>()
    useEffect(() => {
      console.log(amount,phone)
    }, [amount,phone])
    
    return <div className="h-[90vh] flex items-center justify-center-safe ">
         <Card title="Send">
               <form action={async()=>{
                 const res= await P2pTransfer({to:phone||"",amount:amount||0})
                 console.log(res?.message)
               }}>
                 <div className="min-w-72 pt-2">
                    <Text placeholder={"Number"} label="Number" id="phone" type="tel" onChange={()=>{}} onChanges={(value) => {
                        serphone(value)
                    }} />
                    <Text placeholder={"Amount"} label="Amount" id="amount" setmessage="Amount should be greater than 0" min={0} onChanges={()=>{}} onChange={(value) => {
                        setamount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button type={"submit"}>Send</Button>
                    </div>
                </div>
               </form>
    </Card>
    </div>
    
}