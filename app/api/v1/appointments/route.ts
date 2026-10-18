import {NextResponse} from "next/server";
const blocked=()=>NextResponse.json({error:"CLINICAL_BACKEND_NOT_ACTIVATED"},{status:503,headers:{"Cache-Control":"no-store"}});
export const GET=blocked;
export const POST=blocked;
