import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct } from "../actions";

const GoogleMap = ({ orders, driver, setCoordsAct, setMapLoaded, page }) => {
  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, [driver.orderFetched]);

  useEffect(() => {
    if (!driver.currentCoords?.lat) return;

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
    //
  }, [driver.currentCoords]);

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
