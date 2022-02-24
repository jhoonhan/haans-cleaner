import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser, driverFetchOrder } from "../../actions";

const DriverNavigation = ({ auth, user, driver }) => {
  const render = () => {
    return <>aang</>;
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth: auth, user, driver };
};

export default connect(mapStateToProps, { fetchUser, driverFetchOrder })(
  DriverNavigation
);
