'use client';

import { useEffect, useState } from 'react';

type Requirement = { id: string; title: string; description: string; isRequired: boolean; sortOrder: number };

export default function CoordinatorDocumentRequirementsPage() {
  const [items, setItems] = useState<Requirement[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch('/api/institutional/document-requirements');
    const payload = (await res.json()) as { data?: Requirement[]; error?: string };
    if (!res.ok) return setError(payload.error ?? 'Failed to load requested documents');
    setItems(payload.data ?? []);
  };

  useEffect(() => { void load(); }, []);

  return <div className='space-y-4'>
    <h1 className='text-xl font-semibold'>Requested documents</h1>
    {error && <p className='text-sm text-red-700'>{error}</p>}
    <form className='grid gap-2 rounded border p-3 text-sm' onSubmit={async (e) => {
      e.preventDefault();
      setError(null);
      const fd = new FormData(e.currentTarget);
      const body = {
        title: String(fd.get('title') ?? ''),
        description: String(fd.get('description') ?? ''),
        isRequired: fd.get('isRequired') === 'on',
      };
      const res = await fetch('/api/institutional/document-requirements', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        setError(payload.error ?? 'Failed to create requested document');
        return;
      }
      (e.target as HTMLFormElement).reset();
      await load();
    }}>
      <input className='rounded border px-2 py-1' name='title' placeholder='Title (e.g., Arrival certificate)' required />
      <input className='rounded border px-2 py-1' name='description' placeholder='Description' />
      <label><input type='checkbox' name='isRequired' defaultChecked /> Required</label>
      <button className='w-fit rounded bg-blue-600 px-3 py-1 text-white'>Create requested document</button>
    </form>
    <div className='space-y-2'>
      {items.map((item) => <div key={item.id} className='rounded border p-3 text-sm'><div className='font-medium'>{item.title}</div><div>{item.description}</div><div className='text-xs text-gray-600'>{item.isRequired ? 'Required' : 'Optional'}</div></div>)}
    </div>
  </div>;
}
