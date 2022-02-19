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
    const { id } = this.props;
    console.log(this.props);
    console.log(id);
    return (
      <>
        <button onClick={() => history.push("/order")} className="button--l">
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
    return (
      <div>
        <div>Delete Order</div>
        <Modal
          title="Cancel Order"
          content="Are you sure you want to cancel this order?"
          actions={this.renderActions()}
        />
      </div>
    );
  }
}

export default connect(null, { cancelOrder })(OrderCancel);
