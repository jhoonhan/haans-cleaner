import React, { useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(null);

  ////////

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
  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => {
            // deleteUser(user.id);
            console.log(`ACTION to cancel completion`);
            setShowModal(false);
          }}
          className="button--l button--alert"
        >
          Delete
        </button>
      </>
    );
  };
  //////////
  const rednerSearchOrders = () => {
    if (!isMapLoaded) return null;
    const orderArr = cvtObj2Arr(
      match.params.page === "search" ? driver.orders : driver.acceptedOrders
    );

    return orderArr
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

        <Modal2
          show={showModal}
          handleClose={setShowModal}
          id={user?.googleId}
          title={
            modalType === "deleteAccount" ? "Delete Account" : "Edit Account"
          }
          content="Are you sure?"
          actions={modalAction()}
        />

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
            setIsMapLoaded={setIsMapLoaded}
          />
        </Wrapper>
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
