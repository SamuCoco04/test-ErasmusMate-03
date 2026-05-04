'use client';
import { useCallback, useEffect, useState } from 'react';
import type { SocialDiscoveryItem } from '@/src/modules/social/types';

const contactLabel: Record<string, string> = {
  OPEN_TO_REQUESTS: 'Available to request',
  CONNECTIONS_ONLY: 'Connections only',
  HIDDEN: 'Unavailable'
};
const stateLabel: Record<string, string> = {
  NOT_CONNECTED: 'Available to request',
  REQUEST_SENT: 'Request sent',
  REQUEST_RECEIVED: 'Request received',
  CONNECTED: 'Connected',
  BLOCKED: 'Unavailable',
  UNAVAILABLE: 'Unavailable'
};

export default function SocialDiscoveryPage() {
  const [items, setItems] = useState<SocialDiscoveryItem[]>([]);
  const [hostCity, setHostCity] = useState('');
  const [studyArea, setStudyArea] = useState('');

  const fetchProfiles = useCallback(async (hc = '', sa = '') => {
    const q = new URLSearchParams();
    if (hc) q.set('hostCity', hc);
    if (sa) q.set('studyArea', sa);
    const data = await fetch(`/api/social/discovery?${q.toString()}`).then((r) => r.json() as Promise<{ items: SocialDiscoveryItem[] }>);
    setItems(data.items || []);
  }, []);

  useEffect(() => { void fetchProfiles(); }, [fetchProfiles]);

  const sendRequest = async (targetProfileId: string) => {
    await fetch('/api/social/connections', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ targetProfileId }) });
    await fetchProfiles(hostCity, studyArea);
  };

  const hasFilters = Boolean(hostCity || studyArea);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Discover students</h1>
    <p className='text-sm text-slate-600'>Find other Erasmus students and send requests when they are available.</p>
    <div className='flex gap-2'>
      <input value={hostCity} onChange={(e) => setHostCity(e.target.value)} placeholder='Filter by host city' className='rounded border px-3 py-2' />
      <input value={studyArea} onChange={(e) => setStudyArea(e.target.value)} placeholder='Filter by study area' className='rounded border px-3 py-2' />
      <button onClick={() => fetchProfiles(hostCity, studyArea)} className='rounded bg-slate-900 px-3 py-2 text-white'>Apply</button>
    </div>
    {items.length === 0 ? <div className='rounded-xl border bg-white p-4 text-sm text-slate-600'>{hasFilters ? 'No students match your filters yet.' : 'No visible student profiles are available right now.'}</div> : null}
    <div className='grid gap-3 md:grid-cols-2'>{items.map((p) => {
      const canRequest = p.connectionStatus === 'NOT_CONNECTED' && p.contactPreference === 'OPEN_TO_REQUESTS';
      return (<article key={p.id} className='rounded-xl border bg-white p-4'>
        <h2 className='font-semibold'>{p.displayName}</h2><p className='text-sm'>{p.hostCity}{p.hostCountry ? `, ${p.hostCountry}` : ''}</p><p className='text-sm'>{p.studyArea}</p><p className='text-sm'>{p.bio || 'No bio yet'}</p>
        <p className='text-xs text-slate-500'>{contactLabel[p.contactPreference ?? ''] ?? 'Unavailable'}</p>
        <p className='mb-2 text-xs text-slate-500'>{stateLabel[p.connectionStatus ?? 'UNAVAILABLE']}</p>
        {canRequest ? <button className='rounded bg-slate-900 px-3 py-1 text-white' onClick={() => sendRequest(p.id)}>Send request</button> : null}
        {p.connectionStatus === 'REQUEST_RECEIVED' ? <p className='text-sm'>Open Connections to accept or reject.</p> : null}
      </article>);
    })}</div>
  </div>;
}
