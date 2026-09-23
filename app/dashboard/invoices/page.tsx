import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function InvoicesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const { data: invoices } = await supabase.from("invoices").select("id, invoice_number, order_id, status, currency, total, due_date, created_at").eq("client_id", user.id).order("created_at", { ascending: false });
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto max-w-6xl px-5 py-5"><Link href="/portal" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Dashboard</Link></div></header><div className="mx-auto max-w-6xl px-5 py-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">Billing</p><h1 className="mt-2 text-4xl font-black">Invoices</h1><div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">{invoices?.length ? invoices.map((invoice) => <Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`} className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 px-5 py-5 last:border-0 hover:bg-[#f8f7f4]"><div><p className="text-xs font-bold uppercase tracking-wider text-black/45">{invoice.invoice_number}</p><p className="mt-1 font-black">Due {invoice.due_date || "On receipt"}</p></div><div className="flex items-center gap-4"><span className="rounded-full bg-[#eef0e9] px-3 py-1 text-xs font-bold capitalize">{invoice.status}</span><strong>{invoice.currency} {invoice.total}</strong></div></Link>) : <div className="p-12 text-center"><ReceiptText className="mx-auto h-8 w-8 text-black/25" /><p className="mt-4 text-sm text-black/55">Your invoices will appear here.</p></div>}</div></div></main>;
}
