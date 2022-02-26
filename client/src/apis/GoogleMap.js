import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct, setDistance } from "../actions";

const GoogleMap = ({ orders, driver, page, setCoordsAct, setDistance }) => {
  const [loadedMap, setLoadedMap] = useState(null);
  const [direcRenderer, setDirecRenderer] = useState(
    new window.google.maps.DirectionsRenderer()
  );
  const [direcService, setDirecService] = useState(
    new window.google.maps.DirectionsService()
  );
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
    renderMarkers(map);
    getDistance();

    // if (page === "accepted") {
    //   getDirection(map);
    // }
    //
  }, [driver.currentCoords]);

  //////////////////////////////////////////

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

  const getDistance = () => {
    if (!window.google) {
      return;
    }

    const orderArr = cvtObj2Arr(driver.orders);
    // const destinations = orderArr.map((order) => {
    //   if (!order.coords) return;
    //   return !order.coords ? null : order.coords;
    // });
    const destinations = orderArr
      .filter((order) => order.coords.lat)
      .map((order) => order.coords);

    const origin = new window.google.maps.LatLng(
      driver.currentCoords.lat,
      driver.currentCoords.lng
    );

    const callback = (response) => {
      const res = response.rows[0].elements;
      const orderArr = cvtObj2Arr(driver.orders);
      const orders = orderArr.map((order) => {
        return order;
      });

      orders.forEach((order, i) => {
        if (!driver.orders[order.id].distance) return;
        if (res[i].distance.text !== driver.orders[order.id].distance) {
          setDistance(res[i].distance.text, order.id);
        }
      });
    };

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations,
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      },
      callback
    );
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
        <button onClick={() => getDirection(false)} className="button--l">
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

export default connect(mapStateToProps, { setCoordsAct, setDistance })(
  GoogleMap
);
