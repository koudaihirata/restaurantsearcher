import { mainColor, subColor } from "@/app/style/color";
import { faHouse, faMap, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface NavProps {
    nabFlag: boolean;
}

const navItems = [
    { icon: faHouse, label: "HOME", mt: "mt-24", href: "/" },
    { icon: faMap, label: "MAP", mt: "mt-4", href: "/map" },
    { icon: faRectangleList, label: "LIST", mt: "mt-4", href: "/list" },
];

export default function Navigation({ nabFlag }: NavProps) {
    return(
        <div className={`w-64 h-screen fixed top-0 ${nabFlag ? '-left-64' : 'left-0'} z-20 flex flex-col transition-all duration-500`} style={{backgroundColor:mainColor}}>
            {navItems.map((item) => (
                <Link key={item.label} href={item.href} >
                    <div className={`flex items-center gap-4 ${item.mt} ml-8`}>
                        <FontAwesomeIcon icon={item.icon} className="w-6 h-6" style={{color:subColor}} />
                        <p className="text-xl" style={{color:subColor}}>{item.label}</p>
                    </div>
                </Link>
            ))}
            <div className="w-4/5 h-0.5 m-auto mt-4" style={{backgroundColor:subColor}}></div>
            <div>
                <Link href="http://webservice.recruit.co.jp/">
                    <Image src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif" alt="ホットペッパーグルメ Webサービス" width={88} height={35} className="m-auto"/>
                </Link>
                <p className="text-center mt-2 mb-2" style={{color:subColor}}>&copy;2024 hirata</p>
            </div>
        </div>
    )
}