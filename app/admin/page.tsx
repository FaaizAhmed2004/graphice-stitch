import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Activity, FileText, LayoutDashboard, Users } from "lucide-react";
import LogoutButton from "@/app/portal/LogoutButton";
import AdminWorkspace from "./AdminWorkspace";

export default async function AdminPortalPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/portal");

  const [{ data: leads }, { data: projects }, { data: clients }, { data: pages }] = await Promise.all([
    supabase.from("leads").select("id, name, email, service, status, created_at").order("created_at", { ascending: false }).limit(50),
    supabase.from("projects").select("id, name, service, status, due_date, client_id, profiles:client_id(full_name, company_name)").order("created_at", { ascending: false }).limit(50),
    supabase.from("profiles").select("id, full_name, company_name").eq("role", "client").order("full_name"),
    supabase.from("cms_pages").select("id, slug, title, content, published").order("updated_at", { ascending: false }),
  ]);

  return <main className="min-h-screen bg-[#f4f1eb] text-[#171717]">
    <header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff53] text-[#171717]"><LayoutDashboard className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">Graphics Stitch</p><h1 className="mt-1 text-lg font-black">Admin control room</h1></div></div><div className="flex items-center gap-4"><span className="hidden text-sm text-white/55 sm:block">{profile.full_name || user.email}</span><LogoutButton /></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12"><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-black/40">Operations overview</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Keep the studio moving.</h2><p className="mt-2 text-sm text-black/55">Leads, deliveries, and content in one focused workspace.</p></div><div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-black/55"><Activity className="mr-2 inline h-4 w-4" /> Live workspace</div></div><div className="mb-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-[#171717] p-5 text-white shadow-xl shadow-black/10"><Users className="h-5 w-5 text-[#d9ff53]" /><p className="mt-7 text-xs font-bold uppercase tracking-wider text-white/45">New leads</p><p className="mt-2 text-4xl font-black">{leads?.filter((lead) => lead.status === "new").length ?? 0}</p></div><div className="rounded-2xl border border-black/10 bg-white p-5"><Activity className="h-5 w-5 text-black/35" /><p className="mt-7 text-xs font-bold uppercase tracking-wider text-black/40">Open projects</p><p className="mt-2 text-4xl font-black">{projects?.filter((project) => project.status !== "completed" && project.status !== "archived").length ?? 0}</p></div><div className="rounded-2xl border border-black/10 bg-white p-5"><FileText className="h-5 w-5 text-black/35" /><p className="mt-7 text-xs font-bold uppercase tracking-wider text-black/40">CMS pages</p><p className="mt-2 text-4xl font-black">{pages?.length ?? 0}</p></div></div><AdminWorkspace leads={leads ?? []} projects={projects ?? []} clients={clients ?? []} pages={pages ?? []} adminUserId={user.id} /></div>
  </main>;
}
