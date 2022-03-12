import React from "react";
import noOrder from "../../image/noOrder.svg";

const NoResultFound = () => {
  return (
    <div className="no-result-container">
      <svg viewBox="0 0 130 100" className="aaang">
        <use href={`${noOrder}#noOrder`}></use>
      </svg>
      <div style={{ textAlign: "center" }}>
        <h3>No order found</h3>
        <p>Try other dates...</p>
      </div>
    </div>
  );
};

export default NoResultFound;
