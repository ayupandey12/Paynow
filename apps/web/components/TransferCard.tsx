import { Card } from "@repo/ui/card"

interface transfer{
    startdate:Date,
    amount:number
}
export const Transfercard=({transfer}:{transfer:transfer[]})=>{
     if(!transfer.length) return <Card title="Recent Transactions">
                 <div className="text-center pb-8 pt-8">
                     No Recent transactions
                 </div>
             </Card>
    
    return <Card title="Recent Transactions">
          <div className=" pt-2">
              {transfer.map(t=><div key={Math.random()} className="flex justify-between">
                          <div>
                              <div className="text-sm">
                                  Transfered INR
                              </div>
                              <div className="text-slate-600 text-xs">
                                  {t.startdate.toDateString()}
                              </div>
                          </div>
                               <div className="flex flex-col justify-center text-right">
                                      <span className="font-semibold text-sm">
                                          - Rs {t.amount / 100}
                                      </span>
                                      <span className={`text-[10px] uppercase font-bold text-green-600`}>
                                          Success
                                      </span>
                               </div>
                      </div>)}
          </div>
        
    </Card>
}