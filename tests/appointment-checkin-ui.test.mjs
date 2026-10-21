import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');
const detail=read('src/components/records/ClinicalRecordPage.tsx');
const list=read('src/components/WorkspaceView.tsx');
const provider=read('src/components/DemoProvider.tsx');
const browser=read('scripts/browser-walkthrough.mjs');
test('a confirmed appointment visibly offers a record-level check-in action',()=>{
 assert.match(detail,/const canCheckIn=kind==="appointments"&&appointment\?\.status==="Confirmed"/);
 assert.match(detail,/aria-label="Check in appointment"/);
 assert.match(detail,/<CheckCircle2 size=\{17\}\/>Check in/);
 assert.match(list,/section==="appointments"&&editable\?"Review check-in":"View"/);
});
test('check-in requires a quick labelled confirmation with patient, date, time and clinician',()=>{
 assert.match(detail,/role="dialog" aria-modal="true" aria-label="Confirm appointment check-in"/);
 assert.match(detail,/Confirm check-in/);
 assert.match(detail,/Confirm the appointment for <strong>\{name\}/);
 assert.match(detail,/displayDate\(appointment\?\.date\|\|""\)/);
 assert.match(detail,/appointment\?\.time\|\|"—"/);
 assert.match(detail,/appointment\?\.practitionerId/);
});
test('checked-in appointments do not invite duplicate check-in or imply medical authority',()=>{
 assert.match(detail,/if\(!canCheckIn\)/);
 assert.match(detail,/updateAppointment\(id,"Checked in"\)/);
 assert.match(detail,/appointment\?\.status==="Checked in"/);
 assert.match(detail,/Checked in/);
 assert.match(detail,/Sample check-in only\. No patient arrival/);
 assert.doesNotMatch(detail,/fetch\(|localStorage|sessionStorage/);
 assert.match(provider,/useState\(initialAppointments\)/);
 const api=read('app/api/v1/appointments/route.ts');
 assert.match(api,/503/);
 assert.match(api,/CLINICAL_BACKEND_NOT_ACTIVATED/);
});
test('one continuous browser walkthrough tests the visible check-in and four viewport widths',()=>{
 assert.match(browser,/Open confirmed appointment for check-in/);
 assert.match(browser,/Open visible check-in confirmation/);
 assert.match(browser,/Confirm sample check-in/);
 assert.match(browser,/Checked-in appointment/);
 assert.match(browser,/\[320,390,768,1440\]/);
 const executable=browser.split('\n').filter(line=>!line.trim().startsWith('*')&&!line.trim().startsWith('/**')).join('\n');
 assert.equal((executable.match(/page\.goto\(/g)||[]).length,1);
});
