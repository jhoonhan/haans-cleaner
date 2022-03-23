import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import signupBackground from "../../image/signupBackground.svg";

import GoogleButton from "../../apis/GoogleButton";

const SignInGoogle = ({ auth }) => {
  const showClass = auth.isSignedIn ? "hidden" : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <div className={`signIn__init__container ${showClass}`}>
        <div className="signIn__background">
          <motion.div
            initial={{ opacity: 0, y: "0vh" }}
            animate={{ opacity: 1, y: "-25vh" }}
            transition={{ duration: 0.5, delay: 0 }}
            className="singIn__background--sun"
          >
            <svg viewBox="0 0 800 1600" className="signIn__background--1">
              <use href={`${signupBackground}#sky`}></use>
            </svg>
          </motion.div>

          <svg viewBox="0 0 800 1600" className="signIn__background--1">
            <use href={`${signupBackground}#background`}></use>
          </svg>

          <svg
            viewBox="0 0 800 1600"
            className="signIn__background--1 singIn__background--van"
          >
            <use href={`${signupBackground}#van`}></use>
          </svg>

          <svg viewBox="0 0 800 640" className="signIn__background--2">
            <use href={`${signupBackground}#phone`}></use>
            <use href={`${signupBackground}#clothes`}></use>
          </svg>

          <motion.div
            initial={{ x: "-50vw", y: "50vh" }}
            animate={{ x: "0vw", y: "50vh" }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <svg viewBox="0 0 800 640" className="signIn__background--2">
              <use href={`${signupBackground}#figure`}></use>
            </svg>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: "50vh" }}
          transition={{ duration: 0.2, delay: 0.5 }}
        >
          <div className="signIn__initial">
            <div className="signIn__row">
              <h2>
                Easy & Modern <br />
                Dry Cleaning
              </h2>
            </div>
            <div className="signIn__row">
              <p>Join now and your first order is on us!</p>
            </div>
            <div className="signIn__row" style={{ marginTop: "3rem" }}>
              <GoogleButton />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(SignInGoogle);
