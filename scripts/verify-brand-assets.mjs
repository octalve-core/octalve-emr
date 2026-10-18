import {readFile,stat} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';

// Verify locally committed brand files. Never fetch anything during dev or build.
const checks = [
  ['octalve-finance-icon.png','209327186b2f8e2952d12fb7b7eec1486c18d97e'],
  ['octalve-finance-wordmark.png','924c1b7ee0141969bbb05c2055db192785e12b50'],
];
for (const [name,expected] of checks) {
  const path=join(process.cwd(),'public','branding',name);
  let bytes;
  try {bytes=await readFile(path);} catch {throw new Error(`Missing local brand asset: ${name}. Run pnpm brand:import-once and COMMIT the image to the EMR repository before building.`);}
  if(bytes.toString('hex',0,8)!=='89504e470d0a1a0a') throw new Error(`Invalid PNG: ${name}`);
  const sha=createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if(sha!==expected) throw new Error(`Brand integrity mismatch: ${name}`);
  const info=await stat(path);
  if(!info.isFile())throw new Error(`Brand path is not a file: ${name}`);
  console.log(`EMR local brand verified: ${name}`);
}
