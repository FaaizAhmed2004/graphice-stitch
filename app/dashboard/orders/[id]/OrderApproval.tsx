"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function OrderApproval({ orderId, clientId }: { orderId: string; clientId: string }) {
  const supabase = createSupabaseBrowserClient();
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  async function decide(decision: "approved" | "revision_requested") { setLoading(true); setNotice(""); const { error } = await supabase.from("order_approvals").upsert({ order_id: orderId, client_id: clientId, decided_by: clientId, decision, comment: comment.trim() || null }, { onConflict: "order_id" }); if (error) setNotice("We could not save your decision."); else setNotice(decision === "approved" ? "Proof approved. The team can prepare final delivery." : "Revision request sent to the design team."); setLoading(false); }
  return <div className="mt-6 rounded-2xl border border-[#d9ff53]/25 bg-[#171717] p-5 text-white"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff53]">Client review</p><h3 className="mt-2 text-xl font-black">Review the latest proof</h3><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Optional feedback or revision notes" className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d9ff53]" rows={3} /><div className="mt-4 flex flex-wrap gap-3"><button disabled={loading} onClick={() => decide("approved")} className="inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-4 py-3 text-sm font-black text-[#171717]"><Check className="h-4 w-4" /> Approve proof</button><button disabled={loading} onClick={() => decide("revision_requested")} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Request revision</button></div>{notice && <p className="mt-4 text-sm text-white/70">{notice}</p>}</div>;
}
