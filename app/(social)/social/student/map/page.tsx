'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

type MapItem = {
  recommendationId: string;
  title: string;
  category: string;
  city: string;
  country: string;
  addressLabel: string;
  descriptionExcerpt: string;
  approximateLatitude: number | null;
  approximateLongitude: number | null;
};

const SocialRecommendationsMap = dynamic(
  () => import('@/src/components/social-recommendations-map').then((mod) => mod.SocialRecommendationsMap),
  { ssr: false, loading: () => <div className='rounded-xl border bg-slate-50 p-4 text-sm'>Loading local map provider…</div> },
);

export default function SocialMapPage() {
  const [items, setItems] = useState<MapItem[]>([]);
  const [city, setCity] = useState('Leuven');
  const [category, setCategory] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [form, setForm] = useState({ title: '', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: '', description: '' });

  const fetchMap = useCallback(async (cityValue = '', categoryValue = '') => {
    const q = new URLSearchParams();
    if (cityValue) q.set('city', cityValue);
    if (categoryValue) q.set('category', categoryValue);
    const res = await fetch(`/api/social/recommendations/map?${q.toString()}`);
    const body = (await res.json()) as { items: MapItem[] };
    setItems(body.items ?? []);
  }, []);

  useEffect(() => {
    void fetchMap(city, category);
  }, [fetchMap, city, category]);

  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))).sort(), [items]);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>City recommendations map</h1>
    <p className='text-sm text-slate-600'>Only recommendation place locations are shown. Student live or personal location is never displayed.</p>
    <p className='text-sm text-slate-600'>Use the location of the place you recommend, not your home or personal location.</p>

    <div className='flex flex-wrap gap-2'>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Filter by city' className='rounded border px-3 py-2' />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className='rounded border px-3 py-2'>
        <option value=''>All categories</option>
        {categories.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
      <button onClick={() => fetchMap(city, category)} className='rounded bg-slate-900 px-3 py-2 text-white'>Apply</button>
    </div>

    <div className='grid gap-4 lg:grid-cols-[2fr_1fr]'>
      <div className='rounded-xl border bg-white p-3'>
        <p className='mb-2 text-xs text-slate-500'>Map provider: Leaflet + OpenStreetMap (local prototype, no API key required).</p>
        <SocialRecommendationsMap items={items} selectedPosition={selectedPosition} onMapClick={(lat, lng) => setSelectedPosition([lat, lng])} />
      </div>
      <div className='space-y-3'>
        <form className='space-y-2 rounded-lg border bg-white p-3' onSubmit={async (e) => {
          e.preventDefault();
          if (!selectedPosition) return;
          await fetch('/api/social/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, approximateLatitude: selectedPosition[0], approximateLongitude: selectedPosition[1] }),
          });
          setForm({ title: '', category: 'GENERAL_TIP', city, country: 'Belgium', addressLabel: '', description: '' });
          setSelectedPosition(null);
          await fetchMap(city, category);
        }}>
          <p className='font-medium'>Create recommendation</p>
          <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder='Title' className='w-full rounded border px-2 py-1' />
          <input value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} placeholder='Category' className='w-full rounded border px-2 py-1' />
          <input value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} placeholder='City' className='w-full rounded border px-2 py-1' />
          <input value={form.country} onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))} placeholder='Country' className='w-full rounded border px-2 py-1' />
          <input value={form.addressLabel} onChange={(e) => setForm((prev) => ({ ...prev, addressLabel: e.target.value }))} placeholder='Address or label' className='w-full rounded border px-2 py-1' />
          <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder='Description' className='w-full rounded border px-2 py-1' />
          <p className='text-xs text-slate-500'>{selectedPosition ? `Selected coordinates: ${selectedPosition[0].toFixed(5)}, ${selectedPosition[1].toFixed(5)}` : 'Click the map to place your recommendation marker.'}</p>
          <button className='rounded bg-slate-900 px-2 py-1 text-sm text-white' disabled={!selectedPosition}>Create recommendation</button>
        </form>
        {items.map((item) => <article key={item.recommendationId} className='rounded-lg border bg-white p-3'>
          <p className='font-medium'>{item.title}</p>
          <p className='text-sm'>{item.category} · {item.city}, {item.country}</p>
          <p className='text-xs text-slate-500'>{item.addressLabel}</p>
          <p className='mt-1 text-sm'>{item.descriptionExcerpt}</p>
        </article>)}
      </div>
    </div>
  </div>;
}
