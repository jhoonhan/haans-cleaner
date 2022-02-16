import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import "./assets/scss/App.scss";

import Landing from "./Landing";
import Pickup from "./pickup/Pickup";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <Route path="/" exact component={Landing} />
        <Route path="/pickup" exact component={Pickup} />
      </Router>
    </div>
  );
};

export default App;
