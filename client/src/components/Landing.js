import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SignIn from "./signIn/SingIn";
import SignInInitial from "./signIn/RenderInitialSignIn";
import { fetchUser, mountUser } from "../actions";

// import { fetchUser } from "../actions";

class Landing extends React.Component {
  componentDidMount() {}

  renderInitalSignUp() {
    return (
      <React.Fragment>
        <div>No more early morning stops!</div>
      </React.Fragment>
    );
  }
  render() {
    return (
      <React.Fragment>
        {!this.props.isSignedIn ? <SignInInitial /> : <SignIn />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    isSignedIn: auth.isSignedIn,
    userProfile: auth.userProfile,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { fetchUser, mountUser })(Landing);
//
