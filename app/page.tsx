import {redirect} from "next/navigation";
/** Public landing route: demo auth presentation (not a real access boundary). */
export default function Home(){redirect("/login");}
