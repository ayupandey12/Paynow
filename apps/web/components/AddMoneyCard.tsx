"use client"
import {Card} from "@repo/ui/card"
import {Text} from "@repo/ui/Text"
import { Button } from "@repo/ui/button"
import {Select} from "@repo/ui/Select"
import { useEffect, useState } from "react"
const SUPPORTED_BANKS = [{
    value: "HDFC Bank",
    key: "https://netbanking.hdfcbank.com"
}, {
    value: "Axis Bank",
    key: "https://www.axisbank.com/"
}];

export const AddMoneyCard=()=>{
    const [Amount,SetAmount]=useState<number|null>(null)
    const [provider,Setprovider]=useState<string|null>(null)
    const [RedirectUrl,SetRedirectUrl]=useState<string|null>(null)
    
   useEffect(() => {
     console.log(Amount,RedirectUrl,provider)
   }, [Amount,RedirectUrl,provider])
   
        return <Card title="Add Money">
                <div className="w-full">
                    <form action={RedirectUrl||""}>
                           <Text id="Amount" label="Amount" placeholder="Amount" onChange={SetAmount}/>         
                    <div className="py-4 text-left">Bank</div>
                    <Select onSelect={ (key,value)=>{
                      SetRedirectUrl(key)
                      Setprovider(value)             
                    }} options={SUPPORTED_BANKS}/>
                      <div className="flex justify-center pt-4">
                        <Button type="submit">Add Money</Button>
                      </div>
                    </form>
                </div>
                </Card>
}