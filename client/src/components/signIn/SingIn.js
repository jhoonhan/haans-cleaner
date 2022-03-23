import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createUser, fetchUser } from "../../actions";
import { motion } from "framer-motion";

import SignInSecondPage from "./SignInSecondPage";
import Home from "../Home";

const SignIn = ({ auth, user, fetchUser }) => {
  const [fetched, setFetched] = useState(null);

  useEffect(() => {
    fetchUser(auth.userProfile.FW);
  }, []);

  useEffect(() => {
    if (user.fetched) setFetched(true);
  }, [user]);

  const conditionalRender = () => {
    if (!user.currentUser) {
      return <SignInSecondPage />;
    }
    if (auth.userProfile.FW === user.currentUser.googleId) {
      return <Home />;
    }
  };

  const render = () => {
    if (!fetched) return null;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.1, delay: 0.1 }}
      >
        <div className="signIn__container">{conditionalRender()}</div>;
      </motion.div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth: auth,
    user: user,
  };
};

export default connect(mapStateToProps, { createUser, fetchUser })(SignIn);
//
