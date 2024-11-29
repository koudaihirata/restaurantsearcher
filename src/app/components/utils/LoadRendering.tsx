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

export const NotFound = () => {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-3">
            <Image src={"/error.png"} alt="404 not found" width={200} height={50} />
            <h3 className="text-2xl">No stores found in your search</h3>
        </div>
    );
};
