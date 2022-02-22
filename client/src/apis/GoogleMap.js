import React from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { connect } from "react-redux";

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, lng: null };
  }
  componentDidMount() {
    const loader = new Loader({
      apiKey: "AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8",
      version: "weekly",
    });
    loader
      .load()
      .then((google) => {
        this.google = google;
        this.initMap();
      })
      .catch((e) => {
        // do something
      });
  }

  initMap = () => {
    this.getGeolocation();
    new this.google.maps.Map(document.querySelector(".googleMap"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  };

  getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.aang, this.cibal);
    }
  };

  aang = () => {
    console.log(`aang`);
  };

  cibal = () => {
    console.log(`cibal`);
  };

  render() {
    return <div className="googleMap"></div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(GoogleMap);
