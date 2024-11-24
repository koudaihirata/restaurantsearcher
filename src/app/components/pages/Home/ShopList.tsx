import { useState } from "react";
import { accentColor, fontColor, gray, subColor } from "@/app/style/color";
// import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";

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

interface ShopListProps {
    onShopSelect: (shop: ShopInfoProps) => void;
    shopData: ShopInfoProps[];
    loading: boolean;
}

export default function ShopList({ onShopSelect, shopData, loading }: ShopListProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = shopData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(shopData.length / itemsPerPage);

    if (loading) {
        return (
            <>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <div key={index} className="flex gap-4 ml-8 mr-8 mb-6 pt-8">
                        <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
                        <div className="flex flex-col gap-2">
                            <div className="w-32 h-6 bg-gray-300 animate-pulse mb-2"></div>
                            <div className="w-48 h-4 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    if (shopData.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center flex-col gap-3">
                <Image src={"/error.png"} alt="404 not found" width={200} height={50} />
                <h3 className="text-2xl">No stores found in your search</h3>
            </div>
        )
    }

    return(
        <>
            {currentItems.map((shop, index) => (
                <div key={shop.id} onClick={() => onShopSelect(shop)}>
                    <div className="flex gap-4 ml-8 mr-8 mb-6 pt-8">
                        <Image src={shop.photo.pc.l} alt="店の画像" width={80} height={80} className="rounded-lg max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] object-cover" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base">{shop.name}</h3>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faTrainSubway} className="w-4 h-4" />
                                <p className="text-xs">{shop.access}</p>
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
                            color: currentPage === index + 1 ? subColor : fontColor
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    )
}