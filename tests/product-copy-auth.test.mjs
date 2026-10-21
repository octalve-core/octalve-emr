import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');
const auth=read('src/components/auth/AuthPreview.tsx');
const brand=read('src/components/EmrBrand.tsx');
const shell=read('src/components/Shell.tsx');
const workspace=read('src/components/WorkspaceView.tsx');
const profile=read('src/components/StaffProfile.tsx');
const record=read('src/components/records/ClinicalRecordPage.tsx');
const more=read('src/components/EmrMore.tsx');
const browser=read('scripts/browser-walkthrough.mjs');
test('auth has one visible full product wordmark and concise left heading/paragraph',()=>{
 assert.equal((auth.match(/<EmrBrand\s*\/>/g)||[]).length,1);
 assert.equal((brand.match(/EMR_BRAND\.wordmarkUrl/g)||[]).length,1);
 assert.match(brand,/if\(compact\)/);
 assert.match(auth,/Manage care with/);
 assert.match(auth,/Patients, appointments and clinical work in one place/);
 assert.doesNotMatch(auth,/One organised patient journey|Simpler clinic operations|YOUR CLINICAL WORKSPACE|<HeartPulse/);
});
test('sign-in and registration stay disabled; no real patient or credential access',()=>{
 assert.match(auth,/Explore sample workspace/);
 assert.match(auth,/Account access is not yet available/);
 assert.match(auth,/Do not enter real patient information/);
 assert.match(auth,/onSubmit=\{e=>e\.preventDefault\(\)\}/);
 assert.ok((auth.match(/disabled\s*\/>/g)||[]).length>=2);
 assert.doesNotMatch(auth,/fetch\(|localStorage|sessionStorage/);
 const api=read('app/api/v1/patients/route.ts');
 assert.match(api,/503/);
 assert.match(api,/CLINICAL_BACKEND_NOT_ACTIVATED/);
});
test('all core modules use customer-facing copy instead of repeated developer banners',()=>{
 for(const copy of ['Your clinic at a glance.','Manage patient records and profiles.','Manage schedules, arrivals and check-ins.','Manage consultations and clinical notes.','Track diagnostic requests and results.','Activity and operational insights.','Manage facility information and preferences.'])assert.ok(workspace.includes(copy),copy);
 for(const source of [auth,shell,workspace,record,profile,more])for(const phrase of [
  'Demonstration only · All patients are fictional',
  'Illustrative monthly activity · not a clinical report',
  'Check-in and scheduling are in-memory demonstrations',
  'Draft and completed encounter examples. No real clinician signatures.',
  'Order placement is simulated; no results are clinically verified',
  'Clinical records are not stored securely',
  'Preview only. Secure account creation'
 ])assert.ok(!source.includes(phrase),phrase);
 assert.match(shell,/Sample workspace/);
 assert.match(record,/Sample record/);
});
test('continuous browser journey starts at entry and checks both auth screens at four widths',()=>{
 for(const phrase of ["responsive('Login')","responsive('Signup')","responsive('Dashboard')","responsive('Patient directory')","responsive('Checked-in appointment')","responsive('Staff profile')"])assert.ok(browser.includes(phrase),phrase);
 assert.match(browser,/Auth header must have a single product logo/);
 assert.match(browser,/\[320,390,768,1440\]/);
 assert.equal((browser.match(/await page\.goto\(/g)||[]).length,1);
});
