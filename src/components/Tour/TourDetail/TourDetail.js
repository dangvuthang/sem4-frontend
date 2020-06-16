import React, { useEffect, useState } from "react";
import "./TourDetail.scss";
import cover from "../../../img/HoiAn01.jpg";
import Map from "../../shared/Map/Map";
import StarRatingComponent from "react-star-rating-component";
import Comment from "../../shared/Comment/Comment";
import useRequest from "../../shared/hooks/useRequest";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/Modal/ErrorModal";
import DatePicker from "react-date-picker";

const TourDetail = () => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const { tourId } = useParams();
  const [tour, setTour] = useState({});
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
  console.log(tour);
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && <ErrorModal onClear={clearError} error={isError} />}
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
                <span>Max: {tour.maxGroupSize}</span>
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
                      <img
                        src="https://randomuser.me/api/portraits/men/90.jpg"
                        alt="Guide"
                        style={{ borderRadius: "50%" }}
                      />
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
                            {tour.guideId ? tour.guideId.ratingAverage : ""}{" "}
                            Rating
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
                          <span>20 Reviews</span>
                        </li>
                      </ul>
                    </div>
                    <div style={{ flex: "4" }}>
                      <p
                        style={{
                          color: "var(--main)",
                          marginBottom: "2rem",
                          fontSize: "2rem",
                        }}
                      >
                        Peter Parker
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nemo autem laudantium consequuntur magni in sunt
                        fugit ipsa, eos sequi quasi tenetur qui itaque error
                        molestiae, sint quae saepe quia maiores?
                      </p>
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
                  <Map />
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
                    <h3 style={{ fontSize: "6rem" }}>4.4</h3>
                    <StarRatingComponent
                      value={4.5}
                      name="tourRating"
                      className="tour-detail__rating-start"
                    />
                    <p style={{ marginBottom: "1rem" }}>Tour Rating</p>
                    <Comment />
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
                  <button className="book">Book Now</button>
                  <button
                    className="book"
                    style={{
                      background: "#eee",
                      color: "var(--heading)",
                      margin: "1rem 0",
                    }}
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
                      <i class="far fa-thumbs-up tour-detail__icon"></i>
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
    </>
  );
};

export default TourDetail;
