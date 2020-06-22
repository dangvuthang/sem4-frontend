import React, { useEffect, useState } from "react";
import "./Compare.scss";
import moment from "moment";
const Compare = ({ chosenTour, setChosenTour }) => {
  console.log(chosenTour);

  const handleRemoveTour = tourId => {
    console.log(tourId);
    const compareTours = chosenTour.filter(tour => tour.id !== tourId);
    console.log(compareTours);
    setChosenTour(compareTours);
  };

  return (
    <section className="compare-tour">
      <div className="container">
        <div className="compare-tour__header">
          <h3 className="compare-tour__title">Tour Comparision Table</h3>
          <p className="compare-tour__para">
            Get your best tour by comparing your favorite tour with each other.
            We guarantee the best tour at the competitive price{" "}
          </p>
        </div>
        {chosenTour.length === 0 ? (
          <p style={{ color: "red", textAlign: "center", fontSize: "1.6rem" }}>
            Add at least one tour to start comparing
          </p>
        ) : (
          <div className="compare-tour__body">
            <ul className="compare-tour__category">
              <li className="compare-tour__category-by">Tour Name</li>
              <li className="compare-tour__category-by">Price</li>
              <li className="compare-tour__category-by">Rating</li>
              <li className="compare-tour__category-by">Start Date</li>
              <li className="compare-tour__category-by">Duration</li>
              <li className="compare-tour__category-by">Joined</li>
            </ul>
            {chosenTour.map(tour => (
              <ul className="compare-tour__list" key={tour.id}>
                <li className="compare-tour__item">
                  <i
                    className="fas fa-times compare-tour__close"
                    onClick={handleRemoveTour.bind(this, tour.id)}
                  ></i>
                  <div className="compare-tour__item-img">
                    <img
                      src={`${process.env.REACT_APP_END_POINT}/images/${tour.tourImageCover}`}
                      style={{
                        width: "250px",
                        height: "180px",
                        marginBottom: "1rem",
                      }}
                      alt="Cover"
                    />
                    {tour.priceDiscount > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          backgroundColor: "var(--main)",
                          color: "#fff",
                          padding: "1.4rem 2rem",
                          fontSize: "1.4rem",
                        }}
                      >
                        {tour.priceDiscount}% Off
                      </div>
                    )}
                    <h3>{tour.name}</h3>
                  </div>
                </li>
                <li className="compare-tour__item">
                  {tour.priceDiscount === 0 ? (
                    `$${tour.price.toFixed(2)}`
                  ) : (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontSize: "1.3rem",
                          marginRight: "3px",
                        }}
                      >
                        ${tour.price}
                      </span>
                      <span style={{ fontWeight: 700 }}>
                        ${tour.actualPrice.toFixed(2)}
                      </span>
                    </>
                  )}
                </li>
                <li className="compare-tour__item">
                  <i
                    className="fa fa-star"
                    style={{ color: "#ffb400", marginRight: "2px" }}
                  ></i>
                  {tour.ratingAverage}
                </li>
                <li className="compare-tour__item">
                  {moment(tour.startDate).format("DD/MM/YYYY")}
                </li>
                <li className="compare-tour__item">{tour.duration} Days</li>{" "}
                <li className="compare-tour__item">
                  {tour.currentGroupSize}/{tour.maxGroupSize}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Compare;
