import React from "react";
import PropTypes from "prop-types";
import PickupFormFirstPage from "./PickupFormFirstPage";
import PickupFormSecondPage from "./PickupFormSecondPage";
import PickupFormThirdPage from "./PickupFormThirdPage";

class PickupForm extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <React.Fragment>
        {page === 1 && <PickupFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <PickupFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <PickupFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </React.Fragment>
    );
  }
}

PickupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PickupForm;
