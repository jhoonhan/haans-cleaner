import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { driverFetchOrder, fetchUser } from "../../actions";

import DriverHeader from "./DriverHeader";

const Driver = ({ auth, user, driver, driverFetchOrder, fetchUser }) => {
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user) {
      fetchUser(auth.userProfile.TW);
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
        <div className="signIn__container">
          <div className="Landing__container">
            <div className="landing__container__welcome">
              <h2>Good morning</h2>
              <h1>Driver</h1>
              <h3>It's a great day to wear a skirt</h3>
            </div>
            <div className="landing__container__buttons"></div>
          </div>
        </div>
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
})(Driver);
