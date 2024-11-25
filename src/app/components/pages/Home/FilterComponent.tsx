import { accentColor } from "@/app/style/color";
import styles from "./styles.module.css";

interface FilterComponentProps {
    filterFlag: boolean;
    range: number;
    count: number;
    handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ranges = [
    { id: "range1", value: 1, label: "300m" },
    { id: "range2", value: 2, label: "500m" },
    { id: "range3", value: 3, label: "1000m" },
    { id: "range4", value: 4, label: "2000m" },
    { id: "range5", value: 5, label: "3000m" },
];

const counts = [
    { id: "count1", value: 10, label: "10件" },
    { id: "count2", value: 30, label: "30件" },
    { id: "count3", value: 50, label: "50件" },
    { id: "count4", value: 70, label: "70件" },
    { id: "count5", value: 100, label: "100件" },

]

export default function FilterComponent({ filterFlag, range, count, handleRangeChange, handleCountChange }: FilterComponentProps) {
    return (
        <div className={`${styles.filter} ${filterFlag ? styles.show : ''}`}>
            <div className="w-full h-full p-3 relative">
                <div className={styles.triangle}></div>
                <p>検索範囲</p>
                <div className="flex gap-6">
                    {ranges.map(({ id, value, label }) => (
                        <div key={id} className="flex gap-0.5">
                            <input type="radio" id={id} name="range" value={value} onChange={handleRangeChange} checked={range === value} />
                            <label htmlFor={id}>{label}</label>
                        </div>
                    ))}
                </div>
                <div className="w-full h-0.5 mt-2 mb-2" style={{backgroundColor:accentColor}}></div>
                <p>件数</p>
                <div className="flex gap-6">
                    {counts.map(({ id, value, label }) => (
                        <div key={id} className="flex gap-0.5">
                            <input type="radio" id={id} name="count" value={value} onChange={handleCountChange} checked={count === value} />
                            <label htmlFor={id}>{label}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}