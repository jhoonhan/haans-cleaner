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
    <div className="order-container">
      <div className="order__list">{renderList()}</div>
    </div>
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
