import React, { useEffect, useState } from "react";
import useRequest from "../../shared/hooks/useRequest";
import "./MyPurchase.scss";
import moment from "moment";
import Modal from "../../shared/Modal/Modal";
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

  const handleCanceltour = () => {};

  return (
    <>
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
              <th>Price</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>
                  {moment(booking.createdAt).format("DD/MM/YYYY, hh:mm:ss")}
                </td>
                <td>{booking.tourId.name}</td>
                <td>{moment(booking.tourId.startDate).format("DD/MM/YYYY")}</td>
                <td>{moment(booking.tourId.endDate).format("DD/MM/YYYY")}</td>
                <td style={{ textAlign: "center" }}>
                  ${booking.price.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn--error"
                    style={{ padding: "1rem 1.5rem" }}
                    disabled={new Date(booking.tourId.startDate) < new Date()}
                    onClick={handleCanceltour}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="account-purchase__note">
          *Note: You can only cancel chosenBooking up to 30 days.
        </p>
      </div>
    </>
  );
};

export default MyPurchase;
