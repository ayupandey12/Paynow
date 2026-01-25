"use client"
import {Card} from "@repo/ui/card"
import {Text} from "@repo/ui/Text"
import { Button } from "@repo/ui/button"
import {Select} from "@repo/ui/Select"
import { useEffect, useState } from "react"
import { CreateOnRampTransaction } from "../lib/actions/Createonrampaction"
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
                    <form  onSubmit={async (e)=>{
                      e.preventDefault()
                      console.log("done")
                         await CreateOnRampTransaction({provider:provider||"",amount:Amount||0})
                         window.location.href=RedirectUrl||""
                    }}>
                           <Text id="Amount" label="Amount" placeholder="Amount" onChanges={()=>{}} onChange={SetAmount}/>         
                    <div className="py-4 text-left">Bank</div>
                    <Select onSelect={ (key,value)=>{
                      SetRedirectUrl(key)
                      Setprovider(value)             
                    }} options={SUPPORTED_BANKS}/>
                      <div className="flex justify-center pt-4">
                        <Button  type="submit">Add Money</Button>
                      </div>
                    </form>
                </div>
                </Card>
}