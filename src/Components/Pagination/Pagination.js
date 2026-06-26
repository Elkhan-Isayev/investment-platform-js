import React from 'react';
import './Pagination.css';

// Lightweight drop-in replacement for the unmaintained `react-pagination-library`.
// Props mirror the original component's API so callers stay unchanged.
function Pagination({ currentPage, totalPages, changeCurrentPage }) {
  if (!totalPages || totalPages < 2) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage <= 1}
        onClick={() => changeCurrentPage(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn${page === currentPage ? ' is-active' : ''}`}
          onClick={() => changeCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        disabled={currentPage >= totalPages}
        onClick={() => changeCurrentPage(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;
