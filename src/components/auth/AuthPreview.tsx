"use client";

import Link from "next/link";
import {EmrBrand} from "@/src/components/EmrBrand";
import {
  Activity, ArrowRight, CalendarCheck2, ClipboardCheck, HeartPulse,
  LockKeyhole, ShieldCheck, Stethoscope, UserRoundPlus
} from "lucide-react";

/**
 * Preview-only authentication presentation. All form controls are disabled deliberately:
 * the project has no identity service, account store, MFA or session verification.
 * Never accept or persist login/signup credentials until the server auth phase ships.
 */
export function AuthPreview({mode}:{mode:"login"|"signup"}){
 const signup=mode==="signup";
 return <div className="grid min-h-dvh lg:grid-cols-[minmax(0,47%)_minmax(0,53%)]">
  <section className="relative hidden min-h-dvh flex-col justify-between overflow-hidden bg-[#000A16] px-10 py-10 text-white lg:flex xl:px-16 xl:py-14">
   <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-[20%] size-[390px] rounded-full bg-[#0064E0]/[.11] blur-[60px]"/>
   <div aria-hidden="true" className="pointer-events-none absolute -left-28 bottom-0 size-[290px] rounded-full bg-[#0064E0]/[.11] blur-[68px]"/>
   <div className="relative flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#0064E0]"><HeartPulse size={22}/></span><span className="text-lg font-bold tracking-tight">Octalve <span className="text-[#74B4FF]">EMR</span></span></div>
   <div className="relative max-w-[495px] pb-12">
    <span className="inline-flex items-center gap-2 rounded-full border border-[#29405B] bg-[#10243B] px-3 py-2 text-[11px] font-semibold text-[#A8D2FF]"><Stethoscope size={13}/> YOUR CLINICAL WORKSPACE</span>
    <h1 className="mt-7 text-[clamp(2.3rem,3.3vw,3.75rem)] font-bold leading-[1.14] tracking-[-.038em]">Better care starts with <span className="text-[#64A8FF]">clearer records.</span></h1>
    <p className="mt-5 max-w-[450px] text-[15px] leading-7 text-[#A4B5C9]">A thoughtfully designed workspace for your clinic, patient journeys, appointments and clinical teams.</p>
    <div className="mt-11 grid gap-5">
      <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#25415F] bg-[#11263E] text-[#7EB5FA]"><ClipboardCheck size={19}/></span><div><p className="text-sm font-semibold">One organised patient journey</p><p className="mt-1 text-xs text-[#9AACBF]">Registration, consultation and follow-up in one view</p></div></div>
      <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#25415F] bg-[#11263E] text-[#7EB5FA]"><CalendarCheck2 size={19}/></span><div><p className="text-sm font-semibold">Simpler clinic operations</p><p className="mt-1 text-xs text-[#9AACBF]">A clear schedule and purposeful daily overview</p></div></div>
      <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#25415F] bg-[#11263E] text-[#7EB5FA]"><ShieldCheck size={19}/></span><div><p className="text-sm font-semibold">Privacy and security by design</p><p className="mt-1 text-xs text-[#9AACBF]">Production clinical access controls are still being built</p></div></div>
    </div>
   </div>
   <div className="relative flex items-center justify-between gap-3 border-t border-[#1B3047] pt-6 text-[11px] text-[#728DA9]"><span>© {new Date().getUTCFullYear()} Octalve · EMR</span><span>UI foundation · Fictional records only</span></div>
  </section>
  <section className="flex min-h-dvh flex-col bg-white">
    <header className="mx-auto flex w-full max-w-[650px] items-center justify-between px-5 pb-7 pt-7 sm:px-10 sm:pt-10 lg:pb-0 lg:pt-12"><Link href="/login" aria-label="Octalve EMR sign in"><EmrBrand/></Link><span className="rounded-full bg-[#EDF5FF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.10em] text-[#0064E0]">Preview</span></header>
    <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center px-5 py-8 sm:px-7 lg:py-12">
      <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-[#EAF3FF] text-[#0064E0]">{signup?<UserRoundPlus size={23}/>:<LockKeyhole size={23}/>}</span>
      <h2 className="text-[29px] font-bold tracking-[-.035em] text-[#102840] sm:text-[34px]">{signup?"Create your clinic account":"Welcome back"}</h2>
      <p className="mt-2 text-[13px] leading-6 text-[#6E8197]">{signup?"Start setting up your clinic's own secure workspace.":"Sign in to manage your clinic and patient workflows."}</p>
      <div role="status" className="mt-7 flex items-start gap-3 rounded-xl border border-[#CFE5FF] bg-[#F0F7FF] p-3.5 text-[#265C8F]"><Activity size={17} className="mt-0.5 shrink-0"/><p className="text-[12px] leading-[1.65]"><strong>Preview only.</strong> Secure account creation and sign-in are not activated. Fields are disabled to avoid collecting credentials. Please use fictional demo records only.</p></div>
      <form className="mt-7 space-y-4" aria-label={signup?"Clinic signup preview":"Sign in preview"} onSubmit={e=>e.preventDefault()}>
       {signup?<>
        <div><label htmlFor="clinic-name" className="emr-label">Clinic / facility name</label><input id="clinic-name" type="text" autoComplete="off" placeholder="Your clinic name" className="emr-input disabled:bg-[#F8FAFC]" disabled/></div>
        <div><label htmlFor="contact-name" className="emr-label">Your full name</label><input id="contact-name" type="text" autoComplete="off" placeholder="Full name" className="emr-input disabled:bg-[#F8FAFC]" disabled/></div>
       </>:null}
       <div><label htmlFor="emr-email" className="emr-label">Work email address</label><input id="emr-email" type="email" autoComplete="off" placeholder="you@yourclinic.com" className="emr-input disabled:bg-[#F8FAFC]" disabled/></div>
       <div><label htmlFor="emr-password" className="emr-label">Password</label><input id="emr-password" type="password" autoComplete="off" placeholder="••••••••••••" className="emr-input disabled:bg-[#F8FAFC]" disabled/></div>
       <button type="submit" disabled className="mt-1 flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#B3CCEA] px-5 text-[13px] font-bold text-white" aria-label={signup?"Clinic registration not yet activated":"Secure sign in not yet activated"}>{signup?"Create clinic account":"Sign in"}<LockKeyhole size={14}/></button>
      </form>
      <div className="my-5 flex items-center gap-3 text-[11px] text-[#A0AEC0]"><span className="h-px flex-1 bg-[#E6EDF5]"/>AVAILABLE NOW<span className="h-px flex-1 bg-[#E6EDF5]"/></div>
      <Link href="/dashboard" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0064E0] px-5 text-[13px] font-bold text-white shadow-[0_5px_15px_rgba(0,100,224,.14)] transition-colors hover:bg-[#0052B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0064E0]">Explore fictional demo<ArrowRight size={17}/></Link>
      <p className="mt-6 text-center text-[12px] text-[#6C8196]">{signup?"Already have a clinic account?":"New to Octalve EMR?"} <Link href={signup?"/login":"/signup"} className="font-bold text-[#0064E0] hover:underline">{signup?"Sign in":"Create clinic account"}</Link></p>
      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] text-[#91A0B0]"><ShieldCheck size={14}/> No credentials are transmitted or stored</p>
    </div>
    <footer className="px-6 pb-6 text-center text-[11px] text-[#A6B2BF]">Octalve EMR · Independent clinical software foundation</footer>
  </section>
 </div>;
}
