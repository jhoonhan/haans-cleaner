import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  driverFetchOrder,
  driverFetchAccepted,
  fetchUser,
  fetchGeocode,
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
  fetchGeocode,
  driver,
  fetchUser,
  center,
  zoom,
  match,
}) => {
  const [fetched, setFetched] = useState(false);
  const refPopUpContainer = React.createRef();

  ////////

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!user.fetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (!driver.fetched) {
      driverFetchOrder("2022-02-22");
      driverFetchAccepted(auth.userProfile.FW);
    }
  }, [auth.isSignedIn]);

  useEffect(() => {
    if (user.fetched && driver.fetched) {
      setFetched(true);
    }
  }, [user.fetched, driver.fetched]);

  //////////
  const rednerSearchOrders = (orders, page) => {
    // if (!mapLoaded) return;
    // 3 XXX
    const orderArr = cvtObj2Arr(orders);
    let finalArr = orderArr;

    if (page === "accepted") {
      finalArr = orderArr.filter((order) => order.status === "accepted");
    }

    return finalArr.reverse().map((order, i) => {
      return (
        <DriverOrderItem
          order={order}
          key={i}
          page={page}
          timestamp={order.timestamp}
        />
      );
    });
  };

  const renderAceeptedOrders = (orders) => {
    // 3 XXX

    const orderArr = cvtObj2Arr(orders);
    const filteredArr = () => {
      const res = orderArr.filter((order) => order.status === "accepted");
      return res;
    };

    return filteredArr()
      .reverse()
      .map((order, i) => {
        return (
          <DriverOrderItem
            order={order}
            key={i}
            page={"accepted"}
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
        <Wrapper
          apiKey={"AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8"}
          render={renderMap}
        >
          <GoogleMap orders={driver.orders} page={match.params.page} />
        </Wrapper>
        <div className="order-container">
          <div className="driver__order__list">
            {rednerSearchOrders(driver.orders, match.params.page)}
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
  driverFetchAccepted,
  fetchUser,
  fetchGeocode,
})(DriverOrder);
