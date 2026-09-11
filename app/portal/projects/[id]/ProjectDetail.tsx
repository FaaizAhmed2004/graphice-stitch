"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Project = { id: string; name: string; service: string; description: string | null; status: string; due_date: string | null; quoted_amount: number | null };
type Message = { id: string; body: string; created_at: string; sender_id: string };
type ProjectFile = { id: string; name: string; storage_path: string; file_type: string | null; created_at: string };

const stages = ["brief", "in_progress", "review", "revision", "completed"];

export default function ProjectDetail({ project, initialMessages, initialFiles, userId }: { project: Project; initialMessages: Message[]; initialFiles: ProjectFile[]; userId: string }) {
  const supabase = createSupabaseBrowserClient();
  const [messages, setMessages] = useState(initialMessages);
  const [files, setFiles] = useState(initialFiles);
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const currentStage = Math.max(0, stages.indexOf(project.status));

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;
    const { data, error } = await supabase.from("messages").insert({ project_id: project.id, sender_id: userId, body: body.trim() }).select("id, body, created_at, sender_id").single();
    if (error) return setNotice(error.message);
    if (data) setMessages((items) => [...items, data]);
    setBody("");
  }

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const storagePath = `${project.id}/${userId}/${file.lastModified}-${file.name}`;
    const upload = await supabase.storage.from("project-files").upload(storagePath, file);
    if (upload.error) { setUploading(false); return setNotice(upload.error.message); }
    const { data, error } = await supabase.from("project_files").insert({ project_id: project.id, uploaded_by: userId, name: file.name, storage_path: storagePath, file_type: file.type }).select("id, name, storage_path, file_type, created_at").single();
    setUploading(false);
    if (error) return setNotice(error.message);
    if (data) setFiles((items) => [data, ...items]);
    setNotice("File uploaded for review.");
    event.target.value = "";
  }

  async function downloadFile(path: string, name: string) {
    const { data, error } = await supabase.storage.from("project-files").createSignedUrl(path, 300);
    if (error || !data?.signedUrl) return setNotice(error?.message || "Could not open file.");
    const link = document.createElement("a");
    link.href = data.signedUrl;
    link.download = name;
    link.target = "_blank";
    link.click();
  }

  return <main className="min-h-screen bg-[#f5f5f3] text-gray-950"><header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><div><Link href="/portal" className="text-sm font-bold text-gray-500 hover:text-gray-950">← Client workspace</Link><h1 className="mt-2 text-xl font-black">{project.name}</h1></div><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold capitalize text-gray-600">{project.status.replace("_", " ")}</span></div></header><div className="mx-auto max-w-6xl px-5 py-10"><div className="rounded-2xl border border-gray-200 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">{project.service}</p><h2 className="mt-2 text-2xl font-black">Project progress</h2><p className="mt-2 max-w-2xl text-sm text-gray-500">{project.description || "Your Graphics Stitch team is preparing this artwork."}</p></div>{project.quoted_amount !== null && <p className="text-xl font-black">${project.quoted_amount}</p>}</div><div className="mt-8 grid gap-2 sm:grid-cols-5">{stages.map((stage, index) => <div key={stage} className="flex items-center gap-2 sm:block"><div className={`h-3 w-3 rounded-full ${index <= currentStage ? "bg-gray-950" : "bg-gray-200"}`} /><p className={`mt-1 text-xs font-bold capitalize ${index <= currentStage ? "text-gray-950" : "text-gray-400"}`}>{stage.replace("_", " ")}</p></div>)}</div>{project.due_date && <p className="mt-6 text-sm font-semibold text-gray-500">Target delivery: {project.due_date}</p>}</div><div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><section className="rounded-2xl border border-gray-200 bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Communication</p><h2 className="mt-2 text-xl font-black">Project messages</h2></div></div><div className="mt-5 max-h-96 space-y-3 overflow-y-auto">{messages.length ? messages.map((message) => <div key={message.id} className={`rounded-xl px-4 py-3 text-sm ${message.sender_id === userId ? "ml-8 bg-gray-950 text-white" : "mr-8 bg-gray-100 text-gray-700"}`}><p>{message.body}</p><p className="mt-2 text-[11px] opacity-60">{new Date(message.created_at).toLocaleString()}</p></div>) : <p className="text-sm text-gray-500">No messages yet. Send a note to your design team.</p>}</div><form onSubmit={sendMessage} className="mt-5 flex gap-2"><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Ask a question or request a revision..." className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm" /><button className="rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white">Send</button></form></section><section className="rounded-2xl border border-gray-200 bg-white p-6"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Artwork exchange</p><h2 className="mt-2 text-xl font-black">Files</h2></div><label className="mt-5 flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 px-4 py-5 text-center text-sm font-bold text-gray-600 hover:border-gray-950">{uploading ? "Uploading..." : "Upload artwork or reference file"}<input type="file" onChange={uploadFile} disabled={uploading} className="hidden" /></label>{notice && <p className="mt-3 text-xs text-gray-500">{notice}</p>}<div className="mt-5 space-y-2">{files.length ? files.map((file) => <button key={file.id} onClick={() => downloadFile(file.storage_path, file.name)} className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left text-sm hover:bg-gray-100"><span className="min-w-0 truncate font-semibold">{file.name}</span><span className="ml-3 text-xs font-bold text-gray-500">Open</span></button>) : <p className="text-sm text-gray-500">No files shared yet.</p>}</div></section></div></div></main>;
}
