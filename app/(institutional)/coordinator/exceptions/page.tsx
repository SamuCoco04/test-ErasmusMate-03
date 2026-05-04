'use client';
import { useEffect, useState } from 'react';
import { PageHeader } from '@/src/components/PageHeader';
import { getExceptionStatusLabel } from '@/src/modules/institutional/status-labels';

type ExceptionItem = { id: string; title: string; state: string };

export default function Page(){const [items,setItems]=useState<ExceptionItem[]>([]); useEffect(()=>{void fetch('/api/institutional/exceptions').then(r=>r.json()).then(d=>setItems(d.data??[]));},[]);
async function act(id:string,action:string){const rationale=prompt('Rationale')??''; const overrideDueDate=action==='apply'?(prompt('Extension date (YYYY-MM-DD)')??''):undefined; await fetch(`/api/institutional/exceptions/${id}/transition`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({action,rationale,overrideDueDate})}); location.reload();}
return <div className='space-y-6'><PageHeader sectionLabel='Coordinator exceptions' title='Review requests' subtitle='Review request, approve or reject with rationale, and apply approved extensions.'/><div className='rounded-xl border bg-white p-4 space-y-2'>{items.map((i)=> <div key={i.id} className='border rounded p-3 text-sm'><div className='font-medium'>{i.title}</div><div>Status: {getExceptionStatusLabel(i.state)}</div><div className='flex gap-2 mt-2'>{i.state==='PENDING'&&<button onClick={()=>act(i.id,'start_review')}>Start review</button>}{['PENDING','IN_REVIEW'].includes(i.state)&&<button onClick={()=>act(i.id,'approve')}>Approve</button>}{['PENDING','IN_REVIEW'].includes(i.state)&&<button onClick={()=>act(i.id,'reject')}>Reject</button>}{i.state==='APPROVED'&&<button onClick={()=>act(i.id,'apply')}>Apply</button>}{['APPLIED','REJECTED'].includes(i.state)&&<button onClick={()=>act(i.id,'close')}>Close</button>}</div></div>)}</div></div>}
