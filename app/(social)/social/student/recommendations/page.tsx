'use client';
import { useEffect, useState } from 'react';

type Rec = { id: string; title: string; description: string; category: string; city: string; country: string; addressLabel: string };

export default function RecommendationsPage() {
  const [items, setItems] = useState<Rec[]>([]);
  const [city, setCity] = useState('Leuven');
  const [category, setCategory] = useState('');

  async function load() {
    const q = new URLSearchParams();
    if (city) q.set('city', city);
    if (category) q.set('category', category);
    const res = await fetch(`/api/social/recommendations?${q.toString()}`);
    const body = (await res.json()) as { items: Rec[] };
    setItems(body.items ?? []);
  }

  useEffect(() => { void load(); }, []);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Recommendations</h1>
    <div className='flex gap-2'>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' className='rounded border px-3 py-2' />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' className='rounded border px-3 py-2' />
      <button onClick={() => void load()} className='rounded bg-slate-900 px-3 py-2 text-white'>Filter</button>
    </div>
    <div className='space-y-2'>
      {items.map((item) => <article key={item.id} className='rounded border bg-white p-3'>
        <h2 className='font-medium'>{item.title}</h2><p className='text-xs text-slate-500'>{item.category} · {item.city} · {item.addressLabel}</p><p>{item.description}</p>
        <button className='mt-2 rounded border px-2 py-1 text-xs' onClick={async () => { await fetch(`/api/social/recommendations/${item.id}/report`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason: 'Inaccurate recommendation' }) }); }}>Report</button>
      </article>)}
    </div>
  </div>;
}
