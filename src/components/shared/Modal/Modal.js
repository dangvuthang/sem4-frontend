import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.scss";

const ModalOverlay = ({
  className,
  style,
  headerClass,
  headerContent,
  contentClass,
  onSubmitForm,
  children,
  footerClass,
  footerContent,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{headerContent}</h2>
      </header>
      <form onSubmit={onSubmitForm ? onSubmitForm : e => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>
          {footerContent}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const Modal = props => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
