import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
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

  return <main className="min-h-screen bg-[#f5f5f3] text-gray-950">
    <header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Graphics Stitch</p><h1 className="mt-1 text-xl font-black">Admin control room</h1></div><div className="flex items-center gap-5"><span className="text-sm text-gray-500">{profile.full_name || user.email}</span><LogoutButton /></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-10"><div className="mb-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-gray-950 p-5 text-white"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">New leads</p><p className="mt-3 text-3xl font-black">{leads?.filter((lead) => lead.status === "new").length ?? 0}</p></div><div className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Open projects</p><p className="mt-3 text-3xl font-black">{projects?.filter((project) => project.status !== "completed" && project.status !== "archived").length ?? 0}</p></div><div className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">CMS pages</p><p className="mt-3 text-3xl font-black">{pages?.length ?? 0}</p></div></div><AdminWorkspace leads={leads ?? []} projects={projects ?? []} clients={clients ?? []} pages={pages ?? []} adminUserId={user.id} /></div>
  </main>;
}
