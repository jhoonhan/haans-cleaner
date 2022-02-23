import React from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

import { driverFetchOrder, loadMap } from "../actions";
import cvtObj2Arr from "../components/helpers/cvtObj2Arr";

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, lng: null };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailed);
    }
  }

  setGoogle = (google) => {
    this.google = google;
  };
  initMap = (google) => {
    this.setGoogle(google);
    if (!this.state.lat) return;
    const currentCoords = { lat: this.state.lat, lng: this.state.lng };
    const map = new google.maps.Map(document.querySelector(".googleMap"), {
      center: { ...currentCoords },
      zoom: 11,
    });

    const currentLocation = new google.maps.Marker({
      position: currentCoords,
      map,
      title: "Hello World!",
    });

    this.renderMarkers(map, google);
  };

  renderMarkers = (map, google) => {
    const popUpContainer = this.props.popUpContainer.current;
    const orders = cvtObj2Arr(this.props.driverOrders);
    orders.forEach(function (order, i) {
      if (!order.coords.lat) return;

      const marker = new google.maps.Marker({
        position: {
          lat: +order.coords.lat,
          lng: +order.coords.lng,
        },
        map,
        title: `${order.timestamp}`,
      });

      // marker.addListener("click", () => {
      //   map.panTo(marker.getPosition());
      //   const popUps = popUpContainer.querySelectorAll(".map__pop-up");
      //   popUps.forEach((popUp) => popUp.remove());
      //   const selectedNode = document.querySelector(
      //     `[aria-label='${order.timestamp}']`
      //   );
      //   const rect = selectedNode.getBoundingClientRect();
      //   const style = `top:${rect.top - 70}px; left:${rect.left - 55}px`;
      //   const htmlData = `<div class="map__pop-up" style="${style}">aaang</div>`;

      //   popUpContainer.insertAdjacentHTML("afterbegin", htmlData);
      // });
    });
  };

  getDistance = (google) => {
    const orders = cvtObj2Arr(this.props.driverOrders);
    orders.forEach((order) => {
      const origin = new google.maps.LatLng(this.state.lat, this.state.lng);
      const destination = new google.maps.LatLng(
        order.coords.lat,
        order.coords.lng
      );

      const callback = (response, status) => {
        this.props.getDistances(response.rows[0].elements[0].distance.text);
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

  geoSuccess = ({ coords }) => {
    this.setState({ lat: coords.latitude, lng: coords.longitude });
    if (
      Object.keys(this.props.driverOrders).length === 0 &&
      this.props.driverOrders.constructor === Object
    ) {
      this.props.loadMap(null, true, this.initMap, this.getDistance);
      return;
    }
    this.props.loadMap(null, false, this.initMap, this.getDistance);
  };

  geoFailed = () => {
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

  render() {
    return <div className="googleMap"></div>;
  }
}

const mapStateToProps = ({ auth, user, driverOrders }) => {
  return { auth, user, driverOrders };
};

export default connect(mapStateToProps, { loadMap, driverFetchOrder })(
  GoogleMap
);
