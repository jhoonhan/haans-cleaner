import React from "react";
import { connect } from "react-redux";
import { cancelOrder } from "../../actions";
import history from "../../history";

import Modal from "../Modal";

class OrderCancel extends React.Component {
  componentDidMount() {
    console.log();
  }

  renderActions() {
    const { id, handleClose } = this.props;
    return (
      <>
        {/* <button onClick={() => history.push("/order")} className="button--l"> */}
        <button onClick={handleClose} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => this.props.cancelOrder(id)}
          className="button--l button--alrert"
        >
          Cancel
        </button>
      </>
    );
  }

  render() {
    console.log(this.props.id);
    return (
      <div>
        <Modal
          title="Cancel Order"
          content="Are you sure you want to cancel this order?"
          actions={this.renderActions()}
          show={this.props.show}
          handleClose={this.props.handleClose}
        />
      </div>
    );
  }
}

export default connect(null, { cancelOrder })(OrderCancel);
