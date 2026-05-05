'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SocialMapItem } from '@/src/modules/social/map';

export default function SocialMapPage() {
  const [items, setItems] = useState<SocialMapItem[]>([]);
  const [hostCity, setHostCity] = useState('');
  const [studyArea, setStudyArea] = useState('');

  const fetchMap = useCallback(async (city = '', area = '') => {
    const q = new URLSearchParams();
    if (city) q.set('hostCity', city);
    if (area) q.set('studyArea', area);
    const res = await fetch(`/api/social/map?${q.toString()}`);
    const body = await res.json() as { items: SocialMapItem[] };
    setItems(body.items ?? []);
  }, []);

  useEffect(() => { void fetchMap(); }, [fetchMap]);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Map discovery</h1>
    <p className='text-sm text-slate-600'>City-level location only. This social view never shows precise or live location.</p>
    <div className='flex gap-2'>
      <input value={hostCity} onChange={(e) => setHostCity(e.target.value)} placeholder='Filter by host city' className='rounded border px-3 py-2' />
      <input value={studyArea} onChange={(e) => setStudyArea(e.target.value)} placeholder='Filter by study area' className='rounded border px-3 py-2' />
      <button onClick={() => fetchMap(hostCity, studyArea)} className='rounded bg-slate-900 px-3 py-2 text-white'>Apply</button>
    </div>
    <div className='rounded-xl border bg-white p-4'>
      <div className='grid min-h-40 grid-cols-2 gap-3 md:grid-cols-3'>
        {items.map((item) => <div key={item.profileId} className='rounded-lg border p-3'>
          <p className='font-medium'>{item.displayName}</p>
          <p className='text-sm'>{item.hostCity}, {item.hostCountry}</p>
          <p className='text-xs text-slate-500'>{item.studyArea}</p>
          <p className='text-xs text-slate-500'>Status: {item.connectionStatus}</p>
          {item.connectionStatus === 'CONNECTED' ? <a className='mt-2 inline-block rounded bg-slate-900 px-2 py-1 text-xs text-white' href='/social/student/messages'>Message</a> : null}
          {item.connectionStatus === 'OPEN_TO_REQUESTS' ? <p className='mt-2 text-xs'>Request available in Discover students.</p> : null}
        </div>)}
      </div>
    </div>
  </div>;
}
