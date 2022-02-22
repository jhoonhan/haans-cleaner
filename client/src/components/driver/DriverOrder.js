import React, { useEffect } from "react";
import { connect } from "react-redux";
import { driverFetchOrder } from "../../actions";

import DriverOrderItem from "./DriverOrderItem";

const DriverOrder = ({ driverFetchOrder, driverOrders }) => {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    driverFetchOrder("2022-02-22");
  }, []);

  const renderDriverOrders = () => {
    const orderArr = Object.entries(driverOrders).map(([key, value]) => {
      const obj = {
        id: key,
        ...value,
      };
      return obj;
    });
    return orderArr.reverse().map((order, i) => {
      return <DriverOrderItem order={order} key={i} />;
    });
  };

  return (
    <div className="motion-container">
      <header className="page-title">
        <h2>Order</h2>
      </header>
      <div className="order-container">
        <div className="order__list">{renderDriverOrders()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth: auth, user: user.currentUser, driverOrders };
};

export default connect(mapStateToProps, { driverFetchOrder })(DriverOrder);
