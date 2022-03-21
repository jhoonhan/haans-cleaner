import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";

const Loader = (props) => {
  const render = () => {
    if (!props.show) return null;
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__container">
          <Spinner />
        </div>
      </div>,
      document.querySelector("#topMost")
    );
  };

  return render();
};

export default Loader;
