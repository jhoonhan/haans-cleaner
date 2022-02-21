import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import SignInSecondPage from "./SignInSecondPage";
import Home from "../Home";
import DriverHome from "../driver/DriverHome";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.auth.userProfile.FW);
  }
  conditionalRender() {
    if (!this.props.user) return null;
    const isSignedIn = this.props.auth.isSignedIn;
    const loadedGoogleId = this.props.auth.userProfile.FW;
    const userGoogleId = this.props.user.googleId;
    const userRole = this.props.user.role;
    if (
      isSignedIn &&
      loadedGoogleId === userGoogleId &&
      userRole !== "driver"
    ) {
      return <Home />;
    }
    if (
      isSignedIn &&
      loadedGoogleId === userGoogleId &&
      userRole === "driver"
    ) {
      return <DriverHome />;
    }
    if (isSignedIn && loadedGoogleId !== userGoogleId) {
      return <SignInSecondPage />;
    }
  }

  render() {
    if (!this.props.user) return null;
    const isSignedIn = this.props.auth.isSignedIn;
    const loadedGoogleId = this.props.auth.userProfile.FW;
    const userGoogleId = this.props.user.googleId;
    const userRole = this.props.user.role;
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
