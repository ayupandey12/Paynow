"use client"
import {Card} from "@repo/ui/card"
import {Text} from "@repo/ui/Text"
import { useEffect, useState } from "react"

export const AddMoneyCard=()=>{
    const [Amount,SetAmount]=useState<number|null>(null)
   useEffect(() => {
     console.log(Amount)
   }, [Amount])
   
        return <Card title="Add Money">
       <Text id="Amount" label="Amount" placeholder="Amount" onChange={SetAmount}/>  
      
    </Card>
}