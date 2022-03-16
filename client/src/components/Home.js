import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StatusBar from "./StatusBar";
import OrderItem from "./order/OrderItem";
import landingBackground from "../image/landingBackground.svg";

const Home = ({ user }) => {
  console.log(user.currentUser.orders[0]);

  const renderStatusBar = () => {
    if (!user.currentUser.orders[0]) return null;
    if (user.currentUser.orders[0])
      return (
        <div className="landing__order-container">
          <label>Your most recent order:</label>
          <StatusBar order={user.currentUser.orders.slice(-1)[0]} />
        </div>
      );
  };

  const renderList = () => {
    return user.currentUser.orders.slice(-5).map((order, i) => {
      return <OrderItem order={order} key={i} />;
    });
  };
  const render = () => {
    return (
      <div className="landing__container">
        <div className="landing__background">
          <svg viewBox="0 0 800 370" className="ui-icon">
            <use href={`${landingBackground}#sun--6`} className="ui-icon"></use>
          </svg>
        </div>
        <div className="landing__welcome">
          <h2>Good morning</h2>
          <h1>{user.currentUser.firstName}</h1>
        </div>
        <div className="landing__status">
          <h4 style={{ textTransform: "uppercase" }}>
            your most recent order:
          </h4>
          <StatusBar order={user.currentUser.orders.slice(-1)[0]} />
        </div>
        <div className="landing__container__buttons">
          <Link className="button--l" to={`/pickup`}>
            Request new order
          </Link>
        </div>
        <div className="landing__orders">
          <label>your recent orders</label>
          <div className="order__list">{renderList()}</div>
          <Link className="button--l" to={`/order`}>
            Your orders
          </Link>
        </div>
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Home);
//
