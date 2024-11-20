'use client';

import { createContext, useContext, useEffect } from "react";
import { mainColor, subColor } from "@/app/style/color";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Navigation from "./Navigation";

export const NabFlagContext = createContext<{ nabFlag: boolean, setNabFlag: (flag: boolean) => void }>({ nabFlag: true, setNabFlag: () => {} });

export default function Header() {
    const { nabFlag, setNabFlag } = useContext(NabFlagContext);

    const handleNab = () => {
        setNabFlag(!nabFlag);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1300px)");

        if (mediaQuery.matches) {
            setNabFlag(true);
        }

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setNabFlag(true);
            } else {
                setNabFlag(false);
            }
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);
    },[])

    return (
        <header className="relative">
            <section className="w-full h-14 flex justify-between items-center pl-8 pr-8 fixed top-0 left-0 z-50" style={{backgroundColor:mainColor}}>
                <FontAwesomeIcon icon={faBars} className="w-8 h-8" style={{color:subColor}} onClick={handleNab}/>
                <h1><Image src="/ロゴ.png" alt="ロゴ" width={40} height={40} /></h1>
                <Image src="/ベイマックス.jpg" alt="プロフィール画像" width={40} height={40} className="rounded-full" />
            </section>
            <Navigation nabFlag={nabFlag} />
        </header>
    );
}