import React, { useEffect, useState } from "react";
import "./MyReview.scss";
import useRequest from "../../shared/hooks/useRequest";
import DatePicker from "react-date-picker";
import ReviewModal from "../../shared/Modal/ReviewModal";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
const MyReview = ({ user }) => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chosenTour, setChosenTour] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${
          user.id
        }?past=${true}`
      );
      if (data) {
        const checkIfUserHadReviewed = data.filter(
          booking =>
            booking.tourId.reviewTourCollection.filter(
              review => review.userId.id === user.id
            ).length !== 1
        );
        setData(checkIfUserHadReviewed);
      }
    };
    getBookings();
  }, [sendRequest, user.id]);

  const handleOpenReviewModal = tour => {
    setShowModal(true);
    setChosenTour(tour);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {chosenTour && (
        <ReviewModal
          show={showModal}
          onCancel={handleCloseModal}
          tour={chosenTour}
          user={user}
          setData={setData}
          data={data}
        />
      )}
      <div className="account-review">
        <div className="account-review__title">
          <h3 style={{ fontSize: "1.6rem" }}>Write Review & Rating</h3>
          <p style={{ fontSize: "1.5rem" }}>
            Tell us what you think about the tour and guide
          </p>
        </div>
        <p
          style={{
            fontSize: "1.3rem",
            textAlign: "right",
            margin: "1rem 0",
          }}
        >
          Note: Review will be available after your tour end
        </p>
        {isLoading && <LoadingSpinner asOverlay />}
        {data.length === 0 && (
          <p style={{ color: "red", fontSize: "1.6rem" }}>
            No review available at the moment.
          </p>
        )}
        {data.length > 0 && (
          <div className="account-review__list">
            {data.map(item => (
              <div className="account-review__card" key={item.id}>
                <img
                  src={item.tourId.tourImageCover}
                  alt="Cover"
                  className="account-review__image"
                />
                <div className="account-review__card-body">
                  <h3 className="account-review__card-title">
                    {item.tourId.name}
                  </h3>
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <div className="account-review__card-detail">
                      <i className="far fa-calendar tour-detail__icon"></i>
                      <DatePicker
                        value={new Date(item.startDate)}
                        showLeadingZeros
                        format="dd/MM/y"
                        className="account-review__card-date"
                      />
                    </div>
                    <div className="account-review__card-detail">
                      <i className="far fa-calendar-check tour-detail__icon"></i>
                      <DatePicker
                        value={new Date(item.endDate)}
                        showLeadingZeros
                        format="dd/MM/y"
                        className="account-review__card-date"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn--primary"
                    style={{ padding: "1rem 2rem", width: "100%" }}
                    onClick={handleOpenReviewModal.bind(this, item.tourId)}
                  >
                    Write a review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyReview;
