import React, { useEffect } from "react";
import { connect } from "react-redux";
import { driverFetchOrder } from "../../actions";

import DriverHome from "./DriverHome";
import DriverHeader from "./DriverHeader";

const Driver = ({ driverFetchOrder, driverOrders }) => {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    driverFetchOrder("2022-02-22");
  }, []);

  return (
    <>
      <DriverHeader />
      <DriverHome />
    </>
  );
};

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth: auth, user: user.currentUser, driverOrders };
};

export default connect(mapStateToProps, { driverFetchOrder })(Driver);
