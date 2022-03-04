import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import { fetchUser } from "../../actions";
import OrderItem from "../order/OrderItem";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverAccountOrder = ({ auth, completedOrders, setPage }) => {
  const renderList = () => {
    const orderArr = cvtObj2Arr(completedOrders).filter(
      (order) => order.status === "completed"
    );

    return orderArr.reverse().map((order, i) => {
      return <OrderItem key={i} order={order} page={"account"} />;
    });
  };

  const render = () => {
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

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    completedOrders: user.currentUser.completedOrders,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
})(DriverAccountOrder);
