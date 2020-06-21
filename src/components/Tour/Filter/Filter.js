import React from "react";
import Label from "../../shared/Label/Label";
import DatePicker from "react-date-picker";
import StarRatingComponent from "react-star-rating-component";
import "./Filter.scss";
const Filter = ({ filter, setFilter }) => {
  const { search, duration, minPrice, maxPrice, rating, startDate } = filter;
  const handleFilterChange = e => {
    const element = e.target;
    if (element) setFilter({ ...filter, [element.id]: element.value });
  };
  return (
    <div className="filter-section">
      <h3 className="filter-section__title">
        <i className="fas fa-search" style={{ marginRight: "5px" }}></i> Tour
        Search
      </h3>
      <Label name="Keyword">
        <input
          className="filter-section__search-keyword"
          placeholder="Search..."
          id="search"
          value={search}
          onChange={handleFilterChange}
        />
        <i className="fas fa-search filter-section__search-icon"></i>
      </Label>
      <Label name="Duration">
        <select
          className="filter-section__search-keyword"
          id="duration"
          value={duration}
          onChange={handleFilterChange}
        >
          <option value="">Any</option>
          <option value="4">2-4 Days Tour</option>
          <option value="6">5-7 Days Tour</option>
          <option value="7">7+ Days Tour</option>
        </select>
      </Label>
      <Label name="Start Date">
        <DatePicker
          className="filter-section__start-date"
          value={startDate}
          id="startDate"
          format="dd/MM/y"
          onChange={e =>
            handleFilterChange({ target: { id: "startDate", value: e } })
          }
        />
      </Label>
      <div className="filter-section__price">
        <Label name="Min Price">
          <input
            className="filter-section__price-search"
            id="minPrice"
            value={minPrice}
            onChange={handleFilterChange}
          />
        </Label>
        <Label name="Max Price">
          <input
            className="filter-section__price-search"
            id="maxPrice"
            value={maxPrice}
            onChange={handleFilterChange}
          />
        </Label>
      </div>
      <Label name="Rating">
        <div className="filter-section__rating">
          <StarRatingComponent
            name="rating"
            className="filter-section__start-rating"
            emptyStarColor="#7f7f7f"
            id="rating"
            value={rating}
            onStarClick={(nextValue, prevValue, name) =>
              handleFilterChange({ target: { value: nextValue, id: name } })
            }
          />{" "}
          <span className="filter-section__start-content">or more</span>
        </div>
      </Label>
    </div>
  );
};

export default Filter;
