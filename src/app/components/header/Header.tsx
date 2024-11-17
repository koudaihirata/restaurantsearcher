import { mainColor, subColor } from "@/app/style/color";
import { faBars, faHouse, faMap, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="relative">
            <section className="w-full h-14 flex justify-between items-center pl-8 pr-8 fixed top-0 left-0 z-50" style={{backgroundColor:mainColor}}>
                <FontAwesomeIcon icon={faBars} className="w-8 h-8" style={{color:subColor}} />
                <h1><Image src="/ロゴ.png" alt="ロゴ" width={40} height={40} /></h1>
                <Image src="/ベイマックス.jpg" alt="プロフィール画像" width={40} height={40} className="rounded-full" />
            </section>
            <div className="w-64 h-screen fixed top-0 z-20 flex flex-col" style={{backgroundColor:mainColor}}>
                <div className="flex items-center gap-4 mt-24 ml-8">
                    <FontAwesomeIcon icon={faHouse} className="w-6 h-6" style={{color:subColor}} />
                    <p className="text-xl" style={{color:subColor}}>HOME</p>
                </div>
                <div className="flex items-center gap-4 mt-4 ml-8">
                    <FontAwesomeIcon icon={faMap} className="w-6 h-6" style={{color:subColor}} />
                    <p className="text-xl" style={{color:subColor}}>MAP</p>
                </div>
                <div className="flex items-center gap-4 mt-4 ml-8">
                    <FontAwesomeIcon icon={faRectangleList} className="w-6 h-6" style={{color:subColor}} />
                    <p className="text-xl" style={{color:subColor}}>LIST</p>
                </div>
                <div className="w-4/5 h-0.5 m-auto mt-4" style={{backgroundColor:subColor}}></div>
                <div>
                    <Link href="http://webservice.recruit.co.jp/">
                        <Image src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif" alt="ホットペッパーグルメ Webサービス" width={88} height={35} className="m-auto"/>
                    </Link>
                    <p className="text-center mt-2 mb-2" style={{color:subColor}}>&copy;2024 hirata</p>
                </div>
            </div>
        </header>
    );
}