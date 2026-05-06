'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';

type Thread = { connectionId: string; otherProfile: { displayName: string }; latestMessage: { body: string; createdAt: string } | null };
type Message = { id: string; senderProfileId: string; body: string; createdAt: string };

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const selectedThread = useMemo(() => threads.find((x) => x.connectionId === selected) ?? null, [threads, selected]);

  const loadThreads = useCallback(async () => {
    const res = await fetch('/api/social/messages');
    const json = (await res.json()) as Thread[];
    setThreads(json);
    if (!selected && json.length > 0) setSelected(json[0].connectionId);
  }, [selected]);

  const loadMessages = useCallback(async (connectionId: string) => {
    const res = await fetch(`/api/social/messages/${connectionId}`);
    const json = (await res.json()) as Message[];
    setMessages(json);
  }, []);

  useEffect(() => { void loadThreads(); }, [loadThreads]);
  useEffect(() => { if (selected) void loadMessages(selected); }, [selected, loadMessages]);

  const reportMessage = async (targetMessageId: string) => {
    await fetch('/api/social/reports', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ targetMessageId, reason: 'Inappropriate message' }) });
  };

  const send = async () => {
    if (!selected) return;
    if (!body.trim()) {
      setError('Please write a message before sending.');
      return;
    }
    const response = await fetch(`/api/social/messages/${selected}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ body }) });
    if (!response.ok) {
      const json = (await response.json().catch(() => ({ error: 'Message could not be sent right now.' }))) as { error?: string };
      setError(json.error ?? 'Message could not be sent right now.');
      return;
    }
    setError('');
    setBody('');
    await loadMessages(selected);
    await loadThreads();
  };

  return <PageShell>
    <PageHeader sectionLabel='Social support' title='Messages' subtitle='Messaging is available only for accepted connections.' />
    {threads.length === 0 ? <div role='status' aria-live='polite' className='rounded-2xl border border-dashed p-8 text-center'>
      <p className='font-medium text-slate-700'>No messages yet. Accept a connection to start a conversation.</p>
      <p className='mt-1 text-sm text-slate-500'>No accepted connections yet. Go to Connections to get started.</p>
    </div> : <div className='grid gap-4 lg:grid-cols-[300px_1fr]'>
      <aside className='rounded-xl border bg-white p-3'>
        <h2 className='mb-3 text-lg font-semibold'>Connections</h2>
        {threads.map((thread) => <button key={thread.connectionId} onClick={() => setSelected(thread.connectionId)} className='mb-2 w-full rounded border p-2 text-left'>
          <div className='font-medium'>{thread.otherProfile.displayName}</div>
          <div className='truncate text-xs text-slate-500'>{thread.latestMessage?.body ?? 'No messages yet'}</div>
        </button>)}
      </aside>
      <section className='rounded-xl border bg-white p-3'>
        <h2 className='mb-3 font-semibold'>{selectedThread?.otherProfile.displayName ?? 'Conversation'}</h2>
        <div className='space-y-2'>
          {messages.length === 0 ? <p className='text-sm text-slate-600'>No messages yet in this conversation.</p> : messages.map((message) => <div key={message.id} className='rounded border p-2'>
            <div className='text-xs text-slate-500'>{new Date(message.createdAt).toLocaleString()}</div>
            <div className='text-xs text-slate-500'>{message.senderProfileId === 'sp-student-1' ? 'You' : selectedThread?.otherProfile.displayName}</div>
            <div>{message.body}</div>
            <button aria-label='Report message' className='mt-1 rounded border px-2 py-1 text-xs' onClick={() => reportMessage(message.id)}>Report message</button>
          </div>)}
        </div>
        <div className='mt-4 flex flex-col gap-2 sm:flex-row'>
          <input aria-label='Message body' className='flex-1 rounded border px-3 py-2' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Write a message' maxLength={1000} />
          <button className='rounded bg-slate-900 px-3 py-2 text-white disabled:opacity-50' disabled={!body.trim()} onClick={send}>Send</button>
        </div>
        {error ? <p className='mt-2 text-sm text-red-600'>{error}</p> : null}
      </section>
    </div>}
  </PageShell>;
}
