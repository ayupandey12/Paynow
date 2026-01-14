"use client"
export const Text=({label,placeholder,onChange,id}:{
    label:string,
    placeholder:string,
    onChange:(value:number|null)=>void,
    id:string
})=>{
return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{label}</label>
    <input required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" id={id} min={1} onChange={(e)=>{onChange(e.target.valueAsNumber||null)}} placeholder={placeholder}  />
</div>
}