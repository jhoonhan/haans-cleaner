import React, { useEffect } from "react";
import { connect } from "react-redux";
import { driverFetchOrder, fetchUser } from "../../actions";
import GoogleGeocode from "../../apis/GoogleGeocode";
import GoogleMap from "../../apis/GoogleMap";

import DriverOrderItem from "./DriverOrderItem";

const DriverOrder = ({
  user,
  auth,
  driverFetchOrder,
  driverOrders,
  fetchUser,
}) => {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    driverFetchOrder("2022-02-22");
  }, []);

  useEffect(() => {
    if (!user) {
      fetchUser(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  const renderDriverOrders = () => {
    const orderArr = Object.entries(driverOrders).map(([key, value]) => {
      const obj = {
        id: key,
        ...value,
      };
      return obj;
    });
    return orderArr.reverse().map((order, i) => {
      return <DriverOrderItem order={order} key={i} />;
    });
  };

  return (
    <div className="motion-container">
      <header className="page-title">
        <h2>Search Order</h2>
      </header>
      {/* <GoogleMap location={user.coords} /> */}
      <GoogleMap />
      <div className="order-container">
        <div className="driver__order__list">{renderDriverOrders()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth: auth, user: user.currentUser, driverOrders };
};

export default connect(mapStateToProps, { driverFetchOrder, fetchUser })(
  DriverOrder
);
