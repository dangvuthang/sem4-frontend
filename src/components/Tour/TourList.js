import React, { useEffect, useState } from "react";
import "./TourList.scss";
import TourItem from "./TourItem/TourItem";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import useRequest from "../shared/hooks/useRequest";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../shared/Modal/ErrorModal";
import Pagination from "./Pagination/Pagination";
import paginate from "../../utils/paginate";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import parseParams from "../../utils/parseParams";
const pageSize = 6;
const TourList = props => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const location = useLocation();
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    order: "asc",
    category: "actualPrice",
  });
  const [filter, setFilter] = useState({
    search: "",
    duration: "",
    minPrice: "",
    maxPrice: "",
    rating: 0,
    startDate: "",
  });

  useEffect(() => {
    let url = `${process.env.REACT_APP_END_POINT}/api/v1/tours`;
    if (location.search) {
      url += "/search?";
      const paramsObj = parseParams(location.search);
      for (const key in paramsObj) {
        url += `${key}=${paramsObj[key]}&`;
      }
    }
    const getTours = async () => {
      const data = await sendRequest(url);
      if (data) {
        data.forEach(d => {
          if (d.priceDiscount === 0) d.actualPrice = d.price;
          else d.actualPrice = ((100 - d.priceDiscount) * d.price) / 100;
        });
        setTours(data);
      }
    };
    getTours();
  }, [sendRequest, setTours, location]);

  const actualData = (() => {
    let filterItems = tours;
    const { search, duration, minPrice, maxPrice, rating, startDate } = filter;

    if (search)
      filterItems = filterItems.filter(tour =>
        tour.name.toLowerCase().includes(search.toLowerCase())
      );
    if (duration)
      filterItems = filterItems.filter(tour => {
        if (parseInt(duration) === 4) return tour.duration <= 4;
        if (parseInt(duration) === 6)
          return tour.duration > 4 && tour.duration <= 7;
        if (parseInt(duration) === 7) return tour.duration >= 7;
        return tour;
      });
    if (minPrice)
      filterItems = filterItems.filter(tour => tour.actualPrice >= minPrice);
    if (maxPrice)
      filterItems = filterItems.filter(tour => tour.actualPrice <= maxPrice);
    if (rating)
      filterItems = filterItems.filter(
        tour => tour.ratingAverage >= parseInt(rating)
      );
    if (startDate)
      filterItems = filterItems.filter(
        tour =>
          startDate.toLocaleDateString() ===
          new Date(tour.startDate).toLocaleDateString()
      );
    const sortedItems = _.orderBy(filterItems, [sort.category], sort.order);
    return sortedItems;
  })();

  const paginateItems = paginate(currentPage, pageSize, actualData);

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <section className="tour-section">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Filter filter={filter} setFilter={setFilter} />
            </div>
            <div className="col-9">
              <div className="tour-result">
                <Sort sort={sort} setSort={setSort} />
                {isLoading && <LoadingSpinner asOverlay />}
                <div
                  className={`tour-list ${
                    paginateItems.length === 1 || actualData.length === 1
                      ? "tour-list--one"
                      : ""
                  }`}
                >
                  {tours.length >= 0 && actualData.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: "1.8rem",
                      }}
                    >
                      No tours meet your requirement. Try again !!!
                    </p>
                  ) : (
                    paginateItems.map(tour => (
                      <TourItem tour={tour} key={tour.id} />
                    ))
                  )}
                </div>
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  numberOfItems={actualData.length}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourList;
