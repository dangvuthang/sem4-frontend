import React, { useContext, useState, useRef } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import ErrorModal from "./ErrorModal";
import AuthContext from "../context/authContext";
import { signInWithFacebook, signInWithGoogle } from "../../../utils/firebase";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./AuthModal.scss";
import { toast } from "react-toastify";

const LoginModal = ({ isModalOpen, handleOnModalClose }) => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [
    inputValue,
    errorMsg,
    handleOnChange,
    buttonDisabled,
    setInputValue,
    setErrorMsg,
  ] = useForm({
    email: "",
    password: "",
  });
  const [isLoading, isError, sendRequest, clearError] = useRequest();

  const handleSigninWithSocialMedia = async () => {
    try {
      await signInWithGoogle();
      handleOnModalClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    if (isLogin) {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/users/login`,
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          email: inputValue.email,
          password: inputValue.password,
        })
      );
      if (data) {
        const { email, name, avatarImage, jwt } = data;
        auth.login(jwt, { email, name, avatarImage });
        handleOnModalClose();
      }
    }
    if (!isLogin) {
      const formData = new FormData();
      formData.append("email", inputValue.email);
      formData.append("password", inputValue.password);
      formData.append("name", inputValue.name);
      formData.append("phone", inputValue.phone);
      if (inputValue.avatar) {
        formData.append("avatarImage", inputValue.avatar);
      }
      console.log(formData);
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/users/signup`,
        "POST",
        {},
        formData
      );
      if (data) {
        const { email, name, avatarImage, jwt } = data;
        if (inputValue.avatar) {
          toast.info("Processing...", { autoClose: 3000 });
          setTimeout(() => {
            auth.login(jwt, { email, name, avatarImage });
            handleOnModalClose();
          }, 3000);
        } else {
          auth.login(jwt, { email, name, avatarImage });
          handleOnModalClose();
        }
      }
    }
  };

  const handleModeChange = () => {
    setIsLogin(isLoginMode => !isLoginMode);
    if (isLogin) {
      const resetValue = {
        email: "",
        password: "",
        name: "",
        phone: "",
      };
      setInputValue({ ...resetValue, avatar: "" });
      setErrorMsg(resetValue);
    } else {
      const resetValue = { email: "", password: "" };
      setInputValue(resetValue);
      setErrorMsg(resetValue);
    }
  };

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <Modal
        style={
          isLogin
            ? null
            : { transform: "translateY(-8%)", transition: "all 200ms" }
        }
        show={isModalOpen}
        onCancel={handleOnModalClose}
        onSubmitForm={handleLoginSubmit}
        className="auth-modal"
        headerContent={isLogin ? "Login" : "Signup"}
        headerClass="auth-header"
        contentClass="auth-content"
        footerClass="auth-footer"
        footerContent={
          <p className="auth-footer__content">
            {isLogin ? "Not a member?" : "Already have an account?"}{" "}
            <button
              className="auth-content__link"
              onClick={handleModeChange}
              type="button"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
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
        {!isLogin && (
          <>
            <Input
              id="name"
              label="Name"
              type="text"
              value={inputValue.name}
              onChange={handleOnChange}
              errorMsg={errorMsg.name}
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              value={inputValue.phone}
              onChange={handleOnChange}
              errorMsg={errorMsg.phone}
            />
            <ImageUpload
              file={inputValue.avatar}
              handleOnImageChange={handleOnChange}
              id="avatar"
            />
          </>
        )}
        {isLogin && (
          <p className="auth-content__forget">
            <button type="button" className="auth-content__link">
              Forget Password ?
            </button>
          </p>
        )}
        <button
          type="submit"
          className="auth-content__signin"
          disabled={buttonDisabled()}
          style={isLogin ? null : { margin: "3rem 0" }}
        >
          {isLogin ? "Sign in" : "Sign up"}
        </button>
        {isLogin && (
          <>
            <p className="auth-content__option">or Sign in with: </p>
            <div className="auth-content__social-signin">
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
                onClick={handleSigninWithSocialMedia}
              >
                <i className="fab fa-google"></i>
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
