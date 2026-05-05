'use client';
import { useEffect, useMemo, useState } from 'react';
import type { ConnectionListsResponse, SafeConnectionItem, ConnectionTransitionPayload } from '@/src/modules/social/types';

function locationText(city: string | null, country: string | null) {
  if (city && country) return `${city}, ${country}`;
  return city ?? country ?? 'Location not shared';
}

export default function ConnectionsPage() {
  const [data, setData] = useState<ConnectionListsResponse>({ incomingPending: [], outgoingPending: [], accepted: [], unavailable: [] });

  const load = async () => {
    const connectionsRes = await fetch('/api/social/connections');
    const connectionsJson = (await connectionsRes.json()) as ConnectionListsResponse;
    setData(connectionsJson);
  };

  useEffect(() => { void load(); }, []);

  const act = async (item: SafeConnectionItem, action: ConnectionTransitionPayload['action']) => {
    if (action === 'block') {
      const confirmed = window.confirm(`Block ${item.otherProfile.displayName}? They will no longer be able to message you through this connection.`);
      if (!confirmed) return;
    }
    await fetch(`/api/social/connections/${item.connectionId}/transition`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action })
    });
    await load();
  };

  const blocked = useMemo(() => data.unavailable.filter((item) => item.state === 'BLOCKED'), [data.unavailable]);

  const renderRow = (item: SafeConnectionItem, status: string, actions: React.ReactNode) => (
    <article key={item.connectionId} className='my-2 rounded-xl border bg-white p-3'>
      <h3 className='font-semibold'>{item.otherProfile.displayName}</h3>
      <p className='text-sm text-slate-600'>{locationText(item.otherProfile.hostCity, item.otherProfile.hostCountry)}</p>
      <p className='text-sm text-slate-600'>{item.otherProfile.studyArea ?? 'Study area not shared'}</p>
      <p className='text-xs text-slate-500'>Status: {status}</p>
      <div className='mt-2 flex gap-2'>{actions}</div>
    </article>
  );

  return <div className='space-y-6'>
    <h1 className='text-2xl font-semibold'>Connections</h1>
    <p className='text-sm text-slate-600'>Manage who can message you. Blocking applies only to the specific student shown on each row.</p>

    <section>
      <h2 className='font-semibold'>Requests received</h2>
      {data.incomingPending.length === 0 ? <p className='text-sm text-slate-500'>No received requests</p> : data.incomingPending.map((c) => renderRow(c, 'Pending received', <>
        {c.allowedActions.accept ? <button className='rounded bg-slate-900 px-2 py-1 text-white' onClick={() => act(c, 'accept')}>Accept</button> : null}
        {c.allowedActions.reject ? <button className='rounded border px-2 py-1' onClick={() => act(c, 'reject')}>Reject</button> : null}
        {c.allowedActions.block ? <button className='rounded border px-2 py-1' onClick={() => act(c, 'block')}>{`Block ${c.otherProfile.displayName}`}</button> : null}
      </>))}
    </section>

    <section>
      <h2 className='font-semibold'>Requests sent</h2>
      {data.outgoingPending.length === 0 ? <p className='text-sm text-slate-500'>No sent requests</p> : data.outgoingPending.map((c) => renderRow(c, 'Pending sent', c.allowedActions.cancel ? <button className='rounded border px-2 py-1' onClick={() => act(c, 'cancel')}>Cancel request</button> : null))}
    </section>

    <section>
      <h2 className='font-semibold'>Connected students</h2>
      {data.accepted.length === 0 ? <p className='text-sm text-slate-500'>No connected students</p> : data.accepted.map((c) => renderRow(c, 'Connected', <>
        {c.allowedActions.message ? <a className='rounded bg-slate-900 px-2 py-1 text-white' href='/social/student/messages'>Message</a> : null}
        {c.allowedActions.block ? <button className='rounded border px-2 py-1' onClick={() => act(c, 'block')}>{`Block ${c.otherProfile.displayName}`}</button> : null}
      </>))}
    </section>

    <section>
      <h2 className='font-semibold'>Blocked connections</h2>
      {blocked.length === 0 ? <p className='text-sm text-slate-500'>No blocked connections</p> : blocked.map((c) => renderRow(c, 'Blocked', <>
        {c.allowedActions.unblock ? <button className='rounded bg-slate-900 px-2 py-1 text-white' onClick={() => act(c, 'unblock')}>{`Unblock ${c.otherProfile.displayName}`}</button> : null}
      </>))}
    </section>
  </div>;
}
