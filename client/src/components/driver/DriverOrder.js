import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { driverFetchOrder, fetchUser, fetchGeocode } from "../../actions";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "../../apis/GoogleMap";

import DriverOrderItem from "./DriverOrderItem";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverOrder = ({
  user,
  auth,
  driverFetchOrder,
  fetchGeocode,
  driver,
  fetchUser,
  center,
  zoom,
}) => {
  const [fetched, setFetched] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const refPopUpContainer = React.createRef();

  ////////

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user.fetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (!driver.fetched) {
      driverFetchOrder("2022-02-22");
    }
    // driverFetchAccepted(user.googleId);
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (user.fetched && driver.fetched) {
      setFetched(true);
    }
  }, [user.fetched, driver.fetched]);

  //////////
  const renderDriverOrders = (orders) => {
    if (!mapLoaded) return;
    // 3 XXX
    const orderArr = cvtObj2Arr(orders);

    return orderArr.reverse().map((order, i) => {
      return (
        <DriverOrderItem
          order={order}
          key={i}
          page={"search"}
          timestamp={order.timestamp}
        />
      );
    });
  };

  const renderMap = (status) => {
    switch (status) {
      case Status.LOADING:
        return <div>aaang</div>;
      case Status.FAILURE:
        return <div>aaang</div>;
      case Status.SUCCESS:
        return <div>aaang</div>;
      default:
        return <div>aaang</div>;
    }
  };

  const render = () => {
    if (!fetched) return null;

    return (
      <div className="motion-container">
        <header className="page-title">
          <h2>Search Order</h2>
        </header>
        <Wrapper
          apiKey={"AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8"}
          render={renderMap}
        >
          <GoogleMap setMapLoaded={setMapLoaded} />
        </Wrapper>
        <div className="order-container">
          <div className="driver__order__list">
            {renderDriverOrders(driver.orders)}
          </div>
        </div>
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth: auth, user, driver };
};

export default connect(mapStateToProps, {
  driverFetchOrder,
  fetchUser,
  fetchGeocode,
})(DriverOrder);
