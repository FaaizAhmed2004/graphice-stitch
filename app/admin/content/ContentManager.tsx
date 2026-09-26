"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Pencil, Trash2, UploadCloud, Eye, EyeOff, Star, StarOff, X, ImagePlus } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

/* ─── Types ─── */
type Post = {
  id: string; title: string; slug: string; excerpt: string | null;
  content: string; category: string | null; status: string;
  published_at: string | null; meta_title: string | null; meta_description: string | null;
};
type Work = {
  id: string; title: string; description: string | null;
  category: string; image_url: string | null;
  published: boolean; featured: boolean; sort_order: number;
};
type Faq = {
  id: string; question: string; answer: string;
  category: string | null; published: boolean; sort_order: number;
};

const WORK_CATEGORIES = [
  "Embroidery", "3D Puff", "Vector Art", "Patch",
  "Left Chest", "Cap / Hat", "Full Back", "Pet Portrait", "Other",
];

const inp = "w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 py-2.5 text-sm font-medium outline-none focus:border-black/30 focus:ring-0 resize-none";

/* ─── Helpers ─── */
function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ══════════════════════════════════════════════
   WORKS MANAGER  (main focus of this component)
═══════════════════════════════════════════════ */
function WorksManager({
  portfolio: initialPortfolio,
}: {
  portfolio: Work[];
}) {
  const db = createSupabaseBrowserClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);

  /* form state */
  const emptyWork = { title: "", description: "", category: "Embroidery", image_url: "", published: true, featured: false };
  const [form, setForm] = useState(emptyWork);
  const [previewUrl, setPreviewUrl] = useState("");

  /* edit state */
  const [editingId, setEditingId] = useState<string | null>(null);

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  }

  /* ── Image upload to public-media bucket ── */
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `works/${crypto.randomUUID()}-${file.name.replace(/\s+/g, "_")}`;
    const { error } = await db.storage.from("public-media").upload(path, file, { upsert: false });
    if (error) { flash("Image upload failed: " + error.message); setUploading(false); return; }
    const { data: urlData } = db.storage.from("public-media").getPublicUrl(path);
    const url = urlData.publicUrl;
    setForm((f) => ({ ...f, image_url: url }));
    setPreviewUrl(url);
    setUploading(false);
    flash("Image uploaded.");
    e.target.value = "";
  }

  /* ── Save new ── */
  async function saveWork(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return flash("Title is required.");
    if (!form.image_url) return flash("Please upload or paste an image URL.");
    const { data, error } = await db
      .from("portfolio_items")
      .insert(form)
      .select("id,title,description,category,image_url,published,featured,sort_order")
      .single();
    if (error) return flash("Could not save: " + error.message);
    if (data) setPortfolio((v) => [data, ...v]);
    setForm(emptyWork);
    setPreviewUrl("");
    flash("Work item saved and published.");
  }

  /* ── Start editing ── */
  function startEdit(item: Work) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description ?? "",
      category: item.category,
      image_url: item.image_url ?? "",
      published: item.published,
      featured: item.featured,
    });
    setPreviewUrl(item.image_url ?? "");
  }

  /* ── Save edit ── */
  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    const { data, error } = await db
      .from("portfolio_items")
      .update(form)
      .eq("id", editingId)
      .select("id,title,description,category,image_url,published,featured,sort_order")
      .single();
    if (error) return flash("Update failed: " + error.message);
    if (data) setPortfolio((v) => v.map((i) => (i.id === editingId ? data : i)));
    setEditingId(null);
    setForm(emptyWork);
    setPreviewUrl("");
    flash("Work item updated.");
  }

  /* ── Cancel edit ── */
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyWork);
    setPreviewUrl("");
  }

  /* ── Toggle published ── */
  async function togglePublished(item: Work) {
    const next = !item.published;
    const { error } = await db.from("portfolio_items").update({ published: next }).eq("id", item.id);
    if (error) return flash(error.message);
    setPortfolio((v) => v.map((i) => (i.id === item.id ? { ...i, published: next } : i)));
  }

  /* ── Toggle featured ── */
  async function toggleFeatured(item: Work) {
    const next = !item.featured;
    const { error } = await db.from("portfolio_items").update({ featured: next }).eq("id", item.id);
    if (error) return flash(error.message);
    setPortfolio((v) => v.map((i) => (i.id === item.id ? { ...i, featured: next } : i)));
  }

  /* ── Delete ── */
  async function deleteWork(id: string) {
    if (!confirm("Delete this work item? This cannot be undone.")) return;
    const { error } = await db.from("portfolio_items").delete().eq("id", id);
    if (error) return flash(error.message);
    setPortfolio((v) => v.filter((i) => i.id !== id));
    flash("Work item deleted.");
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[.8fr_1.2fr]">
      {/* ── Left: Form ── */}
      <form
        onSubmit={editingId ? saveEdit : saveWork}
        className="rounded-2xl border border-black/10 bg-white p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">
            {editingId ? "Edit work item" : "Add new work"}
          </h2>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="text-xs text-black/45 hover:text-black flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          )}
        </div>

        {/* Image upload area */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/45 mb-2">
            Project Image
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-black/15 bg-[#f8f7f4] flex flex-col items-center justify-center gap-2 transition-colors hover:border-black/35"
            style={{ minHeight: previewUrl ? "auto" : "160px" }}
          >
            {previewUrl ? (
              <div className="w-full">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={600}
                  height={280}
                  unoptimized
                  className="w-full rounded-2xl object-cover max-h-52"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <span className="opacity-0 hover:opacity-100 text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full transition-opacity">
                    Click to change
                  </span>
                </div>
              </div>
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-black/25" />
                <span className="text-sm text-black/45 font-medium">
                  {uploading ? "Uploading…" : "Click to upload image"}
                </span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="sr-only"
          />
          {/* OR paste URL */}
          <input
            type="url"
            placeholder="Or paste image URL"
            value={form.image_url}
            onChange={(e) => {
              setForm((f) => ({ ...f, image_url: e.target.value }));
              setPreviewUrl(e.target.value);
            }}
            className={`${inp} mt-2`}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/45 mb-1.5">Title</label>
          <input required placeholder="e.g. Nike Cap Digitizing" value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inp} />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/45 mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inp}>
            {WORK_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/45 mb-1.5">Description (optional)</label>
          <textarea rows={2} placeholder="Short description of the project…"
            value={form.description ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={inp} />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer select-none">
            <input type="checkbox" checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="w-4 h-4 rounded accent-[#171717]" />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer select-none">
            <input type="checkbox" checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 rounded accent-[#171717]" />
            Featured
          </label>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-xl bg-[#171717] py-3 text-sm font-bold text-white hover:bg-black/80 disabled:opacity-50 transition-colors"
        >
          {uploading ? "Uploading image…" : editingId ? "Save changes" : "Add to works section"}
        </button>
      </form>

      {/* ── Right: List ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-bold text-black/45">
            {portfolio.length} item{portfolio.length !== 1 ? "s" : ""} total
            {" · "}{portfolio.filter((i) => i.published).length} published
          </p>
        </div>

        {portfolio.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white p-10 text-center text-sm text-black/45">
            No work items yet. Add your first project.
          </div>
        )}

        {portfolio.map((item) => (
          <article
            key={item.id}
            className={`rounded-2xl border bg-white overflow-hidden transition-all ${
              editingId === item.id ? "border-black/40 ring-2 ring-black/10" : "border-black/10"
            }`}
          >
            <div className="flex gap-4 p-4">
              {/* Thumbnail */}
              <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-[#f4f2ee] flex items-center justify-center">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={80}
                    height={80}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlus className="w-6 h-6 text-black/20" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-black text-sm truncate">{item.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="inline-block rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-semibold text-black/55">
                        {item.category}
                      </span>
                      {item.published ? (
                        <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">Live</span>
                      ) : (
                        <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">Hidden</span>
                      )}
                      {item.featured && (
                        <span className="inline-block rounded-full bg-[#d9ff53]/30 px-2 py-0.5 text-[11px] font-semibold text-[#5a6e00]">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => togglePublished(item)}
                      title={item.published ? "Hide from site" : "Publish to site"}
                      className="p-1.5 rounded-lg hover:bg-black/5 text-black/40 hover:text-black transition-colors"
                    >
                      {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(item)}
                      title={item.featured ? "Remove featured" : "Mark featured"}
                      className="p-1.5 rounded-lg hover:bg-black/5 text-black/40 hover:text-black transition-colors"
                    >
                      {item.featured ? <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => startEdit(item)}
                      title="Edit"
                      className="p-1.5 rounded-lg hover:bg-black/5 text-black/40 hover:text-black transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteWork(item.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg hover:bg-red-50 text-black/40 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   BLOG MANAGER
═══════════════════════════════════════════════ */
function BlogManager({ posts: initialPosts }: { posts: Post[] }) {
  const db = createSupabaseBrowserClient();
  const [posts, setPosts] = useState(initialPosts);
  const [notice, setNotice] = useState("");
  const [post, setPost] = useState({
    title: "", slug: "", excerpt: "", content: "",
    category: "Digitizing Tips", status: "draft",
  });

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    const p = { ...post, slug: post.slug || slugify(post.title) };
    const { data, error } = await db
      .from("blog_posts")
      .insert(p)
      .select("id,title,slug,excerpt,content,category,status,published_at,meta_title,meta_description")
      .single();
    if (error) return setNotice("Could not save blog post.");
    if (data) setPosts((v) => [data, ...v]);
    setPost({ title: "", slug: "", excerpt: "", content: "", category: "Digitizing Tips", status: "draft" });
    setNotice("Blog post saved.");
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[.75fr_1.25fr]">
      <form onSubmit={savePost} className="rounded-2xl border border-black/10 bg-white p-6 space-y-3">
        <h2 className="text-xl font-black">New blog post</h2>
        {notice && <p className="rounded-xl bg-black/5 px-4 py-3 text-sm font-bold">{notice}</p>}
        <input required placeholder="Title" value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })} className={inp} />
        <input placeholder="Slug (auto-generated)" value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })} className={inp} />
        <input placeholder="Category" value={post.category ?? ""}
          onChange={(e) => setPost({ ...post, category: e.target.value })} className={inp} />
        <textarea required placeholder="Excerpt" value={post.excerpt}
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })} className={inp} />
        <textarea required rows={8} placeholder="Content" value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })} className={inp} />
        <select value={post.status} onChange={(e) => setPost({ ...post, status: e.target.value })} className={inp}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <button className="w-full rounded-xl bg-[#171717] py-3 text-sm font-bold text-white">
          Save post
        </button>
      </form>

      <div className="space-y-3">
        {posts.map((item) => (
          <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="font-black">{item.title}</h3>
            <p className="mt-1 text-sm text-black/55">{item.status} · /blog/{item.slug}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FAQ MANAGER
═══════════════════════════════════════════════ */
function FaqManager({ faqs: initialFaqs }: { faqs: Faq[] }) {
  const db = createSupabaseBrowserClient();
  const [faqs, setFaqs] = useState(initialFaqs);
  const [notice, setNotice] = useState("");
  const [faq, setFaq] = useState({ question: "", answer: "", category: "General", published: true });

  async function saveFaq(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await db
      .from("faqs")
      .insert(faq)
      .select("id,question,answer,category,published,sort_order")
      .single();
    if (error) return setNotice("Could not save FAQ.");
    if (data) setFaqs((v) => [...v, data]);
    setFaq({ question: "", answer: "", category: "General", published: true });
    setNotice("FAQ saved.");
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[.75fr_1.25fr]">
      <form onSubmit={saveFaq} className="rounded-2xl border border-black/10 bg-white p-6 space-y-3">
        <h2 className="text-xl font-black">New FAQ</h2>
        {notice && <p className="rounded-xl bg-black/5 px-4 py-3 text-sm font-bold">{notice}</p>}
        <input required placeholder="Question" value={faq.question}
          onChange={(e) => setFaq({ ...faq, question: e.target.value })} className={inp} />
        <input placeholder="Category" value={faq.category ?? ""}
          onChange={(e) => setFaq({ ...faq, category: e.target.value })} className={inp} />
        <textarea required rows={6} placeholder="Answer" value={faq.answer}
          onChange={(e) => setFaq({ ...faq, answer: e.target.value })} className={inp} />
        <label className="flex gap-2 text-sm font-bold cursor-pointer">
          <input type="checkbox" checked={faq.published}
            onChange={(e) => setFaq({ ...faq, published: e.target.checked })} className="accent-[#171717]" />
          Published
        </label>
        <button className="w-full rounded-xl bg-[#171717] py-3 text-sm font-bold text-white">
          Save FAQ
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((item) => (
          <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="font-black">{item.question}</h3>
            <p className="mt-1 text-sm text-black/55">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════ */
export default function ContentManager({
  posts,
  portfolio,
  faqs,
}: {
  posts: Post[];
  portfolio: Work[];
  faqs: Faq[];
}) {
  const [tab, setTab] = useState<"works" | "blog" | "faq">("works");
  const [notice, setNotice] = useState("");

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["works", "blog", "faq"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold capitalize transition-colors ${
              tab === item ? "bg-[#171717] text-white" : "bg-white text-black/55 hover:text-black"
            }`}
          >
            {item === "works" ? "Works / Portfolio" : item === "blog" ? "Blog" : "FAQ"}
          </button>
        ))}
      </div>

      {notice && (
        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-bold">{notice}</p>
      )}

      <div className="mt-6">
        {tab === "works" && <WorksManager portfolio={portfolio} />}
        {tab === "blog" && <BlogManager posts={posts} />}
        {tab === "faq" && <FaqManager faqs={faqs} />}
      </div>
    </div>
  );
}
