import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import GoogleButton from "../GoogleButton";

import SignInPageTwo from "./SignInPageTwo";

const renderInitalSignUp = () => {
  console.log();
  return (
    <React.Fragment>
      <div>No more early morning stops!</div>
      <GoogleButton />
    </React.Fragment>
  );
};

const renderNext = () => {
  return <div>aa</div>;
};

const SignIn = ({ auth, user }) => {
  console.log({ auth, user });
  return (
    <div className="signIn__container">
      {!auth.isSignedIn ? renderInitalSignUp() : <SignInPageTwo />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, { createUser })(SignIn);
//
