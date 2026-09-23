"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const quoteSchema = z.object({
  service: z.string().min(2, "Choose a service."),
  designType: z.string().min(2, "Choose a design type."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  requiredFormat: z.string().min(2, "Add the required file format."),
  size: z.string().min(2, "Add the finished size or placement."),
  colorRequirements: z.string().max(300).optional(),
  deadline: z.string().optional(),
  priority: z.enum(["standard", "rush", "same_day"]),
  description: z.string().min(20, "Please provide at least 20 characters about the design."),
  additionalInstructions: z.string().max(1000).optional(),
});

type QuoteInput = z.input<typeof quoteSchema>;
type QuoteValues = z.output<typeof quoteSchema>;
const services = ["Embroidery Digitizing", "Left Chest Digitizing", "Cap / Hat Digitizing", "3D Puff Embroidery", "Full Back Digitizing", "Patch Digitizing", "Vector Art Conversion", "Vector Art", "Custom Graphic Design"];
const inputClass = "w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 py-3 text-sm text-[#171717] outline-none placeholder:text-black/35 focus:border-[#171717]";

export default function QuoteForm({ userId }: { userId: string }) {
  const supabase = createSupabaseBrowserClient();
  const [files, setFiles] = useState<File[]>([]);
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<QuoteInput, unknown, QuoteValues>({ resolver: zodResolver(quoteSchema), defaultValues: { priority: "standard", quantity: 1, requiredFormat: "DST, PES" } });

  async function submit(values: QuoteValues) {
    setNotice("");
    setSuccess("");
    const response = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const result = await response.json();
    if (!response.ok) { setNotice(result.error || "We could not create your quote."); return; }
    for (const file of files) {
      const path = `${userId}/${result.quote.id}/${crypto.randomUUID()}-${file.name}`;
      const upload = await supabase.storage.from("client-files").upload(path, file);
      if (upload.error) { setNotice(`Quote created, but ${file.name} could not upload.`); continue; }
      await supabase.from("files").insert({ client_id: userId, uploaded_by: userId, name: file.name, storage_path: path, bucket: "client-files", mime_type: file.type, file_size: file.size, category: "original_artwork" });
    }
    setSuccess(`Quote ${result.quote.quote_number} submitted. You can track it from your portal.`);
    reset();
    setFiles([]);
  }

  if (success) return <div className="flex min-h-130 flex-col items-center justify-center text-center"><CheckCircle2 className="h-14 w-14 text-emerald-600" /><h2 className="mt-5 text-3xl font-black">Quote request received</h2><p className="mt-3 max-w-md text-sm leading-6 text-black/55">{success}</p><button onClick={() => setSuccess("")} className="mt-8 rounded-xl bg-[#171717] px-5 py-3 text-sm font-bold text-white">Submit another quote</button></div>;

  return <form onSubmit={handleSubmit(submit)} className="space-y-5">
    <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">Brief details</p><h2 className="mt-2 text-3xl font-black">Request a quote</h2><p className="mt-2 text-sm text-black/55">The more detail you share, the faster we can price it accurately.</p></div>
    {notice && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{notice}</p>}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold">Service<select {...register("service")} className={`${inputClass} mt-2`}><option value="">Select service</option>{services.map((item) => <option key={item}>{item}</option>)}</select>{errors.service && <span className="mt-1 block text-xs text-red-600">{errors.service.message}</span>}</label>
      <label className="text-sm font-bold">Design type<input {...register("designType")} placeholder="Logo, mascot, patch, lettering" className={`${inputClass} mt-2`} />{errors.designType && <span className="mt-1 block text-xs text-red-600">{errors.designType.message}</span>}</label>
      <label className="text-sm font-bold">Quantity<input type="number" min="1" {...register("quantity")} className={`${inputClass} mt-2`} />{errors.quantity && <span className="mt-1 block text-xs text-red-600">{errors.quantity.message}</span>}</label>
      <label className="text-sm font-bold">Required format<input {...register("requiredFormat")} placeholder="DST, PES, AI, SVG" className={`${inputClass} mt-2`} />{errors.requiredFormat && <span className="mt-1 block text-xs text-red-600">{errors.requiredFormat.message}</span>}</label>
      <label className="text-sm font-bold">Size / placement<input {...register("size")} placeholder="Left chest, 4 x 4 inches" className={`${inputClass} mt-2`} />{errors.size && <span className="mt-1 block text-xs text-red-600">{errors.size.message}</span>}</label>
      <label className="text-sm font-bold">Deadline<input type="date" {...register("deadline")} className={`${inputClass} mt-2`} /></label>
      <label className="text-sm font-bold">Priority<select {...register("priority")} className={`${inputClass} mt-2`}><option value="standard">Standard</option><option value="rush">Rush</option><option value="same_day">Same day</option></select></label>
      <label className="text-sm font-bold">Color requirements<input {...register("colorRequirements")} placeholder="Thread colors, brand palette" className={`${inputClass} mt-2`} /></label>
    </div>
    <label className="block text-sm font-bold">Describe the design<textarea {...register("description")} rows={4} placeholder="What should we digitize or convert? Include any important detail." className={`${inputClass} mt-2 resize-none`} />{errors.description && <span className="mt-1 block text-xs text-red-600">{errors.description.message}</span>}</label>
    <label className="block text-sm font-bold">Additional instructions<textarea {...register("additionalInstructions")} rows={3} placeholder="Deadline context, stitch preferences, or production notes" className={`${inputClass} mt-2 resize-none`} /></label>
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-black/20 bg-[#f8f7f4] px-4 py-4 text-sm font-bold"><UploadCloud className="h-5 w-5" /><span>{files.length ? `${files.length} file(s) selected` : "Upload artwork and references"}<small className="mt-1 block text-xs font-normal text-black/50">PNG, JPG, PDF, SVG, AI, EPS, PSD, CDR, ZIP. Max 25MB each.</small></span><input type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.svg,.ai,.eps,.psd,.cdr,.zip" onChange={(event) => setFiles(Array.from(event.target.files || []).filter((file) => file.size <= 25 * 1024 * 1024))} className="sr-only" /></label>
    <button disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-5 py-4 text-sm font-black text-white transition hover:bg-black disabled:opacity-50">{isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit quote request"}</button>
  </form>;
}
