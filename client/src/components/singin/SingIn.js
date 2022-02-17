import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import GoogleButton from "../GoogleButton";
import GoogleAuth from "../../apis/GoogleAuth";

import SignInSecondPage from "./SignInSecondPage";

const SignIn = ({ isSignedIn, user, fetchUser, userProfile }) => {
  useEffect(() => {}, []);

  const renderGoogleButton = () => {
    return (
      <div className="login-with-google-btn">
        <GoogleAuth />
      </div>
    );
  };

  const renderInitalSignUp = () => {
    return (
      <React.Fragment>
        <div>No more early morning stops!</div>
      </React.Fragment>
    );
  };

  const renderConditional = () => {
    if (isSignedIn === false) {
      return <div>{renderInitalSignUp()}</div>;
    }
    if (isSignedIn === true) {
      const googleId = userProfile.FW;
      console.log(user);
      fetchUser(googleId);
      console.log(user);
      return <div>aaang!</div>;
    }
  };
  return (
    <div className="signIn__container">
      {renderGoogleButton()}
      {!isSignedIn ? renderInitalSignUp() : <SignInSecondPage />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userProfile: state.auth.userProfile,
    user: state.user,
  };
};

export default connect(mapStateToProps, { createUser, fetchUser })(SignIn);
//
