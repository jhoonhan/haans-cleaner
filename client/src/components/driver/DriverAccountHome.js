import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../PageTitle";

const DriverAccountHome = ({ setPage, onSignOutClick }) => {
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
          <div className="account__menu">
            <div className="form__form__row">
              <div onClick={() => setPage("order")} className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Completed Orders
                </h3>
              </div>
              <div onClick={() => setPage("edit")} className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Personal Information
                </h3>
              </div>

              <div onClick={() => setPage("edit")} className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Deposit Methods
                </h3>
              </div>

              <div onClick={() => setPage("address")} className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Statements
                </h3>
              </div>
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
