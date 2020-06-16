import React from "react";
import { Link } from "react-router-dom";
import src from "../../../img/HoiAn01.jpg";
import "./TourItem.scss";

const TourItem = ({ tour }) => {
  return (
    <div className="tour-card">
      <div className="tour-card__heading">
        <Link to={`/tours/${tour.id}`}>
          <img className="tour-card__image" src={src} alt="Tour cover" />
        </Link>
      </div>
      <div className="tour-card__body">
        <Link to={`/tours/${tour.id}`}>
          <h3 className="tour-card__name">Pokemon Adventure</h3>
        </Link>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-clock tour-card__icon"></i>
            <span>10 days</span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-calendar-alt tour-card__icon"></i>
            <span>January 1 2020</span>
          </div>
        </div>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-flag tour-card__icon"></i>
            <span>4 stops</span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-user tour-card__icon"></i>
            <span>Max: 45</span>
          </div>
        </div>
        <div className="tour-card__section">
          <div className="tour-card__data">
            <i className="far fa-star tour-card__icon"></i>
            <span>4.5 (3 Reviews)</span>
          </div>
          <div className="tour-card__data">
            <i className="far fa-money-bill-alt tour-card__icon"></i>
            <span>Price: 350$</span>
          </div>
        </div>
        <p className="tour-card__summary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod,
          temporibus{" "}
          <Link to="/tours/1" className="tour-card__detail">
            Detail.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TourItem;

/*         <h3 className="tour-card__name">{tour.name}</h3>
        <div className="tour-card__data">
          <p className="tour-card__group">
            <i className="far fa-clock tour-card__icon"></i>
            10 days
          </p>
          <p className="tour-card__group">
            <i className="far fa-calendar-alt tour-card__icon"></i>
            January 1 2020
          </p>
        </div>
        <div className="tour-card__data">
          <p className="tour-card__group">
            
          </p>
          <p className="tour-card__group">

          </p>
        </div>
        <p className="tour-card__data">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nisi.
        </p>
        <div className="tour-card__data">
          <div className="tour-card__group">
            4.8 <StarRatingComponent name="tour_rating" /> (2 Review)
          </div>
          <div className="tour-card__group">450$</div>
        </div> */
