'use client';
import { useEffect, useState } from 'react';

export default function ConnectionsPage() {
  const [data, setData] = useState<any>({ incomingPending: [], outgoingPending: [], accepted: [], unavailable: [] });
  const load = async () => setData(await fetch('/api/social/connections').then((r) => r.json()));
  useEffect(() => { load(); }, []);
  const act = async (id: string, action: string) => { await fetch(`/api/social/connections/${id}/transition`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action }) }); await load(); };

  return <div className='space-y-6'>
    <h1 className='text-2xl font-semibold'>Connections</h1>
    <p className='text-sm text-slate-600'>Connections help you choose who can contact you later. Messaging will be available after the next phase.</p>
    <p className='text-sm text-slate-600'>You can only connect with visible Erasmus profiles.</p>
    <section><h2 className='font-semibold'>Requests received</h2>{data.incomingPending.map((c:any)=><div key={c.id} className='border rounded p-2 my-2'>{c.requesterProfile.displayName}<div className='flex gap-2 mt-2'><button className='rounded bg-slate-900 text-white px-2 py-1' onClick={()=>act(c.id,'accept')}>Accept</button><button className='rounded border px-2 py-1' onClick={()=>act(c.id,'reject')}>Reject</button><button className='rounded border px-2 py-1' onClick={()=>act(c.id,'block')}>Block</button></div></div>)}</section>
    <section><h2 className='font-semibold'>Requests sent</h2>{data.outgoingPending.map((c:any)=><div key={c.id} className='border rounded p-2 my-2'>{c.receiverProfile.displayName}<button className='rounded border px-2 py-1 ml-2' onClick={()=>act(c.id,'cancel')}>Cancel request</button></div>)}</section>
    <section><h2 className='font-semibold'>Connected students</h2>{data.accepted.map((c:any)=>{const other=c.requesterProfileId===c.receiverProfileId?c.requesterProfile:(c.requesterProfile.userId===undefined?c.requesterProfile:c.requesterProfile); return <div key={c.id} className='border rounded p-2 my-2'>{c.requesterProfile.displayName} & {c.receiverProfile.displayName}<button className='rounded border px-2 py-1 ml-2' onClick={()=>act(c.id,'block')}>Block</button></div>;})}</section>
  </div>;
}
