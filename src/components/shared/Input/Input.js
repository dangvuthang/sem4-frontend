import React from "react";
import "./Input.scss";
const Input = ({ id, label, type = "text", value, onChange, errorMsg }) => {
  return (
    <div className="input-group">
      <input
        type={type}
        className={value.length > 0 ? "form-control has-value" : "form-control"}
        id={id}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      {errorMsg && <div className="input-group__error-message">{errorMsg}</div>}
    </div>
  );
};

export default Input;
