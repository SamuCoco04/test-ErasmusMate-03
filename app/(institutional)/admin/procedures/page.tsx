'use client';

import { useEffect, useState } from 'react';

type Procedure = { id: string; title: string; description: string; isRequired: boolean; isActive: boolean; sortOrder: number; maxSizeBytes: number; acceptedMimeTypesJson: string };

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];

export default function AdminProceduresPage() {
  const [items, setItems] = useState<Procedure[]>([]);
  const [error, setError] = useState<string | null>(null);
  const load = async () => { const r = await fetch('/api/institutional/procedures'); const p = await r.json(); setItems(p.data ?? []); };
  useEffect(() => { void load(); }, []);

  return <div className='space-y-4'>
    <h1 className='text-xl font-semibold'>Procedure configuration</h1>
    {error && <p className='text-sm text-red-700'>{error}</p>}
    <form className='grid gap-2 rounded border p-3 text-sm' onSubmit={async (e) => { e.preventDefault(); setError(null); const fd = new FormData(e.currentTarget); const body = { title: String(fd.get('title') ?? ''), description: String(fd.get('description') ?? ''), isRequired: fd.get('isRequired') === 'on', isActive: fd.get('isActive') === 'on', sortOrder: Number(fd.get('sortOrder') ?? 0), maxSizeBytes: Number(fd.get('maxSizeBytes') ?? 0), acceptedMimeTypes: fd.getAll('acceptedMimeTypes') }; const res = await fetch('/api/institutional/procedures', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(body) }); if (!res.ok) { const p = await res.json(); setError(p.error ?? 'Failed to create procedure'); return; } (e.target as HTMLFormElement).reset(); await load(); }}>
      <input name='title' required placeholder='Procedure title' className='rounded border px-2 py-1'/>
      <input name='description' placeholder='Description' className='rounded border px-2 py-1'/>
      <div className='flex gap-4'><label><input name='isRequired' type='checkbox' defaultChecked /> Required</label><label><input name='isActive' type='checkbox' defaultChecked /> Active</label></div>
      <input name='sortOrder' type='number' defaultValue={0} className='rounded border px-2 py-1' />
      <input name='maxSizeBytes' type='number' defaultValue={5242880} className='rounded border px-2 py-1' />
      <div className='flex gap-3'>{ALLOWED_MIME_TYPES.map((m)=><label key={m}><input type='checkbox' name='acceptedMimeTypes' value={m} defaultChecked={m==='application/pdf'} /> {m}</label>)}</div>
      <button className='w-fit rounded bg-blue-600 px-3 py-1 text-white'>Create procedure</button>
    </form>
    {items.map((i)=><div key={i.id} className='rounded border p-3 text-sm space-y-2'><div><b>{i.title}</b></div><div>{i.description}</div><div className='text-xs'>{i.isActive?'Active':'Inactive'} · {i.isRequired?'Required':'Optional'} · Sort {i.sortOrder}</div><div className='text-xs'>Accepted files: {JSON.parse(i.acceptedMimeTypesJson || '[]').join(', ') || 'None'} · Max size: {Math.round(i.maxSizeBytes/1024/1024)} MB</div><button className='rounded border px-2 py-1' onClick={async ()=>{await fetch('/api/institutional/procedures',{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({id:i.id,isActive:!i.isActive})});await load();}}>{i.isActive?'Deactivate':'Reactivate'}</button></div>)}
  </div>;
}
