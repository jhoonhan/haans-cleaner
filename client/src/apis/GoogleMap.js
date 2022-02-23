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

  // loadMap = () => {
  //   const loader = new Loader({
  //     apiKey: "AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8",
  //     version: "weekly",
  //   });

  //   loader
  //     .load()
  //     .then((google) => {
  //       this.google = google;
  //       this.initMap();
  //     })
  //     .catch((e) => {
  //       // do something
  //     });
  // };

  initMap = (google) => {
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

      const htmlData = `<div>aaang</div>`;

      const marker = new google.maps.Marker({
        position: {
          lat: +order.coords.lat,
          lng: +order.coords.lng,
        },
        map,
        title: `${order.timestamp}`,
      });

      marker.addListener("click", () => {
        const selectedNode = document.querySelector(
          `[aria-label='${order.timestamp}']`
        );
        console.log(selectedNode.getBoundingClientRect());
        popUpContainer.insertAdjacentHTML("afterbegin", htmlData);
      });
    });
  };

  geoSuccess = ({ coords }) => {
    this.setState({ lat: coords.latitude, lng: coords.longitude });
    if (
      Object.keys(this.props.driverOrders).length === 0 &&
      this.props.driverOrders.constructor === Object
    ) {
      this.props.loadMap(null, true, this.initMap);
      return;
    }
    this.props.loadMap(null, false, this.initMap);
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
