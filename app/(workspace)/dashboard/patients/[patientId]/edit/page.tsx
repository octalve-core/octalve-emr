import {ClinicalRecordPage} from "@/src/components/records/ClinicalRecordPage";
export default async function EditPatient({params}:{params:Promise<{patientId:string}>}){const {patientId}=await params;return <ClinicalRecordPage kind="patients" id={patientId} edit/>}
