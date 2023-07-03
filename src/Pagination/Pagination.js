import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const visiblePages = 5;
    const pageRange = Math.min(visiblePages, totalPages); 
    const delta = Math.floor((visiblePages - 1) / 2);
    let startPage = Math.max(currentPage - delta, 1);
    let endPage = startPage + pageRange - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - pageRange + 1, 1);
    }
    const pageNumbers = Array.from({ length: pageRange }, (_, i) => startPage + i);

    return (
        <ul className="pagination">
            {currentPage > 1 && (
                <li>
                    <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                </li>
            )}

            {startPage > 1 && (
                <li>
                    <button onClick={() => onPageChange(1)}>1</button>
                </li>
            )}

            {startPage > 2 && (
                <li className="disabled">
                    <span>...</span>
                </li>
            )}

            {pageNumbers.map((pageNumber) => (
                <li key={pageNumber} className={pageNumber === currentPage ? 'active' : ''}>
                    <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
                </li>
            ))}

            {endPage < totalPages - 1 && (
                <li className="disabled">
                    <span>...</span>
                </li>
            )}

            {endPage < totalPages && (
                <li>
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </li>
            )}

            {currentPage < totalPages && (
                <li>
                    <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
                </li>
            )}
        </ul>
    );
};

export default Pagination;
