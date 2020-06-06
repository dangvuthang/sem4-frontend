import React, { useContext } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import ErrorModal from "./ErrorModal";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";
import { signInWithFacebook, signInWithGoogle } from "../../../utils/firebase";
import "./LoginModal.scss";

const LoginModal = ({ isModalOpen, handleOnModalClose }) => {
  const [inputValue, errorMsg, handleOnChange, buttonDisabled] = useForm({
    email: "",
    password: "",
  });
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const auth = useContext(AuthContext);

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/users/login`,
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      })
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
        className="login-modal"
        headerContent="Login"
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
    </>
  );
};

export default LoginModal;
