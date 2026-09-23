import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FilePlus2, ShieldCheck } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import QuoteForm from "./QuoteForm";

export default async function QuotePage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login?next=/quote");

  return (
    <main className="min-h-screen bg-[#f3f2ee] text-[#171717]">
      <header className="border-b border-black/10 bg-[#171717] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/portal" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Client workspace</Link>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">New quote request</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-3xl bg-[#171717] p-7 text-white sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9ff53] text-[#171717]"><FilePlus2 className="h-6 w-6" /></div>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-[#d9ff53]">Project intake</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Tell us what you want to make.</h1>
            <p className="mt-4 text-sm leading-6 text-white/60">Share the design requirements once. Your team can follow the quote, files, approval, and delivery from the portal.</p>
            <div className="mt-10 space-y-4 text-sm text-white/70"><p className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#d9ff53]" /> Private file storage</p><p className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#d9ff53]" /> Quote number and status tracking</p><p className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#d9ff53]" /> Direct designer communication</p></div>
          </aside>
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5 sm:p-9"><QuoteForm userId={user.id} /></section>
        </div>
      </div>
    </main>
  );
}
