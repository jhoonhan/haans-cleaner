import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createUser, fetchUser } from "../../actions";

import SignInSecondPage from "./SignInSecondPage";
import Home from "../Home";

const SignIn = ({ auth, user, fetchUser }) => {
  const [fetched, setFetched] = useState(null);

  useEffect(() => {
    if (!user.fetched) fetchUser(auth.userProfile.FW);
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
    return <div className="signIn__container">{conditionalRender()}</div>;
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
