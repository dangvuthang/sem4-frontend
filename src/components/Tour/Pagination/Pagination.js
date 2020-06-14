import React from "react";
import "./Pagination.scss";
const Pagination = ({
  currentPage,
  pageSize,
  numberOfItems,
  setCurrentPage,
}) => {
  const numberOfPages = Math.ceil(numberOfItems / pageSize);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) pages.push(i);
  return numberOfPages <= 1 ? null : (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() =>
            currentPage === 1
              ? setCurrentPage(1)
              : setCurrentPage(currentPage - 1)
          }
        >
          {"<"}
        </button>
      </li>
      {pages.map(page => (
        <li className="pagination__item" key={page}>
          <button
            className={
              currentPage === page
                ? "pagination__btn active"
                : "pagination__btn"
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() =>
            currentPage === numberOfPages
              ? setCurrentPage(numberOfPages)
              : setCurrentPage(currentPage + 1)
          }
        >
          {">"}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
