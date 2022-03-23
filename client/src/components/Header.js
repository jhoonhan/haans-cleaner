import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import icons from "../image/ui-icons.svg";

import SignInGoogle from "./signIn/SignInGoogle";

const Header = ({ auth, user, location }) => {
  const [curPage, setCurPage] = useState(location.pathname.slice(1));

  useEffect(() => {
    setCurPage(location.pathname.slice(1));
    if (!auth.isSignedIn) {
      setCurPage(null);
    }
  }, [curPage, auth]);

  useEffect(() => {
    console.log(`aang`);
    document.addEventListener("touchmove", pinchZoom, false);
    document.addEventListener("touchend", tapZoom, false);
    return () => {
      document.removeEventListener("touchmove", pinchZoom);
      document.removeEventListener("touchend", tapZoom);
    };
  }, []);

  const pinchZoom = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  };
  let lastTouchEnd = 0;
  const tapZoom = (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  };

  const onNavClick = (pageTitle) => {
    setCurPage(pageTitle);
  };

  const renderNavigation = () => {
    if (!auth.isSignedIn || !user) return null;

    return (
      <header className="header">
        <nav className="nav__container">
          <Link to="/" onClick={() => onNavClick("")} className="nav__item">
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${icons}#home`} className="ui-icon"></use>
            </svg>
          </Link>
          <Link
            to="/pickup"
            onClick={() => onNavClick("pickup")}
            className="nav__item"
          >
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${icons}#pickup`}></use>
            </svg>
          </Link>
          <Link
            to="/order"
            onClick={() => onNavClick("order")}
            className="nav__item"
          >
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${icons}#order`}></use>
            </svg>
          </Link>

          <Link
            to="/account"
            onClick={() => onNavClick("account")}
            className="nav__item"
          >
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${icons}#account`}></use>
            </svg>
          </Link>
        </nav>
      </header>
    );
  };

  const render = () => {
    return (
      <>
        <SignInGoogle />
        {renderNavigation()}
      </>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps)(Header);
