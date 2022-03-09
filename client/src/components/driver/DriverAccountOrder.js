import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import { fetchUser } from "../../actions";
import OrderItem from "../order/OrderItem";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverAccountOrder = ({ auth, completedOrders, setPage }) => {
  const now = new Date().toISOString().split("T")[0];
  const today = new Date(now);

  const [selectedDate, setSelectedDate] = useState(today.toISOString());
  const [orders, setOrders] = useState(null);
  const dateSelector = useRef(null);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const selectedDate = date.toISOString();
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    dateSelector.current.value = selectedDate.split("T")[0];
  }, []);

  useEffect(() => {
    const filteredOrders = completedOrders.filter((order) => {
      return order.date === selectedDate;
    });
    setOrders(filteredOrders);
  }, [selectedDate]);

  const renderList = () => {
    if (!orders) return;
    return orders.reverse().map((order, i) => {
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
          <input onChange={handleDateChange} ref={dateSelector} type="date" />
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
