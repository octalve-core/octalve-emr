import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const workspace=readFileSync('src/components/WorkspaceView.tsx','utf8');
const mobileCard=readFileSync('src/components/records/MobileRecordCard.tsx','utf8');
const css=readFileSync('app/globals.css','utf8');

test('every EMR record table has a distinct mobile card list instead of horizontal scrolling',()=>{
  assert.equal((workspace.match(/hidden min-w-0 overflow-x-auto px-3 pb-3 lg:block/g)||[]).length,6);
  assert.equal((workspace.match(/grid min-w-0 gap-2 px-3 pb-4 lg:hidden/g)||[]).length,6);
  for(const collection of ['scheduled.slice(0,5)','results','appointmentResults','encounters','labs','charges']){
    assert.match(workspace,new RegExp(collection.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\.map\\('));
  }
  assert.equal((workspace.match(/MobileRecordCard key=/g)||[]).length,6);
});

test('mobile cards preserve clinical identifiers, statuses and important record facts',()=>{
  for(const prop of ['title','reference','status','facts','icon','action'])assert.match(mobileCard,new RegExp('\\b'+prop+'\\b'));
  assert.match(mobileCard,/<article/);
  assert.match(mobileCard,/<dl /);
  assert.match(mobileCard,/break-words/);
  assert.match(workspace,/action=\{patientAction\(p\)\}/);
  assert.match(workspace,/action=\{a\.status==="Confirmed"\?/);
});

test('desktop table rows receive the approved separated low-shadow visual treatment',()=>{
  assert.match(css,/\.emr-table\{border-collapse:separate/);
  assert.match(css,/\.emr-table tbody tr:hover \.emr-td/);
  assert.match(css,/\.emr-mobile-record\{/);
  assert.doesNotMatch(mobileCard,/MerchantPreviewProvider|octalve-invoice|fetch\(|https?:\/\//);
});
