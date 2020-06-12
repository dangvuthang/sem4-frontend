import React from "react";
import "./TourList.scss";
import Label from "./Label/Label";
import DatePicker from "react-date-picker";
import StarRatingComponent from "react-star-rating-component";
import TourItem from "./TourItem/TourItem";
const TourList = props => {
  return (
    <section className="tour-section">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="filter-section">
              <h3 className="filter-section__title">
                <i className="fas fa-search" style={{ marginRight: "5px" }}></i>{" "}
                Tour Search
              </h3>
              <Label name="Keyword">
                <input
                  className="filter-section__search-keyword"
                  placeholder="Search..."
                />
                <i className="fas fa-search filter-section__search-icon"></i>
              </Label>
              <Label name="Duration">
                <select className="filter-section__search-keyword">
                  <option>Any</option>
                  <option>2-4 Days Tour</option>
                  <option>5-7 Days Tour</option>
                  <option>7+ Days Tour</option>
                </select>
              </Label>
              <Label name="Start Date">
                <DatePicker className="filter-section__start-date" />
              </Label>
              <div className="filter-section__price">
                <Label name="Min Price">
                  <input className="filter-section__price-search" />
                </Label>
                <Label name="Max Price">
                  <input className="filter-section__price-search" />
                </Label>
              </div>
              <Label name="Rating">
                <div className="filter-section__rating">
                  <StarRatingComponent
                    name="rating"
                    className="filter-section__start-rating"
                    // emptyStarColor="#7f7f7f"
                  />{" "}
                  <span className="filter-section__start-content">or more</span>
                </div>
              </Label>
            </div>
          </div>
          <div className="col-9">
            <div className="tour-result">
              <div className="sort-section">
                <h3 className="sort-section__title">Sort by</h3>
                <select className="sort-section__category">
                  <option>Release Date</option>
                  <option>Title</option>
                  <option>Rating</option>
                  <option>Price</option>
                  <option>Duration</option>
                </select>
                <select className="sort-section__order">
                  <option>Ascending</option>
                  <option>Descending</option>
                </select>
              </div>
              <div className="tour-list">
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
                <TourItem tour={{ id: 1, name: "Pokemon Adventure" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourList;
