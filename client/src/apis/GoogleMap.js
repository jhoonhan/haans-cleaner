import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { driverSetCoords } from "../actions";

import markerRed from "../image/marker-red.png";
import markerBlue from "../image/marker-blue.png";
import markerGreen from "../image/marker-green.png";
import icons from "../image/ui-icons.svg";

const GoogleMap = ({ orders, driver, page, mapClass }) => {
  const [loadedMap, setLoadedMap] = useState(null);
  const [direcRenderer, setDirecRenderer] = useState(
    new window.google.maps.DirectionsRenderer()
  );
  const [direcService, setDirecService] = useState(
    new window.google.maps.DirectionsService()
  );
  const [markers, setMarkers] = useState(null);

  const [showTrip, setShowTrip] = useState(false);
  const [trip, setTrip] = useState({
    fetched: false,
    duration: null,
    distance: null,
    total: null,
  });

  const refMap = useRef(null);
  const refTripDetail = useRef(null);

  useEffect(() => {
    if (!driver.currentCoords) return;
    const map = new window.google.maps.Map(refMap.current, {
      center: driver.currentCoords,
      zoom: 11,
      disableDefaultUI: true,
    });
    setLoadedMap(map);

    const currentLocation = new window.google.maps.Marker({
      position: driver.currentCoords,
      map,
      icon: markerBlue,
      title: "Hello World!",
    });

    // getDistance();
  }, [driver.currentCoords]);

  useEffect(() => {
    if (loadedMap !== null) {
      loadMarkers();
    }
  }, [loadedMap, driver.acceptedOrders, driver.orders]);

  useEffect(() => {
    if (loadedMap === null) return;
    if (markers === null) {
      loadMarkers();
    }
    if (markers !== null) {
      renderMarkers();
    }
  }, [markers]);

  //////////////////////////////////////////
  const loadMarkers = () => {
    if (markers !== null) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers(null);
    }
    if (markers === null) {
      const ordersArr = cvtObj2Arr(orders);
      const markersArr = ordersArr.map(function (order, i) {
        let customIcon;
        if (!order.coords.lat) return null;
        if (order.status === "submitted") {
          customIcon = markerRed;
        }
        if (order.status === "accepted") {
          customIcon = markerGreen;
        }
        const marker = new window.google.maps.Marker({
          position: {
            lat: +order.coords.lat,
            lng: +order.coords.lng,
          },
          icon: customIcon,
          title: `${order.timestamp}`,
        });
        return marker;
      });
      setMarkers(markersArr.filter((marker) => marker !== null));
    }
  };

  const renderMarkers = () => {
    if (markers === null) return;

    markers.forEach((marker) => {
      marker.setMap(loadedMap);
    });
  };
  /////////////////////////////////////////

  useEffect(() => {
    setShowTrip(false);
    setTrip({ fetched: false, duration: null, distance: null, total: null });
  }, [driver.acceptedOrders]);

  useEffect(() => {
    showDetailView(refTripDetail);
  }, [showTrip]);

  const onClickTripDetail = () => {
    setShowTrip(true);
    getDirection();
  };
  const onClickTripClose = () => {
    setShowTrip(false);
  };

  const getDirection = () => {
    direcRenderer.setMap(null);
    const origin = driver.currentCoords;
    const ordersArr = cvtObj2Arr(driver.acceptedOrders);
    const waypoints = ordersArr
      .filter((order) => order.coords.lat)
      .map((el) => {
        return { location: el.coords, stopover: false };
      });
    const destination = ordersArr
      .filter((order) => order.coords.lat)
      .reduce((prev, curr) => {
        if (!prev.distance || !curr.distance) return null;
        if (prev.distance < curr.distnace) {
          return curr;
        } else {
          return prev;
        }
      });

    direcService
      .route({
        origin,
        destination: destination.coords,
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        if (response.status === "OK") {
          direcRenderer.setDirections(response);
          direcRenderer.setMap(loadedMap);
        }
        loadTripDetail(response);
      })
      .catch((error) => console.error(error));
  };

  const loadTripDetail = (response) => {
    let total;
    const ordersArr = cvtObj2Arr(driver.acceptedOrders);
    if (ordersArr.length <= 1) {
      total = (ordersArr[0].total.total * 0.2).toFixed(2);
    }
    if (ordersArr.length > 1) {
      total = ordersArr
        .filter((order) => order.total.total !== "0")
        .map((order) => +order.total.total * 0.2)
        .reduce((a, b) => a + b);
    }

    setTrip({
      fetched: true,
      duration: response.routes[0].legs[0].duration.text,
      distance: response.routes[0].legs[0].distance.text,
      total,
    });
  };

  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const showDetailView = (ref) => {
    const selectedRef = ref;
    if (showTrip) {
      selectedRef.current.classList.remove("height--0");
      selectedRef.current.classList.remove("opacity--0");
      selectedRef.current.classList.remove("padding--0");
      selectedRef.current.classList.remove("margin--0");
      selectedRef.current.classList.remove("overflow--hidden");
    } else {
      selectedRef.current.classList.add("height--0");
      selectedRef.current.classList.add("opacity--0");
      selectedRef.current.classList.add("padding--0");
      selectedRef.current.classList.add("margin--0");
      selectedRef.current.classList.add("overflow--hidden");
    }
  };

  const renderTripDetail = () => {
    if (!showTrip) return null;
    return (
      <>
        <div className="map__trip-detail__info">
          <h4
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid #ccc",
              marginBottom: "0.5rem",
            }}
          >
            trip detail
          </h4>
          <div></div>
          <label style={{ paddingRight: "2rem" }}>Duration: </label>
          <p>{trip.duration}</p>
          <label>Distance: </label>
          <p>{trip.distance}</p>
          <label>Profit: </label>
          <p>{trip.total ? `$${trip.total}` : ""}</p>
        </div>
        <svg onClick={onClickTripClose} viewBox="0 0 25 25" className="ui-icon">
          <use href={`${icons}#x`} className="ui-icon"></use>
        </svg>
      </>
    );
  };
  ///

  const render = () => {
    return (
      <>
        <div className="map__container">
          <div ref={refMap} className={`googleMap--c`}></div>
          <button
            onClick={onClickTripDetail}
            className="map__get-detail button--f"
            style={
              page === "accepted" ? { display: "flex" } : { display: "none" }
            }
          >
            get trip detail
          </button>
        </div>

        <div
          ref={refTripDetail}
          className={`map__trip-detail__container ${animationClasses}`}
        >
          {renderTripDetail()}
        </div>
      </>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth, user, driver };
};

export default connect(mapStateToProps, {
  driverSetCoords,
})(GoogleMap);
