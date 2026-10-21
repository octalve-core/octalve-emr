import type {Metadata} from "next";
import {AuthPreview} from "@/src/components/auth/AuthPreview";
export const metadata:Metadata={title:"Sign in · Octalve EMR"};
export default function LoginPage(){return <AuthPreview mode="login"/>;}
