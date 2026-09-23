"use client";

import { useState } from "react";
import { CheckCircle2, Paperclip, Send } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Brief = {
  artwork_description: string;
  garment_type: string | null;
  placement: string | null;
  finished_width: string | null;
  finished_height: string | null;
  thread_colors: string | null;
  machine_formats: string | null;
  special_instructions: string | null;
  sample_file_id: string | null;
};

type Props = { projectId: string; userId: string; initialBrief: Brief | null };

const emptyForm = {
  artwork_description: "",
  garment_type: "",
  placement: "",
  finished_width: "",
  finished_height: "",
  thread_colors: "",
  machine_formats: "DST, PES",
  special_instructions: "",
};

export default function ProjectBriefForm({ projectId, userId, initialBrief }: Props) {
  const supabase = createSupabaseBrowserClient();
  const [form, setForm] = useState({
    artwork_description: initialBrief?.artwork_description || emptyForm.artwork_description,
    garment_type: initialBrief?.garment_type || emptyForm.garment_type,
    placement: initialBrief?.placement || emptyForm.placement,
    finished_width: initialBrief?.finished_width || emptyForm.finished_width,
    finished_height: initialBrief?.finished_height || emptyForm.finished_height,
    thread_colors: initialBrief?.thread_colors || emptyForm.thread_colors,
    machine_formats: initialBrief?.machine_formats || emptyForm.machine_formats,
    special_instructions: initialBrief?.special_instructions || emptyForm.special_instructions,
  });
  const [sampleFileId, setSampleFileId] = useState(initialBrief?.sample_file_id || "");
  const [sampleName, setSampleName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function uploadSample(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNotice("");
    const storagePath = `${projectId}/${userId}/sample-${file.lastModified}-${file.name}`;
    const upload = await supabase.storage.from("project-files").upload(storagePath, file, { upsert: true });
    if (upload.error) {
      setUploading(false);
      setNotice(upload.error.message);
      return;
    }
    const { data, error } = await supabase.from("project_files").insert({
      project_id: projectId,
      uploaded_by: userId,
      name: file.name,
      storage_path: storagePath,
      file_type: file.type,
    }).select("id, name").single();
    setUploading(false);
    event.target.value = "";
    if (error) return setNotice(error.message);
    setSampleFileId(data.id);
    setSampleName(data.name);
    setNotice("Sample attached. Save the brief to send everything.");
  }

  async function saveBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    const { error } = await supabase.from("project_briefs").upsert({
      project_id: projectId,
      ...form,
      sample_file_id: sampleFileId || null,
    }, { onConflict: "project_id" });
    setSaving(false);
    setNotice(error ? error.message : "Brief sent to Graphics Stitch.");
  }

  return (
    <section className="border-b border-black/10 bg-[#171717] text-white">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9ff53]">Project kickoff</p>
            <h2 className="mt-2 text-2xl font-black">Send the details we need to start</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">Add your artwork requirements and one sample design. This brief goes straight to the production team.</p>
          </div>
          {initialBrief && <span className="inline-flex items-center gap-2 rounded-full border border-[#d9ff53]/30 px-3 py-2 text-xs font-bold text-[#d9ff53]"><CheckCircle2 className="h-4 w-4" /> Brief saved</span>}
        </div>
        <form onSubmit={saveBrief} className="mt-7 grid gap-3 md:grid-cols-2">
          <textarea required rows={4} placeholder="Describe the artwork, text, logo, or changes" value={form.artwork_description} onChange={(event) => updateField("artwork_description", event.target.value)} className="md:col-span-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
          <input placeholder="Garment / product (e.g. cap, jacket)" value={form.garment_type} onChange={(event) => updateField("garment_type", event.target.value)} className="brief-input" />
          <input placeholder="Placement (e.g. left chest)" value={form.placement} onChange={(event) => updateField("placement", event.target.value)} className="brief-input" />
          <div className="grid grid-cols-2 gap-3"><input placeholder="Width" value={form.finished_width} onChange={(event) => updateField("finished_width", event.target.value)} className="brief-input" /><input placeholder="Height" value={form.finished_height} onChange={(event) => updateField("finished_height", event.target.value)} className="brief-input" /></div>
          <input placeholder="Thread colors or preferred colors" value={form.thread_colors} onChange={(event) => updateField("thread_colors", event.target.value)} className="brief-input" />
          <input placeholder="Machine formats (e.g. DST, PES)" value={form.machine_formats} onChange={(event) => updateField("machine_formats", event.target.value)} className="brief-input" />
          <textarea rows={3} placeholder="Special instructions, deadline, or notes" value={form.special_instructions} onChange={(event) => updateField("special_instructions", event.target.value)} className="md:col-span-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d9ff53]" />
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#d9ff53] hover:text-white"><Paperclip className="h-4 w-4" /> {uploading ? "Uploading..." : sampleName || "Attach sample design"}<input type="file" accept="image/*,.pdf,.ai,.eps,.svg,.dst,.pes,.zip" onChange={uploadSample} disabled={uploading} className="sr-only" /></label>
            <button disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-5 py-3 text-sm font-black text-[#171717] transition hover:bg-white disabled:opacity-50">{saving ? "Sending..." : "Save project brief"}<Send className="h-4 w-4" /></button>
            {notice && <p className="text-sm text-white/65">{notice}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
