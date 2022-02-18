import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SignIn from "./singIn/SingIn";
import SignInInitial from "./singIn/SignInInitial";
import GoogleButton from "./GoogleButton";
import GoogleAuth from "../apis/GoogleAuth";
import { fetchUser, mountUser } from "../actions";

// import { fetchUser } from "../actions";

class Landing extends React.Component {
  componentDidMount() {}

  renderHome() {
    return (
      <div className="landing__container">
        <div className="landing__container__welcome">
          <h2>Good morning</h2>
          <h1>CCC</h1>
          <h3>It's a great day to wear a skirt</h3>
        </div>
        <div className="landing__container__buttons">
          <Link className="button" to={`/pickup`}>
            Request for Pick-up
          </Link>
          <button>Order</button>
        </div>
      </div>
    );
  }

  // async fetch() {
  //   if (!this.props.isSignedIn) return;
  //   const data = await fetchUser(this.props.userProfile.FW);
  //   const userGoogleId = data[0].googleId;
  //   const loadedGoogleId = this.props.userProfile.FW;
  //   console.log(userGoogleId);
  //   console.log(loadedGoogleId);
  //   const status = userGoogleId === loadedGoogleId ? true : false;
  //   return status;
  // }

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
        <GoogleButton />
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
