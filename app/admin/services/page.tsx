import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers3 } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import ServicesManager from "./ServicesManager";

export default async function AdminServicesPage() {
  const supabase = await getSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/admin/login"); const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single(); if (profile?.role !== "admin" && profile?.role !== "staff") redirect("/portal"); const { data: services } = await supabase.from("services").select("id, name, slug, category, short_description, description, starting_price, delivery_time, published, featured, sort_order").order("sort_order");
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Admin control room</Link><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45"><Layers3 className="h-4 w-4" /> Services</span></div></header><div className="mx-auto max-w-7xl px-5 py-10"><h1 className="text-4xl font-black">Manage services</h1><p className="mt-2 text-sm text-black/55">Control public service pages, descriptions, starting rates, and visibility.</p><div className="mt-8"><ServicesManager initialServices={services ?? []} /></div></div></main>;
}
