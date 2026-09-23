"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Message = { id: string; body: string; sender_id: string; created_at: string };
export default function ConversationThread({ conversationId, userId, initialMessages }: { conversationId: string; userId: string; initialMessages: Message[] }) {
  const supabase = createSupabaseBrowserClient();
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");
  async function send(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!body.trim()) return; const { data, error } = await supabase.from("conversation_messages").insert({ conversation_id: conversationId, sender_id: userId, body: body.trim() }).select("id, body, sender_id, created_at").single(); if (error) return setNotice("Message could not be sent."); if (data) setMessages((items) => [...items, data]); setBody(""); }
  return <section className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white"><div className="min-h-96 space-y-4 p-5">{messages.length ? messages.map((message) => <div key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.sender_id === userId ? "ml-auto bg-[#171717] text-white" : "bg-[#f8f7f4]"}`}><p>{message.body}</p><time className="mt-2 block text-[10px] opacity-50">{new Date(message.created_at).toLocaleString()}</time></div>) : <p className="text-sm text-black/50">No messages yet.</p>}</div><form onSubmit={send} className="flex gap-3 border-t border-black/10 p-4"><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write a message" className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#f8f7f4] px-4 py-3 text-sm" /><button className="rounded-xl bg-[#171717] px-4 py-3 text-white"><Send className="h-4 w-4" /></button></form>{notice && <p className="px-4 pb-4 text-sm text-red-600">{notice}</p>}</section>;
}
