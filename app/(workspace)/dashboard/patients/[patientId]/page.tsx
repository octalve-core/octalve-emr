import {WorkspaceView} from "@/src/components/WorkspaceView";
export default async function PatientDetails({params}:{params:Promise<{patientId:string}>}){const {patientId}=await params;return <WorkspaceView screen="patient-detail" patientId={patientId}/>}
