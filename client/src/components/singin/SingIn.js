import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import SignInSecondPage from "./SignInSecondPage";
import Home from "../Home";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.auth.userProfile.FW);
  }

  renderInitalSignUp = () => {
    return (
      <React.Fragment>
        <div>No more early morning stops!</div>
      </React.Fragment>
    );
  };

  render() {
    const isSignedIn = this.props.auth.isSignedIn;
    const loadedGoogleId = this.props.auth.userProfile.FW;
    const userGoogleId = this.props.user?.googleId;
    return (
      <div className="signIn__container">
        {isSignedIn && loadedGoogleId === userGoogleId ? (
          <Home />
        ) : (
          <SignInSecondPage />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps, { createUser, fetchUser })(SignIn);
//
