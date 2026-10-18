"use client";
import {useState} from "react";
import {HeartPulse} from "lucide-react";
import {EMR_BRAND} from "@/src/config/branding";
/** The brand image is the owner's existing finance artwork, imported once and committed to EMR. */
export function EmrBrand({compact=false}:{compact?:boolean}) {
 const [failed,setFailed]=useState(false);
 return <span className="inline-flex min-w-0 items-center gap-2.5">
  <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#EAF3FF]">
   {failed?<HeartPulse size={19} color="#0064E0"/>:<img src={EMR_BRAND.iconUrl} alt="" width={35} height={35} onError={()=>setFailed(true)} className="h-full w-full object-contain"/>}
  </span>
  {!compact?<span className="flex min-w-0 items-center gap-1.5">
    <img src={EMR_BRAND.wordmarkUrl} alt="Octalve" width={106} height={31} className="max-h-9 max-w-[112px] object-contain" onError={e=>{e.currentTarget.style.display="none"; e.currentTarget.nextElementSibling?.classList.remove("hidden")}}/>
    <span className="hidden text-base font-extrabold tracking-tight text-[#102C47]">Octalve</span>
    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[.12em] text-[#0064E0]">EMR</span>
   </span>:null}
 </span>
}
