"use client"
import { Button } from "@repo/ui/button";

interface Appbartype {
  user?: {
    name?: string | null;
  };
  onSignout: () => void;
  onSignin: () => void;
}

export const Appbar = ({ user, onSignout, onSignin }: Appbartype) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-orange-500">Paynow</p>
        <h1 className="text-lg font-semibold text-slate-950">Modern payment experience</h1>
      </div>

      <div className="flex items-center gap-3">
        {user?.name ? (
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Hello, {user.name}</span>
        ) : null}
        <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};