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
