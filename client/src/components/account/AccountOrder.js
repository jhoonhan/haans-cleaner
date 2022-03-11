import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import { fetchOrder, fetchUser } from "../../actions";
import OrderItem from "../order/OrderItem";
import PageTitle from "../PageTitle";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const AccountOrder = ({
  auth,
  user,
  userFetched,
  orders,
  fetchUser,
  fetchOrder,
  setPage,
}) => {
  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!userFetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (!orders) {
      fetchOrder(auth.userProfile.FW);
    }
    if (auth.isSignedIn && userFetched && orders) {
      setFetched(true);
    }
  }, [auth.isSignedIn, user, orders]);

  const now = new Date().toISOString().split("T")[0];
  const today = new Date(now);

  const [fetched, setFetched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today.toISOString());
  const [orders2, setOrders] = useState(null);
  const dateSelector = useRef(null);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const selectedDate = date.toISOString();
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    if (!fetched) return null;
    dateSelector.current.value = selectedDate.split("T")[0];
  }, [fetched]);

  useEffect(() => {
    if (!fetched) return null;
    const filteredOrders = cvtObj2Arr(orders).filter((order) => {
      return order.date === selectedDate && order.status === "completed";
    });
    setOrders(filteredOrders);
  }, [fetched, selectedDate]);

  /////////////////
  const renderList = () => {
    if (!orders2) return null;
    return orders2.reverse().map((order, i) => {
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
        <PageTitle
          title="my orders"
          hasGoBack={true}
          onClickHandle={() => setPage("home")}
        />
        <div className="account-container">
          <div className="row">
            <label className="align-self-flex-start">Completed Orders</label>

            <input
              onChange={handleDateChange}
              ref={dateSelector}
              style={{ marginTop: "1rem" }}
              type="date"
            />
          </div>
          <div className="order__list">{renderList()}</div>
        </div>
      </motion.div>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    userFetched: user.fetched,
    orders,
  };
};

export default connect(mapStateToProps, { fetchUser, fetchOrder })(
  AccountOrder
);
