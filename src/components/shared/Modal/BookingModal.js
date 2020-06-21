import React, { useState, useContext } from "react";
import "./BookingModal.scss";
import Modal from "./Modal";
import _ from "lodash";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../hooks/useRequest";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
const BookingModal = ({ show, onClear, tour, user }) => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [numberOfBookings, setNumberOfBookings] = useState(1);
  const handleBookingTour = async (token, address) => {
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${user.email}`,
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        email: user.email,
        tourId: tour.id,
        quantity: numberOfBookings,
        price: numberOfBookings * tour.actualPrice,
      })
    );
    if (data) {
      toast.success(data.message);
    }
  };

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <Modal
        style={{ width: "50rem" }}
        onCancel={onClear}
        headerClass="booking-header"
        headerContent="Booking Form"
        contentClass="booking-content"
        show={show}
        footerClass="booking-footer"
        footerContent={
          <button className="btn btn--booking" onClick={onClear}>
            Cancel
          </button>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src={`${process.env.REACT_APP_END_POINT}/images/${tour.tourImageCover}`}
            alt="Cover"
            style={{ width: "5rem", height: "5rem" }}
          />
          <h3 style={{ margin: "0 1rem" }}>{tour.name}</h3>
          <span>X {numberOfBookings} =</span>
          <span
            style={{
              margin: "0 0.5rem",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            ${tour.actualPrice * numberOfBookings}
          </span>
          {tour.priceDiscount > 0 && (
            <>
              {" "}
              <span
                style={{
                  textDecoration: "line-through",
                  fontSize: "1.5rem",
                  color: "#8A92A3",
                  margin: "0 0.5rem",
                }}
              >
                ${tour.price * numberOfBookings}
              </span>
              <span style={{ fontSize: "1.5rem", color: "#8A92A3" }}>
                ${tour.priceDiscount}% Off
              </span>{" "}
            </>
          )}
        </div>
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Number of members: </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="far fa-user tour-detail__icon"></i>
            <select
              value={numberOfBookings}
              style={{
                outline: "none",
                border: "1px solid #e5e5e5",
                width: "15rem",
                padding: "1rem 0",
                paddingLeft: "1rem",
                paddingRight: "3rem",
                color: "#7f7f7f",
                fontSize: "1.5rem",
                marginRight: "0.5rem",
              }}
              onChange={e => setNumberOfBookings(e.target.value)}
            >
              {_.range(1, tour.maxGroupSize - tour.currentGroupSize + 1).map(
                number => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                )
              )}
            </select>
            <StripeCheckout
              name={tour.name}
              stripeKey={process.env.REACT_APP_STRIPE}
              token={handleBookingTour}
              amount={tour.actualPrice * numberOfBookings * 100}
              email={user.email}
            ></StripeCheckout>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;
