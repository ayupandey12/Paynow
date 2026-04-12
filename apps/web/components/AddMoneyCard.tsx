"use client"
import {Card} from "@repo/ui/card"
import {Text} from "@repo/ui/Text"
import { Button } from "@repo/ui/button"
import {Select} from "@repo/ui/Select"
import { useEffect, useState } from "react"
import { CreateOnRampTransaction } from "../lib/actions/Createonrampaction"
const SUPPORTED_BANKS = [{
    value: "HDFC Bank",
    key: "https://netbanking.hdfcbank.com"
}, {
    value: "Axis Bank",
    key: "https://www.axisbank.com/"
}];

export const AddMoneyCard = () => {
    const [Amount, SetAmount] = useState<number | null>(null);
    const [provider, Setprovider] = useState<string | null>(null);
    const [RedirectUrl, SetRedirectUrl] = useState<string | null>(null);

    useEffect(() => {
      console.log(Amount, RedirectUrl, provider);
    }, [Amount, RedirectUrl, provider]);

    return (
      <Card title="Add Money">
        <div className="space-y-6 pt-2">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await CreateOnRampTransaction({ provider: provider || "", amount: Amount || 0 });
              window.location.href = RedirectUrl || "";
            }}
          >
            <Text id="Amount" label="Amount" placeholder="Enter amount" onChanges={() => {}} onChange={SetAmount} />

            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">Select bank</p>
              <Select
                onSelect={(key, value) => {
                  SetRedirectUrl(key);
                  Setprovider(value);
                }}
                options={SUPPORTED_BANKS}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit">Add Money</Button>
            </div>
          </form>

          <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            Add funds through trusted bank partners and complete the payment instantly.
          </div>
        </div>
      </Card>
    );
}