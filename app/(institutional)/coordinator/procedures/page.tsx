'use client';
import { useEffect, useState } from 'react';

type Procedure = { id: string; title: string; description: string; isActive: boolean };

export default function CoordinatorProceduresPage() {
  const [items, setItems] = useState<Procedure[]>([]);
  const load = async () => { const r = await fetch('/api/institutional/procedures'); const p = await r.json(); setItems(p.data ?? []); };
  useEffect(() => { void load(); }, []);
  return <div className='space-y-4'><h1 className='text-xl font-semibold'>Procedures</h1>
    <form className='grid gap-2 rounded border p-3 text-sm' onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); await fetch('/api/institutional/procedures', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ title: String(fd.get('title')??''), description: String(fd.get('description')??''), isActive: fd.get('isActive')==='on' })}); await load(); }}>
      <input name='title' required placeholder='Procedure title' className='rounded border px-2 py-1'/>
      <input name='description' placeholder='Description' className='rounded border px-2 py-1'/>
      <label><input name='isActive' type='checkbox' defaultChecked /> Active</label>
      <button className='w-fit rounded bg-blue-600 px-3 py-1 text-white'>Create procedure</button>
    </form>
    {items.map((i)=><div key={i.id} className='rounded border p-2 text-sm'><b>{i.title}</b> · {i.isActive?'Active':'Inactive'}<div>{i.description}</div></div>)}
  </div>;
}
