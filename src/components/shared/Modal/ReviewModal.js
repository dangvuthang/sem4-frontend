import React, { useState } from "react";
import Modal from "./Modal";
import "./ReviewModal.scss";
import StarRating from "react-star-rating-component";
import Label from "../Label/Label";
import useRequest from "../hooks/useRequest";
import { toast } from "react-toastify";
const ReviewModal = ({ show, onCancel, tour, user, setData, data }) => {
  const [page, setPage] = useState(1);
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [reviewContent, setReviewContent] = useState({
    tourRating: 0,
    tourComment: "",
    guideRating: 0,
    guideComment: "",
  });

  const handleSetReview = e => {
    const element = e.target;
    setReviewContent({ ...reviewContent, [element.id]: element.value });
  };

  const handleChangePage = e => {
    const { tourRating, tourComment } = reviewContent;
    if (page === 1) {
      if (tourRating === 0) return toast.warn("Tour Rating is required");
      if (tourComment.length === 0) return toast.warn("Comment is required");
      if (tourComment.length < 6)
        return toast.warn("Comment must be at least 6 characters");
      return setPage(2);
    }
    setPage(1);
  };

  const handleSubmitReview = async e => {
    e.preventDefault();
    const { guideRating, guideComment } = reviewContent;
    if (guideRating === 0) return toast.warn("Guide Rating is required");
    if (guideComment.length === 0) return toast.warn("Comment is required");
    if (guideComment.length < 6)
      return toast.warn("Comment must be at least 6 characters");
    const submitReviewTour = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/review-tours`,
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        userId: user.id,
        tourId: tour.id,
        rating: reviewContent.tourRating,
        review: reviewContent.tourComment,
      })
    );
    if (submitReviewTour) {
      const submitReviewGuide = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/review-guides`,
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          userId: user.id,
          guideId: tour.guideId.id,
          rating: reviewContent.guideRating,
          review: reviewContent.guideComment,
        })
      );
      if (submitReviewGuide) toast.success("Successfully submit review");
      onCancel();
      setData(data.filter(t => t.tourId.id !== tour.id));
      setReviewContent({
        tourRating: 0,
        tourComment: "",
        guideRating: 0,
        guideComment: "",
      });
    }
  };

  return (
    <Modal
      className="review-modal"
      show={show}
      onCancel={onCancel}
      headerContent={
        page === 1
          ? `Review ${tour.name}`
          : `Review ${tour.guideId.userId.name}`
      }
      headerClass="review-header"
      contentClass="review-content"
      footerClass="review-footer"
      onSubmitForm={handleSubmitReview}
      footerContent={
        page === 1 ? (
          <button
            type="button"
            className="btn btn--info"
            onClick={handleChangePage}
          >
            Next
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn--info"
              style={{ marginRight: "1rem" }}
              onClick={handleChangePage}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn--info"
              onClick={handleSubmitReview}
            >
              Submit
            </button>
          </>
        )
      }
    >
      <div className="review-content__grid">
        {page === 1 ? (
          <div className="review-content__item">
            <Label name="How do you rate your overall experience?">
              <StarRating
                className="review-content__star"
                name="tourRating"
                value={reviewContent.tourRating}
                onStarClick={(nextValue, prevValue, name) =>
                  handleSetReview({ target: { id: name, value: nextValue } })
                }
              />
            </Label>
            <Label name="Comments">
              <textarea
                id="tourComment"
                className="review-content__comment"
                value={reviewContent.tourComment}
                onChange={handleSetReview}
              />
            </Label>
          </div>
        ) : (
          <div className="review-content__item">
            <img
              src={`${process.env.REACT_APP_END_POINT}/images/${tour.guideId.userId.avatarImage}`}
              alt="avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <Label name="How do you rate our tour guide?">
              <StarRating
                className="review-content__star"
                name="guideRating"
                value={reviewContent.guideRating}
                onStarClick={(nextValue, prevValue, name) =>
                  handleSetReview({ target: { id: name, value: nextValue } })
                }
              />
            </Label>
            <Label name="Comments">
              <textarea
                id="guideComment"
                className="review-content__comment"
                value={reviewContent.guideComment}
                onChange={handleSetReview}
              />
            </Label>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
