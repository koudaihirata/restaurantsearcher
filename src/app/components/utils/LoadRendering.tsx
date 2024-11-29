import Image from "next/image";

export const Loading = (itemsPerPage: number) => {
    return Array.from({ length: itemsPerPage }).map((_, index) => (
        <div key={index} className="flex gap-4 ml-8 mr-8 mb-6 pt-8">
            <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="flex flex-col gap-2">
                <div className="w-32 h-6 bg-gray-300 animate-pulse mb-2"></div>
                <div className="w-48 h-4 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    ));
};

const weekDays: string[] = ["月", "火", "水", "木", "金", "土", "日", "祝日", "祝前日"];

export const DetailLoading = () => {
    return (
        <div className="p-10">
        <div className="flex">
            <div className="w-40 h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="ml-4 flex flex-col justify-around">
                <section>
                    <div className="w-32 h-6 bg-gray-300 animate-pulse mb-3"></div>
                    <div className="w-48 h-4 bg-gray-300 animate-pulse"></div>
                </section>
            </div>
        </div>
        <div className="mt-5 w-full h-4 bg-gray-300 animate-pulse"></div>
        <div className="mt-5">
            <h3 className="text-center text-lg pb-4 pt-2">営業時間</h3>
            <ul className="w-full flex flex-wrap justify-center gap-4">
                {weekDays.map(day => (
                    <li key={day} className="flex flex-col items-center">
                        <div className="w-12 h-4 bg-gray-300 animate-pulse mb-2"></div>
                        <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
};

export const NotFound = () => {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-3">
            <Image src={"/error.png"} alt="404 not found" width={200} height={50} />
            <h3 className="text-2xl">No stores found in your search</h3>
        </div>
    );
};
