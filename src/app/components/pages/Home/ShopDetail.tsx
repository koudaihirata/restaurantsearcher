import Image from "next/image";

interface ShopDetailProps {
    shop: {
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
    } | null;
}

// interface ShopDetailProps {
//     shop: Shop | null;
// }

const weekDays: string[] = ["月", "火", "水", "木", "金", "土", "日", "祝日", "祝前日"];

interface Schedule {
    [key: string]: string[];
}

function convertTime(timeStr: string): { hour: number; minute: number } {
    let add24Hours = false;
    if (timeStr.startsWith('翌')) {
        add24Hours = true;
        timeStr = timeStr.substring(1);
    }

    const timeParts = timeStr.split(':');
    let hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1] ? parseInt(timeParts[1], 10) : 0;

    if (add24Hours) {
        hour += 24;
    }

    return { hour, minute };

}


function formatTime(timeObj: { hour: number; minute: number }): string {
    const { hour, minute } = timeObj;
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
}

function parseOperatingHours(data: string): Schedule {
    const schedule: Schedule = {};

    weekDays.forEach(day => {
    schedule[day] = [];
    });

    const pattern = /([月火水木金土日祝前、～]+):\s*([^月火水木金土日祝前]+)/g;

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(data)) !== null) {
    const daysPart = match[1].trim();
    let hoursPart = match[2].trim();

    if (!daysPart || !hoursPart) continue;

    hoursPart = hoursPart.replace(/（[^）]*）/g, '').trim();

    const timeRangePattern = /(.+?)～(.+)/;
    const timeMatch = hoursPart.match(timeRangePattern);
    if (!timeMatch) continue;

    const startTimeStr = timeMatch[1].trim();
    const endTimeStr = timeMatch[2].trim();

    const startTime = convertTime(startTimeStr);
    const endTime = convertTime(endTimeStr);

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    const timeString = `${formattedStartTime}～${formattedEndTime}`;

    const days = daysPart.split("、").flatMap(day => {
        if (day.includes("～")) {
        const [start, end] = day.split("～");
        const startIndex = weekDays.indexOf(start);
        const endIndex = weekDays.indexOf(end);
        if (startIndex !== -1 && endIndex !== -1) {
            let indices: string[];
            if (startIndex <= endIndex) {
            indices = weekDays.slice(startIndex, endIndex + 1);
            } else {
            indices = weekDays.slice(startIndex).concat(weekDays.slice(0, endIndex + 1));
            }
            return indices;
        }
        }
        return day;
    });

    days.forEach(day => {
        if (schedule[day]) {
        schedule[day].push(timeString);
        }
    });
    }

    return schedule;
}

export default function ShopDetail({ shop }: ShopDetailProps) {


    if (!shop) {
        return <div className="p-10">ローディング中...</div>;
    }

    const schedule = parseOperatingHours(shop.open);

    return(
        <div className="p-10">
            <div className="flex">
                <Image src={shop.photo.pc.l} alt="店の画像" width={200} height={200} className="rounded-lg max-h-[200] max-w-[200]" />
                <div className="ml-4 flex flex-col justify-around">
                    <section>
                        <h2 className="text-2xl mb-3">{shop.name}</h2>
                        <p className="text-xs">{shop.address}</p>
                    </section>
                    <p className="mb-2">{shop.access}</p>
                </div>
            </div>
            <p className="mt-5">{shop.catch}</p>
            <div className="mt-5">
                <h3>営業時間:</h3>
                <p>{shop.open}</p>
                <ul>
                {weekDays.map(day => (
                    <li key={day}>
                        <p>{day}:</p> {schedule[day].length > 0 ? schedule[day].join(', ') : '営業時間外'}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}