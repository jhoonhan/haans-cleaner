import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import cvtObj2Arr from "../components/helpers/cvtObj2Arr";
import { setCoordsAct, setDistance, setGeocode } from "../actions";

const GoogleMap = ({
  orders,
  driver,
  page,
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
    mafa: null,
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
      title: "Hello World!",
    });

    getDistance();
  }, [driver.currentCoords]);

  useEffect(() => {
    if (loadedMap !== null) {
      loadMarkers();
    }
  }, [loadedMap, driver.acceptedOrders]);

  useEffect(() => {
    if (loadedMap === null) return;
    if (markers === null) {
      loadMarkers();
    }
    if (markers !== null) {
      renderMarkers();
    }
  }, [markers]);

  useEffect(() => {}, [driver.orders, driver.acceptedOrders]);

  // useEffect(() => {
  //   if (!markers) return;

  //   markers.forEach((marker) => {
  //     if (marker === null) return;
  //     marker.setMap(loadedMap);
  //   });
  // }, [markers]);

  //////////////////////////////////////////

  const getDirection = () => {
    direcRenderer.setMap(null);
    const origin = driver.currentCoords;
    const orderArr = cvtObj2Arr(driver.acceptedOrders);
    const waypoints = orderArr
      .filter((order) => order.coords.lat)
      .map((el) => {
        return { location: el.coords, stopover: false };
      });
    const destination = orderArr
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
    console.log("marker loaded");
    if (markers !== null) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers(null);
    }

    const orderArr = cvtObj2Arr(orders);
    const markersArr = orderArr.map(function (order, i) {
      if (!order.coords.lat) return null;

      const marker = new window.google.maps.Marker({
        position: {
          lat: +order.coords.lat,
          lng: +order.coords.lng,
        },
        title: `${order.timestamp}`,
      });
      return marker;
    });
    console.log(markersArr);
    setMarkers(markersArr.filter((marker) => marker !== null));
  };
  const clearMarkers = () => {
    console.log(`clear markers fired`);
    setMarkers(null);
    markers.forEach((marker) => {
      marker.setMap(null);
    });
  };

  const renderMarkers = () => {
    if (markers === null) return;

    markers.forEach((marker) => {
      console.log(marker);
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
    const orderArr = cvtObj2Arr(driver.orders);
    const destinations = orderArr
      .filter((order) => order.coords.lat)
      .map((order) => order.coords);
    const origin = new window.google.maps.LatLng(
      driver.currentCoords.lat,
      driver.currentCoords.lng
    );

    // const geocodingCallback = (results, status) => {

    //   if (status === "OK") {
    //     console.log(results[0].geometry.location.lat());
    //     // if (!driver.orders[order.id]){}
    //     setGeocode(results[0].geometry.location.lat());
    //   } else {
    //     alert("Geocode was not successful for the following reason: " + status);
    //   }
    // };

    // const geocodingService = new window.google.maps.Geocoder();
    // orderArr.forEach((order) => {
    //   if (order.coords.lat && order.coords.lng) return;
    //   geocodingService.geocode(
    //     { address: order.street + order.city + order.zip },
    //     geocodingCallback
    //   );
    // });
    const distanceMatrixCallback = (response, status) => {
      const res = response.rows[0].elements;
      orderArr.forEach((order, i) => {
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
    // const orderArr = cvtObj2Arr(driver.acceptedOrders);
    // const total = orderArr.reduce((prev, curr) => {
    //   const prevTotal = prev.total.total * 0.2;
    //   const currTotal = curr.total.total * 0.2;
    //   return (prevTotal + currTotal).toFixed(2);
    // });

    setTrip({
      duration: response.routes[0].legs[0].duration.text,
      distance: response.routes[0].legs[0].distance.text,
      // total,
    });
  };
  const render = () => {
    return (
      <>
        <div
          ref={refMap}
          className={page === "search" ? "googleMap--m" : "googleMap--s"}
        ></div>
        <div style={{ display: `${page === "search" ? "none" : "block"}` }}>
          <button onClick={() => getDirection()} className="button--l">
            get trip detail
          </button>

          <div>{trip.duration}</div>
          <div>{trip.distance}</div>
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
