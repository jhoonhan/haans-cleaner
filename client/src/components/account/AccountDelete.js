import React from "react";
import { connect } from "react-redux";
import { cancelOrder } from "../../actions";

import Modal from "../Modal";

class AccountDelete extends React.Component {
  componentDidMount() {
    console.log();
  }

  renderActions() {
    const { id, handleClose } = this.props;
    return (
      <>
        <button onClick={handleClose} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => this.props.cancelOrder(id)}
          className="button--l button--alert"
        >
          Cancel
        </button>
      </>
    );
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Account"
          content="Are you sure you want to delete your account?"
          actions={this.renderActions()}
          show={this.props.show}
          handleClose={this.props.handleClose}
        />
      </div>
    );
  }
}

export default connect(null, { cancelOrder })(AccountDelete);
