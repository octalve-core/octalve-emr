import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');
const shell=read('src/components/Shell.tsx');
const workspace=read('src/components/WorkspaceView.tsx');
const walkthrough=read('scripts/browser-walkthrough.mjs');
test('header exposes a functional search for sample clinic records',()=>{
 assert.match(shell,/<GlobalSearch\\/>/);
 const search=read('src/components/GlobalSearch.tsx');
 assert.match(search,/role="search"/);
 assert.match(search,/aria-label="Search clinic records"/);
 for(const section of ['patients','appointments','encounters','laboratory','billing'])assert.ok(search.includes('/dashboard/'+section+'/'),section);
 assert.match(search,/role="region" aria-label="Search results"/);
});
test('preview-only header has no dead notification button or redundant mobile profile menu',()=>{
 assert.doesNotMatch(shell,/aria-label="Notifications are a preview"/);
 assert.match(shell,/Sample workspace/);
 assert.match(shell,/className="relative hidden lg:block"/);
 assert.match(shell,/\["Me","\/dashboard\/profile"/);
 assert.match(shell,/aria-current=\{isActive\(pathname,href\)\?"page":undefined\}/);
});
test('account menu supports Escape, outside click and labelled navigation',()=>{
 assert.match(shell,/event.key==="Escape"/);
 assert.match(shell,/accountButtonRef.current\?\.focus\(\)/);
 assert.match(shell,/addEventListener\("pointerdown",onOutside\)/);
 assert.match(shell,/aria-label="Account options"/);
 assert.match(shell,/aria-expanded=\{showUser\}/);
});
test('continuous browser journey captures dashboard, patient directory and staff profile at four widths',()=>{
 assert.match(walkthrough,/\[320,390,768,1440\]/);
 for(const area of ['Dashboard','Patient directory','Staff profile'])assert.ok(walkthrough.includes("responsive('"+area+"')"),area);
 assert.match(walkthrough,/document\.documentElement\.scrollWidth/);
 assert.match(walkthrough,/page\.screenshot/);
 assert.match(walkthrough,/await page\.goto\(base/);
 const executable=walkthrough.split('\n').filter(line=>!line.trim().startsWith('*')&&!line.trim().startsWith('/**')).join('\n');
 assert.equal((executable.match(/page\.goto\(/g)||[]).length,1,'Only the entry route may be directly opened');
 assert.doesNotMatch(executable,/localStorage|\.request\.(?:get|post|put)|page\.goto\(.*dashboard/);
});
