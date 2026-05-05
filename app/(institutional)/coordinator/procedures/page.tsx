'use client';
import { useEffect, useState } from 'react';

type Procedure = { id: string; title: string; description: string; isRequired: boolean; isActive: boolean; sortOrder: number; maxSizeBytes: number; acceptedMimeTypesJson: string };

export default function CoordinatorProceduresPage() {
  const [items, setItems] = useState<Procedure[]>([]);
  useEffect(() => { fetch('/api/institutional/procedures').then((r) => r.json()).then((p) => setItems(p.data ?? [])); }, []);
  return <div className='space-y-4'><h1 className='text-xl font-semibold'>Procedures</h1>{items.map((i)=><div key={i.id} className='rounded border p-2 text-sm'><b>{i.title}</b> · {i.isRequired?'Required':'Optional'}<div>{i.description}</div></div>)}</div>;
}
