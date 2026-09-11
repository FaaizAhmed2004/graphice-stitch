"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(result.error || "Unable to sign in.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-16 text-gray-950">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-gray-500 transition hover:text-gray-950">Back to Graphics Stitch</Link>
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl shadow-gray-900/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white"><ShieldCheck className="h-6 w-6" /></div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">Restricted access</p>
          <h1 className="mt-3 text-3xl font-black text-gray-950">Admin control room</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">Sign in with your seeded administrator account to manage leads, projects, clients, and content.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-bold text-gray-800"><span className="mb-2 block">Admin email</span><input required type="email" autoComplete="username" placeholder="admin@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 font-normal text-gray-950 outline-none placeholder:text-gray-400 focus:border-gray-950 focus:bg-white" /></label>
            <label className="block text-sm font-bold text-gray-800"><span className="mb-2 block">Admin password</span><input required type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 font-normal text-gray-950 outline-none placeholder:text-gray-400 focus:border-gray-950 focus:bg-white" /></label>
            {message && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-gray-950 px-4 py-3 font-bold text-white transition hover:bg-gray-700 disabled:opacity-50">{loading ? "Checking access..." : "Enter control room"}</button>
          </form>
          <p className="mt-6 text-center text-xs text-gray-500">Client accounts use the separate <Link href="/portal/login" className="font-bold text-gray-700 hover:text-gray-950">client portal</Link>.</p>
        </div>
      </div>
    </main>
  );
}