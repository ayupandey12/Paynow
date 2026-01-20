"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  children: ReactNode;
  onClick?:()=>void; //can be function or undefined
  type?:any
}

export const Button = ({ children, onClick,type}: ButtonProps) => {
  const {pending} =useFormStatus()
  return (
      <button disabled={pending} onClick={onClick} type={type||"button"} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {pending?"processing...":children}
    </button>
  );
};
