"use client"
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export const Sidebar=({href,icon,title}:{href:string,icon:ReactNode,title:string})=>{
    const router=useRouter();
    const path=usePathname();
    const samepath=path===href;
 return <div className={`flex ${samepath ? "text-[#6a51a6] bg-blue-50" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${samepath ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}