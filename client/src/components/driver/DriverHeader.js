import React from "react";
import { Link } from "react-router-dom";
import icons from "../../image/ui-icons.svg";

const DriverHeader = () => {
  return (
    <header className="header">
      <nav className="nav__container">
        <Link to="/driver" className="nav__item">
          <svg viewBox="0 0 100 100" className="ui-icon">
            <use href={`${icons}#home`}></use>
          </svg>
        </Link>
        <Link to="/driver/order/search" className="nav__item">
          <svg viewBox="0 0 100 100" className="ui-icon">
            <use href={`${icons}#search`}></use>
          </svg>
        </Link>
        <Link to="/driver/order/accepted" className="nav__item">
          <svg viewBox="0 0 100 100" className="ui-icon">
            <use href={`${icons}#order`}></use>
          </svg>
        </Link>
        <Link to="/driver/account" className="nav__item">
          <svg viewBox="0 0 100 100" className="ui-icon">
            <use href={`${icons}#account`}></use>
          </svg>
        </Link>
      </nav>
    </header>
  );
};

export default DriverHeader;
