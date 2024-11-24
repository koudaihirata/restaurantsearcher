import { accentColor } from "@/app/style/color";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

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
}

interface SearchProps {
    onShopDataLoad: (shopData: ShopInfoProps[]) => void;
    setLoading: (loading: boolean) => void;
}

export default function Search({ onShopDataLoad, setLoading }: SearchProps) {
    const [ filterFlag, setFilterFlag ] = useState<boolean>(false);
    const [ keyword, setKeyword ] = useState<string>("");
    const [ latitude, setLatitude ] = useState<number | null>(null);
    const [ longitude, setLongitude ] = useState<number | null>(null);

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
            setLoading(true);
            axios
                .get(`/api/search?latitude=${latitude}&longitude=${longitude}`)
                .then((response) => {
                    const shopData = response.data.results.shop;
                    onShopDataLoad(shopData);
                    console.log("取得した店舗データ:", shopData);
                })
                .catch((error) => {
                    console.error("APIエラー:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [latitude, longitude]);

    const handleSearch = ()=> {
        if (latitude !== null && longitude !== null) {
            setLoading(true);
            axios
                .get(`/api/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)
                .then((response) => {
                    const shopData = response.data.results.shop;
                    onShopDataLoad(shopData);
                    console.log("取得した店舗データ:", shopData);
                })
                .catch((error) => {
                    console.error("APIエラー:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleSearch();
        }
    };

    const filterFlagSwitch = ()=> {
        setFilterFlag(!filterFlag);
    }

    return(
        <div className="w-full flex justify-center items-center mb-6 relative">
            <div className="w-96 h-10 relative">
                <FontAwesomeIcon icon={faFilter} onClick={filterFlagSwitch} className="absolute w-5 h-5 top-2.5 left-2.5" style={{color:accentColor}} />
                <input
                    type="text"
                    placeholder="キーワードを入力"
                    name="keyword"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full rounded-full border-2 border-[#FFC66F] pl-8"
                />
                <div className="absolute w-0.5 h-6 top-2 right-10" style={{backgroundColor:accentColor}}></div>
                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute w-5 h-5 top-2.5 right-3" style={{color:accentColor}} />
                </button>
            </div>
            {filterFlag && (
                <div className={styles.filter}>
                    <p>検索条件</p>
                </div>
            )}
        </div>
    )
}