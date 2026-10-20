import {ClinicalRecordPage} from "@/src/components/records/ClinicalRecordPage";
export default async function Record({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ClinicalRecordPage kind="billing" id={id}/>}
