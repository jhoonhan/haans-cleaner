import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SignIn from "./singIn/SingIn";
import GoogleButton from "./GoogleButton";
import GoogleAuth from "../apis/GoogleAuth";
import { fetchUser, mountUser } from "../actions";

// import { fetchUser } from "../actions";

class Landing extends React.Component {
  componentDidMount() {}
  componentDidUpdate() {
    console.log(`----landing----`);
    console.log(this.props.isSignedIn);
    console.log(this.props.userProfile.FW);
    fetchUser(this.props.userProfile.FW).then(([user]) => mountUser(user));

    // const status = userGoogleId === loadedGoogleId ? true : false;
  }

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

  render() {
    return (
      <React.Fragment>
        {/* {this.renderHome()} */}
        {this.props.user && this.props.isSignedIn ? (
          this.renderHome()
        ) : (
          <SignIn />
        )}
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
