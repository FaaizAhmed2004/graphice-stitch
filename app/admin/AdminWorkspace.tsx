"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const leadStatuses = ["new", "contacted", "qualified", "converted", "lost"];
const projectStatuses = ["brief", "in_progress", "review", "revision", "completed", "archived"];

type Lead = { id: string; name: string; email: string; service: string; status: string; created_at: string };
type Project = { id: string; name: string; service: string; status: string; due_date: string | null; client_id: string; profiles: { full_name: string | null; company_name: string | null }[] | null };
type Client = { id: string; full_name: string | null; company_name: string | null };
type CmsPage = { id: string; slug: string; title: string; content: { body?: string }; published: boolean };
type Props = { leads: Lead[]; projects: Project[]; clients: Client[]; pages: CmsPage[]; adminUserId: string };

export default function AdminWorkspace({ leads: initialLeads, projects: initialProjects, clients, pages: initialPages, adminUserId }: Props) {
  const supabase = createSupabaseBrowserClient();
  const [leads, setLeads] = useState(initialLeads);
  const [projects, setProjects] = useState(initialProjects);
  const [pages, setPages] = useState(initialPages);
  const [section, setSection] = useState<"pipeline" | "projects" | "cms">("pipeline");
  const [notice, setNotice] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0]?.id || "");
  const [projectMessage, setProjectMessage] = useState("");
  const [projectNotice, setProjectNotice] = useState("");
  const [uploadingProjectFile, setUploadingProjectFile] = useState(false);
  const [projectForm, setProjectForm] = useState({ client_id: clients[0]?.id || "", name: "", service: "", due_date: "", quoted_amount: "" });
  const [pageForm, setPageForm] = useState({ slug: "", title: "", body: "", published: false });
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  async function updateLead(id: string, status: string) {
    const { error } = await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return setNotice(error.message);
    setLeads((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setNotice("Lead updated.");
  }

  async function updateProject(id: string, status: string) {
    const { error } = await supabase.from("projects").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return setNotice(error.message);
    setProjects((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setNotice("Project updated.");
  }

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...projectForm, quoted_amount: projectForm.quoted_amount ? Number(projectForm.quoted_amount) : null };
    const { data, error } = await supabase.from("projects").insert(payload).select("id, name, service, status, due_date, client_id, profiles:client_id(full_name, company_name)").single();
    if (error) return setNotice(error.message);
    if (data) {
      setProjects((items) => [data, ...items]);
      setSelectedProjectId(data.id);
    }
    setProjectForm({ client_id: clients[0]?.id || "", name: "", service: "", due_date: "", quoted_amount: "" });
    setNotice("Project created and assigned.");
  }

  async function sendProjectMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProjectId || !projectMessage.trim()) return;
    const { error } = await supabase.from("messages").insert({ project_id: selectedProjectId, sender_id: adminUserId, body: projectMessage.trim() });
    if (error) return setProjectNotice(error.message);
    setProjectMessage("");
    setProjectNotice("Message sent to the client.");
  }

  async function uploadProjectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedProjectId) return;
    setUploadingProjectFile(true);
    const storagePath = `${selectedProjectId}/admin-${file.lastModified}-${file.name}`;
    const upload = await supabase.storage.from("project-files").upload(storagePath, file);
    if (upload.error) {
      setUploadingProjectFile(false);
      return setProjectNotice(upload.error.message);
    }
    const { error } = await supabase.from("project_files").insert({ project_id: selectedProjectId, uploaded_by: adminUserId, name: file.name, storage_path: storagePath, file_type: file.type });
    setUploadingProjectFile(false);
    event.target.value = "";
    setProjectNotice(error ? error.message : "File delivered to the client.");
  }

  function editPage(page: CmsPage) {
    setEditingPageId(page.id);
    setPageForm({ slug: page.slug, title: page.title, body: page.content?.body || "", published: page.published });
  }

  async function savePage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { slug: pageForm.slug.trim(), title: pageForm.title.trim(), content: { body: pageForm.body }, published: pageForm.published };
    const query = editingPageId
      ? supabase.from("cms_pages").update(payload).eq("id", editingPageId).select("id, slug, title, content, published").single()
      : supabase.from("cms_pages").insert(payload).select("id, slug, title, content, published").single();
    const { data, error } = await query;
    if (error) return setNotice(error.message);
    if (data) setPages((items) => editingPageId ? items.map((item) => item.id === editingPageId ? data : item) : [data, ...items]);
    setEditingPageId(null);
    setPageForm({ slug: "", title: "", body: "", published: false });
    setNotice("CMS page saved.");
  }

  return <div>
    {notice && <div className="mb-5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">{notice}</div>}
    <div className="mb-8 flex flex-wrap gap-2">
      {[{ id: "pipeline", label: "Lead pipeline" }, { id: "projects", label: "Projects" }, { id: "cms", label: "CMS pages" }].map((item) => <button key={item.id} onClick={() => setSection(item.id as typeof section)} className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${section === item.id ? "bg-gray-950 text-white" : "bg-white text-gray-500 hover:text-gray-950"}`}>{item.label}</button>)}
    </div>

    {section === "pipeline" && <section><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pipeline</p><h2 className="mt-2 text-2xl font-black">Latest leads</h2></div><p className="text-sm text-gray-500">{leads.length} total</p></div><div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">{leads.length ? leads.map((lead) => <div key={lead.id} className="grid gap-3 border-b border-gray-100 px-5 py-4 last:border-0 md:grid-cols-[1fr_auto]"><div><p className="font-bold">{lead.name}</p><p className="text-sm text-gray-500">{lead.service} · {lead.email}</p><p className="mt-1 text-xs text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</p></div><select value={lead.status} onChange={(event) => updateLead(lead.id, event.target.value)} className="self-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-bold capitalize">{leadStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>) : <p className="p-6 text-sm text-gray-500">No leads yet.</p>}</div></section>}

    {section === "projects" && <section>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Client operations</p><h2 className="mt-2 text-2xl font-black">Send work and updates</h2><p className="mt-2 text-sm text-gray-500">Choose a project to message its client or deliver a file directly to their portal.</p></div>{projectNotice && <p className="text-sm font-semibold text-gray-600">{projectNotice}</p>}</div>{projects.length ? <><select value={selectedProjectId} onChange={(event) => setSelectedProjectId(event.target.value)} className="mt-5 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm">{projects.map((project) => <option key={project.id} value={project.id}>{project.name} · {project.profiles?.[0]?.full_name || project.profiles?.[0]?.company_name || "Client"}</option>)}</select><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]"><form onSubmit={sendProjectMessage} className="flex gap-3"><input required placeholder="Write an update for the client" value={projectMessage} onChange={(event) => setProjectMessage(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><button className="rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white">Send message</button></form><label className="flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:border-gray-400">{uploadingProjectFile ? "Uploading..." : "Deliver file"}<input type="file" onChange={uploadProjectFile} disabled={uploadingProjectFile} className="sr-only" /></label></div></> : <p className="mt-5 text-sm text-gray-500">Create a project first to contact a client.</p>}</div>
      <div className="grid gap-8 xl:grid-cols-[1fr_1.4fr]"><form onSubmit={createProject} className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">New delivery</p><h2 className="mt-2 text-2xl font-black">Create project</h2><div className="mt-5 space-y-3"><select required value={projectForm.client_id} onChange={(event) => setProjectForm({ ...projectForm, client_id: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm"><option value="">Assign client</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.full_name || client.company_name || client.id}</option>)}</select><input required placeholder="Project name" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><input required placeholder="Service" value={projectForm.service} onChange={(event) => setProjectForm({ ...projectForm, service: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><div className="grid grid-cols-2 gap-3"><input type="date" value={projectForm.due_date} onChange={(event) => setProjectForm({ ...projectForm, due_date: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><input type="number" min="0" step="0.01" placeholder="Quote" value={projectForm.quoted_amount} onChange={(event) => setProjectForm({ ...projectForm, quoted_amount: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /></div><button className="w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white hover:bg-gray-700">Create project</button></div></form><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivery board</p><h2 className="mt-2 text-2xl font-black">Active work</h2><div className="mt-5 space-y-3">{projects.length ? projects.map((project) => <div key={project.id} className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">{project.profiles?.[0]?.company_name || project.profiles?.[0]?.full_name || "Client"}</p><h3 className="mt-1 font-black">{project.name}</h3><p className="text-sm text-gray-500">{project.service}</p></div><select value={project.status} onChange={(event) => updateProject(project.id, event.target.value)} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-bold capitalize">{projectStatuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}</select></div>{project.due_date && <p className="mt-4 text-xs text-gray-400">Due {project.due_date}</p>}</div>) : <p className="rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">No projects yet.</p>}</div></div></div>
    </section>}

    {section === "cms" && <section><div className="grid gap-8 xl:grid-cols-[1fr_1.2fr]"><form onSubmit={savePage} className="rounded-2xl border border-gray-200 bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Content management</p><h2 className="mt-2 text-2xl font-black">{editingPageId ? "Edit page" : "New page"}</h2></div>{editingPageId && <button type="button" onClick={() => { setEditingPageId(null); setPageForm({ slug: "", title: "", body: "", published: false }); }} className="text-xs font-bold text-gray-500">Cancel</button>}</div><div className="mt-5 space-y-3"><input required placeholder="Slug e.g. home" value={pageForm.slug} onChange={(event) => setPageForm({ ...pageForm, slug: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><input required placeholder="Page title" value={pageForm.title} onChange={(event) => setPageForm({ ...pageForm, title: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><textarea required rows={8} placeholder="Page content" value={pageForm.body} onChange={(event) => setPageForm({ ...pageForm, body: event.target.value })} className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm" /><label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={pageForm.published} onChange={(event) => setPageForm({ ...pageForm, published: event.target.checked })} /> Published</label><button className="w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white">Save CMS page</button></div></form><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Library</p><h2 className="mt-2 text-2xl font-black">Published content</h2><div className="mt-5 space-y-3">{pages.length ? pages.map((page) => <button key={page.id} onClick={() => editPage(page)} className="block w-full rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-gray-400"><div className="flex items-center justify-between gap-3"><span className="font-black">{page.title}</span><span className={`text-xs font-bold ${page.published ? "text-green-600" : "text-gray-400"}`}>{page.published ? "Published" : "Draft"}</span></div><p className="mt-1 text-sm text-gray-500">/{page.slug}</p></button>) : <p className="text-sm text-gray-500">No CMS pages yet.</p>}</div></div></div></section>}
  </div>;
}
