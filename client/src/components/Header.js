import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currentPage } from "../actions";

import GoogleButton from "./GoogleButton";

const Header = (props) => {
  const onNavClick = (page) => {
    currentPage(page);
    console.log(page);
  };

  return (
    <>
      <GoogleButton />
      <header className="page-title">
        <h2>aaang</h2>
      </header>
      <header className="header">
        <nav className="nav__container">
          <Link to="/" onClick={() => onNavClick("home")} className="nav__item">
            Home
          </Link>
          <Link
            to="/order"
            onClick={() => onNavClick("order")}
            className="nav__item"
          >
            Orders
          </Link>
          <Link to="/pickup" className="nav__item">
            Request
          </Link>
          <Link to="/account" className="nav__item">
            Account
          </Link>
        </nav>
      </header>
    </>
  );
};

export default connect(null, { currentPage })(Header);
