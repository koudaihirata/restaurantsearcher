'use client';

import { useState } from "react";

export default function Position() {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const getPos = () => {
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
    } 

    return(
        <div className="m-16"> 
            <button onClick={getPos} className="w-16 mb-8 border-solid border-red-300 border-2">現在位置を取得する</button>
            <p>緯度:{latitude}</p>
            <p>経度:{longitude}</p>
        </div>
    )
}