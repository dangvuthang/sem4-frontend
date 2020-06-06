import React from "react";
import Modal from "./Modal";
import "./ErrorModal.scss";
const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      headerClass="error-header"
      headerContent="An Error Occurred!"
      contentClass="error-content"
      show={!!props.error}
      footerClass="error-footer"
      footerContent={
        <button className="btn btn--error" onClick={props.onClear}>
          Okay
        </button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
