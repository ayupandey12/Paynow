import { Sidebar } from "../../components/Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-400 gap-8 px-4 py-8 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-4xl border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.06)] lg:flex lg:flex-col">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Paynow</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Payments</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">A polished payment experience in a modern UI.</p>
          </div>
          <div className="space-y-3">
            <Sidebar href={'/dashboard'} icon={<HomeIcon />} title="Home" />
            <Sidebar href={'/transfer'} icon={<TransferIcon />} title="Transfer" />
            <Sidebar href={'/transactions'} icon={<TransactionsIcon />} title="Transactions" />
            <Sidebar href={'/p2p'} icon={<P2PTransferIcon />} title="P2P" />
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function P2PTransferIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}
