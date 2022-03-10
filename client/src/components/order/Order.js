import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { cancelOrder, fetchOrder, fetchUser } from "../../actions";
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
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);

  useEffect(() => {
    if (auth.isSignedIn && !user) {
      fetchUser(auth.userProfile.FW);
    }
    if (user) {
      fetchOrder(auth.userProfile.FW);
    }
  }, [auth.isSignedIn, user]);

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
    if (!orders) return;

    const orderArr = cvtObj2Arr(orders);

    return orderArr
      .reverse()
      .filter((order) => order.status !== "completed")
      .map((order, i) => {
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

          <PageTitle title="order" />
          <div className="order-container">
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
    user: user.currentUser,
    orders,
    loader,
  };
};

export default connect(mapStateToProps, { fetchOrder, fetchUser, cancelOrder })(
  Order
);
