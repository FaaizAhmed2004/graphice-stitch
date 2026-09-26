import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BadgeDollarSign } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import PricingManager from "./PricingManager";

export default async function AdminPricingPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin" && profile?.role !== "staff") redirect("/portal");
  const [{ data: plans }, { data: services }] = await Promise.all([
    supabase.from("pricing_plans").select("id, service_id, name, price, currency, description, delivery_time, revisions, active, featured, sort_order").order("sort_order"),
    supabase.from("services").select("id, name, starting_price, delivery_time").eq("published", true).order("sort_order"),
  ]);
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Admin control room</Link><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45"><BadgeDollarSign className="h-4 w-4" /> Pricing</span></div></header><div className="mx-auto max-w-7xl px-5 py-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">Website commerce</p><h1 className="mt-2 text-4xl font-black">Manage pricing</h1><p className="mt-2 text-sm text-black/55">Update public rates without opening the source code.</p><div className="mt-8"><PricingManager initialPlans={plans ?? []} services={services ?? []} /></div></div></main>;
}
