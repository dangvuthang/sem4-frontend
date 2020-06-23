import React, { useEffect, useState } from "react";
import useRequest from "../shared/hooks/useRequest";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./Guide.scss";
import StarRatingComponent from "react-star-rating-component";
import TourItem from "../Tour/TourItem/TourItem";
import Comment from "../shared/Comment/Comment";
const Guide = props => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [guide, setGuide] = useState(null);
  const [toursbyGuide, setToursByGuide] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { guideId } = useParams();
  useEffect(() => {
    const getCurrentGuide = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/tours/search?guideId=${guideId}`
      );
      if (data) {
        setGuide(data[0].guideId);
        data.forEach(d => {
          if (d.priceDiscount === 0) d.actualPrice = d.price;
          else d.actualPrice = ((100 - d.priceDiscount) * d.price) / 100;
        });
        setToursByGuide(data);
        const getAllReviewsAboutGuide = await sendRequest(
          `${process.env.REACT_APP_END_POINT}/api/v1/review-guides/${guideId}`
        );
        if (getAllReviewsAboutGuide) setReviews(getAllReviewsAboutGuide);
      }
    };
    getCurrentGuide();
  }, [guideId, sendRequest]);

  return (
    <section className="guide-section">
      <div className="container">
        {guide && (
          <div className="row">
            <div className="col-9">
              <div className="guide-bio">
                <h3 className="guide-bio__profile">Guide</h3>
                <h2 className="guide-bio__name">{guide.userId.name}</h2>
                <p className="guide-bio__job">Tour guide of TravelToVN</p>
                <h3 className="guide-bio__about">About me</h3>
                <p className="guide-bio__description">{guide.description}</p>
              </div>
              <div className="guide-tours">
                <h3 className="guide-tours__total">
                  My Tours ({toursbyGuide.length})
                </h3>
                <div
                  className={`tour-list ${
                    toursbyGuide.length === 1 ? "tour-list--one" : ""
                  }`}
                >
                  {toursbyGuide.map(tour => (
                    <TourItem tour={tour} key={tour.id} />
                  ))}
                </div>
              </div>
              <div className="guide-reviews">
                <h3 className="guide-reviews__title">
                  My Reviews ({reviews.length})
                </h3>
                <div style={{ fontSize: "1.6rem" }}>
                  {reviews.map(review => (
                    <Comment review={review} key={review.id} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="guide-avatar">
                <img
                  src={`${process.env.REACT_APP_END_POINT}/images/${guide.userId.avatarImage}`}
                  alt="Guide"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
                <div className="guide-avatar__rating">
                  <StarRatingComponent
                    value={guide.ratingAverage}
                    name="guideRating"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guide;
