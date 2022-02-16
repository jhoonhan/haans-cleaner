import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import "./assets/scss/App.scss";

import Landing from "./Landing";
import Pickup from "./pickup/Pickup";
import GoogleAuth from "./apis/GoogleAuth";

const App = () => {
  return (
    <div className="container">
      <GoogleAuth />
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/pickup" exact component={Pickup} />
      </BrowserRouter>
    </div>
  );
};

export default App;
