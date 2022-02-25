import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct } from "../actions";

const GoogleMap = ({ orders, driver, page, setCoordsAct }) => {
  const [loadedMap, setLoadedMap] = useState(null);
  const [trip, setTrip] = useState({ duration: null, distance: null });
  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation && !driver.currentCoords) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, [driver.orderFetched]);

  useEffect(() => {
    if (!driver.currentCoords) return;
    const map = new window.google.maps.Map(refMap.current, {
      center: driver.currentCoords,
      zoom: 11,
    });
    console.log(`map loaded`);

    const currentLocation = new window.google.maps.Marker({
      position: driver.currentCoords,
      map,
      title: "Hello World!",
    });
    setLoadedMap(map);
    renderMarkers(loadedMap);

    // if (page === "accepted") {
    //   getDirection(map);
    // }
    //
  }, [driver.currentCoords]);

  //////////////////////////////////////////

  const getDirection = (type) => {
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const directionsService = new window.google.maps.DirectionsService();
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    const origin = driver.currentCoords;
    const ordersArr = cvtObj2Arr(driver.acceptedOrders);
    console.log(ordersArr);
    const waypoints = ordersArr.map((el) => {
      return { location: el.coords, stopover: false };
    });
    const destination = ordersArr.reduce((prev, curr) => {
      if (!prev.distance || !curr.distance) return null;
      if (prev.distance < curr.distnace) {
        return curr;
      } else {
        return prev;
      }
    });
    directionsService
      .route({
        origin,
        destination: destination.coords,
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        console.log(response);
        if (response.status === "OK") {
          directionsRenderer.setDirections(response);
          directionsRenderer.setMap(loadedMap);
        }
        renderTripDetail(response);
      })
      .catch((e) => window.alert(`Directions request failed due to ${e}`));
  };

  //////////////////////////////////////////
  const renderMarkers = (map) => {
    const orderArr = cvtObj2Arr(orders);
    orderArr.forEach(function (order, i) {
      if (!order.coords.lat) return;

      const marker = new window.google.maps.Marker({
        position: {
          lat: +order.coords.lat,
          lng: +order.coords.lng,
        },
        map,
        title: `${order.timestamp}`,
      });
    });
  };

  const geoSuccess = ({ coords }) => {
    setCoordsAct({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailed = () => {
    console.log(`cibal`);
  };
  const renderTripDetail = (response) => {
    setTrip({
      duration: response.routes[0].legs[0].duration.text,
      distance: response.routes[0].legs[0].distance.text,
    });
  };
  const render = () => {
    return (
      <>
        <div
          ref={refMap}
          className={page === "search" ? "googleMap--m" : "googleMap--s"}
        ></div>
        <button onClick={() => getDirection()} className="button--l">
          get trip detail
        </button>
        <div>{trip.duration}</div>
        <div>{trip.distance}</div>
      </>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth, user, driver };
};

export default connect(mapStateToProps, { setCoordsAct })(GoogleMap);
