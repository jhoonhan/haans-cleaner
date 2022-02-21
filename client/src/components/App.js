import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./assets/scss/App.scss";

import Header from "./Header";
import Landing from "./Landing";
import Pickup from "./pickup/Pickup";
import Order from "./order/Order";
import Account from "./account/Account";

const App = () => {
  const location = useLocation();
  return (
    <div className="container">
      <Route path="/" component={Header} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Landing} />
          <Route path="/pickup" exact component={Pickup} />
          <Route path="/order" exact component={Order} />
          <Route path="/account" exact component={Account} />
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
