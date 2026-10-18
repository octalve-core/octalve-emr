import type {Metadata} from "next";
import {AuthPreview} from "@/src/components/auth/AuthPreview";
export const metadata:Metadata={title:"Clinic registration · Octalve EMR Preview"};
export default function SignUpPage(){return <AuthPreview mode="signup"/>;}
