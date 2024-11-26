"use client"

import { useEffect, useState } from "react";
import App from "./app";
import ShopDetail from "./components/pages/Home/ShopDetail";
import ShopList from "./components/pages/Home/ShopList";
import { white } from "./style/color";
import Search from "./components/pages/Home/Search";
import ShopListSp from "./components/pages/Home/ShopListSp";

interface selectedShopProps {
  id: string;
  name: string;
  access: string;
  address: string;
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

export default function Home() {
  const [ selectedShop, setSelectedShop ] = useState<selectedShopProps | null>(null);
  const [ shopData, setShopData ] = useState<selectedShopProps[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ shopFlag, setShopFlag ] = useState<boolean>(false);
  const [ showDetail, setShowDetail ] = useState<boolean>(false);

  const handleShopSelect = (shop: selectedShopProps) => {
    setSelectedShop(shop);
    setShowDetail(true);
  };

  const handleShopDataLoad = (data: selectedShopProps[]) => {
    setShopData(data);
    if (data.length > 0) {
      setSelectedShop(data[0]);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setShopFlag(event.matches);
    };
    
  setShopFlag(mediaQuery.matches);

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  return () => {
    mediaQuery.removeEventListener("change", handleMediaQueryChange);
  };
  },[])

  return (
    <App>
        <div className="pt-8 pl-10 pr-10">
          <Search onShopDataLoad={handleShopDataLoad} setLoading={setLoading} />
          <div className="flex gap-8">
            {shopFlag ? (
              <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto shadow" style={{backgroundColor:white}}>
                {showDetail ? (
                  <div>
                      <button onClick={handleBack}>戻る</button>
                      <ShopDetail shop={selectedShop} loading={loading} shopData={shopData} />
                  </div>
                ) : (
                  <ShopListSp onShopSelect={handleShopSelect} shopData={shopData} loading={loading} />
                )}              
              </div>
            ) : (
              <>
                <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto shadow" style={{backgroundColor:white}}>
                  <ShopList onShopSelect={handleShopSelect} shopData={shopData} loading={loading} />
                </div>
                <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto shadow" style={{backgroundColor:white}}>
                  <ShopDetail shop={selectedShop} loading={loading} shopData={shopData} />
                </div>
              </>
            )}
          </div>
        </div>
    </App>
  );
}
