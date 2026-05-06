'use client';
import { useCallback, useEffect, useState } from 'react';
import { EmptyState } from '@/src/components/States';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';

type Rec = {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  country: string;
  addressLabel: string;
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

  return <PageShell>
    <PageHeader sectionLabel='Social support' title='Recommendations' subtitle='Share practical city tips. Do not post private home or personal locations.' />

    <form className='grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2' onSubmit={async (e) => {
      e.preventDefault();
      setError('');
      const res = await fetch('/api/social/recommendations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, approximateLatitude: Number(form.approximateLatitude), approximateLongitude: Number(form.approximateLongitude) }),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setError(body.error ?? 'Recommendation could not be created right now.');
        return;
      }
      setForm({ title: '', category: 'GENERAL_TIP', city, country: 'Belgium', addressLabel: '', description: '', approximateLatitude: '', approximateLongitude: '' });
      await load(city, category);
    }}>
      <label className='text-sm'>Title<input aria-label='Recommendation title' value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>Category<input aria-label='Recommendation category' value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>City<input aria-label='Recommendation city' value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>Country<input aria-label='Recommendation country' value={form.country} onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>Address or place label<input aria-label='Recommendation address label' value={form.addressLabel} onChange={(e) => setForm((prev) => ({ ...prev, addressLabel: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>Approximate latitude<input aria-label='Recommendation latitude' value={form.approximateLatitude} onChange={(e) => setForm((prev) => ({ ...prev, approximateLatitude: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm'>Approximate longitude<input aria-label='Recommendation longitude' value={form.approximateLongitude} onChange={(e) => setForm((prev) => ({ ...prev, approximateLongitude: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='text-sm md:col-span-2'>Description<textarea aria-label='Recommendation description' value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className='mt-1 w-full rounded border px-3 py-2' /></label>
      {error ? <p className='text-sm text-rose-700 md:col-span-2'>{error}</p> : null}
      <button className='rounded bg-slate-900 px-3 py-2 text-white md:col-span-2'>Create recommendation</button>
    </form>

    <div className='flex flex-wrap gap-2 rounded-xl border bg-white p-4'>
      <label className='min-w-40 flex-1 text-sm'>City filter<input aria-label='Recommendations city filter' value={city} onChange={(e) => setCity(e.target.value)} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <label className='min-w-40 flex-1 text-sm'>Category filter<input aria-label='Recommendations category filter' value={category} onChange={(e) => setCategory(e.target.value)} className='mt-1 w-full rounded border px-3 py-2' /></label>
      <button onClick={() => void load(city, category)} className='self-end rounded bg-slate-900 px-3 py-2 text-white'>Apply filters</button>
    </div>

    {items.length === 0 ? <EmptyState description='No recommendations match the current filters.' /> : null}
    <div className='space-y-2'>
      {items.map((item) => <article key={item.id} className='rounded border bg-white p-3'>
        <h2 className='font-medium'>{item.title}</h2><p className='text-xs text-slate-500'>{item.category} · {item.city}, {item.country} · {item.addressLabel}</p><p className='mt-1 text-sm'>{item.description}</p>
      </article>)}
    </div>
  </PageShell>;
}
