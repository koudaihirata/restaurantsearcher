import Image from "next/image";
import { parseOperatingHours, Schedule } from '@/app/components/hooks/OpeningTimes';

interface ShopInfoProps {
    id: string;
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
}

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
    loading: boolean;
    shopData: ShopInfoProps[];
}

const weekDays: string[] = ["月", "火", "水", "木", "金", "土", "日", "祝日", "祝前日"];

export default function ShopDetail({ shop, loading, shopData }: ShopDetailProps) {
    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h2 className="text-2xl">ローディング中...</h2>
            </div>
        );
    }

    if (shopData.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center flex-col gap-3">
                <Image src={"/error.png"} alt="404 not found" width={200} height={50} />
                <h3 className="text-2xl">No stores found in your search</h3>
            </div>
        );
    }

    if (!shop) {
        // 店舗が選択されていない場合は何も表示しない
        return null;
    }

    const schedule: Schedule = parseOperatingHours(shop.open);

    return(
        <div className="p-10">
            <div className="flex">
                <Image src={shop.photo.pc.l} alt="店の画像" width={160} height={160} className="rounded-lg max-h-[160] max-w-[160] min-h-[160] min-w-[160]" />
                <div className="ml-4 flex flex-col justify-around">
                    <section>
                        <h2 className="text-2xl mb-3">{shop.name}</h2>
                        <p className="text-xs">{shop.address}</p>
                    </section>
                </div>
            </div>
            <p className="mt-5">{shop.catch}</p>
            <div className="mt-5">
                <h3 className="text-center text-lg pb-4 pt-2">営業時間</h3>
                <ul className="w-full flex flex-wrap justify-center gap-4">
                {weekDays.map(day => (
                    <li key={day} className="flex flex-col items-center">
                        <p>{day}</p> {schedule[day].length > 0 ? schedule[day].join(', ') : '閉店'}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}