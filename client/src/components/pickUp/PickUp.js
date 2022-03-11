import React from "react";

import PickupSaved from "./PickupSaved";
import PickupForm from "./PickupForm";
import PageTitle from "../PageTitle";

import { motion } from "framer-motion";

class Pickup extends React.Component {
  render() {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.1 }}
          className="motion-container"
        >
          <PageTitle title="pick up" />

          <div className=".pickup pickup-container">
            {/* <PickupSaved /> */}
            <PickupForm />
          </div>
        </motion.div>
      </>
    );
  }
}

export default Pickup;
