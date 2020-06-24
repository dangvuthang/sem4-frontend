import React, { useContext } from "react";
import "./MyInfo.scss";
import Input from "../../shared/Input/Input";
import useForm from "../../shared/hooks/useForm";
import ImageUpload from "../../shared/ImageUpload/ImageUpload";
import validate from "../../../utils/validate";
import { toast } from "react-toastify";
import useRequest from "../../shared/hooks/useRequest";
import AuthContext from "../../shared/context/authContext";
import ErrorModal from "../../shared/Modal/ErrorModal";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import Label from "../../shared/Label/Label";
const MyInfo = ({ user }) => {
  const [inputValue, errorMsg, handleOnChange] = useForm({
    email: user.email,
    name: user.name,
    phone: user.phone ? user.phone : "",
    description: "",
    avatar: "",
    oldPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const auth = useContext(AuthContext);

  const handleBasicInfoSubmit = async e => {
    e.preventDefault();
    const checkObj = {
      email: inputValue.email,
      name: inputValue.name,
      phone: inputValue.phone,
    };
    for (const key in checkObj) {
      const message = validate({ id: key, value: checkObj[key] });
      if (message) return toast.warning(message);
    }
    const formData = new FormData();
    formData.append("email", checkObj.email);
    formData.append("name", checkObj.name);
    formData.append("phone", checkObj.phone);
    if (inputValue.avatar) formData.append("avatarImage", inputValue.avatar);
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/users/${checkObj.email}`,
      "PUT",
      {},
      formData
    );
    if (data) {
      const { email, name, avatarImage, jwt } = data;
      auth.login(jwt, { email, name, avatarImage });
      toast.success("Updated info Successfully");
    }
  };

  const handleResetPasswordSubmit = async e => {
    e.preventDefault();
    const checkObj = {
      oldPassword: inputValue.oldPassword,
      newPassword: inputValue.newPassword,
      passwordConfirm: inputValue.passwordConfirm,
    };
    for (const key in checkObj) {
      const message = validate({ id: key, value: checkObj[key] });
      if (checkObj.newPassword !== checkObj.passwordConfirm)
        return toast.warning("Incorrect Password Confirm !!!");
      if (message) return toast.warning(message);
    }
    const data = await sendRequest(
      `${process.env.REACT_APP_END_POINT}/api/v1/users/password/${user.email}`,
      "PUT",
      { "Content-Type": "application/json" },
      JSON.stringify(checkObj)
    );
    if (data) {
      const { email, name, avatarImage, jwt } = data;
      toast.success("Successfully updated your password !!!");
      auth.login(jwt, { email, name, avatarImage });
    }
  };

  return (
    <>
      {isError && <ErrorModal onClear={clearError} error={isError} />}
      <div className="account-info" style={{ position: "relative" }}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="account-info__title">
          <h3 style={{ fontSize: "1.6rem" }}>My Information</h3>
          <p style={{ fontSize: "1.5rem" }}>Add Information About Yourself</p>
        </div>
        <div className="account-info__form">
          <h3 style={{ fontSize: "1.6rem" }}>Basic Info</h3>
          <form onSubmit={handleBasicInfoSubmit}>
            <Input
              id="email"
              label="Email"
              type="email"
              value={inputValue.email}
              onChange={handleOnChange}
              errorMsg={errorMsg.email}
              readOnly
            />
            <Input
              id="name"
              label="Name"
              value={inputValue.name}
              onChange={handleOnChange}
              errorMsg={errorMsg.name}
            />
            <Input
              id="phone"
              label="Phone"
              value={inputValue.phone}
              onChange={handleOnChange}
              errorMsg={errorMsg.phone}
            />
            {user.roleId.id === 2 && (
              <Label name="Description" className="myinfo__description">
                <textarea
                  id="tourComment"
                  className="review-content__comment"
                  value={inputValue.description}
                />
              </Label>
            )}
            <ImageUpload
              file={inputValue.avatar}
              handleOnImageChange={handleOnChange}
              id="avatar"
            />
            <div className="account-info__save">
              <button className="account-info__save-btn">Save</button>
            </div>
          </form>
        </div>
        <div className="account-info__form">
          <h3 style={{ fontSize: "1.6rem" }}>Password Reset</h3>
          {user.authenticationProviderCollection.length > 0 ? (
            <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
              Your Account is managed by google. You do not need to worry about
              this
            </p>
          ) : (
            <form onSubmit={handleResetPasswordSubmit}>
              <Input
                id="oldPassword"
                label="Old Password"
                type="password"
                value={inputValue.oldPassword}
                onChange={handleOnChange}
                errorMsg={errorMsg.oldPassword}
              />
              <Input
                id="newPassword"
                label="New Password"
                type="password"
                value={inputValue.newPassword}
                onChange={handleOnChange}
                errorMsg={errorMsg.newPassword}
              />
              <Input
                id="passwordConfirm"
                label="Password Confirm"
                type="password"
                value={inputValue.passwordConfirm}
                onChange={handleOnChange}
                errorMsg={errorMsg.passwordConfirm}
              />

              <div className="account-info__save">
                <button className="account-info__save-btn">Reset</button>
              </div>
            </form>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default MyInfo;
