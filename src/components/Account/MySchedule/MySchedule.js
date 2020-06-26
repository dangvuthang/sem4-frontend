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
  const [tours, setTours] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getBookings = async () => {
      let url = `${process.env.REACT_APP_END_POINT}/api/v1/`;
      if (user.roleId.id === 2)
        url += `tours/search?guideId=${user.guideId.id}`;
      if (user.roleId.id === 3) url += `bookings/${user.id}?upcoming=${true}`;
      const data = await sendRequest(url);
      if (data) {
        setTours(data);
        if (user.roleId.id === 2) {
          const data = await sendRequest(
            `${process.env.REACT_APP_END_POINT}/api/v1/bookings/${
              user.id
            }?upcoming=${true}`
          );
          if (data) {
            setBookings(data);
          }
        }
      }
    };
    getBookings();
  }, [sendRequest, user]);

  const userResult = (
    <React.Fragment>
      <h3 className="account-schedule__guide">Your Schedule</h3>
      {_.orderBy(bookings, ["createdAt"], "asc").map(booking => (
        <div className="account-schedule__card" key={booking.id}>
          <h3 className="account-schedule__card-name">{booking.tourId.name}</h3>
          <p className="account-schedule__card-member">
            {" "}
            <i className="far fa-user tour-card__icon"></i>Number of members:{" "}
            {booking.quantity}
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
              setDate([new Date(booking.startDate), new Date(booking.endDate)])
            }
          >
            View on calendar
          </button>
        </div>
      ))}
    </React.Fragment>
  );

  const guideResult = (
    <>
      <h3 className="account-schedule__guide">Your Tour Schedule</h3>
      {_.orderBy(tours, ["startDate"], "asc").map(tour => (
        <div className="account-schedule__card" key={tour.id}>
          <h3 className="account-schedule__card-name">{tour.name}</h3>
          <p className="account-schedule__card-member">
            {" "}
            <i className="far fa-user tour-card__icon"></i>Current group size:{" "}
            {tour.currentGroupSize}/{tour.maxGroupSize}
          </p>
          <ul>
            <li style={{ marginBottom: "1rem" }}>
              <i className="far fa-calendar tour-detail__icon"></i>
              <DatePicker
                value={new Date(tour.startDate)}
                showLeadingZeros
                format="dd/MM/y"
                className="includes__date"
              />
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <i className="far fa-calendar-check tour-detail__icon"></i>
              <DatePicker
                value={new Date(tour.endDate)}
                showLeadingZeros
                format="dd/MM/y"
                className="includes__date"
              />
            </li>
          </ul>

          <button
            className="account-schedule__card-view"
            onClick={() =>
              setDate([new Date(tour.startDate), new Date(tour.endDate)])
            }
          >
            View on calendar
          </button>
        </div>
      ))}
    </>
  );

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
        <div className="account-schedule__body">
          {user.roleId.id === 3 && (
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
                  userResult
                )}
              </div>
            </div>
          )}
          {user.roleId.id === 2 && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Calendar value={date} />
              </div>
              <div className="grid">
                <div>{userResult}</div>
                <div>{guideResult}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MySchedule;
