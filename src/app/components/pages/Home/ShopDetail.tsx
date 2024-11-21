import Image from "next/image";

interface ShopDetailProps {
    shop: {
        name: string;
        address: string;
        access: string;
        open: string;
        catch: string;
        photo: {
            pc: {
                l: string;
            };
        };
    } | null;
}

export default function ShopDetail({ shop }: ShopDetailProps) {
    if (!shop) {
        return <div className="p-10">ローディング中...</div>;
    }

    return(
        <div className="p-10">
            <div className="flex">
                <Image src={shop.photo.pc.l} alt="店の画像" width={200} height={200} className="rounded-lg max-h-[200] max-w-[200]" />
                <div className="ml-4 flex flex-col justify-around">
                    <section>
                        <h2 className="text-2xl mb-3">{shop.name}</h2>
                        <p className="text-xs">{shop.address}</p>
                    </section>
                    <p className="mb-2">{shop.access}</p>
                </div>
            </div>
            <p className="mt-5">{shop.catch}</p>
            <p className="mt-5">{shop.open}</p>
        </div>
    )
}