import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container">
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          <p>{props.content}</p>
        </div>
        <div className="form__button-holder--horizontal">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#topMost")
  );
};

export default Modal;
