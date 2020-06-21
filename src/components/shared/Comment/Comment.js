import React from "react";
import "./Comment.scss";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
const Comment = ({ review }) => {
  return (
    <div className="comment">
      <div className="comment__user">
        <img
          src={`${process.env.REACT_APP_END_POINT}/images/${review.userId.avatarImage}`}
          alt="User"
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            marginRight: "1rem",
          }}
        />
        <div>
          <p className="comment__user-time" style={{ color: "#686f7a" }}>
            {moment(review.createdAt).fromNow()}
          </p>
          <p className="comment__user-name">{review.userId.name}</p>
        </div>
      </div>
      <div className="comment__content">
        <StarRatingComponent
          className="comment__content-rating"
          value={review.rating}
          name="starRating"
        />
        <p className="comment__content-thought">{review.review}</p>
      </div>
    </div>
  );
};

export default Comment;
