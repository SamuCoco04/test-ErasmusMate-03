'use client';

import { FormEvent, useEffect, useState } from 'react';
import { EmptyState, ErrorState } from '@/src/components/States';
import { Button } from '@/src/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';
import type { SocialProfileDTO } from '@/src/modules/social/types';

export default function SocialProfilePage() {
  const [profile, setProfile] = useState<SocialProfileDTO | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => { fetch('/api/social/profile').then((r) => r.json()).then((d) => setProfile(d.profile)); }, []);

  async function save(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setStatus('Saving profile...'); const fd = new FormData(e.currentTarget);
    const body = { displayName: fd.get('displayName'), hostCity: fd.get('hostCity'), hostCountry: fd.get('hostCountry'), studyArea: fd.get('studyArea'), bio: fd.get('bio'), languages: String(fd.get('languages') || '').split(',').map((s) => s.trim()).filter(Boolean), interests: String(fd.get('interests') || '').split(',').map((s) => s.trim()).filter(Boolean) };
    const res = await fetch('/api/social/profile', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json(); setProfile(data); setStatus(res.ok ? 'Profile updated.' : 'Could not update profile.');
  }

  if (!profile) return <PageShell><PageHeader sectionLabel='Social support' title='My social profile' subtitle='Profile and privacy settings for student discovery and social support.' /><EmptyState description='Loading profile details...' /></PageShell>;

  return <PageShell>
    <PageHeader sectionLabel='Social support' title='My social profile' subtitle='This profile is used only in student social support. Official mobility procedures stay in the institutional area.' />
    <Card>
      <CardHeader><CardTitle>Profile details</CardTitle><CardDescription>Keep this concise and useful for Erasmus peer support.</CardDescription></CardHeader>
      <CardBody>
        <form className='grid gap-3 md:grid-cols-2' onSubmit={save}>
          <label className='text-sm font-medium'>Display name<input name='displayName' defaultValue={profile.displayName || ''} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium'>Host city<input name='hostCity' defaultValue={profile.hostCity || ''} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium'>Host country<input name='hostCountry' defaultValue={profile.hostCountry || ''} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium'>Study area<input name='studyArea' defaultValue={profile.studyArea || ''} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium md:col-span-2'>Languages (comma separated)<input name='languages' defaultValue={(profile.languages || []).join(', ')} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium md:col-span-2'>Interests (comma separated)<input name='interests' defaultValue={(profile.interests || []).join(', ')} className='mt-1 w-full rounded border px-3 py-2' /></label>
          <label className='text-sm font-medium md:col-span-2'>Bio<textarea name='bio' defaultValue={profile.bio || ''} className='mt-1 w-full rounded border px-3 py-2' rows={4} /></label>
          <div className='rounded-lg border bg-slate-50 p-3 text-sm md:col-span-2'>
            <p><strong>Privacy overview</strong></p>
            <p>Visibility: {profile.visibility}</p><p>Contact preference: {profile.contactPreference}</p><p>Mobility phase: {profile.mobilityPhase ?? 'Not shared'}</p><p>Home institution: {profile.homeInstitutionName ?? 'Not shared'}</p><p>Host institution: {profile.hostInstitutionName ?? 'Not shared'}</p><p>Map visibility follows your profile visibility and moderation safety rules.</p>
          </div>
          {status && status.includes('Could not') ? <ErrorState description={status} /> : null}
          {status && !status.includes('Could not') ? <p className='text-sm text-emerald-700 md:col-span-2'>{status}</p> : null}
          <div className='md:col-span-2'><Button type='submit'>Save profile</Button></div>
        </form>
      </CardBody>
    </Card>
  </PageShell>;
}
