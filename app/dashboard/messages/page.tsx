import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Plus } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function MessagesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const { data: conversations } = await supabase.from("conversations").select("id, subject, order_id, updated_at, conversation_messages(body, created_at)").eq("client_id", user.id).order("updated_at", { ascending: false });
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href="/portal" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Dashboard</Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-4 py-2 text-sm font-black text-[#171717]"><Plus className="h-4 w-4" /> New conversation</Link></div></header><div className="mx-auto max-w-6xl px-5 py-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">Communication</p><h1 className="mt-2 text-4xl font-black">Messages</h1><div className="mt-8 grid gap-3">{conversations?.length ? conversations.map((conversation) => { const latest = conversation.conversation_messages?.[conversation.conversation_messages.length - 1]; return <Link key={conversation.id} href={`/dashboard/messages/${conversation.id}`} className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-5 hover:shadow-lg"><MessageCircle className="h-5 w-5 text-black/40" /><div className="min-w-0"><h2 className="font-black">{conversation.subject}</h2><p className="mt-1 truncate text-sm text-black/55">{latest?.body || "No messages yet"}</p></div></Link>; }) : <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center text-sm text-black/55">Your conversations will appear here.</div>}</div></div></main>;
}
