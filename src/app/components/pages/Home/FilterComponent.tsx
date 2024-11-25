import styles from "./styles.module.css";

interface FilterComponentProps {
    filterFlag: boolean;
    range: number;
    handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterComponent({ filterFlag, range, handleRangeChange }: FilterComponentProps) {
    return (
        <div className={`${styles.filter} ${filterFlag ? styles.show : ''}`}>
            <div className="w-full h-full p-3 relative">
                <div className={styles.triangle}></div>
                <p>検索範囲</p>
                <div className="flex gap-6">
                    <div className="flex gap-0.5">
                        <input type="radio" id="range1" name="range" value={1} onChange={handleRangeChange} checked={range === 1} />
                        <label htmlFor="range1">300m</label>
                    </div>
                    <div className="flex gap-0.5">
                        <input type="radio" id="range2" name="range" value={2} onChange={handleRangeChange} checked={range === 2} />
                        <label htmlFor="range2">500m</label>
                    </div>
                    <div className="flex gap-0.5">
                        <input type="radio" id="range3" name="range" value={3} onChange={handleRangeChange} checked={range === 3} />
                        <label htmlFor="range3">1000m</label>
                    </div>
                    <div className="flex gap-0.5">
                        <input type="radio" id="range4" name="range" value={4} onChange={handleRangeChange} checked={range === 4} />
                        <label htmlFor="range4">2000m</label>
                    </div>
                    <div className="flex gap-0.5">
                        <input type="radio" id="range5" name="range" value={5} onChange={handleRangeChange} checked={range === 5} />
                        <label htmlFor="range5">3000m</label>
                    </div>
                </div>
            </div>
        </div>
    );
}