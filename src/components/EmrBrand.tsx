"use client";
import {useState} from "react";
import {HeartPulse} from "lucide-react";
import {EMR_BRAND} from "@/src/config/branding";

/** Full brand = one official wordmark plus EMR product label. Icon only in compact contexts. */
export function EmrBrand({compact=false}:{compact?:boolean}){
 const [failed,setFailed]=useState(false);
 if(compact)return <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#EAF3FF]">
  {failed?<HeartPulse size={19} color="#0064E0"/>:<img src={EMR_BRAND.iconUrl} alt="Octalve EMR icon" width={35} height={35} onError={()=>setFailed(true)} className="h-full w-full object-contain"/>}
 </span>;
 return <span className="inline-flex min-w-0 items-center gap-2" aria-label="Octalve EMR">
  <span className="relative inline-flex h-10 min-w-[119px] items-center">
   <img src={EMR_BRAND.wordmarkUrl} alt="Octalve" width={119} height={38} className="max-h-10 w-auto max-w-[125px] object-contain" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextElementSibling?.classList.remove("hidden")}}/>
   <span className="hidden text-lg font-extrabold tracking-tight text-[#0A1F37]">Octalve</span>
  </span>
  <span aria-hidden="true" className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#0064E0]">EMR</span>
 </span>;
}
