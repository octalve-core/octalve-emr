// Pure demo helpers, not a clinical authorization or patient matching service.
export const DEMO_ONLY=true;
export function formatMrn(index){if(!Number.isSafeInteger(index)||index<1)throw new Error("MRN index must be positive");return `EMR-${String(index).padStart(5,"0")}`}
export function hasSlotConflict(appointments,{practitionerId,date,time,excludeId}={}){
 if(!practitionerId||!date||!time)return false;
 return appointments.some(a=>a.id!==excludeId&&a.practitionerId===practitionerId&&a.date===date&&a.time===time&&String(a.status).toLowerCase()!=="cancelled");
}
export function canTransitionEncounter(from,to){return ({scheduled:["in-progress","cancelled"],"in-progress":["completed","cancelled"],completed:[],cancelled:[]})[from]?.includes(to)??false}
export function hasCorrectFacilityScope(subjectFacilityId,recordFacilityId){return Boolean(subjectFacilityId&&recordFacilityId&&subjectFacilityId===recordFacilityId)}
export function canEditClinicalNote(status){return status==="draft"}
