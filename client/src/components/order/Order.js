import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOrder, fetchUser } from "../../actions";
import { motion } from "framer-motion";

import OrderItem from "./OrderItem";
import Modal from "../Modal";
import Loader from "../Loader";

const Order = ({ auth, user, orders, loader, fetchUser, fetchOrder }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (auth.isSignedIn && !user) {
      fetchUser(auth.userProfile.FW);
    }
    if (user) {
      fetchOrder(auth.userProfile.FW);
    }
  }, [auth.isSignedIn, user]);

  const someFn = () => {
    console.log(`aaang`);
  };

  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button onClick={someFn} className="button--l button--alert">
          Confirm
        </button>
      </>
    );
  };

  const renderList = () => {
    if (!orders) return;

    const orderArr = Object.entries(orders).map(([key, value]) => {
      const obj = {
        id: key,
        ...value,
      };
      return obj;
    });

    return orderArr.reverse().map((order, i) => {
      return (
        <div key={i} className="order__row">
          <OrderItem order={order} />
        </div>
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
          {loader.showLoader && <Loader />}
          <Modal
            show={showModal}
            handleClose={setShowModal}
            id={auth.userProfile.FW}
            title={"Cancel Order"}
            content="You cannot undeo your cancellation"
            actions={modalAction()}
          />

          <header className="page-title">
            <h2>Order</h2>
          </header>
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

export default connect(mapStateToProps, { fetchOrder, fetchUser })(Order);
