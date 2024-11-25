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
    const [ range, setRange ] = useState<number>(3);

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
                .get(`/api/search?latitude=${latitude}&longitude=${longitude}&range${range}`)
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
                .get(`/api/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}&range=${range}`)
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
            handleSearch();
        }
    };

    const filterFlagSwitch = () => {
        setFilterFlag(!filterFlag);
    }

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRange(Number(event.target.value));
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
            <div className={`${styles.filter} ${filterFlag ? styles.show : ''}`}>
                <div className="w-full h-full p-3 relative">
                    <div className={styles.triangle}></div>
                    <p>検索範囲</p>
                    <div className="flex gap-6">
                        <div className="flex gap-0.5">
                            <input type="radio" id="range1" name="range" value={1} onChange={handleRangeChange} />
                            <label htmlFor="range1">300m</label>
                        </div>
                        <div className="flex gap-0.5">
                            <input type="radio" id="range2" name="range" value={2} onChange={handleRangeChange} />
                            <label htmlFor="range2">500m</label>
                        </div>
                        <div className="flex gap-0.5">
                            <input type="radio" id="range3" name="range" value={3} onChange={handleRangeChange} defaultChecked />
                            <label htmlFor="range3">1000m</label>
                        </div>
                        <div className="flex gap-0.5">
                            <input type="radio" id="range4" name="range" value={4} onChange={handleRangeChange} />
                            <label htmlFor="range4">2000m</label>
                        </div>
                        <div className="flex gap-0.5">
                            <input type="radio" id="range5" name="range" value={5} onChange={handleRangeChange} />
                            <label htmlFor="range5">3000m</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}