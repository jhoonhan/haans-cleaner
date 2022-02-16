import React from "react";
import GoogleAuth from "../apis/GoogleAuth";

const GoogleButton = () => {
  return (
    <div className="login-with-google-btn">
      <GoogleAuth />
    </div>
  );
};

export default GoogleButton;
