import type {ElementType, ReactNode} from "react";

/**
 * Independent EMR record-card presentation, visually aligned with Octalve's approved mobile lists.
 * Fictional data only in Phase 0. No Finance package, runtime or payment-domain imports.
 */
export type RecordFact={label:string;value:ReactNode};

export function MobileRecordCard({
 title,reference,status,icon:Icon,facts,aside,action,
}:{
 title:string;
 reference:string;
 status:ReactNode;
 icon:ElementType;
 facts:readonly RecordFact[];
 aside?:ReactNode;
 action?:ReactNode;
}){
 return <article className="emr-mobile-record" aria-label={`${title} — ${reference}`}>
  <div className="flex min-w-0 items-start gap-3">
   <span className="emr-mobile-record-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.9}/></span>
   <div className="min-w-0 flex-1">
    <div className="flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2">
     <p className="min-w-0 flex-1 break-words text-[12px] font-bold leading-5 text-[#254765]">{title}</p>
     {aside?<span className="shrink-0 text-[11px] font-bold text-[#23425F]">{aside}</span>:null}
    </div>
    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5">
     <span className="emr-mobile-reference">{reference}</span>
     {status}
    </div>
   </div>
  </div>
  {facts.length?<dl className="mt-3 grid min-w-0 grid-cols-2 gap-x-3 gap-y-2 border-t border-[#E9EEF4] pt-3">
   {facts.map(({label,value},i)=><div className="min-w-0" key={`${label}-${i}`}><dt className="text-[10px] text-[#8797AA]">{label}</dt><dd className="mt-0.5 break-words text-[11px] font-medium leading-5 text-[#435C75]">{value||"—"}</dd></div>)}
  </dl>:null}
  {action?<div className="mt-3 flex justify-end border-t border-[#E9EEF4] pt-2.5">{action}</div>:null}
 </article>;
}
