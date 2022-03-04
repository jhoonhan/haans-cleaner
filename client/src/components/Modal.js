import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const showHideClassName = props.show
    ? "transform--visible opacity--100"
    : "transform--hidden opacity--0";

  return ReactDOM.createPortal(
    <div className={`modal ${showHideClassName}`}>
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
