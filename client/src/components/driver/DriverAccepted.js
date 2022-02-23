import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import DriverOrderItem from "./DriverOrderItem";
import cvtObj2Arr from "../helpers/cvtObj2Arr";
import {
  driverFetchAccepted,
  fetchUser,
  driverFetchOrder,
} from "../../actions";

const DriverAccepted = (props) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!props.auth.isSignedIn) return;
    if (!props.user.fetched) {
      props.fetchUser(props.auth.userProfile.FW);
    }
    if (!props.driver.fetched) {
      props.driverFetchAccepted(props.auth.userProfile.FW);
    }
    // props.driverFetchAccepted(props.user.googleId);
  }, [props.auth.isSignedIn]);

  useEffect(() => {
    if (props.user.fetched && props.driver.fetched) {
      setFetched(true);
    }
  }, [props.user.fetched, props.driver.fetched]);

  const renderAceeptedOrders = () => {
    // 3 XXX

    const orderArr = cvtObj2Arr(props.driver.orders);

    return orderArr.reverse().map((order, i) => {
      return (
        <DriverOrderItem
          order={order}
          key={i}
          page={"accepted"}
          timestamp={order.timestamp}
        />
      );
    });
  };

  const acceptedOrders = (orders) => {
    const orderArr = cvtObj2Arr(orders);
    console.log(orderArr);
    const res = orderArr.filter((order) => order.status === "accepted");
    console.log(res);
    return res;
  };

  const render = () => {
    if (!fetched) return null;

    return (
      <div className="motion-container">
        <header className="page-title">
          <h2>Accepted Orders</h2>
        </header>

        <div className="order-container">
          <div className="driver__order__list">{renderAceeptedOrders()}</div>
        </div>
      </div>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth, user, driver };
};

export default connect(mapStateToProps, {
  driverFetchAccepted,
  fetchUser,
  driverFetchOrder,
})(DriverAccepted);
