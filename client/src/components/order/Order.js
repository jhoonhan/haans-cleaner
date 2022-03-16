import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { cancelOrder, fetchUser, fetchOrder } from "../../actions";
import { motion } from "framer-motion";

import OrderItem from "./OrderItem";
import Modal from "../Modal";
import Loader from "../Loader";
import PageTitle from "../PageTitle";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const Order = ({
  auth,
  user,
  orders,
  loader,
  fetchUser,
  cancelOrder,
  fetchOrder,
}) => {
  const now = new Date().toISOString().split("T")[0];
  const today = new Date(now);

  const [fetched, setFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today.toISOString());
  const [filteredOrders, setFilteredOrders] = useState(null);
  const dateSelector = useRef(null);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const selectedDate = date.toISOString();
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    if (auth.isSignedIn) {
      fetchUser(auth.userProfile.FW);
      fetchOrder(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (user.fetched) {
      setFetched(true);
    }
  }, [user.fetched]);

  useEffect(() => {
    if (fetched) {
      dateSelector.current.value = selectedDate.split("T")[0];
    }
  });
  useEffect(() => {
    if (!fetched) return null;
    const orderArr = cvtObj2Arr(orders);
    const filteredOrders = orderArr.filter((order) => {
      return order.date === selectedDate;
    });
    setFilteredOrders(filteredOrders);
  }, [fetched, orders, selectedDate]);

  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => cancelOrder(selectedOrder, setShowModal)}
          className="button--l button--alert"
        >
          Confirm
        </button>
      </>
    );
  };

  const renderList = () => {
    if (!filteredOrders) return [];

    return filteredOrders.reverse().map((order, i) => {
      return (
        <OrderItem
          order={order}
          key={i}
          setShowModal={setShowModal}
          setSelectedOrder={setSelectedOrder}
        />
      );
    });
  };

  const render = () => {
    if (!fetched) return null;
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.1 }}
          className="motion-container"
        >
          <Loader show={loader.showLoader} />
          <Modal
            show={showModal}
            handleClose={setShowModal}
            id={auth.userProfile.FW}
            title={"Cancel Order"}
            content="You cannot undeo your cancellation"
            actions={modalAction()}
          />

          <PageTitle title="orders" />
          <div className="order-container">
            <input
              onChange={handleDateChange}
              ref={dateSelector}
              style={{ marginTop: "1rem" }}
              type="date"
            />
            <div className="order__list">{renderList()}</div>
          </div>
        </motion.div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, orders, loader }) => {
  return {
    auth,
    user,
    loader,
    orders,
  };
};

export default connect(mapStateToProps, { fetchUser, cancelOrder, fetchOrder })(
  Order
);
