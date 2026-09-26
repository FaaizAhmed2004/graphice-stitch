"use client";

import { useState } from "react";
import { Pencil, X, Tag } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Plan = {
  id: string;
  service_id: string | null;
  name: string;
  price: number;
  currency: string;
  description: string | null;
  delivery_time: string | null;
  revisions: number | null;
  active: boolean;
  featured: boolean;
  sort_order: number;
};

type Service = {
  id: string;
  name: string;
  starting_price: number | null;
  delivery_time: string | null;
};

const inp = "w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-3 py-3 text-sm outline-none focus:border-black/30";
const blankPlan = { service_id: "", name: "", price: "", description: "", delivery_time: "24 hours", revisions: "2", active: true, featured: false, sort_order: "0" };

function formatPrice(price: number | null) {
  if (price === null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);
}

/* ─────────────────────────────────────────────
   SERVICE STARTING PRICE EDITOR
   (controls the yellow badge on each card)
───────────────────────────────────────────── */
function ServicePriceEditor({ initialServices }: { initialServices: Service[] }) {
  const supabase = createSupabaseBrowserClient();
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editDelivery, setEditDelivery] = useState("");
  const [notice, setNotice] = useState("");

  function startEdit(svc: Service) {
    setEditingId(svc.id);
    setEditPrice(svc.starting_price != null ? String(svc.starting_price) : "");
    setEditDelivery(svc.delivery_time ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditPrice("");
    setEditDelivery("");
  }

  async function saveService(id: string) {
    const price = editPrice === "" ? null : Number(editPrice);
    const delivery = editDelivery.trim() || null;
    const { error } = await supabase
      .from("services")
      .update({ starting_price: price, delivery_time: delivery })
      .eq("id", id);
    if (error) { setNotice("Could not update: " + error.message); return; }
    setServices((sv) =>
      sv.map((s) => s.id === id ? { ...s, starting_price: price, delivery_time: delivery } : s)
    );
    cancelEdit();
    setNotice("Starting price updated — visible on website immediately.");
    setTimeout(() => setNotice(""), 4000);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d9ff53]">
          <Tag className="h-4 w-4 text-[#171717]" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-black/45">Yellow badge</p>
          <h2 className="text-xl font-black">Service starting prices</h2>
        </div>
      </div>

      {notice && (
        <p className="mb-4 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm font-bold text-emerald-800">
          {notice}
        </p>
      )}

      <div className="space-y-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`rounded-xl border p-4 transition-all ${editingId === svc.id ? "border-black/30 bg-[#f8f7f4]" : "border-black/10 bg-white"}`}
          >
            {editingId === svc.id ? (
              <div className="space-y-3">
                <p className="font-black text-sm">{svc.name}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black/40 mb-1">
                      Starting price (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 15"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className={inp}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black/40 mb-1">
                      Delivery time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 24 Hours"
                      value={editDelivery}
                      onChange={(e) => setEditDelivery(e.target.value)}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveService(svc.id)}
                    className="rounded-xl bg-[#171717] px-4 py-2 text-xs font-bold text-white hover:bg-black/80 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-xl border border-black/10 px-4 py-2 text-xs font-bold hover:bg-black/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-sm">{svc.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#d9ff53] px-2.5 py-0.5 text-xs font-black text-[#171717]">
                      {formatPrice(svc.starting_price)}
                    </span>
                    {svc.delivery_time && (
                      <span className="text-xs text-black/45 font-medium">
                        Delivery: {svc.delivery_time}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => startEdit(svc)}
                  className="flex items-center gap-1.5 rounded-xl border border-black/10 px-3 py-2 text-xs font-bold hover:border-black/30 transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRICING PLANS MANAGER
   (controls the per-plan rows inside each card)
───────────────────────────────────────────── */
function PlansManager({
  initialPlans,
  services,
}: {
  initialPlans: Plan[];
  services: Service[];
}) {
  const supabase = createSupabaseBrowserClient();
  const [plans, setPlans] = useState(initialPlans);
  const [form, setForm] = useState(blankPlan);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  function startEdit(plan: Plan) {
    setEditing(plan.id);
    setForm({
      service_id: plan.service_id || "",
      name: plan.name,
      price: String(plan.price),
      description: plan.description || "",
      delivery_time: plan.delivery_time || "",
      revisions: plan.revisions?.toString() || "",
      active: plan.active,
      featured: plan.featured,
      sort_order: String(plan.sort_order),
    });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(blankPlan);
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      service_id: form.service_id || null,
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim() || null,
      delivery_time: form.delivery_time.trim() || null,
      revisions: form.revisions ? Number(form.revisions) : null,
      active: form.active,
      featured: form.featured,
      sort_order: Number(form.sort_order),
    };
    const query = editing
      ? supabase.from("pricing_plans").update(payload).eq("id", editing).select("id, service_id, name, price, currency, description, delivery_time, revisions, active, featured, sort_order").single()
      : supabase.from("pricing_plans").insert(payload).select("id, service_id, name, price, currency, description, delivery_time, revisions, active, featured, sort_order").single();
    const { data, error } = await query;
    if (error) return setNotice("Could not save: " + error.message);
    if (data) {
      setPlans((items) =>
        editing ? items.map((i) => (i.id === editing ? data : i)) : [...items, data]
      );
    }
    cancelEdit();
    setNotice("Plan saved.");
    setTimeout(() => setNotice(""), 4000);
  }

  async function toggle(plan: Plan) {
    const { error } = await supabase.from("pricing_plans").update({ active: !plan.active }).eq("id", plan.id);
    if (error) return setNotice("Could not update.");
    setPlans((items) => items.map((i) => (i.id === plan.id ? { ...i, active: !i.active } : i)));
  }

  // Group plans by service for display
  const grouped = services.map((svc) => ({
    service: svc,
    plans: plans.filter((p) => p.service_id === svc.id),
  }));
  const unassigned = plans.filter((p) => !p.service_id);

  return (
    <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
      {/* Form */}
      <form onSubmit={save} className="rounded-2xl border border-black/10 bg-white p-6 space-y-3 self-start">
        <p className="text-xs font-bold uppercase tracking-wider text-black/45">{editing ? "Edit plan" : "New plan"}</p>
        <h2 className="text-2xl font-black">{editing ? "Update plan" : "Add pricing plan"}</h2>

        {notice && (
          <p className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm font-bold text-emerald-800">{notice}</p>
        )}

        <select
          required
          value={form.service_id}
          onChange={(e) => setForm({ ...form, service_id: e.target.value })}
          className={inp}
        >
          <option value="">Select service</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <input required placeholder="Plan name (e.g. Left Chest)" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />

        <input required type="number" min="0" step="0.01" placeholder="Price (USD)"
          value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />

        <textarea placeholder="Description (optional)" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} className={inp} rows={2} />

        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Delivery time" value={form.delivery_time}
            onChange={(e) => setForm({ ...form, delivery_time: e.target.value })} className={inp} />
          <input type="number" min="0" placeholder="Revisions" value={form.revisions}
            onChange={(e) => setForm({ ...form, revisions: e.target.value })} className={inp} />
        </div>

        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
            <input type="checkbox" checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[#171717]" />
            Visible on site
          </label>
          <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
            <input type="checkbox" checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#171717]" />
            Featured
          </label>
        </div>

        <button className="w-full rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white hover:bg-black/80 transition-colors">
          {editing ? "Save changes" : "Add plan"}
        </button>
        {editing && (
          <button type="button" onClick={cancelEdit}
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-bold hover:bg-black/5 transition-colors flex items-center justify-center gap-2">
            <X className="w-4 h-4" /> Cancel
          </button>
        )}
      </form>

      {/* Plans list grouped by service */}
      <div className="space-y-6">
        {grouped.map(({ service, plans: svcPlans }) => (
          <div key={service.id}>
            <p className="text-xs font-black uppercase tracking-wider text-black/40 mb-2 px-1">{service.name}</p>
            {svcPlans.length === 0 ? (
              <p className="rounded-xl border border-dashed border-black/10 bg-white px-4 py-4 text-sm text-black/35">No plans yet</p>
            ) : (
              <div className="space-y-2">
                {svcPlans.map((plan) => (
                  <article key={plan.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm">{plan.name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${plan.active ? "bg-emerald-100 text-emerald-700" : "bg-black/8 text-black/45"}`}>
                          {plan.active ? "Live" : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-black/55">
                        {formatPrice(plan.price)} · {plan.delivery_time || "—"} · {plan.revisions ?? 0} rev
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggle(plan)}
                        className="rounded-xl border border-black/10 px-3 py-2 text-xs font-bold hover:bg-black/5 transition-colors">
                        {plan.active ? "Hide" : "Publish"}
                      </button>
                      <button onClick={() => startEdit(plan)}
                        className="rounded-xl bg-[#171717] px-3 py-2 text-xs font-bold text-white hover:bg-black/80 transition-colors flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))}

        {unassigned.length > 0 && (
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-black/40 mb-2 px-1">Unassigned</p>
            <div className="space-y-2">
              {unassigned.map((plan) => (
                <article key={plan.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5">
                  <div>
                    <h3 className="font-black text-sm">{plan.name}</h3>
                    <p className="mt-1 text-sm text-black/55">{formatPrice(plan.price)}</p>
                  </div>
                  <button onClick={() => startEdit(plan)}
                    className="rounded-xl bg-[#171717] px-3 py-2 text-xs font-bold text-white flex items-center gap-1.5">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT — two tabbed sections
───────────────────────────────────────────── */
export default function PricingManager({
  initialPlans,
  services,
}: {
  initialPlans: Plan[];
  services: Service[];
}) {
  const [tab, setTab] = useState<"badges" | "plans">("badges");

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab("badges")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-colors ${tab === "badges" ? "bg-[#171717] text-white" : "bg-white text-black/55 hover:text-black"}`}
        >
          Starting prices <span className="ml-1.5 rounded-full bg-[#d9ff53] px-2 py-0.5 text-[10px] font-black text-[#171717]">Yellow badge</span>
        </button>
        <button
          onClick={() => setTab("plans")}
          className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-colors ${tab === "plans" ? "bg-[#171717] text-white" : "bg-white text-black/55 hover:text-black"}`}
        >
          Plan rows
        </button>
      </div>

      {tab === "badges" && <ServicePriceEditor initialServices={services} />}
      {tab === "plans" && <PlansManager initialPlans={initialPlans} services={services} />}
    </div>
  );
}
