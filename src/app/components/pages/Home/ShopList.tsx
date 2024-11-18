"use client";

import { useEffect, useState } from "react";
import { accentColor, white } from "@/app/style/color";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";

interface ShopInfoProps {
    id: string;
    name: string;
    address: string;
    access: string;
    photo: {
        pc: {
            l: string;
        };
    };
}

function ShopMap() {
    const [ shopData, setShopData ] = useState<ShopInfoProps[]>([]);

    const getData = async () => {
        const response = await axios.get("/api/search");
        console.log(response.data.results.shop);

        setShopData(response.data.results.shop);
    };

    useEffect(() => {
        getData();
    }, [])

    return(
        <>
        {shopData.map((shop, index) => (
            <div key={shop.id}>
                <div className="flex gap-4 ml-8 mr-8 mb-6 pt-8">
                    <Image src={shop.photo.pc.l} alt="店の画像" width={80} height={80} className="rounded-lg" />
                    <div className="flex flex-col justify-around">
                        <h2 className="text-base">{shop.name}</h2>
                        <p className="text-xs">{shop.access}</p>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faTrainSubway} className="w-4 h-4" />
                            <p className="text-xs">{shop.address}</p>
                        </div>
                    </div>
                </div>
                {index < shopData.length -1 && (
                    <div className="w-4/5 h-0.5 m-auto" style={{backgroundColor:accentColor}}></div>
                )}
            </div>
        ))}
        </>
    )
}

export default function ShopList() {
    return(
        <>
            <div className="w-2/5 h-70vh min-w-[400px] opacity-90 rounded-lg  overflow-auto" style={{backgroundColor:white}}>
                <ShopMap />
            </div>
        </>
    )
}