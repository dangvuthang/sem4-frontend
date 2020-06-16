import React from "react";
import { Link } from "react-router-dom";
import "./TourItem.scss";
const TourItem = ({ tour }) => {
  return (
    <div className="tour-card">
      <div className="tour-card__heading">
        <Link to={`/tours/${tour.id}`}>
          <img
            className="tour-card__image"
            src={`${process.env.REACT_APP_END_POINT}/images/${tour.tourImageCover}`}
            alt="Tour cover"
          />
          {tour.priceDiscount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                backgroundColor: "var(--main)",
                color: "#fff",
                padding: "1.4rem 2rem",
                fontSize: "1.4rem",
              }}
            >
              {tour.priceDiscount}% Off
            </div>
          )}
        </Link>
      </div>
      <div className="tour-card__body">
        <Link to={`/tours/${tour.id}`}>
          <h3 className="tour-card__name">{tour.name}</h3>
        </Link>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-clock tour-card__icon"></i>
            <span>{tour.duration} days</span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-calendar-alt tour-card__icon"></i>
            <span>{tour.startDate.split("-").reverse().join("/")}</span>
          </div>
        </div>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-flag tour-card__icon"></i>
            <span>{tour.tourLocationCollection.length} stops</span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-user tour-card__icon"></i>
            <span>Max: {tour.maxGroupSize}</span>
          </div>
        </div>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-star tour-card__icon"></i>
            <span>
              {tour.ratingAverage} (
              {tour.reviewTourCollection.length > 1
                ? `${tour.reviewTourCollection.length} Reviews`
                : `${tour.reviewTourCollection.length} Review`}
              )
            </span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-money-bill-alt tour-card__icon"></i>
            <span>
              Price: $
              {tour.priceDiscount === 0 ? (
                tour.price
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      fontSize: "1.3rem",
                      marginRight: "3px",
                    }}
                  >
                    {tour.price}
                  </span>
                  <span style={{ fontWeight: 700 }}>{tour.actualPrice}</span>
                </>
              )}
            </span>
          </div>
        </div>
        <p className="tour-card__summary">
          {tour.summary}{" "}
          <Link to={`/tours/${tour.id}`} className="tour-card__detail">
            Detail.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TourItem;
