import Image from "next/image"

interface ShopInfoProps {
    shop: {
        name: string;
        id: string;
        photo: {
            pc: {
                l: string;
            };
        };
    };
}

export default function ShopInfo({shop}: ShopInfoProps) {
    return(
        <section className="w-56 border-solid border-red-300 border-2">
            <Image src={shop.photo.pc.l} alt="店画像" width={150} height={150}/>
            <h2>{shop.name}</h2>
            <p>ID:{shop.id}</p>
        </section>
    )
}