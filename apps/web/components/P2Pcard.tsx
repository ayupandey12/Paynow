"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Text } from "@repo/ui/Text"
import { useEffect, useState } from "react"
import { P2pTransfer } from "../lib/actions/p2ptransfer"

export const P2Pcard = () => {
    const [amount, setamount] = useState<number | null>();
    const [phone, serphone] = useState<string | null>();
    const [message, setmessage] = useState<String>();

    useEffect(() => {
      setmessage("");
      console.log(amount, phone);
    }, [amount, phone]);

    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card title="Send Money">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (amount === 0) {
                setmessage("Amount should not be 0");
                return;
              }
              const res = await P2pTransfer({ to: phone || "", amount: amount || 0 });
              setmessage(res.message);
            }}
          >
            <div className="space-y-4 pt-2">
              <Text placeholder="Enter mobile number" label="Recipient" id="phone" type="tel" onChange={()=>{}} onChanges={(value) => serphone(value)} />
              <Text placeholder="Enter amount" label="Amount" id="amount" setmessage="Amount should be greater than 0" min={0} onChanges={()=>{}} onChange={(value) => setamount(value)} />

              <div className={`text-center ${message === "Transfer successful" ? "text-emerald-600" : "text-rose-600"}`}>
                {message?.length ? message : undefined}
              </div>

              <div className="pt-4 flex justify-center">
                <Button type="submit">Send</Button>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                Send payments instantly with the best possible experience.
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
}