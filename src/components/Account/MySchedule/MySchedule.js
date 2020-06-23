import React, { useEffect, useState } from "react";
import "./MySchedule.scss";
import Calendar from "react-calendar";
import useRequest from "../../shared/hooks/useRequest";
import ErrorModal from "../../shared/Modal/ErrorModal";
import DatePicker from "react-date-picker";
import _ from "lodash";
const MySchedule = ({ user }) => {
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const getBookings = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${user.id}`
      );
      console.log(data);
      if (data) {
        setBookings(
          data.filter(booking => new Date(booking.startDate) > new Date())
        );
      }
    };
    getBookings();
  }, [sendRequest, user.id]);

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <div className="account-schedule">
        <div className="account-schedule__title">
          <h3 style={{ fontSize: "1.6rem" }}>My Schedule</h3>
          <p style={{ fontSize: "1.5rem" }}>
            View your upcoming plan in one place
          </p>
        </div>
        {bookings.length >= 0 && (
          <div className="account-schedule__body">
            <div className="row">
              <div style={{ flex: "1" }}>
                <Calendar value={date} />
              </div>
              <div style={{ flex: "1" }}>
                {bookings.length === 0 ? (
                  <p style={{ fontSize: "1.6rem", color: "red" }}>
                    No upcoming tours in your schedule
                  </p>
                ) : (
                  _.orderBy(bookings, ["createdAt"], "asc").map(booking => (
                    <div className="account-schedule__card" key={booking.id}>
                      <h3 className="account-schedule__card-name">
                        {booking.tourId.name}
                      </h3>
                      <p className="account-schedule__card-member">
                        {" "}
                        <i className="far fa-user tour-card__icon"></i>Number of
                        members: {booking.quantity}
                      </p>
                      <ul>
                        <li style={{ marginBottom: "1rem" }}>
                          <i className="far fa-calendar tour-detail__icon"></i>
                          <DatePicker
                            value={new Date(booking.startDate)}
                            showLeadingZeros
                            format="dd/MM/y"
                            className="includes__date"
                          />
                        </li>
                        <li style={{ marginBottom: "1rem" }}>
                          <i className="far fa-calendar-check tour-detail__icon"></i>
                          <DatePicker
                            value={new Date(booking.endDate)}
                            showLeadingZeros
                            format="dd/MM/y"
                            className="includes__date"
                          />
                        </li>
                      </ul>
                      <button
                        className="account-schedule__card-view"
                        onClick={() =>
                          setDate([
                            new Date(booking.startDate),
                            new Date(booking.endDate),
                          ])
                        }
                      >
                        View on calendar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MySchedule;
