"use client"
import {Card} from "@repo/ui/card"
import {Text} from "@repo/ui/Text"
import { useState } from "react"
export const AddMoneyCard=()=>{
    const [Amount,SetAmount]=useState(nu)
    return <Card title="Add Money">
       <Text id="Amount" label="Amount" placeholder="Amount" onChange={}/>  
    </Card>
}