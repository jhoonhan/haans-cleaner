import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import Modal from "../Modal";

import { driverAcceptOrder, driverCompeleteOrder } from "../../actions";

import price from "../price";

const DriverOrderItem = (props) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const refDetail = React.useRef(null);
  const refBand = React.useRef(null);
  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const toggleView = (ref) => {
    const selectedRef = ref;
    selectedRef.current.classList.toggle("height--0");
    selectedRef.current.classList.toggle("opacity--0");
    selectedRef.current.classList.toggle("padding--0");
    selectedRef.current.classList.toggle("margin--0");
    selectedRef.current.classList.toggle("overflow--hidden");
  };

  const renderCount = (clothes) => {
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
  };

  const renderDetail = () => {
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
            <strong>{props.order.name}</strong>
          </div>
          <div>{` ${props.order.street}, ${props.order.city}`}</div>
          <div>{props.order.phone}</div>
        </div>
        <div className="order__detail__row">
          {renderCount(props.order.clothes)}
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
            <div>${props.order.total.subtotal}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Tax</div>
            <div>:</div>
            <div>${props.order.total.tax}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Total</div>
            <div>:</div>
            <div>
              <b>${props.order.total.total}</b>
            </div>
          </div>
        </div>
      </>
    );
  };

  const onAccept = async (id) => {
    if (btnLoading) {
      console.log(`no double click you moron`);
      return;
    }
    setBtnLoading(true);

    if (props.order.status === "completed") {
      window.alert("this is already completed");
    }

    if (props.order.status === "submitted") {
      // setOrderStatus("accepted");
      await props.driverAcceptOrder(id, {
        status: "accepted",
        acceptId: props.auth.userProfile.FW,
        acceptDate: new Date().toISOString().split("T")[0],
      });
    }
    if (props.order.status === "accepted") {
      // setOrderStatus("submitted");
      await props.driverAcceptOrder(id, {
        status: "submitted",
        acceptId: props.auth.userProfile.FW,
        acceptDate: null,
      });
    }
    setBtnLoading(false);
  };

  //////////

  const renderSearchButtons = () => {
    const buttonColor = () => {
      if (props.order.status === "submitted") return "aquamarine";
      if (props.order.status === "accepted") return "#ccc";
    };
    return (
      <div className="driver__order__buttton__container">
        <div
          onClick={() => toggleView(refBand)}
          className="driver__order__buttton"
        >
          Hide
        </div>
        <div
          onClick={() => onAccept(props.order._id)}
          className="driver__order__buttton"
          style={{
            backgroundColor: buttonColor(),
          }}
        >
          {!btnLoading ? props.order.status : "Loading"}
        </div>
      </div>
    );
  };
  const onClickComplete = () => {
    if (props.order.status === "completed") return;
    const date = new Date().toISOString().split("T")[0];
    const today = new Date(date).toDateString();
    const pickupDate = new Date(props.order.date).toDateString();

    if (pickupDate === today) {
      props.setShowModal(true);
      props.setSelectedOrder(props.order);
    } else {
      console.log(`Wait for God's calling`);
    }
  };

  const renderAcceptButtons = () => {
    const buttonColor = () => {
      if (props.order.status === "completed") return "red";
      if (props.order.status === "accepted") return "#ccc";
    };
    return (
      <div className="driver__order__buttton__container">
        <div
          onClick={() => onAccept(props.order._id)}
          className="driver__order__buttton"
          style={{
            backgroundColor:
              props.order.status === "accepted" ? "pink" : "#cccccc",
          }}
        >
          Cancel
        </div>
        <div
          onClick={onClickComplete}
          className="driver__order__buttton"
          style={{ backgroundColor: buttonColor() }}
        >
          {props.order.status}
        </div>
      </div>
    );
  };
  const renderButtons = () => {
    if (props.page === "search") return renderSearchButtons();
    if (props.page === "accepted") return renderAcceptButtons();
    if (props.page === "account") return null;
  };

  const render = () => {
    return (
      <>
        <div
          ref={refBand}
          timestamp={props.timestamp}
          className="driver__order__row"
        >
          <div
            onClick={() => {
              toggleView(refDetail);
            }}
            className="driver__order__item"
          >
            <div>
              <h3>
                {props.order.distance
                  ? `${props.order.distance} mi`
                  : "Call customer"}{" "}
              </h3>
            </div>
            <div></div>
            <div>
              {new Date(props.order.date).toISOString().split("T")[0]}#
              {props.order.ticketId}
            </div>
            <div>
              {props.order.street}, {props.order.city}
            </div>
            <div></div>
            <div>
              <h3>${(props.order.total.total * 0.2).toFixed(2)}</h3>
            </div>
          </div>
          {renderButtons()}

          <div ref={refDetail} className={`order__detail ${animationClasses}`}>
            {renderDetail()}
          </div>
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, driver }) => {
  return {
    auth,
    user: user.currentUser,
    driver,
  };
};

export default connect(mapStateToProps, {
  driverAcceptOrder,
  driverCompeleteOrder,
})(DriverOrderItem);
