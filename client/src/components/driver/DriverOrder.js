import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { driverFetchOrder, fetchUser, fetchGeocode } from "../../actions";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleGeocode from "../../apis/GoogleGeocode";
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
  const [mapLoaded, setMapLoaded] = useState(false);
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

  const getDistances = (data) => {
    console.log(data);
  };

  const renderDriverOrders = () => {
    if (!mapLoaded) return;
    const orderArr = cvtObj2Arr(driver.orders);

    return orderArr.reverse().map((order, i) => {
      return (
        <DriverOrderItem
          order={order}
          key={i}
          timestamp={order.timestamp}
          getDistances={getDistances}
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

  return (
    <div className="motion-container">
      <header className="page-title">
        <h2>Search Order</h2>
      </header>
      {/* <GoogleMap location={user.coords} /> */}
      <Wrapper
        apiKey={"AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8"}
        render={renderMap}
      >
        <GoogleMap
          popUpContainer={refPopUpContainer}
          getDistances={getDistances}
          setMapLoaded={setMapLoaded}
        />
      </Wrapper>
      <div className="order-container" ref={refPopUpContainer}>
        <div className="driver__order__list">{renderDriverOrders()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth: auth, user: user.currentUser, driver };
};

export default connect(mapStateToProps, {
  driverFetchOrder,
  fetchUser,
  fetchGeocode,
})(DriverOrder);
