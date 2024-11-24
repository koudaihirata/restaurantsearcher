"use client"

import { useState } from "react";
import App from "./app";
import ShopDetail from "./components/pages/Home/ShopDetail";
import ShopList from "./components/pages/Home/ShopList";
import { white } from "./style/color";
import Search from "./components/pages/Home/Search";

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
}

export default function Home() {
  const [selectedShop, setSelectedShop] = useState<selectedShopProps | null>(null);
  const [shopData, setShopData] = useState<selectedShopProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShopSelect = (shop: selectedShopProps) => {
    setSelectedShop(shop);
  };

  const handleShopDataLoad = (data: selectedShopProps[]) => {
    setShopData(data);
    if (data.length > 0) {
      setSelectedShop(data[0]);
    }
    setLoading(false);
  };

  return (
    <App>
        <div className="pt-8 pl-10 pr-10">
          <Search onShopDataLoad={handleShopDataLoad} setLoading={setLoading} />
          <div className="flex gap-8">
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto shadow" style={{backgroundColor:white}}>
              <ShopList onShopSelect={handleShopSelect} shopData={shopData} loading={loading} />
            </div>
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto shadow" style={{backgroundColor:white}}>
              <ShopDetail shop={selectedShop} loading={loading} shopData={shopData} />
            </div>
          </div>
        </div>
    </App>
  );
}
