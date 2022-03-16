import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";
import PageTitle from "../PageTitle";

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
        <PageTitle
          title="edit address"
          hasGoBack={true}
          onClickHandle={() => setPage("home")}
        />

        <div className="account-container">
          <div className="form__form__row">
            <label>Saved Address</label>
            <div className="account__saved-addresses">
              <SavedAddressList enableDelete={true} enableDefault={true} />
            </div>
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
