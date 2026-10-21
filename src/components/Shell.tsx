"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState,type ReactNode} from "react";
import {LayoutDashboard,Users,CalendarDays,ClipboardPlus,FlaskConical,Eye,Smile,Wallet,ChartNoAxesCombined,Settings,Search,ChevronDown,ShieldCheck,LogOut,HelpCircle,MoreHorizontal,UserRound} from "lucide-react";
import type {LucideIcon} from "lucide-react";
import {EmrBrand} from "./EmrBrand";
const primary:[string,string,LucideIcon][]=[
 ["Overview","/dashboard",LayoutDashboard],["Patients","/dashboard/patients",Users],["Appointments","/dashboard/appointments",CalendarDays],["Encounters","/dashboard/encounters",ClipboardPlus],["Laboratory","/dashboard/laboratory",FlaskConical],["Eye care","/dashboard/eye-care",Eye],["Dental care","/dashboard/dental",Smile],["Billing","/dashboard/billing",Wallet],["Reports","/dashboard/reports",ChartNoAxesCombined]
];
const bottom:[string,string,LucideIcon][]=[["Home","/dashboard",LayoutDashboard],["Patients","/dashboard/patients",Users],["Visits","/dashboard/encounters",ClipboardPlus],["More","/dashboard/more",MoreHorizontal],["Me","/dashboard/profile",UserRound]];
function isActive(pathname:string,href:string){return href==="/dashboard"?pathname===href:pathname===href||pathname.startsWith(href+"/")}
export function Shell({children}:{children:ReactNode}){
 const pathname=usePathname();const [showUser,setShowUser]=useState(false);
 const accountRef=useRef<HTMLDivElement>(null);const accountButtonRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!showUser)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setShowUser(false);accountButtonRef.current?.focus()}};
  const onOutside=(event:PointerEvent)=>{if(event.target instanceof Node&&!accountRef.current?.contains(event.target))setShowUser(false)};
  document.addEventListener("keydown",onKey);document.addEventListener("pointerdown",onOutside);
  return()=>{document.removeEventListener("keydown",onKey);document.removeEventListener("pointerdown",onOutside)};
 },[showUser]);
 return <div className="min-h-dvh bg-white lg:flex lg:h-dvh lg:overflow-hidden">
 <aside className={`hidden lg:flex fixed inset-y-0 left-0 z-50 w-[258px] flex-col bg-[#000A16] text-white transition-transform lg:static lg:h-dvh lg:translate-x-0 `}>
  <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#172236] bg-white px-5">
   <Link href="/dashboard"  className="flex items-center gap-2.5 text-[#101E32]"><EmrBrand/></Link>

  </div>
  <div className="mx-3 mt-5 rounded-xl border border-[#1B2B40] bg-[#0C1A2A] px-3 py-3"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#6B91B7]">Workspace</p><p className="mt-1 text-[13px] font-semibold leading-tight">Octalve Clinic</p></div>
  <nav className="mt-5 min-h-0 flex-1 overflow-y-auto px-3 pb-3 [scrollbar-width:none]" aria-label="Clinical navigation">
   <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#62778E]">Main menu</p>
   <div className="space-y-1">{primary.map(([label,href,Icon])=><Link key={href} href={href}  aria-current={isActive(pathname,href)?"page":undefined} className={`flex min-h-[41px] items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition-colors ${isActive(pathname,href)?"bg-[#0064E0] font-semibold text-white shadow-[0_5px_20px_rgba(0,100,224,.27)]":"text-[#A6B7CA] hover:bg-white/10 hover:text-white"}`}><Icon size={17}/>{label}</Link>)}</div>
   <div className="mt-6 border-t border-[#18283A] pt-4"><p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#62778E]">Administration</p><Link href="/dashboard/settings"  className={`flex min-h-[41px] items-center gap-3 rounded-xl px-3 py-2 text-[13px] ${pathname==="/dashboard/settings"?"bg-[#0064E0] text-white":"text-[#A6B7CA] hover:bg-white/10"}`}><Settings size={17}/>Clinic settings</Link></div>
  </nav>
  <div className="shrink-0 border-t border-[#1A2A3E] p-3"><div className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#AFC2D5]"><HelpCircle size={17}/><span className="flex-1 text-xs">Help & support</span><span className="text-[10px]">Coming soon</span></div><div className="mt-1 flex items-center gap-2 rounded-xl bg-[#10243A] px-3 py-3"><span className="grid size-8 place-items-center rounded-full bg-[#1C3D65] text-xs font-bold text-[#D9EAFE]">SA</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold">Staff Administrator</p><p className="text-[10px] text-[#90A8C0]">Sample account</p></div><Link href="/login" className="rounded-lg p-1 text-[#C9E3FF] hover:bg-[#203D59]" aria-label="Open sign in"><LogOut size={16}/></Link></div></div>
 </aside>
 <div className="flex min-h-dvh min-w-0 flex-1 flex-col lg:h-full lg:min-h-0 lg:overflow-y-auto">
  <header className="sticky top-0 z-30 flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-[#E7EDF4] bg-white px-4 sm:px-6 lg:h-[72px] lg:px-8">
   <div className="flex items-center gap-3">
    <Link href="/dashboard/patients#patient-search" aria-label="Search patients" className="hidden h-10 w-[310px] items-center gap-2 rounded-xl border border-[#E8EDF4] bg-[#F7F9FC] px-3 transition-colors hover:border-[#BFD7F9] hover:bg-[#EDF5FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0064E0] lg:flex">
     <Search size={16} className="shrink-0 text-[#7189A5]"/><span className="min-w-0 flex-1 text-xs text-[#607993]">Search patients</span><span className="text-[10px] font-semibold text-[#0064E0]">Open</span>
    </Link>
    <span className="text-[13px] font-semibold text-[#18385E] lg:hidden">Octalve EMR</span>
   </div>
   <div className="flex items-center gap-2 sm:gap-4">
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E9F4FF] px-2.5 py-1.5 text-[10px] font-semibold text-[#0064E0] sm:px-3"><span className="size-1.5 rounded-full bg-[#0064E0]"/>Sample workspace</span>
    <div ref={accountRef} className="relative hidden lg:block">
     <button ref={accountButtonRef} type="button" className="flex items-center gap-2 rounded-xl p-1 hover:bg-[#F7F9FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0064E0]" onClick={()=>setShowUser(x=>!x)} aria-label="Account menu" aria-controls="emr-account-menu" aria-expanded={showUser}>
      <span className="grid size-9 place-items-center rounded-full bg-[#E4EDFA] text-[11px] font-bold text-[#27537F]">SA</span>
      <span className="text-left"><span className="block text-xs font-semibold text-[#1B334E]">Staff Administrator</span><span className="block text-[10px] text-[#8FA0B1]">Sample account</span></span><ChevronDown size={15} className="text-[#7B90A7]"/>
     </button>
     {showUser?<nav id="emr-account-menu" aria-label="Account options" className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-[#EBEEF4] bg-white p-2 shadow-xl">
      <Link onClick={()=>setShowUser(false)} href="/dashboard/profile" className="block rounded-lg px-3 py-2 text-xs text-[#25405E] hover:bg-[#F5F8FC]">My profile</Link>
      <Link onClick={()=>setShowUser(false)} href="/dashboard/settings" className="block rounded-lg px-3 py-2 text-xs text-[#25405E] hover:bg-[#F5F8FC]">Clinic settings</Link>
      <Link onClick={()=>setShowUser(false)} href="/login" className="block rounded-lg px-3 py-2 text-xs text-[#0064E0] hover:bg-[#F5F8FC]">Sign in</Link>
      
     </nav>:null}
    </div>
   </div>
  </header>
  
  <main className="mx-auto w-full max-w-[1570px] flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-9 lg:pt-8">{children}</main>
  <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#E9EDF4] bg-white/95 px-1 pt-2 pb-[max(.65rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(14,46,84,.055)] backdrop-blur-xl lg:hidden">{bottom.map(([label,href,Icon])=><Link href={href} key={href} aria-current={isActive(pathname,href)?"page":undefined} className={`flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl px-0.5 text-[10px] ${isActive(pathname,href)?"font-bold text-[#0064E0]":"font-medium text-[#728398]"}`}><span className={`grid h-8 w-10 place-items-center rounded-xl ${isActive(pathname,href)?"bg-[#EAF3FF]":""}`}><Icon size={21}/></span>{label}</Link>)}</nav>
 </div></div>
}
