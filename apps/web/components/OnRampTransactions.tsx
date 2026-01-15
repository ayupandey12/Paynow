import { Card } from "@repo/ui/card"
import { OnRampStatus } from "@repo/db";

interface Transaction {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
}
export const OnRampTransactions = ({transactions}:{transactions:Transaction[]}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                     <div className="flex flex-col justify-center text-right">
                            <span className="font-semibold text-sm">
                                + Rs {t.amount / 100}
                            </span>
                            <span className={`text-[10px] uppercase font-bold ${
                                t.status === OnRampStatus.Success ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                                {t.status}
                            </span>
                     </div>


            </div>)}
        </div>
    </Card>
}