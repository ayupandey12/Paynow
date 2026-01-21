"use client"
import { useState, useMemo } from "react";
import { OnRampStatus } from "@repo/db";

type TransactionType = "ALL" | "ADDED" | "RECIEVED" | "TRANSFER";


export const Transactioncard=({ onramp, transfer, recieved }:{onramp:Array<any>,transfer:Array<any>,recieved:Array<any>})=> {
    const [filter, setFilter] = useState<TransactionType>("ALL");

    const allData = useMemo(() => {
        const merged = [
            ...onramp.map((t: any) => ({
                id: t.id || Math.random().toString(),
                amount: t.amount,
                date: new Date(t.time),
                type: "ADDED",
                status: t.status
            })),
            ...transfer.map((t: any) => ({
                id: t.id || Math.random().toString(),
                amount: t.amount,
                date: new Date(t.startdate),
                type: "TRANSFER",
                status: "SUCCESS"
            })),
            ...recieved.map((t: any) => ({
                id: t.id || Math.random().toString(),
                amount: t.amount,
                date: new Date(t.startdate),
                type: "RECIEVED",
                status: "SUCCESS"
            }))
        ];
        return merged.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [onramp, transfer, recieved]);

    // Filter data based on active tab
    const filteredData = filter === "ALL" 
        ? allData 
        : allData.filter(t => t.type === filter);

    const filterButtons: { label: string; value: TransactionType }[] = [
        { label: "All Transactions", value: "ALL" },
        { label: "Added Amount", value: "ADDED" },
        { label: "Received Amount", value: "RECIEVED" },
        { label: "Transferred Amount", value: "TRANSFER" },
    ];

    return (
        <div className="w-full h-full mt-15 max-w-2xl mx-auto border rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="flex border-b bg-gray-50/50">
                {filterButtons.map((btn) => (
                    <button
                        key={btn.value}
                        onClick={() => setFilter(btn.value)}
                        className={`flex-1 py-4 text-xs font-bold transition-all border-b-2 ${
                            filter === btn.value 
                            ? "border-blue-600 text-blue-600 bg-blue-50/50" 
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <div className="h-125 overflow-y-auto p-4 custom-scrollbar">
                {filteredData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p>No {filter.toLowerCase()} transactions found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredData.map((t) => (
                            <div key={t.id} className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${
                                        t.type === "TRANSFER" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                                    }`}>
                                        {t.type === "TRANSFER" ? "↑" : "↓"}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {t.type === "ADDED" && "Wallet Top-up"}
                                            {t.type === "TRANSFER" && "Sent Payment"}
                                            {t.type === "RECIEVED" && "Received Payment"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {t.date.toLocaleDateString('en-IN', { 
                                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className={`text-sm font-bold ${
                                        t.type === "TRANSFER" ? "text-red-600" : "text-green-600"
                                    }`}>
                                        {t.type === "TRANSFER" ? "-" : "+"} ₹{t.amount / 100}
                                    </div>
                                    <div className={`text-[10px] font-black uppercase ${
                                        t.status === "Success" || t.status === "SUCCESS" ? "text-green-500" : "text-amber-500"
                                    }`}>
                                        {t.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
