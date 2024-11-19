import Image from "next/image";

interface ShopDetailProps {
    shop: {
        id: string;
        name: string;
        address: string;
        access: string;
        photo: {
            pc: {
                l: string;
            };
        };
    } | null;
}

export default function ShopDetail({ shop }: ShopDetailProps) {
    if (!shop) {
        return <div>店が選択されていません</div>;
    }

    return(
        <div className="p-4">
            <h2 className="text-2xl mb-4">{shop.name}</h2>
            <Image src={shop.photo.pc.l} alt="店の画像" width={200} height={200} className="rounded-lg" />
            <p className="mt-4">{shop.address}</p>
            <p className="mt-2">{shop.access}</p>
        </div>
    )
}