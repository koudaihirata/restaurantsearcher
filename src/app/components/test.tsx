'use client';

import axios from "axios";
import ShopInfo from "./ShopInfo";
import { useState } from "react";

export default function Test() {
    const [ shopData, setShopData ] = useState([]);

    const getData = async () => {
        const response = await axios.get("/api/search");
        console.log(response.data.results.shop);

        setShopData(response.data.results.shop);
    };
    

    return (
        <>
            <button onClick={getData} className="w-16 border-solid border-red-300 border-2">ゲット</button>
            <div className="w-full flex flex-wrap">
                {shopData.map((shop, index) => (
                    <ShopInfo key={index} shop={shop}/>
                ))}
            </div>
        </>
    );
}