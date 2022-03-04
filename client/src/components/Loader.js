import React from "react";
import ReactDOM from "react-dom";

const Loader = (props) => {
  const showHideClassName = props.show ? "display--flex" : "display--hidden";

  return ReactDOM.createPortal(
    <div className={`modal`}>
      <div className="modal__container">aaang!</div>
    </div>,
    document.querySelector("#topMost")
  );
};

export default Loader;
