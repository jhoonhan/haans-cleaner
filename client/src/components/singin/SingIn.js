import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import GoogleButton from "../GoogleButton";
import GoogleAuth from "../../apis/GoogleAuth";

import SignInSecondPage from "./SignInSecondPage";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.googleId);
  }

  renderGoogleButton = () => {
    return (
      <div className="login-with-google-btn">
        <GoogleAuth />
      </div>
    );
  };

  renderInitalSignUp = () => {
    return (
      <React.Fragment>
        <div>No more early morning stops!</div>
      </React.Fragment>
    );
  };

  render() {
    const loadedGoogleId = this.props.googleId;
    const userGoogleId = this.props.user.currentUser?.googleId;
    console.log(loadedGoogleId, userGoogleId);
    return (
      <div className="signIn__container">
        {loadedGoogleId === userGoogleId ? (
          <div>{this.props.user.currentUser.firstName}</div>
        ) : (
          <SignInSecondPage />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userProfile: state.auth.userProfile,
    googleId: state.auth.userProfile.FW,
    user: state.user,
  };
};

export default connect(mapStateToProps, { createUser, fetchUser })(SignIn);
//
