"use client"
export const Text=({label,placeholder,onChange,id}:{
    label:string,
    placeholder:string,
    onChange:(value:number|null)=>void,
    id:string
})=>{
return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{label}</label>
    <input required className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" id={id} min={1} onChange={(e)=>{onChange(e.target.valueAsNumber||null)}} placeholder={placeholder} 
      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Amount should be greater than or equal to 1")}
                // 2. Clear the message when the user types, or it will stay stuck in "invalid" state
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")} />
</div>
}