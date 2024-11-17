import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { mainColor, subColor } from "../style/color";

export default function Header() {
    return (
        <header className="relative">
            <section className="w-full h-14 flex justify-between items-center pl-8 pr-8 fixed top-0 left-0" style={{backgroundColor:mainColor}}>
                <FontAwesomeIcon icon={faBars} className="w-8 h-8" style={{color:subColor}} />
                <h1><Image src="/ロゴ.png" alt="ロゴ" width={40} height={40} /></h1>
                <Image src="/ベイマックス.jpg" alt="プロフィール画像" width={40} height={40} className="rounded-full" />
            </section>
        </header>
    );
}