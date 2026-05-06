'use client';

import { useEffect, useState } from 'react';

type NotificationItem = { id: string; area: string; type: string; title: string; body: string; readAt: string | null; createdAt: string };

export function NotificationsPanel({ heading }: { heading: string }) {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const load = async () => {
    const res = await fetch('/api/notifications');
    const json = await res.json();
    setItems(json.data ?? []);
  };
  useEffect(() => { void load(); }, []);
  return <div className="rounded-2xl border bg-white p-4"><h2 className="text-xl font-semibold">{heading}</h2><button className="mt-3 rounded bg-slate-900 px-3 py-2 text-white" onClick={async ()=>{await fetch('/api/notifications/read-all',{method:'POST'}); await load();}}>Mark all as read</button><div className="mt-4 space-y-3">{items.length===0?<p className="text-slate-500">No notifications yet.</p>:items.map((n)=><article key={n.id} className="rounded border p-3"><p className="text-sm text-slate-500">{n.area} · {n.type} · {new Date(n.createdAt).toLocaleString()}</p><h2 className="font-medium">{n.title}</h2><p className="text-sm">{n.body}</p><p className="text-xs">{n.readAt?'Read':'Unread'}</p>{!n.readAt&&<button className="mt-2 rounded border px-2 py-1 text-sm" onClick={async()=>{await fetch(`/api/notifications/${n.id}/read`,{method:'POST'}); await load();}}>Mark as read</button>}</article>)}</div></div>;
}
