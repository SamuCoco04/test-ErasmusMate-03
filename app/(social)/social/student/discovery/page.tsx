'use client';
import { useCallback, useEffect, useState } from 'react';
import type { SocialDiscoveryItem } from '@/src/modules/social/types';

const contactLabel: Record<string, string> = { OPEN_TO_REQUESTS: 'Open to future requests', CONNECTIONS_ONLY: 'Connections only (future phase)', HIDDEN: 'Hidden contact' };

export default function SocialDiscoveryPage() {
  const [items, setItems] = useState<SocialDiscoveryItem[]>([]);
  const [hostCity, setHostCity] = useState('');
  const [studyArea, setStudyArea] = useState('');

  const fetchProfiles = useCallback(async (hc = '', sa = '') => {
    const q = new URLSearchParams();
    if (hc) q.set('hostCity', hc);
    if (sa) q.set('studyArea', sa);
    const data = await fetch(`/api/social/discovery?${q.toString()}`).then((r) => r.json());
    setItems(data.items || []);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Student discovery</h1>
      <p className='text-sm text-slate-600'>Find other Erasmus students for social orientation. Connections and messaging will be added later.</p>
      <div className='flex gap-2'>
        <input value={hostCity} onChange={(e) => setHostCity(e.target.value)} placeholder='Filter by host city' className='rounded border px-3 py-2' />
        <input value={studyArea} onChange={(e) => setStudyArea(e.target.value)} placeholder='Filter by study area' className='rounded border px-3 py-2' />
        <button onClick={() => fetchProfiles(hostCity, studyArea)} className='rounded bg-slate-900 px-3 py-2 text-white'>Apply</button>
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        {items.map((p) => (
          <article key={p.id} className='rounded-xl border p-4'>
            <h2 className='font-semibold'>{p.displayName}</h2>
            <p className='text-sm'>{p.hostCity}{p.hostCountry ? `, ${p.hostCountry}` : ''}</p>
            <p className='text-sm'>{p.studyArea}</p>
            <p className='text-sm'>Languages: {(p.languages || []).join(', ') || 'Not specified'}</p>
            <p className='text-sm'>Interests: {(p.interests || []).join(', ') || 'Not specified'}</p>
            <p className='text-sm'>{p.bio || 'No bio yet'}</p>
            <p className='text-xs text-slate-500'>{contactLabel[p.contactPreference ?? ''] ?? 'Contact preference not set'}</p>
            <p className='text-xs text-slate-500'>Connections will be added later.</p>
          </article>
        ))}
      </div>
    </div>
  );
}
