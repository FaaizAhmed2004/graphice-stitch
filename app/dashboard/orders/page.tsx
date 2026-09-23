import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardOrdersPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const { data: orders } = await supabase.from("orders").select("id, order_number, service, status, deadline, price, payment_status, created_at").eq("client_id", user.id).order("created_at", { ascending: false });
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto max-w-6xl px-5 py-5"><Link href="/portal" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Dashboard</Link></div></header><div className="mx-auto max-w-6xl px-5 py-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">Delivery workspace</p><h1 className="mt-2 text-4xl font-black">Your orders</h1><div className="mt-8 grid gap-4">{orders?.length ? orders.map((order) => <Link href={`/dashboard/orders/${order.id}`} key={order.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div><p className="text-xs font-bold uppercase tracking-wider text-black/45">{order.order_number}</p><h2 className="mt-1 text-lg font-black">{order.service}</h2><p className="mt-1 text-sm text-black/55">{order.deadline ? `Due ${order.deadline}` : "No deadline set"}</p></div><div className="flex items-center gap-4 text-right"><span className="rounded-full bg-[#eef0e9] px-3 py-1 text-xs font-bold capitalize">{order.status.replace(/_/g, " ")}</span><ArrowUpRight className="h-5 w-5" /></div></Link>) : <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center text-sm text-black/55">No orders are assigned to your account yet.</div>}</div></div></main>;
}
