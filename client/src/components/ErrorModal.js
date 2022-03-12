import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

const ErrorModal = () => {
  const errorData = useSelector((state) => state.error);

  const render = () => {
    if (!errorData.hasError) return null;
    console.log(errorData);

    return ReactDOM.createPortal(
      <div className="error-container">
        <div className="error__table">
          <h2>Oopsy!</h2>
          <p>Something went wrong</p>
          <button
            onClick={() => window.location.reload(false)}
            className="button--f"
          >
            refresh
          </button>
        </div>
      </div>,
      document.querySelector("#topMost")
    );
  };

  return render();
};

export default ErrorModal;
