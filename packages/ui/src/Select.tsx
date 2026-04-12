"use client"

import React from "react"

export const Select=({onSelect,options}:{onSelect:(key:string,value:string)=>void,options:{key:string,value:string}[]})=>{
    const handlechange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
             const selectedvalue=e.target.value;
             const selectedoption=options.find(t=>t.key===selectedvalue)
             if(selectedoption)
             { 
                onSelect(selectedoption.key,selectedoption.value)
             }
    }
    return <select required defaultValue="" onChange={handlechange} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
        <option value="" disabled>Select a bank</option>
        {options.map(op=><option key={op.key} value={op.key}>{op.value}</option>)}
    </select>
}
