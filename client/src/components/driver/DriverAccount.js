import React from "react";
import { connect } from "react-redux";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

import DriverOrderItem from "./DriverOrderItem";

const DriverAccount = ({ auth, user, driver, match }) => {
  const renderOrders = () => {
    const orderArr = cvtObj2Arr(driver.acceptedOrders);
    const filteredArr = orderArr.filter(
      (order) => order.status === "completed"
    );

    return filteredArr
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((order, i) => {
        return (
          <DriverOrderItem
            order={order}
            key={i}
            page={"account"}
            timestamp={order.timestamp}
          />
        );
      });
  };
  const render = () => {
    if (match !== "/driver/account") return null;
    return (
      <div className="driver-account">
        <h3 className="justify-self--flex-start margin-top--1rem">
          Order History
        </h3>
        {renderOrders()}
      </div>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth: auth, user: user.currentUser, driver };
};

export default connect(mapStateToProps)(DriverAccount);
