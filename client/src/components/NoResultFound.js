import React from "react";
import noOrder from "../image/noOrder.svg";

const NoResultFound = ({ size }) => {
  return (
    <div className="no-result-container">
      <svg viewBox="0 0 130 100" className={`no-result-image--${size}`}>
        <use href={`${noOrder}#noOrder`}></use>
      </svg>
      <div style={{ textAlign: "center" }}>
        <h4>No order found</h4>
        <p>Try other dates...</p>
      </div>
    </div>
  );
};

export default NoResultFound;
