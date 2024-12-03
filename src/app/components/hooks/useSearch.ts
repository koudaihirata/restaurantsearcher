import { useEffect, useState } from "react";
import axios from "axios";

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
    };
    coupon_urls: {
        pc: string;
        sp: string;
    };
}

interface UseSearchParams {
    onShopDataLoad: (shopData: ShopInfoProps[]) => void;
    setLoading: (loading: boolean) => void;
}

export function useSearch({ onShopDataLoad, setLoading }: UseSearchParams) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [keyword, setKeyword] = useState<string>("");
    const [range, setRange] = useState<number>(3);
    const [count, setCount] = useState<number>(30);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            fetchShopData();
        }
    }, [latitude, longitude]);

    const fetchShopData = () => {
        if (latitude !== null && longitude !== null) {
            setLoading(true);
            axios
                .get(`/api/search?latitude=${latitude}&longitude=${longitude}&range=${range}`)
                .then((response) => {
                    const shopData = response.data.results.shop;
                    onShopDataLoad(shopData);
                    console.log(shopData);
                    
                })
                .catch((error) => {
                    console.error("APIエラー:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleSearch = () => {
        if (latitude !== null && longitude !== null) {
            setLoading(true);
            axios
                .get(`/api/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}&range=${range}&count=${count}`)
                .then((response) => {
                    const shopData = response.data.results.shop;
                    onShopDataLoad(shopData);
                })
                .catch((error) => {
                    console.error("APIエラー:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return {
        latitude,
        longitude,
        keyword,
        range,
        count,
        setKeyword,
        setRange,
        setCount,
        handleSearch,
    };
}
