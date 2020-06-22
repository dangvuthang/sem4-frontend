import React, { useEffect, useState } from "react";
import useRequest from "../../shared/hooks/useRequest";
import "./MyPurchase.scss";
import moment from "moment";
import Modal from "../../shared/Modal/Modal";
import ErrorModal from "../../shared/Modal/ErrorModal";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import _ from "lodash";
const MyPurchase = ({ user }) => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chosenBooking, setChosenBooking] = useState(null);
  useEffect(() => {
    const getBookings = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${user.id}`
      );
      if (data) {
        setBookings(data);
      }
    };
    getBookings();
  }, [sendRequest, user.id]);

  const handleOpenModal = booking => {
    setShowModal(true);
    setChosenBooking(booking);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmCancelTour = async e => {
    e.preventDefault();
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${chosenBooking.id}`,
      "DELETE"
    );
    if (data) {
      const listOfBookins = bookings.filter(
        booking => booking.id !== chosenBooking.id
      );
      setBookings(listOfBookins);
      setChosenBooking(null);
      setShowModal(false);
      toast.success("Successfully cancel your booking");
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onCancel={handleCloseModal}
        headerContent="Are your sure?"
        headerClass="error-header"
        footerClass="error-footer"
        onSubmitForm={handleConfirmCancelTour}
        footerContent={
          <>
            <button
              type="submit"
              className="btn btn--error"
              style={{ marginRight: "1rem" }}
            >
              Agree
            </button>
            <button
              type="button"
              className="btn btn--muted"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </>
        }
      >
        <p style={{ fontSize: "1.5rem", padding: "1rem" }}>
          Cancel tour means you will only receive 90% of the total amount of
          money back (
          {chosenBooking && `$${((90 * chosenBooking.price) / 100).toFixed(2)}`}
          )
        </p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <div className="account-purchase">
        <div className="account-purchase__title">
          <h3 style={{ fontSize: "1.6rem" }}>My Purchase</h3>
          <p style={{ fontSize: "1.5rem" }}>View and manage your booking</p>
        </div>
        <table className="account-purchase__table">
          <thead>
            <tr>
              <th>No: </th>
              <th>Booking Date</th>
              <th>Tour Name</th>
              <th>From</th>
              <th>To</th>
              <th>Members</th>
              <th>Price</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {_.orderBy(bookings, ["createdAt"], "asc").map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>
                  {moment(booking.createdAt).format("DD/MM/YYYY, hh:mm:ss")}
                </td>
                <td>{booking.tourId.name}</td>
                <td>{moment(booking.tourId.startDate).format("DD/MM/YYYY")}</td>
                <td>{moment(booking.tourId.endDate).format("DD/MM/YYYY")}</td>
                <td style={{ textAlign: "center" }}>{booking.quantity}</td>
                <td style={{ textAlign: "center" }}>
                  ${booking.price.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn--error"
                    style={{ padding: "1rem 1.5rem" }}
                    disabled={
                      new Date(booking.tourId.startDate) < Date.now() ||
                      Date.now() >
                        moment(booking.tourId.startDate).subtract(30, "d")
                    }
                    onClick={handleOpenModal.bind(this, booking)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="account-purchase__note">
          *Note: You can only cancel booking before the starting date up to 30
          days.
        </p>
      </div>
    </>
  );
};

export default MyPurchase;
