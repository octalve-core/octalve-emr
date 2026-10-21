/** Synthetic, fictional names and clinical placeholders. Never substitute real PHI. */
export type Patient={id:string;mrn:string;name:string;age:number;sex:"Female"|"Male";phone:string;lastVisit:string;department:"Ophthalmology"|"Dentistry"|"General";status:"Active"|"Follow-up";allergy:string;bloodGroup:string;city:string;email:string};
export type Appointment={id:string;patientId:string;practitionerId:string;date:string;time:string;reason:string;department:Patient["department"];status:"Confirmed"|"Checked in"|"Completed"|"Cancelled"};
export type Encounter={id:string;patientId:string;date:string;clinician:string;reason:string;department:Patient["department"];status:"In progress"|"Completed";soap?:string};
export type LabRequest={id:string;patientId:string;test:string;orderedBy:string;date:string;status:"Pending"|"In progress"|"Result ready"|"Reviewed";priority:"Routine"|"Urgent"};
export type Charge={id:string;patientId:string;service:string;date:string;amount:number;status:"Unpaid"|"Paid"|"Part paid"};
export const facility={id:"fictional-clinic",name:"Octalve Sample Clinic",subtitle:"Eye & Dental Outpatient Centre",location:"Abuja, Nigeria",phone:"000-000-0000"};
export const doctors=[{id:"dr-amina",name:"Dr Amina Bello",specialty:"Ophthalmology"},{id:"dr-tunde",name:"Dr Tunde Okafor",specialty:"Dentistry"},{id:"dr-sarah",name:"Dr Sarah Musa",specialty:"General Practice"}];
export const initialPatients:Patient[]=[
 {id:"p1",mrn:"EMR-00001",name:"Amara Eze",age:32,sex:"Female",phone:"0800 000 0101",lastVisit:"2026-10-16",department:"Ophthalmology",status:"Active",allergy:"No known allergies recorded",bloodGroup:"O+",city:"Abuja",email:"amara@example.invalid"},
 {id:"p2",mrn:"EMR-00002",name:"Ibrahim Yusuf",age:45,sex:"Male",phone:"0800 000 0102",lastVisit:"2026-10-15",department:"Dentistry",status:"Follow-up",allergy:"Penicillin (fictional sample)",bloodGroup:"A+",city:"Abuja",email:"ibrahim@example.invalid"},
 {id:"p3",mrn:"EMR-00003",name:"Zainab Bello",age:27,sex:"Female",phone:"0800 000 0103",lastVisit:"2026-10-14",department:"Ophthalmology",status:"Active",allergy:"No known allergies recorded",bloodGroup:"B+",city:"Abuja",email:"zainab@example.invalid"},
 {id:"p4",mrn:"EMR-00004",name:"David Adeyemi",age:51,sex:"Male",phone:"0800 000 0104",lastVisit:"2026-10-13",department:"General",status:"Follow-up",allergy:"No known allergies recorded",bloodGroup:"AB+",city:"Abuja",email:"david@example.invalid"},
 {id:"p5",mrn:"EMR-00005",name:"Fatima Sani",age:39,sex:"Female",phone:"0800 000 0105",lastVisit:"2026-10-12",department:"Dentistry",status:"Active",allergy:"No known allergies recorded",bloodGroup:"O-",city:"Abuja",email:"fatima@example.invalid"},
 {id:"p6",mrn:"EMR-00006",name:"Chinedu Obi",age:24,sex:"Male",phone:"0800 000 0106",lastVisit:"2026-10-11",department:"Ophthalmology",status:"Active",allergy:"No known allergies recorded",bloodGroup:"A-",city:"Abuja",email:"chinedu@example.invalid"},
];
export const initialAppointments:Appointment[]=[
 {id:"a1",patientId:"p1",practitionerId:"dr-amina",date:"2026-10-20",time:"09:00",reason:"Routine eye examination",department:"Ophthalmology",status:"Confirmed"},
 {id:"a2",patientId:"p2",practitionerId:"dr-tunde",date:"2026-10-20",time:"09:30",reason:"Dental review",department:"Dentistry",status:"Checked in"},
 {id:"a3",patientId:"p3",practitionerId:"dr-amina",date:"2026-10-20",time:"10:30",reason:"Refraction review",department:"Ophthalmology",status:"Confirmed"},
 {id:"a4",patientId:"p4",practitionerId:"dr-sarah",date:"2026-10-20",time:"11:00",reason:"Follow-up consultation",department:"General",status:"Confirmed"},
 {id:"a5",patientId:"p5",practitionerId:"dr-tunde",date:"2026-10-20",time:"12:00",reason:"Dental scaling consultation",department:"Dentistry",status:"Confirmed"},
];
export const initialEncounters:Encounter[]=[
 {id:"e1",patientId:"p1",date:"2026-10-16",clinician:"Dr Amina Bello",reason:"Visual acuity review",department:"Ophthalmology",status:"Completed",soap:"Fictional demonstration encounter; no medical advice."},
 {id:"e2",patientId:"p2",date:"2026-10-15",clinician:"Dr Tunde Okafor",reason:"Dental check-up",department:"Dentistry",status:"Completed",soap:"Fictional demonstration encounter; no medical advice."},
 {id:"e3",patientId:"p4",date:"2026-10-14",clinician:"Dr Sarah Musa",reason:"Routine review",department:"General",status:"In progress"},
];
export const initialLabs:LabRequest[]=[
 {id:"L-1001",patientId:"p1",test:"Visual field assessment",orderedBy:"Dr Amina Bello",date:"2026-10-16",status:"Result ready",priority:"Routine"},
 {id:"L-1002",patientId:"p2",test:"Dental radiograph",orderedBy:"Dr Tunde Okafor",date:"2026-10-16",status:"Pending",priority:"Routine"},
 {id:"L-1003",patientId:"p4",test:"Complete blood count",orderedBy:"Dr Sarah Musa",date:"2026-10-15",status:"In progress",priority:"Routine"},
];
export const initialCharges:Charge[]=[
 {id:"CL-0001",patientId:"p1",service:"Eye examination",date:"2026-10-16",amount:12000,status:"Paid"},
 {id:"CL-0002",patientId:"p2",service:"Dental consultation",date:"2026-10-15",amount:15000,status:"Unpaid"},
 {id:"CL-0003",patientId:"p3",service:"Refraction",date:"2026-10-14",amount:8500,status:"Paid"},
 {id:"CL-0004",patientId:"p5",service:"Dental assessment",date:"2026-10-12",amount:18000,status:"Part paid"},
];
export const initialActivities=[
 {title:"Clinical note created",subject:"Amara Eze · Eye examination",time:"16 Oct · 11:35",type:"note"},
 {title:"Diagnostic request placed",subject:"Ibrahim Yusuf · Dental radiograph",time:"16 Oct · 10:20",type:"lab"},
 {title:"Patient checked in",subject:"Zainab Bello · Refraction",time:"15 Oct · 09:45",type:"appointment"},
 {title:"Appointment scheduled",subject:"Fatima Sani · Dentistry",time:"14 Oct · 14:10",type:"appointment"}
];
