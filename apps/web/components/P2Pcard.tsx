"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Text } from "@repo/ui/Text"
import { useEffect, useState } from "react"

export const P2Pcard=()=>{
    const [amount,setamount]=useState<number|null>()
    const [phone,serphone]=useState<string|null>()
    useEffect(() => {
      console.log(amount,phone)
    }, [amount,phone])
    
    return <div className="h-[90vh] flex items-center justify-center-safe m-auto">
         <Card title="Send">
               <form action="">
                 <div className="min-w-72 pt-2">
                    <Text placeholder={"Number"} label="Number" id="phone" type="tel" onChange={()=>{}} onChanges={(value) => {
                        serphone(value)
                    }} />
                    <Text placeholder={"Amount"} label="Amount" id="amount" onChanges={()=>{}} onChange={(value) => {
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