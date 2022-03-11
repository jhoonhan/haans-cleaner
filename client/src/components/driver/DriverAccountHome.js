import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../PageTitle";
import profilePicture from "../../image/profile.jpg";

const DriverAccountHome = ({ user, setPage, onSignOutClick }) => {
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
            <img
              className="account__profile__picture"
              alt="profile"
              src={profilePicture}
            />
            <div>
              <h3>{user.fullName}</h3>
              <p>Customer since 2022</p>
            </div>
          </div>

          <div className="account__menu">
            <div className="row">
              <ul className="menu-container">
                <label>Your Orders</label>
                <li onClick={() => setPage("order")} className="menu__item">
                  <p className="align-self-flex-start">Completed Orders</p>
                </li>
                <li onClick={() => setPage("order")} className="menu__item">
                  <p className="align-self-flex-start">Cancelled Orders</p>
                </li>
                <li onClick={() => setPage("order")} className="menu__item">
                  <p className="align-self-flex-start">Earning Stats</p>
                </li>
              </ul>
            </div>

            <div className="row">
              <ul className="menu-container">
                <label>Account Setting</label>
                <li onClick={() => setPage("edit")} className="menu__item">
                  <p className="align-self-flex-start">Personal Information</p>
                </li>
                <li onClick={() => setPage("edit")} className="menu__item">
                  <p className="align-self-flex-start">Deposit Methods</p>
                </li>
              </ul>
            </div>

            <div className="form__form__row" style={{ marginTop: "4rem" }}>
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

export default DriverAccountHome;
