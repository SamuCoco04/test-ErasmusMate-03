import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'storage', 'uploads', 'institutional');

export async function saveInstitutionalUpload(buffer: Buffer, originalName: string) {
  const safe = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}-${safe}`;
  const fullPath = path.join(ROOT, key);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, buffer);
  return { storageKey: key };
}

export async function readInstitutionalUpload(storageKey: string) {
  if (path.isAbsolute(storageKey) || storageKey.includes('..')) {
    throw new Error('Invalid storage key');
  }
  const fullPath = path.resolve(ROOT, storageKey);
  if (!fullPath.startsWith(ROOT + path.sep) && fullPath !== ROOT) {
    throw new Error('Invalid storage key');
  }
  return readFile(fullPath);
}
