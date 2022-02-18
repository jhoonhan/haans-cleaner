import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrder, fetchUser } from "../../actions";

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

    return orders.reverse().map((order) => {
      return (
        <div key={order.timestamp} className="order__row">
          <OrderItem order={order} />
        </div>
      );
    });
  };

  return (
    <div className="order-container">
      <h2>My Orders</h2>
      <div className="order__list">{renderList()}</div>
    </div>
  );
};

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    orders: orders.orders,
  };
};

export default connect(mapStateToProps, { fetchOrder, fetchUser })(Order);
