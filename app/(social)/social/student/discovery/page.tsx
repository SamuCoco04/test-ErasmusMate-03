'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/src/components/ui/card';
import { EmptyState } from '@/src/components/States';
import { StatusBadge } from '@/src/components/Badge';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';
import type { SocialDiscoveryItem } from '@/src/modules/social/types';

const stateLabel: Record<string, string> = { AVAILABLE_TO_REQUEST: 'Available to request', REQUEST_SENT: 'Request pending', REQUEST_RECEIVED: 'Request pending', CONNECTED: 'Connected', BLOCKED: 'Blocked', UNAVAILABLE: 'Unavailable' };
const PRIVACY_UNAVAILABLE_COPY = "Connection request unavailable due to this student's privacy preferences.";

export default function SocialDiscoveryPage() {
  const [items, setItems] = useState<SocialDiscoveryItem[]>([]); const [hostCity, setHostCity] = useState(''); const [studyArea, setStudyArea] = useState(''); const [feedback, setFeedback] = useState('');
  const fetchProfiles = useCallback(async (hc = '', sa = '') => { const q = new URLSearchParams(); if (hc) q.set('hostCity', hc); if (sa) q.set('studyArea', sa); const data = await fetch(`/api/social/discovery?${q.toString()}`).then((r) => r.json() as Promise<{ items: SocialDiscoveryItem[] }>); setItems(data.items || []); }, []);
  useEffect(() => { void fetchProfiles(); }, [fetchProfiles]);
  const sendRequest = async (targetProfileId: string) => {
    const response = await fetch('/api/social/connections', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ targetProfileId }) });
    const body = await response.json().catch(() => ({} as { error?: string }));
    setFeedback(response.ok ? 'Connection request sent.' : body.error ?? 'Connection request could not be sent.');
    await fetchProfiles(hostCity, studyArea);
  };
  const reportProfile = async (targetProfileId: string) => { const response = await fetch('/api/social/reports', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ targetProfileId, reason: 'Inappropriate profile content' }) }); setFeedback(response.ok ? 'Report submitted. Thank you.' : 'Report could not be submitted.'); };

  return <PageShell>
    <PageHeader sectionLabel='Social support' title='Discover students' subtitle='Search students safely by Erasmus context. Moderation-hidden profiles are excluded.' />
    <Card><CardHeader><CardTitle>Filters</CardTitle></CardHeader><CardBody><div className='grid gap-2 md:grid-cols-[1fr_1fr_auto]'><label className='text-sm'>Host city<input aria-label='Host city filter' value={hostCity} onChange={(e) => setHostCity(e.target.value)} className='mt-1 w-full rounded border px-3 py-2' /></label><label className='text-sm'>Study area<input aria-label='Study area filter' value={studyArea} onChange={(e) => setStudyArea(e.target.value)} className='mt-1 w-full rounded border px-3 py-2' /></label><div className='self-end'><Button onClick={() => fetchProfiles(hostCity, studyArea)}>Apply filters</Button></div></div></CardBody></Card>
    {feedback ? <p className='text-sm text-slate-600'>{feedback}</p> : null}
    {items.length === 0 ? <EmptyState description='No visible student profiles match this search.' /> : null}
    <div className='grid gap-3 md:grid-cols-2'>{items.map((p) => { const canRequest = p.allowedActions?.request ?? p.connectionStatus === 'AVAILABLE_TO_REQUEST'; const canMessage = p.allowedActions?.message ?? p.connectionStatus === 'CONNECTED'; return <article key={p.id} className='rounded-xl border bg-white p-4'>
      <h2 className='font-semibold'>{p.displayName}</h2><p className='text-sm'>{p.hostCity}{p.hostCountry ? `, ${p.hostCountry}` : ''}</p><p className='text-sm'>{p.studyArea || 'Study area not shared'}</p><p className='text-sm'>{p.bio || 'No bio yet'}</p>
      <div className='my-2'><StatusBadge tone='info'>Status: {stateLabel[p.connectionStatus]}</StatusBadge></div>
      {p.connectionStatus === 'UNAVAILABLE' && p.unavailableReason === 'CONTACT_PREFERENCE_CONNECTIONS_ONLY' ? <p className='text-xs text-slate-500'>This student only accepts contact from existing connections. You cannot message this student until a connection is accepted.</p> : null}
      {p.connectionStatus === 'UNAVAILABLE' && p.unavailableReason === 'CONTACT_PREFERENCE_HIDDEN' ? <p className='text-xs text-slate-500'>{PRIVACY_UNAVAILABLE_COPY}</p> : null}
      {p.contactPreferenceLabel ? <p className='text-xs text-slate-500'>Contact preference: {p.contactPreferenceLabel.toLowerCase()}</p> : null}
      <div className='mt-2 flex gap-2'>{canRequest ? <Button onClick={() => sendRequest(p.id)}>Send request</Button> : null}{canMessage ? <a className='rounded bg-slate-900 px-3 py-1 text-white' href='/social/student/messages'>Message</a> : null}{p.connectionStatus === 'REQUEST_SENT' ? <Button variant='secondary' disabled>Request sent</Button> : null}{p.connectionStatus === 'UNAVAILABLE' ? <Button variant='secondary' disabled>Unavailable</Button> : null}<button className='rounded border px-3 py-1 text-sm' onClick={() => reportProfile(p.id)}>Report profile</button></div>
    </article>; })}</div>
  </PageShell>;
}
