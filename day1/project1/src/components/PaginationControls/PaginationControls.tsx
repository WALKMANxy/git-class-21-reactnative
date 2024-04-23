import React from "react";
import PaginationProps from "../../models/PaginationProps";
import "./PaginationControls.scss";

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="arrow-btn"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <span>&#8592;</span>
      </button>
      <span className="page-info">
        {currentPage}/{totalPages}
      </span>
      <button
        className="arrow-btn"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <span>&#8594;</span>
      </button>
    </div>
  );
};

export default PaginationControls;
