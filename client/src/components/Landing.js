import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SignIn from "./signIn/SingIn";
import SignInInitial from "./signIn/SignInInitial";

const Landing = ({ isSignedIn }) => {
  const render = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
        className="motion-container"
      >
        {!isSignedIn ? <SignInInitial /> : <SignIn />}
      </motion.div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    isSignedIn: auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(Landing);
//
