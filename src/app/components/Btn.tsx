import Link from "next/link";
import { accentColor, white } from "../style/color";


interface BtnProps {
    label: string;
    url: string;
}

export default function Btn(Props: BtnProps) {
    return(
        <Link href={Props.url}>
            <button className="pt-1 pb-1 pl-2 pr-2 rounded-lg" style={{backgroundColor:accentColor,color:white}}>{Props.label}</button>
        </Link>
    )
}