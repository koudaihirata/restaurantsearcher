import { useState } from "react";

export function Paging<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 7;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= halfMaxPagesToShow) {
                for (let i = 1; i <= maxPagesToShow - 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage > totalPages - halfMaxPagesToShow) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - (maxPagesToShow - 3); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    return {
        currentPage,
        totalPages,
        currentItems,
        generatePageNumbers,
        handlePageChange,
    };
}
