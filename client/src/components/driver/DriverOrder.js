import React, { useEffect, useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  driverFetchOrder,
  driverCompeleteOrder,
  driverClearOrder,
  driverSetCoords,
  fetchUser,
  cancelOrder,
} from "../../actions";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "../../apis/GoogleMap";

import Loader from "../Loader";
import Modal from "../Modal";

import DriverOrderItem from "./DriverOrderItem";
import DriverDateSelector from "./DriverDateSelector";
import useOrderSearch from "./useOrderSearch";
import useGeolocation from "./useGeolocation";
import useShrinkMapOnScroll from "./useShrinkMapOnScroll";

import cvtObj2Arr from "../helpers/cvtObj2Arr";

import { D_FETCH_ORDER } from "../../actions/types";

const DriverOrder = ({
  user,
  auth,
  driverFetchOrder,
  driverCompeleteOrder,
  driverClearOrder,
  driverSetCoords,
  driver,
  fetchUser,
  cancelOrder,
  center,
  zoom,
  match,
  loader,
}) => {
  const [fetched, setFetched] = useState(false);
  const [readyForSearch, setReadyForSearch] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [scrollEvent, setScrollEvent] = useState(false);
  const [mapClass, setMapClass] = useState("mapInitRatio");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pageNumber, setPageNumber] = useState(1);

  ////////////////
  const googleMapWrapper = useRef(null);
  const headerRef = useRef(null);
  ////////
  useGeolocation(driver, driverSetCoords);

  ///
  useEffect(() => {
    if (!user.fetched && auth.isSignedIn) {
      fetchUser(auth.userProfile.FW);
    }
    if (user.fetched && auth.isSignedIn) {
      setReadyForSearch(true);
    }
  }, [auth.isSignedIn, user.fetched]);

  useEffect(() => {
    if (
      driver.fetched.searchOrder &&
      user.fetched &&
      match.params.page === "search"
    ) {
      setFetched(true);
    }
    if (
      driver.fetched.acceptedOrder &&
      user.fetched &&
      match.params.page === "accepted"
    ) {
      setFetched(true);
    }
  }, [driver.fetched]);

  /////////////////////
  /////////////////////

  const { loading, error, hasMore } = useOrderSearch(
    readyForSearch,
    auth.userProfile.FW,
    match.params.page,
    selectedDate,
    pageNumber,
    setPageNumber,
    driverFetchOrder,
    driverClearOrder,
    driver.currentCoords
  );

  const observer = useRef();
  const lastOrderElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  ///
  const { scroll, handleScroll } = useShrinkMapOnScroll(
    fetched,
    match.params.page,
    driver,
    headerRef,
    mapClass,
    setMapClass
  );

  // useEffect(() => {
  //   if (!fetched) return;
  //   if (
  //     match.params.page === "search" &&
  //     cvtObj2Arr(driver.orders).filter((order) => order.status !== "completed")
  //       .length < 3
  //   ) {
  //     setScrollEvent(false);
  //   } else {
  //     setScrollEvent(true);
  //   }
  //   if (
  //     match.params.page === "accepted" &&
  //     cvtObj2Arr(driver.acceptedOrders).length < 3
  //   ) {
  //     setScrollEvent(false);
  //   }
  // }, [fetched, driver.orders, driver.acceptedOrders]);

  // useEffect(() => {
  //   if (!fetched) return;

  //   if (scrollEvent) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   if (!scrollEvent) {
  //     window.removeEventListener("scroll", handleScroll);
  //     setMapClass("mapInitRatio");
  //   }
  //   return () => {
  //     console.log(`unmounted`);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollEvent]);

  // const handleScroll = () => {
  //   if (!headerRef.current) return;
  //   if (match.params.page === "search" && cvtObj2Arr(driver.orders).length < 3)
  //     return;
  //   if (
  //     match.params.page === "accepted" &&
  //     cvtObj2Arr(driver.acceptedOrders).length < 3
  //   )
  //     return;
  //   const rect = headerRef.current.getBoundingClientRect();
  //   if (rect.y !== 0 && mapClass === "mapInitRatio") {
  //     setMapClass("mapStickyRatio");
  //   } else if (rect.y === 0) {
  //     setMapClass("mapInitRatio");
  //   }
  // };

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

    return conditionalArr().map((order, i) => {
      if (conditionalArr().length === i + 1) {
        return (
          <div ref={lastOrderElementRef} key={i}>
            <DriverOrderItem
              order={order}
              page={match.params.page}
              timestamp={order.timestamp}
              setShowModal={setShowModal}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        );
      } else {
        return (
          <div key={i}>
            <DriverOrderItem
              order={order}
              page={match.params.page}
              timestamp={order.timestamp}
              setShowModal={setShowModal}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        );
      }
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

  const modalAction = () => {
    const onComplete = () => {
      if (selectedOrder.status === "accepted") {
        // setOrderStatus("compeleted");
        driverCompeleteOrder(
          {
            orderId: selectedOrder._id,
            customerId: selectedOrder.userId,
            driverId: user.currentUser._id,
          },
          {
            ...selectedOrder,
            status: "completed",
            acceptId: auth.userProfile.FW,
            completedDate: new Date().toISOString().split("T")[0],
          }
        ).then(() => setShowModal(false));
      }
      if (selectedOrder.status === "completed") {
        setShowModal(false);
      }
    };

    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => {
            onComplete();
          }}
          className="button--l button--alert"
        >
          Confirm
        </button>
      </>
    );
  };

  const render = () => {
    if (!fetched) return null;
    return (
      <>
        <Loader show={loader.showLoader} />
        <Modal
          show={showModal}
          handleClose={setShowModal}
          id={user.googleId}
          title={"Confrim Completion"}
          content="You will not be able to cancel your confirmation"
          actions={modalAction()}
        />
        <div className="motion-container">
          <header className="page-title" ref={headerRef}>
            <h2>{match.params.page}</h2>
          </header>

          <div ref={googleMapWrapper} className={mapClass}>
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
          </div>
          <div className="order-container">
            <DriverDateSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              page={match.params.page}
            />
            <div className="driver__order__list">{rednerSearchOrders()}</div>
          </div>
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, driver, loader }) => {
  return { auth: auth, user, driver, loader };
};

export default connect(mapStateToProps, {
  driverFetchOrder,
  driverCompeleteOrder,
  driverClearOrder,
  driverSetCoords,
  fetchUser,
  cancelOrder,
})(DriverOrder);
