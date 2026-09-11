import { redirect } from "next/navigation";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import Notifications from "./Notifications";

export default async function ClientPortalPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const [{ data: profile }, { data: projects }, { data: notifications }] = await Promise.all([
    supabase.from("profiles").select("full_name, company_name, role").eq("id", user.id).single(),
    supabase.from("projects").select("id, name, service, status, due_date, quoted_amount").eq("client_id", user.id).order("created_at", { ascending: false }),
    supabase.from("notifications").select("id, title, body, project_id, created_at, read_at").eq("recipient_id", user.id).order("created_at", { ascending: false }).limit(10),
  ]);

  if (profile?.role === "admin") redirect("/admin");
  const activeProjects = projects?.filter((project) => project.status !== "completed" && project.status !== "archived") ?? [];
  const completedProjects = projects?.filter((project) => project.status === "completed") ?? [];

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-gray-950">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Graphics Stitch</p><h1 className="mt-1 text-xl font-black">Client workspace</h1></div>
          <div className="flex items-center gap-5"><span className="hidden text-sm text-gray-500 sm:block">{profile?.full_name || user.email}</span><LogoutButton /></div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8"><p className="text-sm text-gray-500">{profile?.company_name || "Your creative work, in one place."}</p><h2 className="mt-2 text-3xl font-black">Good to see you.</h2></div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[{ label: "Active projects", value: activeProjects.length }, { label: "Completed", value: completedProjects.length }, { label: "Account email", value: user.email || "-" }].map((item) => <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</p><p className="mt-3 truncate text-2xl font-black">{item.value}</p></div>)}
        </div>
        <div className="mt-8"><Notifications initialNotifications={notifications ?? []} /></div>
        <section className="mt-10"><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Work in progress</p><h2 className="mt-2 text-2xl font-black">Your projects</h2></div><Link href="/contact" className="rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-700">Start a project</Link></div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">{activeProjects.length ? activeProjects.map((project) => <Link href={`/portal/projects/${project.id}`} key={project.id} className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-gray-400"><div className="flex items-start justify-between gap-4"><div><h3 className="font-black">{project.name}</h3><p className="mt-1 text-sm text-gray-500">{project.service}</p></div><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold capitalize text-gray-600">{project.status.replace("_", " ")}</span></div>{project.due_date && <p className="mt-6 text-sm text-gray-500">Due {project.due_date}</p>}<div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full w-2/3 rounded-full bg-gray-900" /></div><p className="mt-4 text-xs font-bold text-gray-400">Open project workspace →</p></Link>) : <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 lg:col-span-2">No projects have been assigned yet. Your approved work will appear here.</div>}</div>
        </section>
      </div>
    </main>
  );
}