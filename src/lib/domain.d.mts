export const DEMO_ONLY:boolean;
export function formatMrn(index:number):string;
export function hasSlotConflict(appointments:readonly {id:string;practitionerId:string;date:string;time:string;status:string}[],candidate:{practitionerId:string;date:string;time:string;excludeId?:string}):boolean;
export function canTransitionEncounter(from:string,to:string):boolean;
export function hasCorrectFacilityScope(subjectFacilityId:string,recordFacilityId:string):boolean;
export function canEditClinicalNote(status:string):boolean;
