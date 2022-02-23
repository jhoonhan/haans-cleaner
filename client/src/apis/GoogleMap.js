import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct } from "../actions";

const GoogleMap = (props) => {
  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation && props.driver.orders) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, [props.driver.orderFetched]);

  useEffect(() => {
    if (!props.driver.currentCoords?.lat) return;

    const map = new window.google.maps.Map(refMap.current, {
      center: props.driver.currentCoords,
      zoom: 11,
    });

    const currentLocation = new window.google.maps.Marker({
      position: props.driver.currentCoords,
      map,
      title: "Hello World!",
    });

    renderMarkers(map);

    props.setMapLoaded(true);
    //
  }, [props.driver.currentCoords]);

  const renderMarkers = (map) => {
    const orders = cvtObj2Arr(props.driver.orders);
    orders.forEach(function (order, i) {
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
    props.setCoordsAct({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailed = () => {
    console.log(`cibal`);
  };

  return <div ref={refMap} className="googleMap"></div>;
};

const mapStateToProps = ({ auth, user, driver }) => {
  return { auth, user, driver };
};

export default connect(mapStateToProps, { setCoordsAct })(GoogleMap);
