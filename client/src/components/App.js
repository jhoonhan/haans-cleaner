import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import "./assets/scss/App.scss";

import GoogleButton from "./GoogleButton";
import Landing from "./Landing";
import Pickup from "./pickup/Pickup";
import Order from "./order/Order";
import OrderCancel from "./order/OrderCancel";

const App = () => {
  return (
    <div className="container">
      <GoogleButton />

      <Router history={history}>
        <Route path="/" exact component={Landing} />
        <Route path="/pickup" exact component={Pickup} />
        <Route path="/order" exact component={Order} />
      </Router>
    </div>
  );
};

export default App;
