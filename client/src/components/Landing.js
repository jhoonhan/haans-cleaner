import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, createUser } from "../actions";

import SignIn from "./singin/SingIn";

class Landing extends React.Component {
  componentDidMount() {
    // this.props.fetchPosts();
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

  render() {
    return (
      <React.Fragment>
        {/* {this.renderHome()} */}
        {this.props.user[0] ? this.renderHome() : <SignIn />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  return { user, orders };
};

export default connect(mapStateToProps, { fetchPosts })(Landing);
//
