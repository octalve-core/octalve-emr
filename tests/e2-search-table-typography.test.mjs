import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=file=>readFileSync(file,'utf8');
const shell=read('src/components/Shell.tsx');
const search=read('src/components/GlobalSearch.tsx');
const view=read('src/components/WorkspaceView.tsx');
const style=read('app/globals.css');
const browser=read('scripts/browser-walkthrough.mjs');
test('patient and clinical record search is a real, local input with clickable record links',()=>{
 assert.ok(shell.includes('<GlobalSearch/>'));
 assert.match(search,/aria-label="Search clinic records"/);
 assert.match(search,/onChange=\{e=>\{setQuery/);
 for(const name of ['patients','appointments','encounters','laboratory','billing'])assert.ok(search.includes('/dashboard/'+name+'/'));
 assert.match(search,/onClick=\{close\}/);
 assert.doesNotMatch(search,/fetch\(|localStorage|sessionStorage|axios|window\.location/);
});
test('desktop lists separate status from actions in their own aligned cells',()=>{
 for(const field of ['laboratory','billing','encounters'])assert.ok(view.includes('recordAction("'+field+'"'),field);
 assert.ok((view.match(/"Status","Actions"/g)||[]).length>=3);
 assert.equal((view.match(/className="emr-td emr-actions-cell"/g)||[]).length,3);
 assert.match(style,/\.emr-actions-cell/);
 assert.match(style,/\.emr-money/);
 assert.match(style,/\.emr-th:last-child/);
});
test('matches official Holding font and preferred medium weight',()=>{
 assert.match(style,/font-family:Arial,Helvetica,sans-serif/);
 assert.match(style,/font-weight:500/);
 assert.doesNotMatch(shell,/font-bold|font-extrabold|font-semibold/);
 assert.doesNotMatch(view,/font-bold|font-extrabold|font-semibold/);
});
test('single browser journey tests actual search from header without URL jumps',()=>{
 assert.match(browser,/Open patient from global search/);
 assert.match(browser,/Open laboratory result from mobile search/);
 assert.equal((browser.match(/await page\.goto\(/g)||[]).length,1);
 for(const width of ['320','390','768','1440'])assert.ok(browser.includes(width),width);
});
