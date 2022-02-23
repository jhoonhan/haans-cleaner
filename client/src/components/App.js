import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./assets/scss/App.scss";

import Header from "./Header";
import Landing from "./Landing";
import Order from "./order/Order";
import Pickup from "./pickup/PickUp";
import Account from "./account/Account";

import DriverHeader from "./driver/DriverHeader";
import Driver from "./driver/Driver";
import DriverOrder from "./driver/DriverOrder";
import DriverAccepted from "./driver/DriverAccepted";

const App = () => {
  const location = useLocation();
  return (
    <div className="container">
      <Route path="/" component={Header} />
      <Route path="/driver" component={DriverHeader} />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Landing} />
          <Route path="/pickup" exact component={Pickup} />
          <Route path="/order" exact component={Order} />
          <Route path="/account" exact component={Account} />

          <Route path="/driver" exact component={Driver} />
          <Route path="/driver/order" exact component={DriverOrder} />
          <Route path="/driver/accepted" exact component={DriverAccepted} />
          {/* <Route path="/driver/account" exact component={DriverAccount} /> */}
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
