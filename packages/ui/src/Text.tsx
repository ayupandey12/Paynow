"use client"
export const Text = ({ label, placeholder, onChange, id, setmessage, type = "number",onChanges ,min}: {
    label: string,
    placeholder: string,
    onChanges: (value: string | null) => void,
    onChange: (value: number | null) => void,
    id: string,
    setmessage?: string,
    type?: "number" | "tel",
    min?:number
}) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>
                {label}
            </label>
            <input 
                required 
                id={id}
                type={type} 
                placeholder={placeholder}
                step={type === "number" ? "any" : undefined}
                min={type === "number" ? min??1 : undefined}
                minLength={type === "tel" ? 10 : undefined}
                maxLength={type === "tel" ? 10 : undefined}
                pattern={type === "tel" ? "[0-9]{10}" : undefined}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                onChange={(e) => {
                    if (type === "number") {
                        const val = e.target.valueAsNumber;
                        onChange(!isNaN(val) ? val * 100 : null);
                    } else {
                        onChanges(e.target.value || null);
                    }
                }} 
                onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    const defaultMsg = type === "number" 
                        ? "Amount should be greater than or equal to 1" 
                        : "Please enter at least 10 digits";
                    target.setCustomValidity(setmessage ?? defaultMsg);
                }}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")} 
            />
        </div>
    );
}
