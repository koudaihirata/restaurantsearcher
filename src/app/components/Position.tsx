'use client';

export default function Position() {
    const getPos = () => {

    } 

    return(
        <div className="m-16"> 
            <button onClick={getPos} className="w-16 mb-8 border-solid border-red-300 border-2">現在位置を取得する</button>
            <p>緯度:?</p>
            <p>経度:??</p>
        </div>
    )
}