import { accentColor } from "@/app/style/color";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./styles.module.css";


export default function Search() {
    const [ filterFlag, setFilterFlag ] = useState<boolean>(false);
    const [ keyword, setKeyword ] = useState<string>("");

    const handleSearch = ()=> {
        console.log("検索キーワード:", keyword);
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