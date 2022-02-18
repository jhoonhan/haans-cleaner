import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser, mountUser } from "../actions";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="Landing__container">
        <div className="landing__container__welcome">
          <h2>Good morning</h2>
          <h1>{this.props.user.firstName}</h1>
          <h3>It's a great day to wear a skirt</h3>
        </div>
        <div className="landing__container__buttons">
          <Link className="button" to={`/pickup`}>
            Request Pick-up
          </Link>
          <button>Order</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    isSignedIn: auth.isSignedIn,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { fetchUser, mountUser })(Home);
//
