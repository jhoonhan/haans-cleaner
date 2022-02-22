import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createUser, fetchUser } from "../../actions";

import SignInSecondPage from "./SignInSecondPage";
import Home from "../Home";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.auth.userProfile.FW);
  }
  conditionalRender() {
    const isSignedIn = this.props.auth.isSignedIn;
    const loadedGoogleId = this.props.auth.userProfile.FW;
    const userGoogleId = this.props.user?.googleId;
    if (isSignedIn && loadedGoogleId === userGoogleId) {
      return <Home />;
    }

    if (isSignedIn && loadedGoogleId !== userGoogleId) {
      return <SignInSecondPage />;
    }
  }

  render() {
    return <div className="signIn__container">{this.conditionalRender()}</div>;
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth: auth,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { createUser, fetchUser })(SignIn);
//
