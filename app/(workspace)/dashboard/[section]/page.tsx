import {notFound} from "next/navigation";
import {WorkspaceView} from "@/src/components/WorkspaceView";
const sections=["patients","appointments","encounters","laboratory","eye-care","dental","billing","reports","settings"] as const;
export default async function Section({params}:{params:Promise<{section:string}>}){
 const {section}=await params;if(!sections.some(x=>x===section))notFound();
 return <WorkspaceView screen={section as (typeof sections)[number]}/>;
}
