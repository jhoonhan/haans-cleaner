import React from "react";
import { Link } from "react-router-dom";

const DriverHeader = () => {
  return (
    <header className="header">
      <nav className="nav__container">
        <Link to="/driver" className="nav__item">
          Home
        </Link>
        <Link to="/driver/order" className="nav__item">
          Orders
        </Link>
        <Link to="/driver/account" className="nav__item">
          Account
        </Link>
      </nav>
    </header>
  );
};

export default DriverHeader;
