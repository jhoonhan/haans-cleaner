import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct, setDistance, setGeocode } from "../actions";

import markerRed from "../image/marker-red.png";
import markerBlue from "../image/marker-blue.png";
import markerGreen from "../image/marker-green.png";

const GoogleMap = ({
  orders,
  driver,
  page,
  mapRatio,
  setCoordsAct,
  setDistance,
  setIsMapLoaded,
}) => {
  const [loadedMap, setLoadedMap] = useState(null);
  const [direcRenderer, setDirecRenderer] = useState(
    new window.google.maps.DirectionsRenderer()
  );
  const [direcService, setDirecService] = useState(
    new window.google.maps.DirectionsService()
  );
  const [markers, setMarkers] = useState(null);
  const [test, setTest] = useState(null);

  const [trip, setTrip] = useState({
    duration: null,
    distance: null,
    total: null,
  });

  const refMap = React.useRef();

  useEffect(() => {
    if (navigator.geolocation && !driver.currentCoords) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, []);

  useEffect(() => {
    if (!driver.currentCoords) return;
    const map = new window.google.maps.Map(refMap.current, {
      center: driver.currentCoords,
      zoom: 11,
    });
    console.log(`map loaded`);
    setLoadedMap(map);

    const currentLocation = new window.google.maps.Marker({
      position: driver.currentCoords,
      map,
      icon: markerBlue,
      title: "Hello World!",
    });

    getDistance();
  }, [driver.currentCoords]);

  useEffect(() => {
    if (loadedMap !== null) {
      loadMarkers();
    }
  }, [loadedMap, driver.acceptedOrders, driver.order]);

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
      .catch((error) => console.error(error));
  };

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

  ///////////////////////////////////////////
  const geoSuccess = ({ coords }) => {
    setCoordsAct({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailed = () => {
    window.alert("You must enable sharing location");
  };
  //////////////////////////////////////////////////

  const getDistance = () => {
    if (!window.google) {
      return;
    }
    const ordersArr = cvtObj2Arr(driver.orders);
    const destinations = ordersArr
      .filter((order) => order.coords.lat)
      .map((order) => order.coords);
    const origin = new window.google.maps.LatLng(
      driver.currentCoords.lat,
      driver.currentCoords.lng
    );

    const distanceMatrixCallback = (response, status) => {
      const res = response.rows[0].elements;
      ordersArr.forEach((order, i) => {
        if (!driver.orders[order.id].distance) return;
        if (
          +res[i].distance.text.split(" ")[0] !==
          driver.orders[order.id].distance
        ) {
          setDistance(+res[i].distance.text.split(" ")[0], order.id);
        }
      });
      setIsMapLoaded(true);
    };

    const distanceMatrixService =
      new window.google.maps.DistanceMatrixService();
    distanceMatrixService.getDistanceMatrix(
      {
        origins: [origin],
        destinations,
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      },
      distanceMatrixCallback
    );
  };
  ////////////////////////////////////////////

  const renderTripDetail = (response) => {
    let total;
    const ordersArr = cvtObj2Arr(driver.acceptedOrders);
    if (ordersArr.length <= 1) {
      total = (ordersArr[0].total.total * 0.2).toFixed(2);
    }
    if (ordersArr.length > 1) {
      total = ordersArr.reduce((prev, curr) => {
        const prevTotal = prev.total.total * 0.2;
        const currTotal = curr.total.total * 0.2;
        return (prevTotal + currTotal).toFixed(2);
      });
    }

    setTrip({
      duration: response.routes[0].legs[0].duration.text,
      distance: response.routes[0].legs[0].distance.text,
      total,
    });
  };
  const render = () => {
    const conditionalStyle = `${
      page === "accepted" && cvtObj2Arr(driver.acceptedOrders).length > 0
        ? "block"
        : "none"
    }`;
    return (
      <>
        <div
          ref={refMap}
          className="googleMap--c"
          style={{ aspectRatio: mapRatio }}
        ></div>
        <div
          style={{
            display: conditionalStyle,
          }}
        >
          <button onClick={() => getDirection()} className={`button--l`}>
            get trip detail
          </button>

          <div>{trip.duration}</div>
          <div>{trip.distance}</div>
          <div>{trip.total ? `$${trip.total}` : ""}</div>
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
  setCoordsAct,
  setDistance,
  setGeocode,
})(GoogleMap);
