"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Notification = { id: string; title: string; body: string; project_id: string | null; created_at: string; read_at: string | null };

export default function Notifications({ initialNotifications }: { initialNotifications: Notification[] }) {
  const supabase = createSupabaseBrowserClient();
  const [notifications, setNotifications] = useState(initialNotifications);

  async function markRead(id: string) {
    const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    if (!error) setNotifications((items) => items.map((item) => item.id === id ? { ...item, read_at: new Date().toISOString() } : item));
  }

  const unread = notifications.filter((notification) => !notification.read_at).length;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white"><Bell className="h-4 w-4" /></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Updates</p><h2 className="mt-1 text-xl font-black">Recent activity</h2></div>
        </div>
        {unread > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{unread} new</span>}
      </div>
      <div className="mt-5 divide-y divide-gray-100">
        {notifications.length ? notifications.slice(0, 4).map((notification) => (
          <div key={notification.id} className={`flex items-start gap-3 py-4 first:pt-0 last:pb-0 ${notification.read_at ? "opacity-60" : ""}`}>
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
            <div className="min-w-0 flex-1"><p className="text-sm font-bold">{notification.title}</p><p className="mt-1 text-sm leading-6 text-gray-500">{notification.body}</p><p className="mt-1 text-xs text-gray-400">{new Date(notification.created_at).toLocaleString()}</p></div>
            {!notification.read_at && <button onClick={() => markRead(notification.id)} aria-label="Mark notification as read" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-950"><Check className="h-4 w-4" /></button>}
          </div>
        )) : <p className="py-2 text-sm text-gray-500">You are all caught up. Project updates will appear here.</p>}
      </div>
    </section>
  );
}