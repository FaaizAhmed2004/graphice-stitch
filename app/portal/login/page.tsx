"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/portal");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next?.startsWith("/")) setNextPath(next);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      const authMessage = result.error?.toLowerCase().includes("invalid login credentials")
        ? "Email or password is incorrect. New clients should create an account first."
        : result.error || "Something went wrong.";
      return setMessage(authMessage);
    }
    if (mode === "signup" && result.needsEmailConfirmation) return setMessage("Check your email to confirm your account, then sign in.");
    router.push(nextPath);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#171717] px-4 py-6 text-white sm:px-8 sm:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-[#242424] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#d9ff53] p-10 text-[#171717] lg:flex lg:flex-col lg:justify-between"><div><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold">Graphics Stitch <ArrowUpRight className="h-4 w-4" /></Link><div className="mt-24 max-w-sm"><p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">A better way to collaborate</p><h2 className="mt-5 text-5xl font-black tracking-tight">Your ideas, in motion.</h2><p className="mt-5 text-sm leading-6 text-black/60">A calm, clear home for every brief, stitch file, revision, and final delivery.</p></div></div><div className="space-y-3 text-sm font-bold"><p className="flex items-center gap-3"><Check className="h-4 w-4" /> Clear project milestones</p><p className="flex items-center gap-3"><Check className="h-4 w-4" /> Direct team communication</p><p className="flex items-center gap-3"><Check className="h-4 w-4" /> Secure file delivery</p></div><Sparkles className="absolute -bottom-10 -right-8 h-48 w-48 rotate-12 text-black/10" /></section>
        <section className="p-7 sm:p-12 lg:p-16"><Link href="/" className="text-sm text-white/45 hover:text-white lg:hidden">← Back to Graphics Stitch</Link><div className="mx-auto max-w-md lg:mt-12"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9ff53] text-[#171717]"><Sparkles className="h-5 w-5" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-white/40">Client workspace</p><h1 className="mt-3 text-3xl font-black">{mode === "login" ? "Welcome back" : "Create your workspace"}</h1><p className="mt-2 text-sm leading-6 text-white/50">Track artwork, revisions, files, and delivery from one place.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && <>
              <input required placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
              <input placeholder="Company name (optional)" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
            </>}
            <input required type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
            <input required minLength={8} type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
            {message && <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">{message}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9ff53] px-4 py-3 font-bold text-[#171717] transition hover:bg-white disabled:opacity-50">{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}<ArrowUpRight className="h-4 w-4" /></button>
          </form>
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }} className="mt-6 w-full text-sm text-white/45 hover:text-white">{mode === "login" ? "New client? Create an account" : "Already have an account? Sign in"}</button>
        </div></section>
      </div>
    </main>
  );
}