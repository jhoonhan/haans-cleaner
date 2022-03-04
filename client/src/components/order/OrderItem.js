import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { cancelOrder } from "../../actions";

import OrderCancel from "./OrderCancel";
import price from "../price";

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.detailRef = React.createRef();
    this.buttonRef = React.createRef();

    this.animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  onCancelClick = () => {
    // this.props.cancelOrder(this.props.auth.userProfile.FW);
  };

  highlightButton = () => {
    this.buttonRef.current.classList.toggle("button--active");
  };

  toggleView = () => {
    this.detailRef.current.classList.toggle("height--0");
    this.detailRef.current.classList.toggle("opacity--0");
    this.detailRef.current.classList.toggle("padding--0");
    this.detailRef.current.classList.toggle("margin--0");
    this.detailRef.current.classList.toggle("overflow--hidden");
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

  render() {
    return (
      <>
        <OrderCancel
          show={this.state.show}
          handleClose={this.hideModal}
          id={this.props.order._id}
        />
        <div className="order__item">
          <div>
            <h3>{this.props.order.status}</h3>
          </div>
          <div>
            {this.props.order.status === "submitted" ? (
              <button onClick={this.showModal} className="button--m">
                Cancel
              </button>
            ) : null}

            <button
              className="button--m"
              ref={this.buttonRef}
              onClick={() => {
                this.toggleView();
                this.highlightButton();
              }}
            >
              Detail
            </button>
          </div>
          <div>#{this.props.order.ticketId}</div>
          <div>
            Pick-up Date:{" "}
            {this.props.order.date
              ? this.props.order.date.split("-").slice(1, 3).join("/")
              : ""}
          </div>
          <div>
            <b>${this.props.order.total.total}</b>
          </div>
        </div>

        <div
          ref={this.detailRef}
          className={`order__detail ${this.animationClasses}`}
        >
          {this.renderDetail()}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    orders: orders.orders,
  };
};

export default connect(mapStateToProps, { cancelOrder })(OrderItem);
