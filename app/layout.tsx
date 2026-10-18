import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"Octalve EMR — Clinical Workspace Preview",description:"Independent Octalve EMR clinical workflow prototype. Fictional data only.",robots:{index:false,follow:false},icons:{icon:"/branding/octalve-finance-icon.png",apple:"/branding/octalve-finance-icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
