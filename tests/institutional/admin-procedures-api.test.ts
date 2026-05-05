import { beforeEach, describe, expect, it } from 'vitest';
import { seed } from '@/prisma/seed';
import { GET, PATCH, POST } from '@/app/api/institutional/procedures/route';

const cookie = (role: 'ADMIN'|'COORDINATOR'|'STUDENT') => `erasmusmate_demo_context=${encodeURIComponent(JSON.stringify({ role, userId: role === 'ADMIN' ? 'admin-1' : role === 'COORDINATOR' ? 'coordinator-1' : 'student-1' }))}`;

describe('Phase 6D admin procedures API', () => {
  beforeEach(async () => { await seed(); });

  it('admin can list procedure configuration', async () => {
    const res = await GET(new Request('http://localhost/api/institutional/procedures', { headers: { cookie: cookie('ADMIN') } }));
    expect(res.status).toBe(200);
    const payload = await res.json() as { data: Array<{ id: string }> };
    expect(payload.data.length).toBeGreaterThan(0);
  });

  it('admin can create and update procedure definition with file rules', async () => {
    const createRes = await POST(new Request('http://localhost/api/institutional/procedures', { method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie('ADMIN') }, body: JSON.stringify({ title: 'Visa copy', description: 'Upload visa copy', sortOrder: 9, isRequired: true, isActive: true, acceptedMimeTypes: ['application/pdf'], maxSizeBytes: 1048576 }) }));
    expect(createRes.status).toBe(201);
    const created = await createRes.json() as { data: { id: string } };

    const updateRes = await PATCH(new Request('http://localhost/api/institutional/procedures', { method: 'PATCH', headers: { 'content-type': 'application/json', cookie: cookie('ADMIN') }, body: JSON.stringify({ id: created.data.id, title: 'Visa document', description: 'Updated', sortOrder: 11, isRequired: false, isActive: false, acceptedMimeTypes: ['application/pdf', 'image/png'], maxSizeBytes: 2097152 }) }));
    expect(updateRes.status).toBe(200);
    const updated = await updateRes.json() as { data: { title: string; isActive: boolean; isRequired: boolean; sortOrder: number; maxSizeBytes: number; acceptedMimeTypesJson: string } };
    expect(updated.data.title).toBe('Visa document');
    expect(updated.data.isActive).toBe(false);
    expect(updated.data.isRequired).toBe(false);
    expect(updated.data.sortOrder).toBe(11);
    expect(updated.data.maxSizeBytes).toBe(2097152);
    expect(updated.data.acceptedMimeTypesJson).toContain('image/png');
  });

  it('coordinator and student cannot mutate procedure configuration', async () => {
    const body = JSON.stringify({ title: 'x', sortOrder: 1, isRequired: true, isActive: true, acceptedMimeTypes: ['application/pdf'], maxSizeBytes: 1024 });
    const c = await POST(new Request('http://localhost/api/institutional/procedures', { method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie('COORDINATOR') }, body }));
    const s = await POST(new Request('http://localhost/api/institutional/procedures', { method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie('STUDENT') }, body }));
    expect(c.status).toBe(403);
    expect(s.status).toBe(403);
  });

  it('rejects invalid MIME types and invalid max size', async () => {
    const badMime = await POST(new Request('http://localhost/api/institutional/procedures', { method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie('ADMIN') }, body: JSON.stringify({ title: 'x', sortOrder: 1, isRequired: true, isActive: true, acceptedMimeTypes: ['text/plain'], maxSizeBytes: 1024 }) }));
    expect(badMime.status).toBe(400);

    const badSize = await POST(new Request('http://localhost/api/institutional/procedures', { method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie('ADMIN') }, body: JSON.stringify({ title: 'x', sortOrder: 1, isRequired: true, isActive: true, acceptedMimeTypes: ['application/pdf'], maxSizeBytes: -1 }) }));
    expect(badSize.status).toBe(400);
  });

  it('deactivated procedure is hidden from non-admin list', async () => {
    await PATCH(new Request('http://localhost/api/institutional/procedures', { method: 'PATCH', headers: { 'content-type': 'application/json', cookie: cookie('ADMIN') }, body: JSON.stringify({ id: 'proc-1', isActive: false }) }));
    const studentRes = await GET(new Request('http://localhost/api/institutional/procedures', { headers: { cookie: cookie('STUDENT') } }));
    const payload = await studentRes.json() as { data: Array<{ id: string }> };
    expect(payload.data.find((d) => d.id === 'proc-1')).toBeUndefined();
  });
});
