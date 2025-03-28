import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <button
        onClick={handlePrevious}
        className="btn btn-outline-primary mx-2"
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="align-self-center">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className="btn btn-outline-primary mx-2"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
