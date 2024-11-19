"use client"

import { useState } from "react";
import App from "./app";
import ShopDetail from "./components/pages/Home/ShopDetail";
import ShopList from "./components/pages/Home/ShopList";
import { white } from "./style/color";

interface selectedShopProps {
  id: string;
  name: string;
  access: string;
  address: string;
  photo: {
    pc: {
      l: string;
    };
  };
}

export default function Home() {
  const [selectedShop, setSelectedShop] = useState<selectedShopProps | null>(null);

  const handleShopSelect = (shop: selectedShopProps) => {
    setSelectedShop(shop);
  };

  const handleShopDataLoad = (shopData: selectedShopProps[]) => {
    if (shopData.length > 0) {
      setSelectedShop(shopData[0]);
    }
  };

  return (
    <App>
        <div className="pt-8 pl-10 pr-10">
          <div className="flex gap-8">
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto" style={{backgroundColor:white}}>
              <ShopList onShopSelect={handleShopSelect} onShopDataLoad={handleShopDataLoad} />
            </div>
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto" style={{backgroundColor:white}}>
              <ShopDetail shop={selectedShop} />
            </div>
          </div>
        </div>
    </App>
  );
}
