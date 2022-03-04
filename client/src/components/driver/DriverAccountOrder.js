import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import {
  fetchOrder,
  fetchUser,
  driverFetchOrder,
  driverFetchAccepted,
} from "../../actions";
import OrderItem from "../order/OrderItem";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverAccountOrder = ({
  auth,
  user,
  driver,
  orders,
  driverFetchOrder,
  driverFetchAccepted,
  fetchUser,
  fetchOrder,
  setPage,
}) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user.fetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (!driver.fetched.searchOrder) {
      driverFetchOrder("2022-02-22"); //LC
    }
    if (!driver.fetched.acceptedOrder) {
      driverFetchAccepted(auth.userProfile.FW);
    }
    if (
      user.fetched &&
      driver.fetched.searchOrder &&
      driver.fetched.acceptedOrder
    ) {
      setFetched(true);
    }
  }, [auth.isSignedIn, user.fetched, driver.fetched]);

  const renderList = () => {
    const orderArr = cvtObj2Arr(orders).filter(
      (order) => order.status === "completed"
    );

    return orderArr.reverse().map((order, i) => {
      return <OrderItem key={i} order={order} page={"account"} />;
    });
  };

  const render = () => {
    if (!fetched) return null;

    return (
      <motion.div
        className="motion-container account__content__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
      >
        <div className="account-container">
          <div
            onClick={() => setPage("home")}
            className="account__btn--go-back"
          >
            X
          </div>
          <h3 className="align-self-flex-start">Completed Orders</h3>
          <div className="order__list">{renderList()}</div>
        </div>
      </motion.div>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, orders, driver }) => {
  return {
    auth,
    user,
    userFetched: user.fetched,
    driver,
    orders,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchOrder,
  driverFetchOrder,
  driverFetchAccepted,
})(DriverAccountOrder);
