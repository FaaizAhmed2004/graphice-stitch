import { notFound, redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import ProjectDetail from "./ProjectDetail";
import ProjectBriefForm from "./ProjectBriefForm";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const [{ data: project }, { data: messages }, { data: files }, { data: brief }] = await Promise.all([
    supabase.from("projects").select("id, name, service, description, status, due_date, quoted_amount").eq("id", id).eq("client_id", user.id).single(),
    supabase.from("messages").select("id, body, created_at, sender_id").eq("project_id", id).order("created_at"),
    supabase.from("project_files").select("id, name, storage_path, file_type, created_at").eq("project_id", id).order("created_at", { ascending: false }),
    supabase.from("project_briefs").select("artwork_description, garment_type, placement, finished_width, finished_height, thread_colors, machine_formats, special_instructions, sample_file_id").eq("project_id", id).maybeSingle(),
  ]);
  if (!project) notFound();
  return <><ProjectBriefForm projectId={id} userId={user.id} initialBrief={brief} /><ProjectDetail project={project} initialMessages={messages ?? []} initialFiles={files ?? []} userId={user.id} /></>;
}
