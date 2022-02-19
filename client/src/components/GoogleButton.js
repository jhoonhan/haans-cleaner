import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import GoogleAuth from "../apis/GoogleAuth";

const GoogleButton = ({ auth }) => {
  const showClass = auth.isSignedIn ? "hidden2" : "";

  return (
    <div className={`login-with-google-btn ${showClass}`}>
      <GoogleAuth />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(GoogleButton);
