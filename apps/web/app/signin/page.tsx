"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      name,
      phone,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid phone or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f7f2] via-white to-[#fbf3ea] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="rounded-4xl border border-slate-200/80 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Paynow</p>
            <h1 className="mt-6 text-5xl font-semibold text-slate-950 leading-tight">Sign in to your payment hub</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">Access your balance, transfer money, and track activity with a modern banking experience.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/80 bg-orange-500 p-8 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-100/90">Fast access</p>
              <p className="mt-4 text-3xl font-semibold">Quick sign-in</p>
              <p className="mt-3 text-sm text-orange-100/80">Use your phone and password to login instantly.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Auto signup</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">No separate registration</p>
              <p className="mt-3 text-sm text-slate-600">If your phone number is new, we'll create an account automatically.</p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200/80 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-600">Securely access your dashboard and payments.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-700">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Mobile number
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876765459"
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </label>

            {error ? <p className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-950">Need help?</p>
            <p className="mt-2">Use your phone number and password. If your account doesn't exist, we'll create it automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
