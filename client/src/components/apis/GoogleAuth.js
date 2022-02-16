import React from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "815519483275-8fpptao48gr85df5j22uitmlipl74i37.apps.googleusercontent.com",
          fetch_basic_profile: true,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    this.props.signIn(isSignedIn);
  };

  onSignInClick = (status) => {
    status ? this.auth.signIn() : this.auth.signOut();
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
