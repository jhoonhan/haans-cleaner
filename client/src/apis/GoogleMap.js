import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { driverSetCoords, driverEditAcceptedOrder } from "../actions";

import markerRed from "../image/marker-red.png";
import markerBlue from "../image/marker-blue.png";
import markerGreen from "../image/marker-green.png";

const GoogleMap = ({ orders, driver, page, mapClass }) => {
  const [loadedMap, setLoadedMap] = useState(null);
  const [direcRenderer, setDirecRenderer] = useState(
    new window.google.maps.DirectionsRenderer()
  );
  const [direcService, setDirecService] = useState(
    new window.google.maps.DirectionsService()
  );
  const [markers, setMarkers] = useState(null);

  const [trip, setTrip] = useState({
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
      styles: [{ hue: "#000000" }],
    });
    console.log(`map loaded`);
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

  const onClickTripDetail = () => {
    if (!trip) toggleView(refTripDetail);
    getDirection();
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
      duration: response.routes[0].legs[0].duration.text,
      distance: response.routes[0].legs[0].distance.text,
      total,
    });
  };
  const renderTripDetail = () => {
    return (
      <div className="map__trip-detail__info">
        <div>
          <label>Duration:</label> {trip.duration}
        </div>
        <div>
          <label>Distance:</label> {trip.distance}
        </div>
        <div>
          <label>Profit:</label> {trip.total ? `$${trip.total}` : ""}
        </div>
      </div>
    );
  };

  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const toggleView = (ref) => {
    const selectedRef = ref;
    selectedRef.current.classList.toggle("height--0");
    selectedRef.current.classList.toggle("opacity--0");
    selectedRef.current.classList.toggle("padding--0");
    selectedRef.current.classList.toggle("margin--0");
    selectedRef.current.classList.toggle("overflow--hidden");
  };

  ///

  const render = () => {
    return (
      <>
        <div ref={refMap} className={`googleMap--c`}></div>

        <div className="map__trip-detail__container">
          <div
            onClick={onClickTripDetail}
            className={`map__get-detil button--m`}
          >
            get trip detail
          </div>

          <div
            ref={refTripDetail}
            className={`map__trip-detail__info ${animationClasses}`}
          >
            {renderTripDetail()}
          </div>
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
  driverEditAcceptedOrder,
})(GoogleMap);
