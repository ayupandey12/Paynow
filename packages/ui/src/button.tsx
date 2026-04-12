"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: any;
}

export const Button = ({ children, onClick, type }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      onClick={onClick}
      type={type || "button"}
      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition duration-200 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Processing..." : children}
    </button>
  );
};

