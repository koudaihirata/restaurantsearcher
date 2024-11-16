'use client';

import axios from "axios";
import ShopInfo from "./ShopInfo";

export default function Test() {
    const getData = async () => {
        const response = await axios.get("/api/search");
        console.log(response.data.results.shop);
      };

    return (
        <>
            <button onClick={getData} className="w-16 border-solid border-red-300 border-2">ゲット</button>
            <ShopInfo />
        </>
    );
}