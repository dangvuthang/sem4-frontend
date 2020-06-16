import React, { useEffect, useContext, useState } from "react";
import "./Account.scss";
import AuthContext from "../shared/context/authContext";
import useRequest from "../shared/hooks/useRequest";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../shared/Modal/ErrorModal";
import { Link } from "react-router-dom";
import MyInfo from "./MyInfo";
const Account = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, isError, sendRequest, clearError] = useRequest();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!auth.user) return;
      const user = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/users/${auth.user.email}`
      );
      setUser(user);
    };
    getCurrentUser();
  }, [auth.user, sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      {user && (
        <section className="account">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="account-control">
                  <div className="account-control__avatar">
                    <img
                      src={
                        auth.user.avatarImage.startsWith("http")
                          ? auth.user.avatarImage
                          : `${process.env.REACT_APP_END_POINT}/images/${auth.user.avatarImage}`
                      }
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      alt="User"
                    />
                  </div>
                  <h3 style={{ fontSize: "1.6rem", margin: "1rem 0" }}>
                    {user.name}
                  </h3>
                  <ul className="account-control__list">
                    <li className="account-control__item">
                      <Link to="/account" className="account-control__link">
                        My Account
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <Link to="/account" className="account-control__link">
                        Purchase History
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <Link to="/account" className="account-control__link">
                        My Schedule
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <Link to="/account" className="account-control__link">
                        My Rating &amp; Review
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <Link to="/account" className="account-control__link">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-9">
                <MyInfo user={user} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
