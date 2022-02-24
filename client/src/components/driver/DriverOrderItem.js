import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

import { acceptOrder, setDistance } from "../../actions";

import price from "../price";

class DriverOrderItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { status: this.props.order.status, distance: null };

    this.refDetail = React.createRef();
    this.refBand = React.createRef();
    this.refAccept = React.createRef();

    this.animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;
  }

  componentDidMount() {
    this.getDistance();
  }

  toggleView = (ref) => {
    const selectedRef = ref;
    selectedRef.current.classList.toggle("height--0");
    selectedRef.current.classList.toggle("opacity--0");
    selectedRef.current.classList.toggle("padding--0");
    selectedRef.current.classList.toggle("margin--0");
    selectedRef.current.classList.toggle("overflow--hidden");
  };

  renderCount(clothes) {
    if (!clothes) return null;

    const keys = Object.keys(clothes);
    return keys.map((key, i) => {
      return (
        <div className="order__detail__table" key={i}>
          <div>{key}</div>
          <div className="order__detail__table__cell-dash">
            <div></div>
            <div></div>
          </div>
          <div>{clothes[key]}</div>
          <div>x</div>
          <div>${price[key]}</div>
        </div>
      );
    });
  }

  renderDetail() {
    return (
      <>
        <div
          className="order__detail__row"
          style={{
            textAlign: "end",
            borderBottom: "1px solid #eeeeee",
            paddingBottom: "2rem",
          }}
        >
          <div>
            <strong>{this.props.order.name}</strong>
          </div>
          <div>{` ${this.props.order.street}, ${this.props.order.city}`}</div>
          <div>{this.props.order.phone}</div>
        </div>
        <div className="order__detail__row">
          {this.renderCount(this.props.order.clothes)}
        </div>

        <div className="order__detail__row">
          <div
            className="order__detail__table"
            style={{ borderTop: "1px solid #eeeeee", paddingTop: "2rem" }}
          >
            <div></div>
            <div></div>
            <div>Subtotal</div>
            <div>:</div>
            <div>${this.props.order.total.subtotal}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Tax</div>
            <div>:</div>
            <div>${this.props.order.total.tax}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Total</div>
            <div>:</div>
            <div>
              <b>${this.props.order.total.total}</b>
            </div>
          </div>
        </div>
      </>
    );
  }

  onAccept = (id) => {
    if (this.props.order.status === "submitted") {
      this.setState({ status: "accepted" });
      this.props.acceptOrder(id, {
        status: "accepted",
        acceptId: this.props.auth.userProfile.FW,
      });
    }
    if (this.props.order.status === "accepted") {
      this.setState({ status: "submitted" });
      this.props.acceptOrder(id, {
        status: "submitted",
        acceptId: this.props.auth.userProfile.FW,
      });
    }
  };

  getDistance = () => {
    if (!window.google) {
      return;
    }
    console.log(`distance fired`);
    const origin = new window.google.maps.LatLng(
      this.props.driver.currentCoords.lat,
      this.props.driver.currentCoords.lng
    );
    const destination = new window.google.maps.LatLng(
      this.props.order.coords.lat,
      this.props.order.coords.lng
    );

    const callback = (response, status) => {
      const distance = response.rows[0].elements[0].distance.text;
      this.setDistance(distance);
      this.setState({ ...this.state, distance });
    };

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      },
      callback
    );
  };

  renderSearchButtons() {
    return (
      <div className="driver__order__buttton__container">
        <div
          onClick={() => this.toggleView(this.refBand)}
          className="driver__order__buttton"
        >
          Hide
        </div>
        <div
          onClick={() => this.onAccept(this.props.order.id)}
          className="driver__order__buttton"
          style={{
            backgroundColor:
              this.props.order.status === "submitted" ? "aquamarine" : "#ccc",
          }}
        >
          {this.props.order.status}
        </div>
      </div>
    );
  }

  renderAcceptButtons() {
    return (
      <div className="driver__order__buttton__container">
        <div
          onClick={() => this.onAccept(this.props.order.id)}
          className="driver__order__buttton"
          style={{
            backgroundColor: "pink",
          }}
        >
          cancel
        </div>
        <div
          onClick={() => this.toggleView(this.refBand)}
          className="driver__order__buttton"
          style={{ backgroundColor: "aquamarine" }}
        >
          Completed
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        ref={this.refBand}
        timestamp={this.props.timestamp}
        className="driver__order__row"
      >
        <div
          onClick={() => {
            this.toggleView(this.refDetail);
          }}
          className="driver__order__item"
        >
          <div>
            <h3>{this.state.distance}</h3>
          </div>
          <div></div>
          <div>#{this.props.order.id}</div>
          <div>
            {this.props.order.street}, {this.props.order.city}
          </div>
          <div></div>
          <div>
            <h3>${(this.props.order.total.total * 0.2).toFixed(2)}</h3>
          </div>
        </div>
        {this.props.page === "search"
          ? this.renderSearchButtons()
          : this.renderAcceptButtons()}

        <div
          ref={this.refDetail}
          className={`order__detail ${this.animationClasses}`}
        >
          {this.renderDetail()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, driver }) => {
  return {
    auth,
    user: user.currentUser,
    driver,
  };
};

export default connect(mapStateToProps, { acceptOrder, setDistance })(
  DriverOrderItem
);
