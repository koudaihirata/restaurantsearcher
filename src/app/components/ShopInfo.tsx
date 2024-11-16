import Image from "next/image"



export default function ShopInfo() {
    return(
        <section className="w-56 border-solid border-red-300 border-2">
            <Image src={"https://imgfp.hotp.jp/IMGH/64/58/P044216458/P044216458_238.jpg"} alt="店画像" width={150} height={150}/>
            <h2>割烹料理 すし割烹藤 栄錦</h2>
            <p>ID:J003763286</p>
        </section>
    )
}