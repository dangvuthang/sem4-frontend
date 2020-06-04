import React from "react";
import Modal from "./Modal";

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      headerContent="An Error Occurred!"
      show={!!props.error}
      footerContent={<button onClick={props.onClear}>Okay</button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
