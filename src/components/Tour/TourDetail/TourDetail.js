import React, { useEffect, useState, useContext } from "react";
import "./TourDetail.scss";
import Map from "../../shared/Map/Map";
import StarRatingComponent from "react-star-rating-component";
import Comment from "../../shared/Comment/Comment";
import useRequest from "../../shared/hooks/useRequest";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/Modal/ErrorModal";
import DatePicker from "react-date-picker";
import BookingModal from "../../shared/Modal/BookingModal";
import AuthContext from "../../shared/context/authContext";
import { toast } from "react-toastify";
import _ from "lodash";
const TourDetail = ({ chosenTour, setChosenTour }) => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [numberOfBookings, setNumberOfBookings] = useState(1);
  const [isBook, setIsBook] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useContext(AuthContext);
  const { tourId } = useParams();
  const [tour, setTour] = useState({});
  const handleOnModalOpen = e => {
    e.preventDefault();
    if (!auth.user) return toast.warning("Please login to proceed booking ...");
    setIsModalOpen(true);
  };
  const handleOnModalClose = e => {
    setIsModalOpen(false);
  };

  const handleCompareTour = () => {
    if (chosenTour.find(cTour => cTour.id === tour.id))
      return toast.success("Tour already in Compare");
    setChosenTour([...chosenTour, tour]);
    toast.success("Added Tour To Compare");
  };

  useEffect(() => {
    const getTour = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/tours/${tourId}`
      );
      if (data) {
        if (data.priceDiscount === 0) data.actualPrice = data.price;
        else data.actualPrice = ((100 - data.priceDiscount) * data.price) / 100;
        setTour(data);
      }
      console.log(data);
    };
    getTour();
  }, [tourId, sendRequest]);

  const imageCoverStyle = {
    backgroundImage: `linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${process.env.REACT_APP_END_POINT}/images/${tour.tourImageCover})`,
  };

  return (
    <>
      {tour && auth.user && (
        <BookingModal
          show={isModalOpen}
          onClear={handleOnModalClose}
          tour={tour}
          user={auth.user}
          numberOfBookings={numberOfBookings}
          setNumberOfBookings={setNumberOfBookings}
          setIsBook={setIsBook}
        />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      {Object.keys(tour).length > 0 && (
        <section className="tour-detail">
          <div className="tour-detail__image-cover" style={imageCoverStyle}>
            <div className="tour-detail__image-content">
              <h3 className="tour-detail__name">{tour.name}</h3>
              <p className="tour-detail__summary">{tour.summary}</p>
            </div>
          </div>
          <div className="tour-detail__info">
            <div className="container">
              <div className="tour-detail__section">
                <div className="tour-detail__data">
                  <i className="far fa-clock tour-detail__icon"></i>
                  <span>{tour.duration} days</span>
                </div>
                <div className="tour-detail__data">
                  <i className="far fa-flag tour-detail__icon"></i>
                  <span>
                    {tour.tourLocationCollection
                      ? tour.tourLocationCollection.length
                      : 0}{" "}
                    stops
                  </span>
                </div>
                <div className="tour-detail__data">
                  <i className="far fa-user tour-detail__icon"></i>
                  <span>Max: {tour.maxGroupSize} People</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tour-detail__description">
            <div className="container">
              <div className="row">
                <div style={{ flex: "3", marginRight: "2rem" }}>
                  <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "1rem",
                    }}
                  >
                    <h3 className="tour-detail__description-title">
                      Description
                    </h3>
                    <p className="tour-detail__description-paragraph">
                      {tour.description}
                    </p>
                  </div>
                  <div
                    className="tour-detail__guide"
                    style={{ margin: "2rem 0" }}
                  >
                    <h3
                      style={{
                        fontSize: "2.5rem",
                        fontFamily: "var(--play)",
                        marginBottom: "1rem ",
                      }}
                    >
                      Your Guides
                    </h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: "1" }}>
                        <Link to={`/guides/${tour.guideId.id}`}>
                          <img
                            src={`${process.env.REACT_APP_END_POINT}/images/${tour.guideId.userId.avatarImage}`}
                            alt="Guide"
                            style={{
                              borderRadius: "50%",
                              width: "100px",
                              height: "100px",
                            }}
                          />
                        </Link>
                        <ul>
                          <li>
                            <i
                              className="fas fa-star"
                              style={{
                                color: "#111",
                                margin: "1rem",
                                marginLeft: "1rem",
                              }}
                            ></i>
                            <span>
                              {tour.guideId.ratingAverage}{" "}
                              {tour.guideId.ratingAverage > 1
                                ? "Stars"
                                : "Star"}
                            </span>
                          </li>
                          <li>
                            <i
                              className="fas fa-comment"
                              style={{
                                color: "#111",
                                margin: "1rem",
                                marginLeft: "1rem",
                              }}
                            ></i>
                            <span>
                              {tour.guideId.numberOfRatings}{" "}
                              {tour.guideId.numberOfRatings > 1
                                ? "Reviews"
                                : "Review"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div style={{ flex: "4" }}>
                        <Link to={`/guides/${tour.guideId.id}`}>
                          <p
                            style={{
                              color: "var(--main)",
                              marginBottom: "2rem",
                              fontSize: "2rem",
                            }}
                          >
                            {tour.guideId.userId.name}
                          </p>
                        </Link>
                        <p>{tour.guideId.description}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tour-detail__guide"
                    style={{ margin: "2rem 0" }}
                  >
                    <h3
                      style={{
                        fontSize: "2.5rem",
                        fontFamily: "var(--play)",
                        marginBottom: "3rem ",
                      }}
                    >
                      Tour Location &amp; Schedule
                    </h3>
                    {/* <Map location={tour.tourLocationCollection} /> */}
                  </div>
                  <div
                    className="tour-detail__guide"
                    style={{ margin: "2rem 0" }}
                  >
                    <h3
                      style={{
                        fontSize: "2.5rem",
                        fontFamily: "var(--play)",
                        marginBottom: "1rem ",
                      }}
                    >
                      Review
                    </h3>
                    <div>
                      <h3 style={{ fontSize: "6rem" }}>{tour.ratingAverage}</h3>
                      <StarRatingComponent
                        value={tour.ratingAverage}
                        name="tourRating"
                        className="tour-detail__rating-start"
                      />
                      <p style={{ marginBottom: "1rem" }}>Tour Rating</p>
                      {_.orderBy(
                        tour.reviewTourCollection,
                        ["createdAt"],
                        "asc"
                      ).map(review => (
                        <Comment review={review} key={review.id} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="fixed" style={{ flex: "1" }}>
                  <div>
                    <div className="price">
                      {tour.priceDiscount === 0 ? (
                        <span>${tour.actualPrice}</span>
                      ) : (
                        <>
                          <span>${tour.actualPrice}</span>
                          <span
                            style={{
                              textDecoration: "line-through",
                              fontSize: "1.8rem",
                              color: "#8a92a3",
                              margin: "0 1rem",
                            }}
                          >
                            ${tour.price}
                          </span>
                          <span
                            style={{
                              fontSize: "1.8rem",
                              color: "#8a92a3",
                            }}
                          >
                            {tour.priceDiscount}% Off
                          </span>
                        </>
                      )}
                    </div>
                    <p
                      style={{
                        color: "red",
                        fontSize: "1.3rem",
                        textAlign: "right",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Available for booking:{" "}
                      {isBook
                        ? tour.maxGroupSize -
                          tour.currentGroupSize -
                          numberOfBookings
                        : tour.maxGroupSize - tour.currentGroupSize}
                    </p>
                    <button
                      className="book"
                      onClick={handleOnModalOpen}
                      disabled={isBook}
                    >
                      {isBook ? "Already Booked" : "Book Now"}
                    </button>
                    <button
                      className="book"
                      style={{
                        background: "#eee",
                        color: "var(--heading)",
                        margin: "1rem 0",
                      }}
                      onClick={handleCompareTour}
                    >
                      Compare Tour
                    </button>
                    <p style={{ margin: "1rem 0" }}>Price includes: </p>
                    <ul className="includes">
                      <li>
                        <i className="far fa-thumbs-up tour-detail__icon"></i>
                        Hotel Price
                      </li>
                      <li>
                        <i className="far fa-thumbs-up tour-detail__icon"></i>
                        Breakfast, Lunch and Dinner
                      </li>
                      <li>
                        <i className="far fa-thumbs-up tour-detail__icon"></i>
                        Transportaion
                      </li>
                      <li>
                        <i className="far fa-thumbs-up tour-detail__icon"></i>
                        Accomadation
                      </li>
                      <li>
                        <i className="far fa-thumbs-up tour-detail__icon"></i>
                        Entrance Fee
                      </li>
                    </ul>
                    <ul className="includes">
                      <p style={{ margin: "1rem 0" }}>Schedule: </p>
                      <li>
                        <i className="far fa-calendar tour-detail__icon"></i>
                        <DatePicker
                          value={tour.startDate ? new Date(tour.startDate) : ""}
                          showLeadingZeros
                          format="dd/MM/y"
                          className="includes__date"
                        />
                      </li>
                      <li>
                        <i className="far fa-calendar-check tour-detail__icon"></i>
                        <DatePicker
                          value={tour.endDate ? new Date(tour.endDate) : ""}
                          showLeadingZeros
                          format="dd/MM/y"
                          className="includes__date"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TourDetail;
