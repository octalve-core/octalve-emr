import {DemoProvider} from "@/src/components/DemoProvider";
import {Shell} from "@/src/components/Shell";
export default function WorkspaceLayout({children}:{children:React.ReactNode}){return <DemoProvider><Shell>{children}</Shell></DemoProvider>}
