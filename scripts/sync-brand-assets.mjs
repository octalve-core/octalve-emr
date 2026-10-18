import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';

// ONE-TIME setup only: import user-approved images, verify exact bytes, and commit them to EMR.
// Never called during pnpm dev or pnpm build; no runtime/build dependency on Finance.
// Stops the build when assets cannot be verified, rather than silently using an inaccurate brand.
const sourceCommit = "32d51b3ba0e238f0ffe29e7202cc242047242059";
const upstream = `https://raw.githubusercontent.com/octalve-core/octalve-invoice/${sourceCommit}/public/branding/`;
const assets = [
  ["octalve-invoice-icon.png","octalve-finance-icon.png", 80000, 110000, "209327186b2f8e2952d12fb7b7eec1486c18d97e"],
  ["octalve-wordmark.png","octalve-finance-wordmark.png", 130000, 160000, "924c1b7ee0141969bbb05c2055db192785e12b50"],
];
const output = join(process.cwd(),"public","branding");
await mkdir(output,{recursive:true});
for (const [upstreamName, localName,minSize,maxSize,expectedGitBlobSha] of assets) {
  const url = upstream + upstreamName;
  const r = await fetch(url,{signal:AbortSignal.timeout(15000),headers:{Accept:'image/png'}});
  if(!r.ok) throw Error(`Unable to obtain pinned brand asset ${upstreamName}: ${r.status}`);
  const bytes=Buffer.from(await r.arrayBuffer());
  if(bytes.length < minSize||bytes.length>maxSize||bytes.toString('hex',0,8)!=='89504e470d0a1a0a')
    throw Error(`Invalid pinned PNG asset: ${upstreamName}`);
  const actualGitBlobSha=createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if(actualGitBlobSha !== expectedGitBlobSha) throw Error(`Pinned source asset integrity mismatch: ${upstreamName}`);
  const target=join(output,localName);
  await writeFile(target,bytes);
  const stored=await readFile(target);
  if(!stored.equals(bytes)) throw Error(`Unable to validate written asset ${localName}`);
  console.log(`Verified temporary EMR brand ${localName} from ${sourceCommit.slice(0,12)}`);
}
