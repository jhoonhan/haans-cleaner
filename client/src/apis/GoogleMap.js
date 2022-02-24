import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct } from "../actions";

const GoogleMap = ({ orders, driver, setCoordsAct, setMapLoaded, page }) => {
  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation && !driver.currentCoords) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, [driver.orderFetched]);

  useEffect(() => {
    if (!driver.currentCoords) return;
    console.log(`map loaded`);
    const map = new window.google.maps.Map(refMap.current, {
      center: driver.currentCoords,
      zoom: 11,
    });

    const currentLocation = new window.google.maps.Marker({
      position: driver.currentCoords,
      map,
      title: "Hello World!",
    });

    renderMarkers(map);
    setMapLoaded(true);

    // if (page === "accepted") {
    //   getDirection(map);
    // }
    //
    // }, [driver.currentCoords]);
  }, [driver.currentCoords]);

  //////////////////////////////////////////

  const getDirection = (map) => {
    console.log(`hmm`);
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    const origin = driver.currentCoords;
    const destinations = cvtObj2Arr(orders);
    console.log(destinations);

    directionsService
      .route({
        origin,
        destination: {
          lat: 36.00234305289227,
          lng: -80.01587722926817,
        },
        waypoints: [
          {
            location: { lat: 35.96227389191443, lng: -80.04084803896274 },
            stopover: false,
          },
          {
            location: { lat: 35.94184657462076, lng: -80.0041983363175 },
            stopover: false,
          },
        ],
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        // console.log(response.routes[0].legs[0]);
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

  return (
    <div
      ref={refMap}
      className={page === "search" ? "googleMap--m" : "googleMap--s"}
    ></div>
  );
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth, user, driver };
};

export default connect(mapStateToProps, { setCoordsAct })(GoogleMap);
