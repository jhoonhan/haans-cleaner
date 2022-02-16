import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, createUser } from "../actions";

import GoogleAuth from "./apis/GoogleAuth";

const SignIn = () => {
  return (
    <React.Fragment>
      <div className="google">
        <GoogleAuth />
      </div>
      <div className="signin__container">
        <div>FAAACK!</div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ posts }) => {
  return { posts };
};

export default connect(mapStateToProps, { fetchPosts })(SignIn);
//
