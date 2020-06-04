import React, { useState, useContext, useEffect } from "react";
import logo from "../../../img/logo.png";
import Modal from "../../shared/Modal/Modal";
import Input from "../../shared/Input/Input";
import useForm from "../../shared/hooks/useForm";
import useRequest from "../../shared/hooks/useRequest";
import { signInWithGoogle, signInWithFacebook } from "../../../utils/firebase";
import AuthContext from "../../shared/context/authContext";
import { NavLink, Link } from "react-router-dom";
import "./MainNav.scss";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/Modal/ErrorModal";
const routes = [
  { name: "Home", link: "/" },
  { name: "Tours", link: "/tours" },
  { name: "Destination", link: "/destination" },
  { name: "About", link: "/about" },
];
const MainNav = () => {
  const [inputValue, errorMsg, handleOnChange, buttonDisabled] = useForm({
    email: "",
    password: "",
  });
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const auth = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnModalOpen = e => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOnModalClose = e => {
    setIsModalOpen(false);
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/users/login`,
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({ email: inputValue.email, password: inputValue.password })
    );
    if (data) auth.login(data.jwt, data.user);
  };

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <Modal
        show={isModalOpen}
        onCancel={handleOnModalClose}
        onSubmitForm={handleLoginSubmit}
        headerContent="Signin"
        headerClass="login-header"
        contentClass="login-content"
        footerClass="login-footer"
        footerContent={
          <p className="login-footer__content">
            Not a member?{" "}
            <Link to="/signup" className="login-content__link">
              Sign Up
            </Link>
          </p>
        }
        className="login-modal"
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="email"
          label="Email"
          type="email"
          value={inputValue.email}
          onChange={handleOnChange}
          errorMsg={errorMsg.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={inputValue.password}
          onChange={handleOnChange}
          errorMsg={errorMsg.password}
        />
        <p className="login-content__forget">
          <Link to="/forgetPassword" className="login-content__link">
            Forget Password ?
          </Link>
        </p>
        <button
          type="submit"
          className="login-content__signin"
          disabled={buttonDisabled()}
        >
          Sign in
        </button>
        <p className="login-content__option">or Sign in with: </p>
        <div className="login-content__social-signin">
          <button
            type="button"
            className="btn btn--white"
            onClick={signInWithFacebook}
          >
            <i className="fab fa-facebook-f text-center"></i>
          </button>
          <button
            type="button"
            className="btn btn--white"
            onClick={signInWithGoogle}
          >
            <i className="fab fa-google"></i>
          </button>
        </div>
      </Modal>
      <div className="main-nav">
        <div className="container">
          <div className="main-nav__content">
            <div className="main-nav__content-logo">
              <Link to="/">
                <img className="logo" src={logo} alt="ToVN logo" />
              </Link>
            </div>
            <ul className="main-nav__content-list">
              {routes.map(route => (
                <li className="main-nav__content-item" key={route.name}>
                  <NavLink
                    to={route.link}
                    className="main-nav__content-link"
                    exact
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}

              <li className="main-nav__content-item">
                {!auth.isLogin ? (
                  <a
                    href=""
                    className="main-nav__content-link"
                    onClick={handleOnModalOpen}
                  >
                    {" "}
                    Login
                  </a>
                ) : (
                  <a
                    href=""
                    className="main-nav__content-link"
                    onClick={auth.logout}
                  >
                    {" "}
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
