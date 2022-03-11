import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import icons from "../image/ui-icons.svg";

import GoogleButton from "../apis/GoogleButton";

const Header = ({ auth, user, location }) => {
  const [curPage, setCurPage] = useState(location.pathname.slice(1));

  useEffect(() => {
    setCurPage(location.pathname.slice(1));
    if (!auth.isSignedIn) {
      setCurPage(null);
    }
  }, [curPage, auth]);

  const onNavClick = (pageTitle) => {
    setCurPage(pageTitle);
  };

  // const renderPageTitle = (title) => {
  //   if (title === "" || title === null) return null;
  //   return (
  //     <header className="page-title">
  //       <h2>{title}</h2>
  //     </header>
  //   );
  // };

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

  return (
    <>
      <GoogleButton />
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
