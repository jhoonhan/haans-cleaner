import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { cancelOrder } from "../../actions";

import Modal from "../Modal";

const DriverCancelCompletion = (props) => {
  const renderActions = () => {
    const { id, handleClose } = props;
    return (
      <>
        <button onClick={handleClose} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => props.cancelOrder(id)}
          className="button--l button--alert"
        >
          Cancel
        </button>
      </>
    );
  };

  const render = () => {
    return (
      <div>
        <Modal
          title="Cancel Completion"
          content="Are you sure you want cancel the completion?"
          actions={renderActions()}
          show={props.show}
          handleClose={props.handleClose}
        />
      </div>
    );
  };
  return render();
};

export default connect(null, { cancelOrder })(DriverCancelCompletion);
