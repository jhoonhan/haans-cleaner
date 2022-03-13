import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StatusBar from "./StatusBar";
import { fetchOrder } from "../actions";

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

  const render = () => {
    return (
      <div className="landing__container">
        <div className="landing__welcome">
          <h2>Good morning</h2>
          <h1>{user.currentUser.firstName}</h1>
        </div>
        <StatusBar order={user.currentUser.orders.slice(-1)[0]} />
        <div className="landing__container__buttons">
          <Link className="button--l" to={`/pickup`}>
            Request Pick-up
          </Link>
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

export default connect(mapStateToProps, { fetchOrder })(Home);
//
