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
import { toast } from "react-toastify";
const pageSize = 6;
const TourList = props => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    order: "asc",
    category: "price",
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
    const getTours = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/tours`
      );
      if (data) setTours(data);
    };
    getTours();
  }, [sendRequest, setTours]);

  const actualDate = (() => {
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
      });
    if (minPrice)
      filterItems = filterItems.filter(tour => tour.price >= minPrice);
    if (maxPrice)
      filterItems = filterItems.filter(tour => tour.price <= maxPrice);
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
                <div
                  className="tour-list"
                  style={
                    actualDate.length === 1
                      ? { gridTemplateColumns: "40rem" }
                      : null
                  }
                >
                  {isLoading && <LoadingSpinner asOverlay />}
                  {paginate(currentPage, pageSize, actualDate).map(tour => (
                    <TourItem tour={tour} key={tour.id} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  numberOfItems={actualDate.length}
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
