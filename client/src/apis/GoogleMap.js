import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import { driverFetchOrder, loadMap } from "../actions";
import cvtObj2Arr from "../components/helpers/cvtObj2Arr";

const GoogleMap = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, lng: null };
  // }
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, []);

  useEffect(() => {
    // new window.google.maps.Map(refMap.current, {
    //   center: coords,
    //   zoom: 11,
    // });

    if (!coords.lat) return;
    const map = new window.google.maps.Map(refMap.current, {
      center: coords,
      zoom: 11,
    });

    const currentLocation = new window.google.maps.Marker({
      position: coords,
      map,
      title: "Hello World!",
    });

    renderMarkers(map);
  });

  const renderMarkers = (map) => {
    const orders = cvtObj2Arr(props.driverOrders);
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

  const getDistance = (google) => {
    const orders = cvtObj2Arr(props.driverOrders);
    orders.forEach((order) => {
      const origin = new google.maps.LatLng(coords.lat, coords.lng);
      const destination = new google.maps.LatLng(
        order.coords.lat,
        order.coords.lng
      );

      const callback = (response, status) => {
        props.getDistances(response.rows[0].elements[0].distance.text);
      };

      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: "DRIVING",
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        },
        callback
      );
    });
  };

  const geoSuccess = ({ coords }) => {
    setCoords({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailed = () => {
    console.log(`cibal`);
  };

  // renderMarkers = (map) => {
  //   const orders = cvtObj2Arr(this.props.driverOrders);

  //   orders.forEach((order) => {
  //     console.log(order.coords);
  //     new this.google.maps.Marker({
  //       position: order.coords,
  //       map,
  //       title: "Hello World!",
  //     });
  //   });
  // };

  return <div ref={refMap} className="googleMap"></div>;
};

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth, user, driverOrders };
};

export default connect(mapStateToProps, { loadMap, driverFetchOrder })(
  GoogleMap
);
