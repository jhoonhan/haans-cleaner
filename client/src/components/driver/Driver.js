import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  driverFetchOrder,
  fetchUser,
  driverFetchAccepted,
} from "../../actions";

import DriverHome from "./DriverHome";
import DriverHeader from "./DriverHeader";

const Driver = ({
  auth,
  user,
  driver,
  driverFetchOrder,
  fetchUser,
  driverFetchAccepted,
}) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user) {
      fetchUser(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (user) {
      setFetched(true);
    }
  }, [user]);

  const render = () => {
    if (!fetched) return null;
    return (
      <>
        <DriverHeader />
        <DriverHome />
      </>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth: auth, user: user.currentUser, driver };
};

export default connect(mapStateToProps, {
  driverFetchOrder,
  fetchUser,
  driverFetchAccepted,
})(Driver);
