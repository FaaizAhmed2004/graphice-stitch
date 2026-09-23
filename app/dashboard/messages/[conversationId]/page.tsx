import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import ConversationThread from "./ConversationThread";

export default async function ConversationPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { conversationId } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const [{ data: conversation }, { data: messages }] = await Promise.all([
    supabase.from("conversations").select("id, subject").eq("id", conversationId).eq("client_id", user.id).single(),
    supabase.from("conversation_messages").select("id, body, sender_id, created_at").eq("conversation_id", conversationId).order("created_at"),
  ]);
  if (!conversation) notFound();
  return <main className="min-h-screen bg-[#f3f2ee] text-[#171717]"><header className="border-b border-black/10 bg-[#171717] text-white"><div className="mx-auto max-w-4xl px-5 py-5"><Link href="/dashboard/messages" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" /> Messages</Link></div></header><div className="mx-auto max-w-4xl px-5 py-10"><h1 className="text-3xl font-black">{conversation.subject}</h1><ConversationThread conversationId={conversationId} userId={user.id} initialMessages={messages ?? []} /></div></main>;
}
