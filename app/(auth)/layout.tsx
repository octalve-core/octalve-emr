import type {ReactNode} from "react";

/** Standalone public preview pages. No authentication boundary exists yet. */
export default function AuthLayout({children}:{children:ReactNode}) {
  return <main className="min-h-dvh bg-[#F7F9FC]">{children}</main>;
}
