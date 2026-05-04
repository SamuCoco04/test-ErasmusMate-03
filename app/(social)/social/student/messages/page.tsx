'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

  if (threads.length === 0) return <div className='rounded-xl border bg-white p-6'>No accepted connections yet. Accept a connection to start messaging.</div>;

  return <div className='grid gap-4 md:grid-cols-[280px_1fr]'>
    <aside className='rounded-xl border bg-white p-3'>
      <h1 className='mb-3 text-lg font-semibold'>Messages</h1>
      {threads.map((thread) => <button key={thread.connectionId} onClick={() => setSelected(thread.connectionId)} className='mb-2 w-full rounded border p-2 text-left'>
        <div className='font-medium'>{thread.otherProfile.displayName}</div>
        <div className='text-xs text-slate-500'>{thread.latestMessage?.body ?? 'No messages yet'}</div>
      </button>)}
    </aside>
    <section className='rounded-xl border bg-white p-3'>
      <h2 className='mb-3 font-semibold'>{selectedThread?.otherProfile.displayName}</h2>
      <div className='space-y-2'>
        {messages.map((message) => <div key={message.id} className='rounded border p-2'>
          <div className='text-xs text-slate-500'>{new Date(message.createdAt).toLocaleString()}</div>
          <div className='text-xs text-slate-500'>{message.senderProfileId === 'sp-student-1' ? 'You' : selectedThread?.otherProfile.displayName}</div>
          <div>{message.body}</div>
        </div>)}
      </div>
      <div className='mt-4 flex gap-2'>
        <input className='flex-1 rounded border px-3 py-2' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Write a message' maxLength={1000} />
        <button className='rounded bg-slate-900 px-3 py-2 text-white disabled:opacity-50' disabled={!body.trim()} onClick={send}>Send</button>
      </div>
      {error ? <p className='mt-2 text-sm text-red-600'>{error}</p> : null}
    </section>
  </div>;
}
