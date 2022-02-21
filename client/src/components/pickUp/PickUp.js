import React from "react";

import PickupSaved from "./PickupSaved";
import PickupForm from "./PickupForm";
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
          <header className="page-title">
            <h2>Pick-up</h2>
          </header>
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
