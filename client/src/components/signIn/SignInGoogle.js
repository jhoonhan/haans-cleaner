import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import sunBackground from "../../image/sunBackground.svg";
import landingBackground from "../../image/landingBackground.svg";

import GoogleButton from "../../apis/GoogleButton";

const SignInGoogle = ({ auth }) => {
  const showClass = auth.isSignedIn ? "hidden" : "";

  return (
    <>
      {/* <div className="background--1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", duration: 0.1, delay: 0.1 }}
        >
          <svg viewBox="0 0 100 100" className="bg__sun bg__element ">
            <use href={`${sunBackground}#sun--6`}></use>
            <use href={`${sunBackground}#sun--5`}></use>
            <use href={`${sunBackground}#sun--4`}></use>
            <use href={`${sunBackground}#sun--3`}></use>
            <use href={`${sunBackground}#sun--2`}></use>
            <use href={`${sunBackground}#sun--1`}></use>
          </svg>
        </motion.div>

        <svg viewBox="0 0 800 400" className="bg__element">
          <use href={`${landingBackground}#mountain--2`}></use>
          <use href={`${landingBackground}#mountain--1`}></use>
        </svg>

        <motion.div
          initial={{ translateX: 100 }}
          animate={{ translateX: 0 }}
          transition={{ type: "spring", duration: 0.1, delay: 0.4 }}
        >
          <svg viewBox="0 0 800 400" className="bg__element">
            <use href={`${landingBackground}#cloud--4`}></use>
          </svg>
          <svg viewBox="0 0 800 400" className="bg__element">
            <use href={`${landingBackground}#cloud--3`}></use>
          </svg>
        </motion.div>

        <motion.div
          initial={{ translateX: -100 }}
          animate={{ translateX: 0 }}
          transition={{ type: "spring", duration: 0.1, delay: 0.2 }}
        >
          <svg viewBox="0 0 800 400" className="bg__element">
            <use href={`${landingBackground}#cloud--2`}></use>
          </svg>
          <svg viewBox="0 0 800 400" className="bg__element">
            <use href={`${landingBackground}#cloud--1`}></use>
          </svg>
        </motion.div>
      </div>
      <div className="bg__background"></div> */}
      <div className={`signIn__initial ${showClass}`}>
        <h2>aaang</h2>
        <GoogleButton />
        <div>aaang</div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(SignInGoogle);
