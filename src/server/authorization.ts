/**
 * Deny-by-default server authorization boundary.
 * Intentionally cannot authorize users until real identity and facility membership services exist.
 * No UI state, patient URL or browser-supplied role is proof of access.
 */
export type ServerActor={userId:string;facilityId:string;verifiedSession:boolean;roles:readonly string[];mfaVerified:boolean};
export type PatientAccess={facilityId:string;patientId:string};
export function assertPatientAccess(actor:ServerActor|null,record:PatientAccess,permission:string):never{
 void actor;void record;void permission;
 throw new Error("CLINICAL_BACKEND_NOT_ACTIVATED: deny all patient access");
}
