import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import Modal2 from "../Modal2";

import { driverAcceptOrder, driverCompeleteOrder } from "../../actions";

import price from "../price";

const DriverOrderItem = (props) => {
  const [showModal, setShowModal] = useState(null);

  // }
  const refDetail = React.useRef(null);
  const refBand = React.useRef(null);
  const refAccept = React.useRef(null);

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

  const onAccept = (id) => {
    if (props.order.status === "completed") {
      window.alert("this is already completed");
      return;
    }

    if (props.order.status === "submitted") {
      // setOrderStatus("accepted");
      props.driverAcceptOrder(id, {
        status: "accepted",
        acceptId: props.auth.userProfile.FW,
      });
    }
    if (props.order.status === "accepted") {
      // setOrderStatus("submitted");
      props.driverAcceptOrder(id, {
        status: "submitted",
        acceptId: props.auth.userProfile.FW,
      });
    }
  };
  const onComplete = () => {
    if (props.order.status === "accepted") {
      // setOrderStatus("compeleted");
      props.driverCompeleteOrder(props.order._id, {
        status: "completed",
        acceptId: props.auth.userProfile.FW,
      });
    }
    if (props.order.status === "completed") {
      setShowModal(true);
    }
  };

  const cancelCompletion = () => {
    props.driverCompeleteOrder(props.order.id, {
      status: "accepted",
      acceptId: props.auth.userProfile.FW,
      userId: props.user.id,
    });
  };

  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => {
            // deleteUser(user.id);
            cancelCompletion();
            setShowModal(false);
          }}
          className="button--l button--alert"
        >
          Confirm
        </button>
      </>
    );
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
          {props.order.status}
        </div>
      </div>
    );
  };

  const renderAcceptButtons = () => {
    const buttonColor = () => {
      if (props.order.status === "completed") return "red";
      if (props.order.status === "accepted") return "#ccc";
    };
    return (
      <div className="driver__order__buttton__container">
        <div
          onClick={() => onAccept(props.order.id)}
          className="driver__order__buttton"
          style={{
            backgroundColor:
              props.order.status === "accepted" ? "pink" : "#cccccc",
          }}
        >
          Cancel
        </div>
        <div
          onClick={() => onComplete()}
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
        <Modal2
          show={showModal}
          handleClose={setShowModal}
          id={props.user.googleId}
          title={"Cancel Completion"}
          content="A notification will be sent to the user"
          actions={modalAction()}
        />
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
            <div>#{props.order.ticketId}</div>
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
