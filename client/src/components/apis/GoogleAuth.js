import React from "react";

import { connect } from "react-redux";
import { signIn } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_OAUTH,
          scope: "profile email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const userProfile = this.auth.currentUser.get().getBasicProfile();
    this.props.signIn({ isSignedIn, userProfile });
  };

  onSignInClick = (status) => {
    status
      ? this.auth.signIn({ prompt: "select_account" })
      : this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }
    if (this.props.isSignedIn) {
      return <div onClick={() => this.onSignInClick(false)}>signed In</div>;
    }
    if (!this.props.isSignedIn) {
      return <div onClick={() => this.onSignInClick(true)}>signed Off</div>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn })(GoogleAuth);
