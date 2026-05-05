'use client';

import { useCallback, useEffect, useState } from 'react';

type MapItem = { id: string; title: string; category: string; city: string; country: string; addressLabel: string; description: string; approximateLatitude: number | null; approximateLongitude: number | null };

export default function SocialMapPage() {
  const [items, setItems] = useState<MapItem[]>([]);
  const [city, setCity] = useState('Leuven');
  const [category, setCategory] = useState('');

  const fetchMap = useCallback(async (cityValue = '', categoryValue = '') => {
    const q = new URLSearchParams();
    if (cityValue) q.set('city', cityValue);
    if (categoryValue) q.set('category', categoryValue);
    const res = await fetch(`/api/social/recommendations/map?${q.toString()}`);
    const body = (await res.json()) as { items: MapItem[] };
    setItems(body.items ?? []);
  }, []);

  useEffect(() => { void fetchMap(city, category); }, [fetchMap, city, category]);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>City recommendations map</h1>
    <p className='text-sm text-slate-600'>This map shows Erasmus city places and practical tips. It never shows student live or personal location.</p>
    <div className='flex gap-2'>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Filter by city' className='rounded border px-3 py-2' />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Filter by category' className='rounded border px-3 py-2' />
      <button onClick={() => fetchMap(city, category)} className='rounded bg-slate-900 px-3 py-2 text-white'>Apply</button>
    </div>
    <div className='rounded-xl border bg-white p-4'>
      <p className='mb-3 text-xs text-slate-500'>Map provider adapter: placeholder list view for local demo without external API keys.</p>
      <div className='grid min-h-40 grid-cols-1 gap-3 md:grid-cols-2'>
        {items.map((item) => <div key={item.id} className='rounded-lg border p-3'>
          <p className='font-medium'>{item.title}</p>
          <p className='text-sm'>{item.category} · {item.city}, {item.country}</p>
          <p className='text-xs text-slate-500'>{item.addressLabel}</p>
          <p className='mt-1 text-sm'>{item.description}</p>
        </div>)}
      </div>
    </div>
  </div>;
}
