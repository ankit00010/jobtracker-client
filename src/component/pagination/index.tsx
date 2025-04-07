import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import "./style.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const [startPage, setStartPage] = useState(1);

  const pagesToShow = [
    startPage,
    startPage + 1 <= totalPages ? startPage + 1 : null,
  ].filter((page): page is number => page !== null);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (newPage > startPage + 1) {
        setStartPage(startPage + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (newPage < startPage) {
        setStartPage(newPage);
      }
    }
  };

  return (
    <div className="pagination-container">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        <FaArrowLeftLong />
      </button>
      {pagesToShow.map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Pagination;
