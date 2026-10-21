/**
 * EMR complete browser walkthrough. No fetch, API request, database call, direct deep route,
 * localStorage/state override or programmatic application shortcut. All transitions are clicks.
 * The ONLY starting navigation is the application's homepage (/).
 */
import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {chromium} from '/tmp/emr-browser/node_modules/playwright/index.mjs';
const base=process.env.EMR_BROWSER_URL||'http://127.0.0.1:3000/';
const out=process.env.EMR_BROWSER_OUTPUT||'browser-evidence';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,recordVideo:{dir:out,size:{width:390,height:844}},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[],steps=[];
page.on('pageerror',e=>errors.push(e.message));
const pause=async(label)=>{steps.push(label);await page.waitForTimeout(280)};
const go=async(label,locator)=>{await locator.click({timeout:9000});await pause(label)};
const bottom=(name)=>page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name,exact:true});
const responsive=async(label)=>{
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:844});
  await page.waitForTimeout(180);
  const dimensions=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
  if(dimensions.document>dimensions.viewport+3)errors.push(label+' '+width+'px overflow: '+JSON.stringify(dimensions));
  await page.screenshot({path:out+'/'+label.toLowerCase().replaceAll(' ','-')+'-'+width+'.png',fullPage:true});
  steps.push(label+' responsive '+width+'px');
 }
 await page.setViewportSize({width:390,height:844});
};
const more=async(name)=>{await go('Open More',bottom('More'));await go('More → '+name,page.getByRole('main').getByRole('link',{name:new RegExp('^'+name+'\\b')}).first())};
let result='failed';
try{
 await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000}); await pause('Open EMR from root address');
 await go('Enter sample workspace',page.getByRole('link',{name:/Explore sample workspace/i}));
 await responsive('Dashboard');
 await go('Open patient directory',bottom('Patients'));
 await responsive('Patient directory');
 await go('Open first patient actions',page.getByRole('button',{name:'Actions for Amara Eze'}).first());
 await go('Open patient edit inner page',page.getByRole('link',{name:/Edit eligible details/}).first());
 await page.getByLabel('Full name').fill('Amara Example'); await pause('Type fictional patient edit');
 await go('Save patient edit',page.getByRole('button',{name:/Save changes/}));
 await go('Return to patient directory',page.getByRole('link',{name:/Back to patients/i}));
 await go('Open visit list',bottom('Visits'));
 await go('Open encounter record',page.getByRole('main').getByRole('link',{name:'View'}).first());
 await go('Return to encounters',page.getByRole('link',{name:/Back to Clinical encounters/}));
 await more('Appointments');
 await go('Open confirmed appointment for check-in',page.getByRole('main').getByRole('link',{name:'Review check-in'}).first());
 await go('Open appointment reschedule form',page.getByRole('link',{name:/Edit eligible record/}));
 await page.getByRole('textbox',{name:'Reason'}).fill('Routine eye review — follow-up'); await pause('Type a fictional appointment reason');
 await go('Save appointment',page.getByRole('button',{name:/Save changes/}));
 await go('Open visible check-in confirmation',page.getByRole('button',{name:'Check in appointment'}));
 await page.getByRole('dialog',{name:'Confirm appointment check-in'}).waitFor();
 await go('Confirm sample check-in',page.getByRole('button',{name:'Confirm check-in'}));
 await page.getByText('Checked in',{exact:true}).waitFor();
 if(await page.getByRole('button',{name:'Check in appointment'}).count())throw new Error('Checked-in appointment still offers check-in');
 await responsive('Checked-in appointment');
 await go('Return to appointments',page.getByRole('link',{name:/Back to Appointments/}));
 await more('Laboratory');
 await go('Inspect laboratory record',page.getByRole('main').getByRole('link',{name:'View'}).first());
 await go('Return to laboratory',page.getByRole('link',{name:/Back to Laboratory/}));
 await more('Eye care');
 await more('Dental care');
 await more('Billing');
 await go('Open charge details',page.getByRole('main').getByRole('link',{name:'View'}).first());
 await go('Return to billing',page.getByRole('link',{name:/Back to Clinic billing/}));
 await more('Reports');
 await more('Clinic settings');
 await go('Open staff profile',bottom('Me'));
 await responsive('Staff profile');
 await go('Open sign-in from profile',page.getByRole('link',{name:/Open sign-in/}));
 await pause('Walkthrough complete');
 const width=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));if(width.document>width.viewport+3)errors.push(`Page overflow: ${JSON.stringify(width)}`);
 if(errors.length)throw new Error('Browser errors: '+errors.join('; '));result='passed';
}catch(e){steps.push('FAILED: '+String(e));await page.screenshot({path:out+'/failure.png',fullPage:true}).catch(()=>{});throw e;
}finally{
 await writeFile(out+'/walkthrough-results.json',JSON.stringify({result,steps,errors},null,2));
 const video=page.video();await context.close();if(video){const path=await video.path();await copyFile(path,out+'/octalve-emr-continuous-walkthrough.webm')};await browser.close();
}
