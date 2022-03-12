import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser, mountUser } from "../actions";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="landing__container">
        <div className="landing__welcome">
          <h2>Good morning</h2>
          <h1>{this.props.user.firstName}</h1>
          <h3>It's a great day to wear a skirt</h3>
        </div>
        <div className="landing__order-container">
          <div class="circle-wrap">
            <div class="circle">
              <div class="mask full">
                <div class="fill"></div>
              </div>
              <div class="mask half">
                <div class="fill"></div>
              </div>
              <div class="inside-circle"> 75% </div>
            </div>
          </div>
        </div>
        <div className="landing__container__buttons">
          <Link className="button--l" to={`/pickup`}>
            Request Pick-up
          </Link>
          <Link className="button--l" to={`/order`}>
            Your orders
          </Link>
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
