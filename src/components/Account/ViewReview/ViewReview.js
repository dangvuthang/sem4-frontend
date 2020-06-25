import React, { useEffect, useState } from "react";
import "./ViewReview.scss";
import useRequest from "../../shared/hooks/useRequest";
import Comment from "../../shared/Comment/Comment";
const ViewReview = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  useEffect(() => {
    const getAllReviews = async () => {
      const getAllReviewsAboutGuide = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/review-guides/${user.guideId.id}`
      );
      if (getAllReviewsAboutGuide) setReviews(getAllReviewsAboutGuide);
    };
    getAllReviews();
  }, [sendRequest, user]);

  return (
    <div className="view-review">
      <div className="view-review__title">
        <h3 style={{ fontSize: "1.6rem" }}>My Review & Rating</h3>
        <p style={{ fontSize: "1.5rem" }}>See what other user say about you</p>
      </div>
      <div className="view-review__body">
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
    </div>
  );
};

export default ViewReview;
