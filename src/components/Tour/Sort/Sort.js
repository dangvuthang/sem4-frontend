import React from "react";
import "./Sort.scss";
const Sort = ({ sort, setSort }) => {
  return (
    <div className="sort-section">
      <h3 className="sort-section__title">Sort by</h3>
      <select
        className="sort-section__category"
        id="category"
        value={sort.category}
        onChange={e => setSort({ ...sort, category: e.target.value })}
      >
        <option value="name">Title</option>
        <option value="ratingAverage">Rating</option>
        <option value="price">Price</option>
        <option value="duration">Duration</option>
      </select>
      <select
        className="sort-section__order"
        id="order"
        value={sort.order}
        onChange={e => setSort({ ...sort, order: e.target.value })}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;
