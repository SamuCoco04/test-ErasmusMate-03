'use client';
import { useCallback, useEffect, useState } from 'react';

type Rec = {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  country: string;
  addressLabel: string;
  approximateLatitude: number | null;
  approximateLongitude: number | null;
};

export default function RecommendationsPage() {
  const [items, setItems] = useState<Rec[]>([]);
  const [city, setCity] = useState('Leuven');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: '', description: '', approximateLatitude: '', approximateLongitude: '' });

  const load = useCallback(async (cityValue: string, categoryValue: string) => {
    const q = new URLSearchParams();
    if (cityValue) q.set('city', cityValue);
    if (categoryValue) q.set('category', categoryValue);
    const res = await fetch(`/api/social/recommendations?${q.toString()}`);
    const body = (await res.json()) as { items: Rec[] };
    setItems(body.items ?? []);
  }, []);

  useEffect(() => {
    void load(city, category);
  }, [load, city, category]);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Recommendations</h1>
    <p className='text-sm text-slate-600'>Use the location of the place you recommend, not your home or personal location.</p>

    <form className='grid gap-2 rounded border bg-white p-4 md:grid-cols-2' onSubmit={async (e) => {
      e.preventDefault();
      setError('');
      const res = await fetch('/api/social/recommendations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, approximateLatitude: Number(form.approximateLatitude), approximateLongitude: Number(form.approximateLongitude) }),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setError(body.error ?? 'Could not create recommendation');
        return;
      }
      setForm({ title: '', category: 'GENERAL_TIP', city, country: 'Belgium', addressLabel: '', description: '', approximateLatitude: '', approximateLongitude: '' });
      await load(city, category);
    }}>
      <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder='Title' className='rounded border px-3 py-2' />
      <input value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} placeholder='Category' className='rounded border px-3 py-2' />
      <input value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} placeholder='City' className='rounded border px-3 py-2' />
      <input value={form.country} onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))} placeholder='Country' className='rounded border px-3 py-2' />
      <input value={form.addressLabel} onChange={(e) => setForm((prev) => ({ ...prev, addressLabel: e.target.value }))} placeholder='Address or label' className='rounded border px-3 py-2' />
      <input value={form.approximateLatitude} onChange={(e) => setForm((prev) => ({ ...prev, approximateLatitude: e.target.value }))} placeholder='Latitude' className='rounded border px-3 py-2' />
      <input value={form.approximateLongitude} onChange={(e) => setForm((prev) => ({ ...prev, approximateLongitude: e.target.value }))} placeholder='Longitude' className='rounded border px-3 py-2' />
      <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder='Description' className='rounded border px-3 py-2 md:col-span-2' />
      {error ? <p className='text-sm text-rose-700 md:col-span-2'>{error}</p> : null}
      <button className='rounded bg-slate-900 px-3 py-2 text-white md:col-span-2'>Create recommendation</button>
    </form>

    <div className='flex gap-2'>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' className='rounded border px-3 py-2' />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' className='rounded border px-3 py-2' />
      <button onClick={() => void load(city, category)} className='rounded bg-slate-900 px-3 py-2 text-white'>Filter</button>
    </div>
    <div className='space-y-2'>
      {items.map((item) => <article key={item.id} className='rounded border bg-white p-3'>
        <h2 className='font-medium'>{item.title}</h2><p className='text-xs text-slate-500'>{item.category} · {item.city} · {item.addressLabel}</p><p>{item.description}</p>
      </article>)}
    </div>
  </div>;
}
