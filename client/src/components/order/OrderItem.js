import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { cancelOrder } from "../../actions";

import Modal from "../Modal";
import price from "../price";

const OrderItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const refDetail = useRef(null);
  const refBand = React.useRef(null);

  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const toggleView = () => {
    refDetail.current.classList.toggle("height--0");
    refDetail.current.classList.toggle("opacity--0");
    refDetail.current.classList.toggle("padding--0");
    refDetail.current.classList.toggle("margin--0");
    refDetail.current.classList.toggle("overflow--hidden");
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

  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => {
            console.log(props.order);
            props.cancelOrder(props.order._id, setShowModal);
          }}
          className="button--l button--alert"
        >
          Confirm
        </button>
      </>
    );
  };

  const render = () => {
    return (
      <>
        <Modal
          show={showModal}
          handleClose={setShowModal}
          id={props.user.googleId}
          title={"Cancel Order"}
          content="You cannot undeo your cancellation"
          actions={modalAction()}
        />

        <div
          ref={refBand}
          onClick={() => {
            toggleView();
          }}
          className="order__item"
        >
          <div>
            <h3>{props.order.status}</h3>
          </div>
          <div>
            {props.order.status === "submitted" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="button--m"
              >
                Cancel
              </button>
            ) : null}
          </div>
          <div>#{props.order.ticketId}</div>
          <div>
            Pick-up Date:{" "}
            {props.order.date
              ? props.order.date.split("-").slice(1, 3).join("/")
              : ""}
          </div>
          <div>
            <b>${props.order.total.total}</b>
          </div>
        </div>

        <div ref={refDetail} className={`order__detail ${animationClasses}`}>
          {renderDetail()}
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, orders }) => {
  return {
    auth,
    user: user.currentUser,
    orders: orders.orders,
  };
};

export default connect(mapStateToProps, { cancelOrder })(OrderItem);
