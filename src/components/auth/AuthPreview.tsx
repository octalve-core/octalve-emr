"use client";
import Link from "next/link";
import {EmrBrand} from "@/src/components/EmrBrand";
import {ArrowRight,LockKeyhole} from "lucide-react";

/**
 * Presentation-only auth. Never collect credentials before verified server identity exists.
 * Brand and copy are production-quality; no authentication or clinical trust is implied.
 */
export function AuthPreview({mode}:{mode:"login"|"signup"}){
 const signup=mode==="signup";
 return <div className="grid min-h-dvh bg-white lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]">
  <aside className="relative hidden min-h-dvh flex-col justify-center overflow-hidden bg-[#000A16] px-12 py-14 text-white lg:flex xl:px-20">
   <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 size-[500px] rounded-full bg-[#0064E0]/[.14] blur-[110px]"/>
   <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -left-40 size-[540px] rounded-full bg-[#258BFF]/[.09] blur-[110px]"/>
   <div className="relative max-w-[470px]">
    <div className="mb-9 h-1 w-14 rounded-full bg-[#278CFF]"/>
    <h1 className="max-w-[460px] text-[clamp(2.7rem,4vw,4.7rem)] font-medium leading-[1.1] tracking-[-.052em]">Manage care with <span className="text-[#62ABFF]">clarity.</span></h1>
    <p className="mt-6 max-w-[370px] text-base leading-7 text-[#B1C5DA]">Patients, appointments and clinical work in one place.</p>
   </div>
   <span className="absolute bottom-8 left-12 text-[11px] text-[#718EAA] xl:left-20">© {new Date().getUTCFullYear()} Octalve</span>
  </aside>
  <section className="flex min-h-dvh min-w-0 flex-col bg-white">
   <header className="mx-auto flex w-full max-w-[660px] items-center px-5 pt-7 sm:px-10 sm:pt-10 xl:px-12">
    <Link href="/login" aria-label="Octalve EMR home" className="inline-flex items-center"><EmrBrand/></Link>
   </header>
   <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center px-5 py-11 sm:px-8 xl:px-10">
    <h2 className="text-[31px] font-medium tracking-[-.04em] text-[#122B47] sm:text-[35px]">{signup?"Create your clinic account":"Welcome back"}</h2>
    <p className="mt-2 text-[13px] leading-6 text-[#71869C]">{signup?"Set up your clinic workspace in minutes.":"Sign in to manage your clinic operations."}</p>
    <form className="mt-8 space-y-4" aria-label={signup?"Clinic signup":"Staff sign in"} onSubmit={e=>e.preventDefault()}>
     {signup?<><label className="block"><span className="emr-label">Clinic name</span><input className="emr-input mt-1 disabled:bg-[#F8FAFC]" placeholder="Your clinic name" autoComplete="off" disabled/></label>
      <label className="block"><span className="emr-label">Full name</span><input className="emr-input mt-1 disabled:bg-[#F8FAFC]" placeholder="Your full name" autoComplete="off" disabled/></label></>:null}
     <label className="block"><span className="emr-label">Work email address</span><input className="emr-input mt-1 disabled:bg-[#F8FAFC]" placeholder="name@clinic.com" type="email" autoComplete="off" disabled/></label>
     <label className="block"><span className="emr-label">Password</span><input className="emr-input mt-1 disabled:bg-[#F8FAFC]" placeholder="Enter password" type="password" autoComplete="off" disabled/></label>
     <button type="submit" disabled aria-label={signup?"Account creation unavailable":"Sign in unavailable"} className="mt-2 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#A8C5E8] px-5 text-[13px] font-medium text-white">{signup?"Create clinic account":"Sign in"} <LockKeyhole size={14}/></button>
    </form>
    <p className="mt-3 text-center text-[11px] text-[#7B8DA2]">Account access is not yet available.</p>
    <div className="my-6 flex items-center gap-3 text-[11px] text-[#9BAFC0]"><span className="h-px flex-1 bg-[#E5EDF5]"/>OR<span className="h-px flex-1 bg-[#E5EDF5]"/></div>
    <Link href="/dashboard" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0064E0] px-5 text-[13px] font-medium text-white shadow-[0_5px_15px_rgba(0,100,224,.14)] transition-colors hover:bg-[#0052B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0064E0]">Explore sample workspace <ArrowRight size={17}/></Link>
    <p className="mt-3 text-center text-[11px] leading-5 text-[#7B8DA2]">Sample records only. Do not enter real patient information.</p>
    <p className="mt-7 text-center text-[12px] text-[#6C8196]">{signup?"Already have an account?":"New to Octalve EMR?"} <Link href={signup?"/login":"/signup"} className="font-medium text-[#0064E0] hover:underline">{signup?"Sign in":"Create an account"}</Link></p>
   </div>
   <footer className="px-6 pb-6 text-center text-[11px] text-[#A2B1BF]">Octalve EMR</footer>
  </section>
 </div>;
}
