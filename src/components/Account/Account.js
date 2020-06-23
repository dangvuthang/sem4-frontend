import React, { useEffect, useContext, useState } from "react";
import "./Account.scss";
import AuthContext from "../shared/context/authContext";
import useRequest from "../shared/hooks/useRequest";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../shared/Modal/ErrorModal";
import { Link, useLocation, useHistory } from "react-router-dom";
import MyInfo from "./MyInfo/MyInfo";
import MySchedule from "./MySchedule/MySchedule";
import MyPurchase from "./MyPurchase/MyPurchase";
import MyReview from "./MyReview/MyReview";
import Modal from "../shared/Modal/Modal";
import { toast } from "react-toastify";
const Account = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const location = useLocation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
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
  console.log(user);
  const handleLogout = () => {
    history.push("/");
    auth.logout();
  };

  const handleDeactive = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDeactive = async () => {
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/users/${user.email}`,
      "DELETE"
    );
    if (data) {
      setShowModal(false);
      history.push("/");
      auth.logout();
      toast.success("Successfully deactive your account");
    }
  };
  console.log(user);
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <Modal
        show={showModal}
        onCancel={handleCloseModal}
        headerContent="Are your sure?"
        headerClass="error-header"
        footerClass="error-footer"
        footerContent={
          <>
            <button
              type="button"
              className="btn btn--error"
              onClick={handleConfirmDeactive}
              style={{ marginRight: "1rem" }}
            >
              Proceed
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
          Deactive your account means you can not login anymore. Do you really
          want to deactive your account?
        </p>
      </Modal>
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
                    {user.roleId.id === 3 && (
                      <li className="account-control__item">
                        <Link
                          to="/account?myPurchase"
                          className="account-control__link"
                        >
                          Purchase History
                        </Link>
                      </li>
                    )}
                    <li className="account-control__item">
                      <Link
                        to="/account?mySchedule"
                        className="account-control__link"
                      >
                        My Schedule
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <Link
                        to="/account?myReview"
                        className="account-control__link"
                      >
                        Write Rating &amp; Review
                      </Link>
                    </li>
                    <li className="account-control__item">
                      <button
                        className="account-control__link"
                        onClick={handleDeactive}
                      >
                        Deactivate My Account
                      </button>
                    </li>
                    <li className="account-control__item">
                      <button
                        className="account-control__link"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-9">
                {location.search === "" && location.pathname === "/account" && (
                  <MyInfo user={user} />
                )}
                {location.search === "?mySchedule" &&
                  location.pathname === "/account" && (
                    <MySchedule user={user} />
                  )}
                {location.search === "?myPurchase" &&
                  location.pathname === "/account" && (
                    <MyPurchase user={user} />
                  )}
                {location.search === "?myReview" &&
                  location.pathname === "/account" && <MyReview user={user} />}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
