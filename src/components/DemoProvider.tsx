"use client";
import {createContext,useContext,useMemo,useState,type ReactNode} from "react";
import {initialPatients,initialAppointments,initialEncounters,initialLabs,initialCharges,type Patient,type Appointment,type Encounter,type LabRequest,type Charge} from "@/src/lib/demo-data";
import {formatMrn,hasSlotConflict} from "@/src/lib/domain.mjs";
type PatientInput=Pick<Patient,"name"|"age"|"sex"|"phone"|"department"|"city"|"email">;
type AppointmentInput=Omit<Appointment,"id"|"status">;
type DraftInput={patientId:string;reason:string;clinician:string;soap:string;department:Patient["department"]};
type DemoState={patients:Patient[];appointments:Appointment[];encounters:Encounter[];labs:LabRequest[];charges:Charge[];addPatient:(input:PatientInput)=>Patient;addAppointment:(input:AppointmentInput)=>{ok:boolean;error?:string};saveDraft:(input:DraftInput)=>{ok:boolean;error?:string};addLab:(patientId:string,test:string)=>void;updateAppointment:(id:string,status:Appointment["status"])=>void;};
const DemoContext=createContext<DemoState|null>(null);
export function DemoProvider({children}:{children:ReactNode}){
 const [patients,setPatients]=useState(initialPatients);const [appointments,setAppointments]=useState(initialAppointments);
 const [encounters,setEncounters]=useState(initialEncounters);const [labs,setLabs]=useState(initialLabs);
 const [charges]=useState(initialCharges);
 const value=useMemo<DemoState>(()=>({patients,appointments,encounters,labs,charges,
  addPatient(input){const patient:Patient={...input,id:`p-${crypto.randomUUID()}`,mrn:formatMrn(Math.max(...patients.map(p=>Number(p.mrn.split("-")[1])||0),0)+1),lastVisit:"—",status:"Active",bloodGroup:"Not recorded",allergy:"Not recorded"};setPatients(a=>[patient,...a]);return patient;},
  addAppointment(input){if(!patients.some(p=>p.id===input.patientId))return {ok:false,error:"Select a fictional patient"};if(hasSlotConflict(appointments,input))return {ok:false,error:"This clinician already has an appointment at that time"};setAppointments(a=>[{...input,id:`a-${crypto.randomUUID()}`,status:"Confirmed"},...a]);return {ok:true}},
  saveDraft(input){if(!patients.some(p=>p.id===input.patientId)||!input.reason.trim()||!input.soap.trim())return {ok:false,error:"Select patient, reason, and non-empty note"};setEncounters(a=>[{id:`e-${crypto.randomUUID()}`,patientId:input.patientId,clinician:input.clinician,date:new Date().toISOString().slice(0,10),reason:input.reason,department:input.department,status:"In progress",soap:input.soap},...a]);return {ok:true}},
  addLab(patientId,test){if(!patients.some(p=>p.id===patientId)||!test.trim())return;setLabs(a=>[{id:`L-${1004+a.length-initialLabs.length}`,patientId,test,orderedBy:"Demo clinician",date:new Date().toISOString().slice(0,10),status:"Pending",priority:"Routine"},...a])},
  updateAppointment(id,status){setAppointments(a=>a.map(v=>v.id===id?{...v,status}:v))}
 }),[patients,appointments,encounters,labs,charges]);
 return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}
export function useDemo(){const ctx=useContext(DemoContext);if(!ctx)throw new Error("Missing DemoProvider");return ctx}
