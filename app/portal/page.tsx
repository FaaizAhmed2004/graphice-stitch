import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, Clock3, FileText, MessageCircle, Sparkles } from "lucide-react";
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
  const nextProject = activeProjects[0];
  const statusLabels: Record<string, string> = { brief: "Brief received", in_progress: "In production", review: "Ready for review", revision: "In revision", completed: "Delivered", archived: "Archived" };
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-[#f3f2ee] text-[#171717]">
      <header className="border-b border-black/10 bg-[#171717] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/portal" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff53] text-[#171717]"><Sparkles className="h-5 w-5" /></span><span><span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Graphics Stitch</span><span className="block text-sm font-black">Client workspace</span></span></Link>
          <div className="flex items-center gap-4"><span className="hidden text-sm text-white/60 sm:block">{profile?.full_name || user.email}</span><LogoutButton /></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="relative overflow-hidden rounded-[1.75rem] bg-[#d9ff53] p-7 sm:p-10">
            <div className="relative z-10 max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-black/50">{profile?.company_name || "Your creative account"}</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Good to see you, {firstName}.</h1><p className="mt-4 max-w-md text-sm leading-6 text-black/65">Keep every brief, revision, and final artwork moving from one focused workspace.</p><Link href={nextProject ? `/portal/projects/${nextProject.id}` : "/contact"} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-bold text-white transition hover:bg-black">{nextProject ? "Continue your project" : "Start a project"}<ArrowUpRight className="h-4 w-4" /></Link></div>
            <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-24 border-black/10" /><div className="absolute -bottom-24 right-24 h-44 w-44 rounded-full border-18 border-black/10" />
          </section>
          <section className="rounded-[1.75rem] bg-[#262626] p-7 text-white sm:p-8"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Next milestone</p><Clock3 className="h-5 w-5 text-[#d9ff53]" /></div>{nextProject ? <><h2 className="mt-8 text-2xl font-black">{statusLabels[nextProject.status] || nextProject.status}</h2><p className="mt-2 text-sm text-white/55">{nextProject.name}</p>{nextProject.due_date && <p className="mt-8 text-xs font-bold uppercase tracking-wider text-white/45">Target delivery <span className="ml-2 text-white">{nextProject.due_date}</span></p>}<Link href={`/portal/projects/${nextProject.id}`} className="mt-7 inline-flex text-sm font-bold text-[#d9ff53]">View project <ArrowUpRight className="ml-1 h-4 w-4" /></Link></> : <><h2 className="mt-8 text-2xl font-black">Ready when you are.</h2><p className="mt-2 text-sm leading-6 text-white/55">Tell us what you want to make next.</p></>}</section>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-black/10 bg-white p-5"><BriefcaseBusiness className="h-5 w-5 text-black/35" /><p className="mt-8 text-3xl font-black">{activeProjects.length}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-black/45">Active projects</p></div><div className="rounded-2xl border border-black/10 bg-white p-5"><CheckCircle2 className="h-5 w-5 text-black/35" /><p className="mt-8 text-3xl font-black">{completedProjects.length}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-black/45">Delivered work</p></div><div className="rounded-2xl border border-black/10 bg-white p-5"><MessageCircle className="h-5 w-5 text-black/35" /><p className="mt-8 text-3xl font-black">{notifications?.filter((item) => !item.read_at).length ?? 0}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-black/45">Unread updates</p></div></div>
        <div className="mt-8"><Notifications initialNotifications={notifications ?? []} /></div>
        <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Client work</p><h2 className="mt-2 text-3xl font-black tracking-tight">Your projects</h2></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-black/40">New project <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">{activeProjects.length ? activeProjects.map((project) => <Link href={`/portal/projects/${project.id}`} key={project.id} className="group rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-black/30 hover:shadow-xl hover:shadow-black/5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-black/40">{project.service}</p><h3 className="mt-2 text-xl font-black">{project.name}</h3></div><span className="rounded-full bg-[#eef0e9] px-3 py-1 text-xs font-bold text-black/60">{statusLabels[project.status] || project.status}</span></div><div className="mt-8 flex items-center justify-between text-sm text-black/50"><span>{project.due_date ? `Due ${project.due_date}` : "No delivery date set"}</span><span className="font-bold text-black opacity-0 transition group-hover:opacity-100">Open <ArrowUpRight className="inline h-4 w-4" /></span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/8"><div className={`h-full rounded-full bg-[#171717] ${project.status === "brief" ? "w-1/5" : project.status === "review" || project.status === "revision" ? "w-4/5" : "w-3/5"}`} /></div></Link>) : <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center lg:col-span-2"><FileText className="mx-auto h-7 w-7 text-black/30" /><p className="mt-4 text-sm text-black/55">No projects have been assigned yet. Your approved work will appear here.</p></div>}</div>
        </section>
      </div>
    </main>
  );
}