import {NextResponse} from "next/server";
export function GET(){return NextResponse.json({application:"octalve-emr",mode:"fictional-ui-preview",clinicalBackendActive:false,patientDataAccepted:false},{headers:{"Cache-Control":"no-store"}})}
