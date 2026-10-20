import {ClinicalRecordPage} from "@/src/components/records/ClinicalRecordPage";
export default async function EditRecord({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ClinicalRecordPage kind="encounters" id={id} edit/>}
