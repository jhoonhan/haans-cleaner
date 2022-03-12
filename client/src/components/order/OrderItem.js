import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { cancelOrder } from "../../actions";

import Modal from "../Modal";
import Loader from "../Loader";
import price from "../price";

const OrderItem = ({ order, page, setShowModal, setSelectedOrder }) => {
  // const [showModal, setShowModal] = useState(false);
  const refDetail = useRef(null);
  const refBand = useRef(null);

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
            <strong>{order.name}</strong>
          </div>
          <div>{` ${order.street}, ${order.city}`}</div>
          <div>{order.phone}</div>
        </div>
        <div className="order__detail__row">{renderCount(order.clothes)}</div>

        <div className="order__detail__row">
          <div
            className="order__detail__table"
            style={{ borderTop: "1px solid #eeeeee", paddingTop: "2rem" }}
          >
            <div></div>
            <div></div>
            <div>Subtotal</div>
            <div>:</div>
            <div>${order.total.subtotal}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Tax</div>
            <div>:</div>
            <div>${order.total.tax}</div>
          </div>
          <div className="order__detail__table">
            <div></div>
            <div></div>
            <div>Total</div>
            <div>:</div>
            <div>
              <b>${order.total.total}</b>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderDate = () => {
    if (page === "account") {
      return (
        <div>{new Date(order.completedDate).toISOString().split("T")[0]}</div>
      );
      // return null;
    } else {
      return (
        <div>
          Pick-up Date: {new Date(order.timestamp).toISOString().split("T")[0]}
        </div>
      );
    }
  };

  const render = () => {
    return (
      <div className="order__row">
        <div
          ref={refBand}
          onClick={() => {
            toggleView();
          }}
          className="order__item"
        >
          <div>
            <label>{order.status.toUpperCase()}</label>
          </div>
          <div>
            {order.status === "submitted" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOrder(order);
                  setShowModal(true);
                }}
                className="button--m button--cancel"
              >
                Cancel
              </button>
            ) : null}
          </div>
          <div>
            <p>#{order.ticketId}</p>
          </div>
          <div>{renderDate()}</div>
          <div>
            <p>${order.total.total}</p>
          </div>
        </div>

        <div ref={refDetail} className={`order__detail ${animationClasses}`}>
          {renderDetail()}
        </div>
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, orders, loader }) => {
  return {};
};

export default connect(mapStateToProps, { cancelOrder })(OrderItem);
