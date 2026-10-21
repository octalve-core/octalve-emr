"use client";
import Link from "next/link";
import {useMemo,useRef,useState} from "react";
import {Search,X} from "lucide-react";
import {useDemo} from "./DemoProvider";

export function GlobalSearch(){
 const {patients,appointments,encounters,labs,charges}=useDemo();
 const [query,setQuery]=useState("");
 const [open,setOpen]=useState(false);
 const [mobile,setMobile]=useState(false);
 const input=useRef<HTMLInputElement>(null);
 const term=query.trim().toLocaleLowerCase();
 const matches=useMemo(()=>{
  if(term.length<2)return [];
  const name=(id:string)=>patients.find(p=>p.id===id)?.name||"Patient";
  const includes=(...values:string[])=>values.some(v=>v.toLocaleLowerCase().includes(term));
  return [
   ...patients.filter(p=>includes(p.name,p.mrn,p.phone,p.department)).map(p=>({key:"p"+p.id,label:p.name,detail:p.mrn,href:"/dashboard/patients/"+p.id})),
   ...appointments.filter(a=>includes(a.id,name(a.patientId),a.reason,a.department,a.status)).map(a=>({key:"a"+a.id,label:name(a.patientId),detail:"Appointment · "+a.reason,href:"/dashboard/appointments/"+a.id})),
   ...encounters.filter(e=>includes(e.id,name(e.patientId),e.reason,e.clinician)).map(e=>({key:"e"+e.id,label:name(e.patientId),detail:"Encounter · "+e.reason,href:"/dashboard/encounters/"+e.id})),
   ...labs.filter(l=>includes(l.id,name(l.patientId),l.test)).map(l=>({key:"l"+l.id,label:l.test,detail:name(l.patientId)+" · "+l.id,href:"/dashboard/laboratory/"+l.id})),
   ...charges.filter(c=>includes(c.id,name(c.patientId),c.service)).map(c=>({key:"c"+c.id,label:c.service,detail:name(c.patientId)+" · "+c.id,href:"/dashboard/billing/"+c.id}))
  ].slice(0,8);
 },[term,patients,appointments,encounters,labs,charges]);
 const close=()=>{setOpen(false);setMobile(false)};
 return <div className="relative w-fit lg:w-[355px]" onKeyDown={event=>{if(event.key==="Escape"){close();input.current?.blur()}}}>
  <button type="button" aria-label="Open clinic search" aria-expanded={mobile} className="flex min-h-10 items-center gap-2 rounded-xl border border-[#E3EAF3] bg-[#F7F9FC] px-3 text-xs lg:hidden" onClick={()=>{setMobile(x=>!x);setOpen(true);setTimeout(()=>input.current?.focus(),0)}}><Search size={16}/>Search</button>
  <div className={mobile?"absolute left-0 top-12 z-50 w-[min(86vw,350px)] lg:relative lg:top-auto lg:w-full":"hidden lg:relative lg:block"}>
   <div role="search" aria-label="Search clinic records" className="flex h-11 items-center gap-2 rounded-xl border border-[#DFE8F2] bg-[#F7F9FC] px-3 focus-within:border-[#0064E0]">
    <Search size={16} className="shrink-0 text-[#8799AE]"/>
    <input ref={input} id="emr-global-search" type="search" autoComplete="off" aria-label="Search clinic records" placeholder="Search patients, visits, records" className="w-full min-w-0 flex-1 bg-transparent text-xs outline-none" value={query} onFocus={()=>setOpen(true)} onChange={e=>{setQuery(e.target.value);setOpen(true)}}/>
    {query?<button type="button" aria-label="Clear search" onClick={()=>{setQuery("");input.current?.focus()}}><X size={15}/></button>:null}
   </div>
   {open&&term.length>=2?<div role="region" aria-label="Search results" className="absolute left-0 right-0 top-[calc(100%+7px)] z-50 max-h-[65dvh] overflow-auto rounded-xl border border-[#E7EDF5] bg-white p-2 shadow-xl">
    <p className="px-2 py-2 text-[11px] text-[#748BA3]">{matches.length?"Matching records":"No matching records"}</p>
    {matches.map(r=><Link key={r.key} href={r.href} onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-[#F0F6FE] focus-visible:outline-2 focus-visible:outline-[#0064E0]"><span className="block text-xs font-medium text-[#1F3B59]">{r.label}</span><span className="mt-1 block text-[11px] text-[#8094AB]">{r.detail}</span></Link>)}
   </div>:null}
  </div>
 </div>;
}
