"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ForgotPasswordPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setMessage(""); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/portal/login` }); setLoading(false); setMessage(error ? "We could not send the reset email. Check the address and try again." : "Check your inbox for a password reset link."); }
  return <main className="flex min-h-screen items-center justify-center bg-[#171717] px-5 text-white"><section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#242424] p-8 sm:p-10"><Link href="/portal/login" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to sign in</Link><div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9ff53] text-[#171717]"><Mail className="h-5 w-5" /></div><h1 className="mt-7 text-3xl font-black">Reset your password</h1><p className="mt-2 text-sm leading-6 text-white/55">We will send a secure reset link to your account email.</p><form onSubmit={submit} className="mt-7 space-y-4"><input required type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />{message && <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">{message}</p>}<button disabled={loading} className="w-full rounded-xl bg-[#d9ff53] px-4 py-3 font-black text-[#171717] disabled:opacity-50">{loading ? "Sending..." : "Send reset link"}</button></form></section></main>;
}
