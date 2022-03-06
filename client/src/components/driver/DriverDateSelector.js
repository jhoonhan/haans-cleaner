import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const DriverDateSelector = ({ setSelectedDates }) => {
  const [dateSelector, selectDateSelector] = useState([
    new Date().toISOString().split("T")[0],
  ]);

  useEffect(() => {
    setSelectedDates(dateSelector);
  }, [dateSelector]);

  const dates = () => {
    const dates = [];
    for (let i = 0; i < 4; i++) {
      const today = new Date();
      const date = new Date().setDate(today.getDate() + i);
      dates.push(new Date(date).toISOString().split("T")[0]);
    }
    return dates;
  };

  const onSelectDate = (date) => {
    if (dateSelector.includes(date)) {
      selectDateSelector(dateSelector.filter((el) => el !== date));
    }
    if (!dateSelector.includes(date)) {
      selectDateSelector([...dateSelector, date]);
    }
  };

  const rednerDateSelectors = () => {
    const dateSelectors = dates().map((date, i) => {
      return (
        <div
          onClick={() => onSelectDate(date)}
          key={i}
          style={
            dateSelector.includes(date)
              ? { backgroundColor: "red" }
              : { backgroundColor: "blue" }
          }
        >
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
