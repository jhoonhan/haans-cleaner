import React, { useState } from "react";
import { connect } from "react-redux";

const DriverDateSelector = (props) => {
  const dates = () => {
    const dates = [];
    for (let i = 0; i < 4; i++) {
      const today = new Date();
      const date = new Date().setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  const rednerDateSelectors = () => {
    console.log(dates());
    const dateSelectors = dates().map((date, i) => {
      return (
        <div key={i}>
          {new Date(date)
            .toISOString()
            .split("T")[0]
            .split("-")
            .slice(1)
            .join("/")}
        </div>
      );
    });
    return dateSelectors;
  };

  const render = () => {
    return (
      <div className="driver__order__date-selector">
        {rednerDateSelectors()}
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return {
    auth,
    user: user.currentUser,
    driver,
  };
};

export default connect(mapStateToProps)(DriverDateSelector);
