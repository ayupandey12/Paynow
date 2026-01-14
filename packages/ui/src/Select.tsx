"use client"
export const Select=({onSelect,options}:{onSelect:(value:string)=>void,options:{key:string,value:string}[]})=>{
    return <select required defaultValue="" onChange={(e)=>{onSelect(e.target.value)}} className=" outline-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="" disabled>Select a bank</option>
        {options.map(op=><option key={op.key} value={op.key}>{op.value}</option>)}
    </select>
}