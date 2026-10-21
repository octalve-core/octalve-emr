"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState,type FormEvent} from "react";
import {ArrowLeft,CalendarClock,CheckCircle2,ClipboardList,FlaskConical,FileHeart,LockKeyhole,Save,UserRound,Wallet} from "lucide-react";
import {useDemo} from "@/src/components/DemoProvider";
import {doctors,type Patient,type LabRequest} from "@/src/lib/demo-data";
import {RecordActionMenu} from "./RecordActionMenu";

type Kind="patients"|"appointments"|"encounters"|"laboratory"|"billing";
const backLabel:Record<Kind,string>={patients:"Patients",appointments:"Appointments",encounters:"Clinical encounters",laboratory:"Laboratory",billing:"Clinic billing"};
const icon:Record<Kind,typeof UserRound>={patients:UserRound,appointments:CalendarClock,encounters:ClipboardList,laboratory:FlaskConical,billing:Wallet};
const displayDate=(date:string)=>date?new Date(date+"T12:00:00").toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"numeric"}):"—";
export function ClinicalRecordPage({kind,id,edit=false}:{kind:Kind;id:string;edit?:boolean}){
 const {patients,appointments,encounters,labs,charges,updatePatient,rescheduleAppointment,updateAppointment,updateEncounterDraft,updateLabRequest}=useDemo();
 const router=useRouter();const [feedback,setFeedback]=useState("");
 const [confirmCancel,setConfirmCancel]=useState(false);
 const [confirmCheckIn,setConfirmCheckIn]=useState(false);
 const Icon=icon[kind];
 const patient=patients.find(p=>p.id===id),appointment=appointments.find(a=>a.id===id),encounter=encounters.find(e=>e.id===id),lab=labs.find(l=>l.id===id),charge=charges.find(c=>c.id===id);
 const record=kind==="patients"?patient:kind==="appointments"?appointment:kind==="encounters"?encounter:kind==="laboratory"?lab:charge;
 const linkedId=kind==="patients"?id:kind==="appointments"?appointment?.patientId:kind==="encounters"?encounter?.patientId:kind==="laboratory"?lab?.patientId:charge?.patientId;
 const linked=patients.find(p=>p.id===linkedId);
 const href=`/dashboard/${kind}/${id}`;
 const eligible=kind==="patients"?Boolean(patient):kind==="appointments"?appointment?.status==="Confirmed":kind==="encounters"?encounter?.status==="In progress":kind==="laboratory"?lab?.status==="Pending":false;
 const name=linked?.name||"Patient unavailable";
 const canCheckIn=kind==="appointments"&&appointment?.status==="Confirmed";
 function checkInDemo(){
  if(!canCheckIn){setFeedback("This appointment cannot be checked in.");setConfirmCheckIn(false);return}
  updateAppointment(id,"Checked in");
  setConfirmCheckIn(false);
  setFeedback("Appointment checked in for this sample session.");
 }
 const title=kind==="patients"?patient?.name:kind==="appointments"?`Appointment ${id}`:kind==="encounters"?`Encounter ${id}`:kind==="laboratory"?`Request ${id}`:`Charge ${id}`;
 function save(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!eligible)return;const d=new FormData(e.currentTarget);const val=(key:string)=>String(d.get(key)||"").trim();
  if(kind==="patients"&&patient){const age=Number(val("age"));if(!val("name")||!Number.isInteger(age)||age<0||age>130){setFeedback("Enter a valid name and age.");return}updatePatient(id,{name:val("name"),age,phone:val("phone"),email:val("email"),city:val("city"),department:val("department") as Patient["department"]});}
  else if(kind==="appointments"){const result=rescheduleAppointment(id,{date:val("date"),time:val("time"),reason:val("reason")});if(!result.ok){setFeedback(result.error||"Cannot update this appointment");return}}
  else if(kind==="encounters"){if(!updateEncounterDraft(id,val("soap"),val("reason"))){setFeedback("Only an unsigned, in-progress draft can be edited.");return}}
  else if(kind==="laboratory"){if(!updateLabRequest(id,val("test"),val("priority") as LabRequest["priority"])){setFeedback("Only pending requests can be revised.");return}}
  router.push(href);
 }
 if(!record)return <section className="emr-surface p-8"><h1 className="text-xl font-medium">Record unavailable</h1><p className="mt-2 text-sm text-[#7b8fa3]">This record is unavailable in the current session.</p><Link className="emr-secondary mt-5" href={`/dashboard/${kind}`}>Back to {backLabel[kind]}</Link></section>;
 const facts: [string,string][] =kind==="patients"&&patient?[["Patient ID",patient.mrn],["Department",patient.department],["Age",`${patient.age} years`],["Sex",patient.sex],["Phone",patient.phone],["Email",patient.email||"—"],["City",patient.city||"—"],["Last visit",patient.lastVisit]]:
 kind==="appointments"&&appointment?[["Patient",name],["Date",displayDate(appointment.date)],["Time",appointment.time],["Clinician",doctors.find(d=>d.id===appointment.practitionerId)?.name||"—"],["Department",appointment.department],["Reason",appointment.reason],["Status",appointment.status]]:
 kind==="encounters"&&encounter?[["Patient",name],["Date",displayDate(encounter.date)],["Clinician",encounter.clinician],["Reason",encounter.reason],["Department",encounter.department],["Status",encounter.status]]:
 kind==="laboratory"&&lab?[["Patient",name],["Investigation",lab.test],["Ordered by",lab.orderedBy],["Date",displayDate(lab.date)],["Priority",lab.priority],["Status",lab.status]]:
 kind==="billing"&&charge?[["Patient",name],["Service",charge.service],["Date",displayDate(charge.date)],["Amount",`₦${charge.amount.toLocaleString("en-NG")}`],["Status",charge.status]]:[];
 const actions=[{label:"View record",href},{label:"Patient profile",href:`/dashboard/patients/${linkedId}`},...(eligible?[{label:"Edit record",href:`${href}/edit`}]:[]),...(kind==="appointments"&&appointment?.status==="Confirmed"?[{label:"Check in",onClick:()=>setConfirmCheckIn(true)},{label:"Cancel appointment",danger:true,onClick:()=>setConfirmCancel(true)}]:[])];
 return <div className="space-y-5"><Link href={`/dashboard/${kind}`} className="inline-flex min-h-10 items-center gap-2 text-xs font-medium text-[#0064E0]"><ArrowLeft size={17}/>Back to {backLabel[kind]}</Link>
  <header className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="emr-soft-icon"><Icon size={22}/></span><div><h1 className="text-[23px] font-medium tracking-tight text-[#183553] sm:text-[28px]">{edit?`Edit ${backLabel[kind].toLowerCase().replace(/s$/,'')}`:title}</h1><p className="mt-1 text-xs text-[#8094aa]">{kind==="patients"?patient?.mrn:name} · Sample record</p></div></div>{!edit?<div className="flex flex-wrap items-center gap-2">
   {canCheckIn?<button type="button" onClick={()=>setConfirmCheckIn(true)} className="emr-primary" aria-label="Check in appointment"><CheckCircle2 size={17}/>Check in</button>:null}
   {kind==="appointments"&&appointment?.status==="Checked in"?<span role="status" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#B9EAD2] bg-[#ECFAF2] px-3 text-xs font-medium text-[#16764B]"><CheckCircle2 size={17}/>Checked in</span>:null}
   <RecordActionMenu title={String(title)} items={actions}/>
  </div>:null}</header>
  {confirmCheckIn?<div className="emr-dialog-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setConfirmCheckIn(false)}}>
    <section role="dialog" aria-modal="true" aria-label="Confirm appointment check-in" className="emr-dialog" onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();setConfirmCheckIn(false)}}}>
     <span className="emr-soft-icon green"><CheckCircle2 size={22}/></span>
     <h2 className="mt-4 text-lg font-medium text-[#24415e]">Check in this appointment?</h2>
     <p className="mt-2 text-xs leading-6 text-[#71879d]">Confirm the appointment for <strong>{name}</strong>. Confirm the appointment details below before continuing.</p>
     <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#F6F8FA] p-4 text-xs">
      <div><dt className="text-[#8294A7]">Date</dt><dd className="mt-1 font-medium text-[#23415E]">{displayDate(appointment?.date||"")}</dd></div>
      <div><dt className="text-[#8294A7]">Time</dt><dd className="mt-1 font-medium text-[#23415E]">{appointment?.time||"—"}</dd></div>
      <div className="col-span-2"><dt className="text-[#8294A7]">Clinician</dt><dd className="mt-1 font-medium text-[#23415E]">{doctors.find(d=>d.id===appointment?.practitionerId)?.name||"—"}</dd></div>
     </dl>
     <p className="mt-4 rounded-xl bg-[#EFF7FF] p-3 text-xs leading-5 text-[#426E98]">Sample check-in only. No patient arrival, notification or encounter is recorded.</p>
     <div className="mt-5 flex flex-wrap gap-2"><button type="button" className="emr-secondary" onClick={()=>setConfirmCheckIn(false)}>Go back</button><button type="button" autoFocus className="emr-primary" onClick={checkInDemo} disabled={!canCheckIn}><CheckCircle2 size={16}/>Confirm check-in</button></div>
    </section>
   </div>:null}
  {confirmCancel?<div className="emr-dialog-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setConfirmCancel(false)}}><form role="dialog" aria-modal="true" aria-label="Cancel appointment" className="emr-dialog" onSubmit={e=>{e.preventDefault();updateAppointment(id,"Cancelled");setFeedback("Appointment cancelled for this sample session.");setConfirmCancel(false)}}><h2 className="text-lg font-medium text-[#24415e]">Cancel appointment</h2><p className="mt-2 text-xs leading-5 text-[#71879d]">Enter a reason for cancelling this appointment.</p><label className="emr-label mt-5">Reason<textarea name="reason" required minLength={5} maxLength={400} className="emr-area mt-2" placeholder="Enter cancellation reason"/></label><div className="mt-5 flex flex-wrap gap-2"><button className="emr-secondary" type="button" onClick={()=>setConfirmCancel(false)}>Keep appointment</button><button className="emr-primary !bg-[#C93C4A]" type="submit">Confirm cancellation</button></div></form></div>:null}
  {feedback?<p role="status" className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">{feedback}</p>:null}
  
  {edit?<section className="emr-surface p-5 sm:p-7">{eligible?<form onSubmit={save} className="grid max-w-[790px] gap-5"><h2 className="text-sm font-medium text-[#254461]">Edit allowed fields</h2>
  {kind==="patients"&&patient?<><label className="emr-label">Full name<input className="emr-input mt-1" name="name" required defaultValue={patient.name}/></label><div className="grid grid-cols-2 gap-3"><label className="emr-label">Age<input className="emr-input mt-1" name="age" type="number" min={0} max={130} defaultValue={patient.age} required/></label><label className="emr-label">Department<select className="emr-input mt-1" name="department" defaultValue={patient.department}>{["General","Dentistry","Ophthalmology"].map(x=><option key={x}>{x}</option>)}</select></label></div>{[["phone","Phone"],["email","Email"],["city","City"]].map(([key,label])=><label key={key} className="emr-label">{label}<input className="emr-input mt-1" name={key} defaultValue={String(patient[key as "phone"|"email"|"city"]||"")}/></label>)}</>:null}
  {kind==="appointments"&&appointment?<><label className="emr-label">Visit date<input type="date" className="emr-input mt-1" name="date" defaultValue={appointment.date} required/></label><label className="emr-label">Time<input type="time" className="emr-input mt-1" name="time" defaultValue={appointment.time} required/></label><label className="emr-label">Reason<input name="reason" defaultValue={appointment.reason} className="emr-input mt-1" required/></label><p className="text-xs text-[#8A6C39]">Appointment availability must be confirmed by staff when live scheduling is enabled.</p></>:null}
  {kind==="encounters"&&encounter?<><label className="emr-label">Reason<input name="reason" className="emr-input mt-1" required defaultValue={encounter.reason}/></label><label className="emr-label">Unsigned draft content<textarea className="emr-area mt-1" name="soap" rows={9} required defaultValue={encounter.soap||""}/></label><p className="text-xs text-[#8A6C39]">Only unsigned drafts are editable. Completed notes are read-only.</p></>:null}
  {kind==="laboratory"&&lab?<><label className="emr-label">Investigation<input className="emr-input mt-1" name="test" required defaultValue={lab.test}/></label><label className="emr-label">Priority<select className="emr-input mt-1" name="priority" defaultValue={lab.priority}><option>Routine</option><option>Urgent</option></select></label><p className="text-xs text-[#8A6C39]">Only pending requests are editable. Result approval is unavailable.</p></>:null}
 <div className="flex flex-wrap gap-3 border-t border-[#edf0f5] pt-5"><button type="submit" className="emr-primary"><Save size={16}/>Save changes</button><Link className="emr-secondary" href={href}>Cancel</Link></div></form>:<div className="space-y-3"><LockKeyhole className="text-[#b96a31]"/><h2 className="text-base font-medium">Editing is not permitted</h2><p className="text-sm text-[#8395a8]">This record is not eligible for editing.</p><Link className="emr-secondary" href={href}>View record</Link></div>}</section>:
  <div className="grid gap-5 lg:grid-cols-[1.5fr_.85fr]"><section className="emr-surface p-5 sm:p-6"><h2 className="mb-5 text-sm font-medium">Record details</h2><dl className="grid gap-3 sm:grid-cols-2">{facts.map(([label,value])=><div key={label} className="rounded-xl bg-[#F7F8FA] p-4"><dt className="text-[11px] text-[#8596a9]">{label}</dt><dd className="mt-1 break-words text-[13px] font-medium text-[#27425f]">{value||"—"}</dd></div>)}</dl>{encounter?.soap&&kind==="encounters"?<div className="mt-4 rounded-xl border border-[#edf1f6] p-4"><p className="text-xs font-medium">Clinical note</p><p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-[#61768c]">{encounter.soap}</p></div>:null}</section><aside className="emr-surface p-5 sm:p-6"><h2 className="text-sm font-medium">Patient & workflow</h2><div className="mt-4 flex items-center gap-3"><span className="emr-soft-icon"><UserRound size={18}/></span><div><p className="text-xs font-medium">{name}</p><p className="text-[11px] text-[#8c9cae]">{linked?.mrn||"Sample record"}</p></div></div><Link href={`/dashboard/patients/${linkedId}`} className="emr-secondary mt-4 w-full"><FileHeart size={16}/>Open patient profile</Link><div className="mt-4 border-t border-[#edf1f5] pt-4 text-xs leading-relaxed text-[#7e90a5]">Clinical approvals, payments and notifications are unavailable.</div>{eligible?<Link href={`${href}/edit`} className="emr-primary mt-4 w-full"><Save size={16}/>Edit eligible record</Link>:<div className="mt-4 flex gap-2 rounded-lg bg-[#f8f5ee] p-3 text-xs text-[#987947]"><LockKeyhole size={17}/>Protected from editing</div>}</aside></div>}
 </div>;
}
