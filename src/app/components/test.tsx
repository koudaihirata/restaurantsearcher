'use client';

import axios from "axios";

export default function Test() {
    const getData = async () => {
        const response = await axios.get("/api/search");
        console.log(response.data.results.shop);
      };

    return (
        <>
            <button onClick={getData}>ゲット</button>
        </>
    );
}