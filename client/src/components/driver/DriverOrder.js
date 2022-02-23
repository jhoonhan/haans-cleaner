import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { driverFetchOrder, fetchUser, fetchGeocode } from "../../actions";
import GoogleGeocode from "../../apis/GoogleGeocode";
import GoogleMap from "../../apis/GoogleMap";

import DriverOrderItem from "./DriverOrderItem";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverOrder = ({
  user,
  auth,
  driverFetchOrder,
  fetchGeocode,
  driverOrders,
  fetchUser,
}) => {
  const refPopUpContainer = React.createRef();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    driverFetchOrder("2022-02-22");
  }, []);

  useEffect(() => {
    if (!user) {
      fetchUser(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (!user) return;
    if (!user.defaultAddress.coords) {
      // fetchGeocode(user.defaultAddress);
    }
  }, [user]);

  const renderDriverOrders = () => {
    const orderArr = cvtObj2Arr(driverOrders);

    return orderArr.reverse().map((order, i) => {
      return (
        <DriverOrderItem order={order} key={i} timestamp={order.timestamp} />
      );
    });
  };

  return (
    <div className="motion-container">
      <header className="page-title">
        <h2>Search Order</h2>
      </header>
      {/* <GoogleMap location={user.coords} /> */}
      <GoogleMap popUpContainer={refPopUpContainer} />
      <div className="order-container" ref={refPopUpContainer}>
        <div className="driver__order__list">{renderDriverOrders()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth: auth, user: user.currentUser, driverOrders };
};

export default connect(mapStateToProps, {
  driverFetchOrder,
  fetchUser,
  fetchGeocode,
})(DriverOrder);
