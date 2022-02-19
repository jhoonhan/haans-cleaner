import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";

import "./assets/scss/App.scss";

import Header from "./Header";
import Landing from "./Landing";
import Pickup from "./pickup/Pickup";
import Order from "./order/Order";
import Account from "./Account";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/pickup" exact component={Pickup} />
        <Route path="/order" exact component={Order} />
        <Route path="/account" exact component={Account} />
      </Router>
    </div>
  );
};

export default App;
