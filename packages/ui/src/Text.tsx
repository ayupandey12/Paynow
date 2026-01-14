export const Text=({label,placeholder,onChange,id}:{
    label:string,
    placeholder:string,
    onChange:(value:string)=>void,
    id:string
})=>{
return <div className="pt-2">
    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{label}</label>
    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id={id} onChange={(e)=>{onChange(e.target.value)}} placeholder={placeholder} />
</div>
}