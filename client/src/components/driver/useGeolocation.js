import React, { useEffect } from "react";

const useGeolocation = (driver, driverSetCoords) => {
  useEffect(() => {
    if (navigator.geolocation && !driver.currentCoords) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFailed);
    }
  }, []);

  const geoSuccess = ({ coords }) => {
    driverSetCoords({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailed = () => {
    window.alert("You must enable sharing location");
  };

  return <div>useGeolocation</div>;
};

export default useGeolocation;
