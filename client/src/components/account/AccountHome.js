import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import PageTitle from "../PageTitle";

const AccountHome = ({ user, setPage, onSignOutClick }) => {
  const render = () => {
    return (
      <motion.div
        className="motion-container account__content__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
      >
        <PageTitle title="account" />

        <div className="account-container">
          <div className="account__profile__container">
            <div className="account__profile__picture"></div>
            <h3>{user.fullName}</h3>
          </div>
          <div className="account__menu">
            <div className="row">
              <div className="menu-container">
                <label>Your Orders</label>
                <div onClick={() => setPage("order")} className="nav__item">
                  <p className="align-self-flex-start">Completed Orders</p>
                </div>
                <div onClick={() => setPage("order")} className="nav__item">
                  <p className="align-self-flex-start">Cancelled Orders</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="menu-container">
                <label>Account Setting</label>
                <div onClick={() => setPage("edit")} className="nav__item">
                  <p className="align-self-flex-start">Personal Information</p>
                </div>
                <div onClick={() => setPage("edit")} className="nav__item">
                  <p className="align-self-flex-start">Payment Methods</p>
                </div>
                <div onClick={() => setPage("address")} className="nav__item">
                  <p className="align-self-flex-start">Address Book</p>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "2rem" }}>
              <button onClick={onSignOutClick} className="button--d">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </motion.div>
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

export default connect(mapStateToProps)(AccountHome);
