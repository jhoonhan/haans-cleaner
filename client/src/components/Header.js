import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import GoogleButton from "./GoogleButton";

const Header = ({ auth, user }) => {
  const [curPage, setCurPage] = useState(null);

  useEffect(() => {
    if (!auth.isSignedIn) {
      setCurPage(null);
    }
  }, [curPage, auth]);

  const onNavClick = (pageTitle) => {
    setCurPage(pageTitle);
  };

  const renderPageTitle = (title) => {
    if (title === "Home" || title === null) return null;
    return (
      <header className="page-title">
        <h2>{title}</h2>
      </header>
    );
  };

  const renderNavigation = () => {
    if (!auth.isSignedIn || !user) return null;

    return (
      <header className="header">
        <nav className="nav__container">
          <Link to="/" onClick={() => onNavClick("Home")} className="nav__item">
            Home
          </Link>
          <Link
            to="/order"
            onClick={() => onNavClick("Order")}
            className="nav__item"
          >
            Orders
          </Link>
          <Link
            to="/pickup"
            onClick={() => onNavClick("Pick-up")}
            className="nav__item"
          >
            Request
          </Link>
          <Link
            to="/account"
            onClick={() => onNavClick("Account")}
            className="nav__item"
          >
            Account
          </Link>
        </nav>
      </header>
    );
  };

  return (
    <>
      <GoogleButton />
      {renderPageTitle(curPage)}
      {renderNavigation()}
    </>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps)(Header);
