import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrder, fetchUser } from "../../actions";

const Order = (props) => {
  const { auth, user, orders, fetchUser, fetchOrder } = props;
  useEffect(() => {
    if (auth.isSignedIn && !user) {
      fetchUser(auth.userProfile.FW);
    }
    if (user) {
      fetchOrder(auth.userProfile.FW);
    }
  }, [auth.isSignedIn, user]);

  return <div>dafuck</div>;
};

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    orders,
  };
};

export default connect(mapStateToProps, { fetchOrder, fetchUser })(Order);
