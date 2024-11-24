import Image from "next/image";
import { parseOperatingHours, Schedule } from '@/app/components/hooks/OpeningTimes';

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

const weekDays: string[] = ["月", "火", "水", "木", "金", "土", "日", "祝日", "祝前日"];

export default function ShopDetail({ shop }: ShopDetailProps) {
    if (!shop) {
        return <div className="p-10">ローディング中...</div>;
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