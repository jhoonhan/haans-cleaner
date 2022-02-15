import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";

class Landing extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="landing__container">
        <div className="landing__container__welcome">
          <h2>Good morning</h2>
          <h1>CCC</h1>
          <h3>It's a great day to wear a skirt</h3>
        </div>
        <div className="landing__container__buttons">
          <button>Request for Pick-up</button>
          <button>Order</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts };
};

export default connect(mapStateToProps, { fetchPosts })(Landing);
