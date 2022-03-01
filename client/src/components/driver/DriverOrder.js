import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  driverFetchOrder,
  driverFetchAccepted,
  fetchUser,
} from "../../actions";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "../../apis/GoogleMap";

import DriverOrderItem from "./DriverOrderItem";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

const DriverOrder = ({
  user,
  auth,
  driverFetchOrder,
  driverFetchAccepted,
  driver,
  fetchUser,
  center,
  zoom,
  match,
}) => {
  const [fetched, setFetched] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapRatio, setMapRatio] = useState("1 / 1");

  const googleMapWrapper = useRef(null);
  ////////
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", aaang);
    // };
  }, []);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user.fetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (!driver.fetched.searchOrder) {
      driverFetchOrder("2022-02-22"); //LC
    }
    if (!driver.fetched.acceptedOrder) {
      driverFetchAccepted(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (
      user.fetched &&
      driver.fetched.searchOrder &&
      driver.fetched.acceptedOrder
    ) {
      setFetched(true);
    }
  }, [user.fetched, driver.fetched]);

  //////////

  const handleScroll = () => {
    if (!googleMapWrapper.current) return;
    const rect = googleMapWrapper.current.getBoundingClientRect();
    // if (rect.y < 0 && mapRatio !== "1 / 1") {
    if (rect.y < 0 && mapRatio === "1 / 1") {
      setMapRatio("2 / 1");
    } else if (rect.y > 0) {
      setMapRatio("1 / 1");
    }
  };

  //////////
  const rednerSearchOrders = () => {
    const conditionalArr = () => {
      if (match.params.page === "search") {
        const orderArr = cvtObj2Arr(driver.orders);
        const filteredArr = orderArr.filter(
          (order) => order.status !== "completed"
        );
        return filteredArr;
      }
      if (match.params.page === "accepted") {
        return cvtObj2Arr(driver.acceptedOrders);
      }
    };

    return conditionalArr()
      .sort((a, b) => a.distance - b.distance)
      .map((order, i) => {
        return (
          <DriverOrderItem
            order={order}
            key={i}
            page={match.params.page}
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
          <h2>{match.params.page}</h2>
        </header>

        <div ref={googleMapWrapper}>
          <Wrapper
            apiKey={"AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8"}
            render={renderMap}
          >
            <GoogleMap
              orders={
                match.params.page === "search"
                  ? driver.orders
                  : driver.acceptedOrders
              }
              page={match.params.page}
              mapRatio={mapRatio}
              setIsMapLoaded={setIsMapLoaded}
            />
          </Wrapper>
        </div>
        <div className="order-container">
          <div className="driver__order__list">{rednerSearchOrders()}</div>
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
  driverFetchAccepted,
  fetchUser,
})(DriverOrder);
