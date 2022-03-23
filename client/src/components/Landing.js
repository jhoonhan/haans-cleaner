import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import SignIn from "./signIn/SingIn";

const Landing = ({ auth }) => {
  const render = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
        className="motion-container"
      >
        {!auth.isSignedIn ? null : <SignIn />}
      </motion.div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Landing);
//
