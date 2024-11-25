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

    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 7;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= halfMaxPagesToShow) {
                for (let i = 1; i <= maxPagesToShow - 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage > totalPages - halfMaxPagesToShow) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - (maxPagesToShow - 3); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

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
                {generatePageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        className="px-4 py-2 rounded-lg"
                        style={{
                            backgroundColor: currentPage === page ? accentColor : gray,
                            color: currentPage === page ? subColor : fontColor,
                            cursor: typeof page === 'number' ? 'pointer' : 'default'
                        }}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </>
    )
}