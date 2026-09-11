"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(result.error || "Something went wrong.");
    if (mode === "signup" && result.needsEmailConfirmation) return setMessage("Check your email to confirm your account, then sign in.");
    router.push("/portal");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back to Graphics Stitch</Link>
        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">Client workspace</p>
          <h1 className="mt-3 text-3xl font-black">{mode === "login" ? "Welcome back" : "Create your workspace"}</h1>
          <p className="mt-2 text-sm text-gray-400">Track artwork, revisions, files, and delivery from one place.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && <>
              <input required placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm outline-none focus:border-gray-400" />
              <input placeholder="Company name (optional)" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm outline-none focus:border-gray-400" />
            </>}
            <input required type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm outline-none focus:border-gray-400" />
            <input required minLength={8} type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm outline-none focus:border-gray-400" />
            {message && <p className="rounded-xl bg-gray-800 px-4 py-3 text-sm text-gray-300">{message}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-white px-4 py-3 font-bold text-gray-950 transition hover:bg-gray-200 disabled:opacity-50">{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button>
          </form>
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }} className="mt-6 w-full text-sm text-gray-400 hover:text-white">{mode === "login" ? "New client? Create an account" : "Already have an account? Sign in"}</button>
        </div>
      </div>
    </main>
  );
}