import { accentColor, fontColor, gray, subColor } from "@/app/style/color";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { Paging } from "../../hooks/Paging";
import { Loading, NotFound } from "../../utils/LoadRendering";

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
    urls: {
        pc: string;
    }
    coupon_urls: {
        pc: string;
        sp: string;
    }
}

interface ShopListProps {
    onShopSelect: (shop: ShopInfoProps) => void;
    shopData: ShopInfoProps[];
    loading: boolean;
}

export default function ShopList({ onShopSelect, shopData, loading }: ShopListProps) {
    const itemsPerPage = 5;
    const { currentPage, currentItems, generatePageNumbers, handlePageChange } = Paging(shopData, itemsPerPage);


    if (loading) {
        return <>{Loading(itemsPerPage)}</>;
    }

    if (shopData.length === 0) {
        return NotFound();
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