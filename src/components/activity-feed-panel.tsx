'use client';

import { useEffect, useState } from 'react';

type FeedItem = { id: string; area: string; type: string; title: string; summary: string; actorLabel: string | null; timestamp: string };

export function ActivityFeedPanel({ heading }: { heading: string }) {
  const [items, setItems] = useState<FeedItem[]>([]);

  async function load() {
    const res = await fetch('/api/activity-feed?limit=20', { cache: 'no-store' });
    const json = await res.json();
    setItems(json.data ?? []);
  }

  useEffect(() => { void load(); }, []);

  return <div className="rounded-2xl border bg-white p-4"><h2 className="text-xl font-semibold">{heading}</h2><div className="mt-4 space-y-3">{items.length===0?<p className="text-slate-500">No recent activity.</p>:items.map((i)=><article key={i.id} className="rounded border p-3"><p className="text-xs text-slate-500">{i.area} · {new Date(i.timestamp).toLocaleString()}</p><h3 className="font-medium">{i.title}</h3><p className="text-sm text-slate-700">{i.summary}</p>{i.actorLabel?<p className="text-xs text-slate-500">By {i.actorLabel}</p>:null}</article>)}</div></div>;
}
