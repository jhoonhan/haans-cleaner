import React from "react";

import PickupSaved from "./PickupSaved";
import PickupForm from "./PickupForm";

class Pickup extends React.Component {
  render() {
    return (
      <div className=".pickup pickup-container">
        {/* <PickupSaved /> */}
        <PickupForm />
      </div>
    );
  }
}

export default Pickup;
