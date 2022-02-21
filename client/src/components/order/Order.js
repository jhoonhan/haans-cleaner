import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrder, fetchUser } from "../../actions";
import { motion } from "framer-motion";

import OrderItem from "./OrderItem";

const Order = (props) => {
  const { auth, user, orders, fetchUser, fetchOrder } = props;
  const ref = React.createRef();

  useEffect(() => {
    if (auth.isSignedIn && !user) {
      fetchUser(auth.userProfile.FW);
    }
    if (user) {
      fetchOrder(auth.userProfile.FW);
    }
  }, [auth.isSignedIn, user]);

  const renderList = () => {
    if (!orders) return;

    const orderArr = Object.entries(orders).map(([key, value]) => {
      const obj = {
        id: key,
        ...value,
      };
      return obj;
    });

    return orderArr.reverse().map((order) => {
      return (
        <div key={order.timestamp} className="order__row">
          <OrderItem order={order} />
        </div>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
        className="motion-container"
      >
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

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    orders,
  };
};

export default connect(mapStateToProps, { fetchOrder, fetchUser })(Order);
