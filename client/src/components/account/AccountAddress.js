import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";
import { editUser } from "../../actions";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";

const AccountAddress = ({ setPage }) => {
  const render = () => {
    return (
      <motion.div
        className="motion-container account__content__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
      >
        <div className="account-container">
          <div
            onClick={() => setPage("home")}
            className="account__btn--go-back"
          >
            X
          </div>

          <h3 className="align-self-flex-start">My Addresses</h3>

          <div className="form__form__row">
            <label>Saved Address</label>
            <SavedAddressList enableDelete={true} enableDefault={true} />
          </div>

          <div className="form__form__row">
            <AddNewAddress />
          </div>
        </div>
      </motion.div>
    );
  };
  return render();
};

export default AccountAddress;
