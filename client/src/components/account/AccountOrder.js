import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import renderInput from "../helpers/renderInput";
import { editUser, fetchUser } from "../../actions";
import OrderItem from "../order/OrderItem";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

const AccountOrder = ({ auth, user, userFetched, orders, fetchUser }) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!userFetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (auth.isSignedIn && userFetched) {
      setFetched(true);
    }
  }, [auth.isSignedIn, user]);

  const renderList = () => {
    if (!orders) return;

    const orderArr = cvtObj2Arr(orders);

    return orderArr.reverse().map((order, i) => {
      return (
        <div key={i} className="order__row">
          <OrderItem
            order={order}
            // setShowModal={setShowModal}
            // setSelectedOrder={setSelectedOrder}
          />
        </div>
      );
    });
  };

  const render = () => {
    if (!fetched) return null;

    return (
      <div>
        {renderList()}
        <div>aaaang</div>
      </div>
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

export default connect(mapStateToProps, { editUser, fetchUser })(AccountOrder);
