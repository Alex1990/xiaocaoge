import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const staticDir = path.join(root, 'static');
const publicDir = path.join(root, 'public');

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

if (await exists(staticDir)) {
  await cp(staticDir, publicDir, { recursive: true, force: true });
}
