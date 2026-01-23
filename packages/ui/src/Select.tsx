"use client"

import React from "react"

export const Select=({onSelect,options}:{onSelect:(key:string,value:string)=>void,options:{key:string,value:string}[]})=>{
    const handlechange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        console.log("hi3")
             const selectedvalue=e.target.value;
             const selectedoption=options.find(t=>t.key===selectedvalue)
             if(selectedoption)
             { 
                onSelect(selectedoption.key,selectedoption.value)
             }
    }
    return <select required defaultValue="" onChange={handlechange} className=" outline-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="" disabled>Select a bank</option>
        {options.map(op=><option key={op.key} value={op.key}>{op.value}</option>)}
    </select>
}