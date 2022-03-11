import React from "react";
import PropTypes from "prop-types";
import PickupFormFirstPage from "./PickupFormFirstPage";
import PickupFormSecondPage from "./PickupFormSecondPage";
import PickupFormThirdPage from "./PickupFormThirdPage";
import PickupFormFourthPage from "./PickupFormFourthPage";
import PageTitle from "../PageTitle";

class PickupForm extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  lastPage() {
    this.setState({ page: 4 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <>
        <PageTitle
          title="pick up"
          onClickHandle={this.previousPage}
          hasGoBack={this.state.page !== 1 ? true : false}
        />
        <div className="pickup pickup-container">
          {page === 1 && (
            <PickupFormFirstPage
              onSubmit={this.nextPage}
              lastPage={this.lastPage}
            />
          )}
          {page === 2 && (
            <PickupFormSecondPage
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
            />
          )}
          {page === 3 && (
            <PickupFormThirdPage
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
            />
          )}
          {page === 4 && (
            <PickupFormFourthPage
              previousPage={this.previousPage}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </>
    );
  }
}

// PickupForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default PickupForm;
