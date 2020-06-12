import React from "react";
import "./Comment.scss";
import StarRatingComponent from "react-star-rating-component";
const Comment = props => {
  return (
    <div className="comment">
      <div className="comment__user">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Guide"
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            marginRight: "1rem",
          }}
        />
        <div>
          <p className="comment__user-time" style={{ color: "#686f7a" }}>
            2 months ago
          </p>
          <p className="comment__user-name">Mark King</p>
        </div>
      </div>
      <div className="comment__content">
        <StarRatingComponent
          className="comment__content-rating"
          value={4}
          name="starRating"
        />
        <p className="comment__content-thought">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
          officiis neque, et nam est optio ipsa excepturi commodi quod ut omnis
          odio ipsum nihil? Hic corrupti facilis quidem praesentium nostrum!
        </p>
      </div>
    </div>
  );
};

export default Comment;
