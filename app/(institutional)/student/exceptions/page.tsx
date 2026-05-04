'use client';
import { useEffect, useState } from 'react';
import { PageHeader } from '@/src/components/PageHeader';

export default function Page(){
  const [items,setItems]=useState<any[]>([]); const [deadlines,setDeadlines]=useState<any[]>([]);
  const [title,setTitle]=useState('Ask for more time'); const [reason,setReason]=useState(''); const [deadlineId,setDeadlineId]=useState('');
  useEffect(()=>{void (async()=>{ const e=await fetch('/api/institutional/exceptions').then(r=>r.json()); setItems(e.data??[]); const d=await fetch('/api/institutional/deadlines').then(r=>r.json()); setDeadlines(d.data?.items??[]); })();},[]);
  return <div className='space-y-6'><PageHeader sectionLabel='Student exceptions' title='Exception requests' subtitle='Ask for more time when a deadline needs review.'/>
  <form className='rounded-xl border bg-white p-4 space-y-2' onSubmit={async(e)=>{e.preventDefault(); await fetch('/api/institutional/exceptions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title,reason,deadlineId})}); location.reload();}}><input className='border p-2 w-full' value={title} onChange={(e)=>setTitle(e.target.value)} /><select className='border p-2 w-full' value={deadlineId} onChange={(e)=>setDeadlineId(e.target.value)}><option value=''>Select deadline</option>{deadlines.map((d)=> <option key={d.id} value={d.id}>{d.title}</option>)}</select><textarea className='border p-2 w-full' value={reason} onChange={(e)=>setReason(e.target.value)} placeholder='Reason'/><button className='rounded bg-blue-600 text-white px-3 py-1'>Send request</button></form>
  <div className='rounded-xl border bg-white p-4'>{items.map((i)=> <div key={i.id} className='border rounded p-3 mb-2 text-sm'><div className='font-medium'>{i.title}</div><div>{i.state}</div><div>{i.coordinatorRationale ?? 'Waiting for decision'}</div></div>)}</div></div>;
}
