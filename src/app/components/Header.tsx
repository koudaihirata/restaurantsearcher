import Image from "next/image";


export default function Header() {
    return(
        <header>
            <Image src="/ロゴ.png" alt="ロゴ" width={40} height={40} />
        </header>
    )
}