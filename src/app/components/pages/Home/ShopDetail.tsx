import Image from "next/image";
import { parseOperatingHours, Schedule } from '@/app/components/hooks/OpeningTimes';
import Btn from "../../Btn";
import { useEffect, useState } from "react";
import { DetailLoading, NotFound } from "../../utils/LoadRendering";

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
        urls: {
            pc: string;
        }
        coupon_urls: {
            pc: string;
            sp: string;
        }
    } | null;
    loading: boolean;
    shopData: ShopInfoProps[];
}

const weekDays: string[] = ["月", "火", "水", "木", "金", "土", "日", "祝日", "祝前日"];

export default function ShopDetail({ shop, loading, shopData }: ShopDetailProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        const mobileRegex = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);

    if (loading) {
        return <>{DetailLoading()}</>;
    }

    if (shopData.length === 0) {
        return NotFound();
    }

    if (!shop) {
        return null;
    }

    const schedule: Schedule = parseOperatingHours(shop.open);

    return(
        <div className="p-6">
            <div className="flex flex-wrap justify-around">
                <Image src={shop.photo.pc.l} alt="店の画像" width={160} height={160} className="rounded-lg max-h-[160px] max-w-[160px] min-h-[160px] min-w-[160px]" />
                <div className="ml-4 flex flex-col justify-around">
                    <section>
                        <h2 className="text-2xl mb-3">{shop.name}</h2>
                        <p className="text-xs">{shop.address}</p>
                        <div className="flex gap-2 mt-4">
                            <Btn label="予約" url={shop.urls.pc} />
                            {isMobile ? (
                                <Btn label="クーポンを見る" url={shop.coupon_urls.sp} />   
                            ) : (
                                <Btn label="クーポンを見る" url={shop.coupon_urls.pc} />                            
                            )}
                        </div>
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