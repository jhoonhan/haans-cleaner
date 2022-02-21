import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import "./assets/scss/App.scss";

import Header from "./Header";
import Landing from "./Landing";
import Pickup from "./pickup/Pickup";
import Order from "./order/Order";
import Account from "./account/Account";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <Route path="/" component={Header} />
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch>
                  <Route path="/" exact component={Landing} />
                  <Route path="/pickup" exact component={Pickup} />
                  <Route path="/order" exact component={Order} />
                  <Route path="/account" exact component={Account} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    </div>
  );
};

export default App;
