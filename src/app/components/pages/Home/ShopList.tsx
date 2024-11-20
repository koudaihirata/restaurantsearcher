import { useEffect, useState } from "react";
import { accentColor, fontColor, gray, white } from "@/app/style/color";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";

interface ShopInfoProps {
    id: string;
    name: string;
    address: string;
    access: string;
    open: string;
    photo: {
        pc: {
            l: string;
        };
    };
}

interface ShopListProps {
    onShopSelect: (shop: ShopInfoProps) => void;
    onShopDataLoad: (shopData: ShopInfoProps[]) => void;
}

export default function ShopList({ onShopSelect, onShopDataLoad }: ShopListProps) {
    const [ shopData, setShopData ] = useState<ShopInfoProps[]>([]);
    const [ latitude, setLatitude ] = useState<number>(0);
    const [ longitude, setLongitude ] = useState<number>(0);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                alert("位置情報が取得できませんでした");
                console.error(error);
            }
        );
    }, [])

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/search?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => {
                const shopData = response.data.results.shop;
                setShopData(shopData);
                onShopDataLoad(shopData);
                setLoading(false);
                console.log("取得した店舗データ:", shopData);
            })
            .catch((error) => {
                console.error("APIエラー:", error);
                setLoading(false);
            });
    }, [latitude, longitude]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = shopData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(shopData.length / itemsPerPage);

    if (loading) {
        return <div className="p-10">ローディング中...</div>;
    }

    return(
        <>
            {currentItems.map((shop, index) => (
                <div key={shop.id} onClick={() => onShopSelect(shop)}>
                    <div className="flex gap-4 ml-8 mr-8 mb-6 pt-8">
                        <Image src={shop.photo.pc.l} alt="店の画像" width={80} height={80} className="rounded-lg max-h-[80] max-w-[80]" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base">{shop.name}</h3>
                            <p className="text-xs">{shop.access}</p>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faTrainSubway} className="w-4 h-4" />
                                <p className="text-xs">{shop.address}</p>
                            </div>
                        </div>
                    </div>
                    {index % 5 !== 4 && (
                        <div className="w-4/5 h-0.5 m-auto" style={{backgroundColor:accentColor}}></div>
                    )}
                </div>
            ))}
            <div className="flex gap-8 justify-center mt-12 mb-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className="px-4 py-2 rounded-lg"
                        style={{
                            backgroundColor: currentPage === index + 1 ? accentColor : gray,
                            color: currentPage === index + 1 ? white : fontColor
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    )
}