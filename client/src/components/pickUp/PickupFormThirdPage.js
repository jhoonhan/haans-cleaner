import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import GoogleMap from "../../apis/GoogleMap";
import { createOrder } from "../../actions";
import validate from "./validate";
import price from "../price";
import Modal2 from "../Modal2";
import Loader from "../Loader";

class PickupFormThirdPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };

    this.googleMapWrapper = createRef();

    this.total = { total: 0, subtotal: 0, tax: 0 };
    this.taxRate = 0.0475;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.auth.isSignedIn && !this.props.user) {
      this.props.fetchUser(this.props.auth.userProfile.FW);
    }
  }

  onFinalSubmit = () => {
    const clothes = this.props.clothes;
    const formValues = this.props.pickup;

    const combined = {
      ...formValues,
      clothes,
      googleId: this.props.auth.userProfile.FW,
      userId: this.props.user._id,
      total: this.total,
      timestamp: Date.now(),
      status: "submitted",
    };
    this.props.createOrder(combined);
  };

  modalAction = () => {
    return (
      <>
        <button
          onClick={() => this.setState({ showModal: false })}
          className="button--l"
        >
          Go Back
        </button>
        <button
          onClick={async () => {
            this.onFinalSubmit();
            this.setState({ showModal: false });
          }}
          className="button--l button--alert"
        >
          Submit
        </button>
      </>
    );
  };

  convertToArray = (data) => {
    return Object.entries(data).map(([key, value]) => {
      const obj = {};
      obj.type = key;
      obj.count = value;
      return obj;
    });
  };
  getTotalPrice = (data) => {
    let preSubtotal = 0;
    data.forEach((el) => {
      const pricePerItem = price[el.type] * el.count;
      preSubtotal = preSubtotal + pricePerItem;
    });
    const subtotal = Number(Math.round(preSubtotal * 100) / 100).toFixed(2);
    const tax = Number(
      Math.round(preSubtotal * this.taxRate * 100) / 100
    ).toFixed(2);
    const total = Number(Math.round((preSubtotal + +tax) * 100) / 100).toFixed(
      2
    );

    this.total = { subtotal, total, tax };
  };
  getPickUpDate = () => {
    // const date = new Date();
    // const hourNow = date.getHours();
    // if (hourNow > 5) {
    //   date.setDate(date.getDate() + 1);
    // }
    //
    //
    const selectedDate = new Date(this.props.pickup?.date);

    return selectedDate;
  };

  renderInfo() {
    if (!this.props.pickup) return null;

    const { street, city, zip, name } = this.props.pickup;
    return (
      <React.Fragment>
        <div>
          <h3>{name}</h3>
        </div>
        <div>{`${street}, ${city}, ${zip}`}</div>
      </React.Fragment>
    );
  }
  renderCount() {
    if (!this.props.clothes) return;

    const clothes = this.convertToArray(this.props.clothes);

    return (
      <React.Fragment>
        {clothes.map((cloth) => {
          return (
            <div key={cloth.type} className="form__form__order-count__row">
              <div className="form__clothes">{cloth.type}</div>
              <div>
                <p>
                  ${price[cloth.type]} x {cloth.count}
                </p>
              </div>
              <div>
                <h3>
                  ${Math.round(price[cloth.type] * cloth.count * 100) / 100}
                </h3>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  renderTotal() {
    if (!this.props.clothes) return null;

    this.getTotalPrice(this.convertToArray(this.props.clothes));

    return (
      <React.Fragment>
        <label>subtotal:</label>
        <div>${this.total.subtotal}</div>

        <label>tax: </label>
        <div>${this.total.tax}</div>

        <label>
          <h3>total: </h3>
        </label>

        <div>
          <h3>${this.total.total}</h3>
        </div>
      </React.Fragment>
    );
  }
  renderDate() {
    const result = this.getPickUpDate();

    const date = {
      year: result.getFullYear(),
      month: result.getMonth() + 1,
      date: result.getDate(),
      day: result.toLocaleString("default", { weekday: "long" }),
    };
    return (
      <React.Fragment>
        <h3>
          {date.day}, {date.month}/{date.date}
        </h3>
        <h3>7:00AM - 9:00AM</h3>
      </React.Fragment>
    );
  }

  render() {
    console.log(this.props.loader);
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <>
        {this.props.loader.showLoader && <Loader />}
        <Modal2
          show={this.state.showModal}
          handleClose={this.state.setShowModal}
          id={this.props.user.googleId}
          title="Submit Order"
          content="Are you sure?"
          actions={this.modalAction()}
        />
        <form
          onSubmit={handleSubmit(this.onFinalSubmit)}
          className="form__form form__form--third"
        >
          <div className="form__form__row">
            <h2>Order Detail</h2>
          </div>
          <div className="form__form__row">
            <div className="form__form__info">{this.renderInfo()}</div>

            <div className="form__form__order-count">{this.renderCount()}</div>
          </div>
          <div
            className="form__form__row border-top--divider border-bottom--divider"
            style={{ padding: "3rem 0" }}
          >
            <div className="form__form__order-detail">
              <div className="form__form__order-date">
                <label>Pick-up time:</label>
                <div>{this.renderDate()}</div>
              </div>
              <div className="form__form__order-total">
                {this.renderTotal()}
              </div>
            </div>
          </div>
          <div className="form__form__row">
            <label>Delivery Instruction (optional)</label>
            <Field
              name="deliveryNote"
              component="textarea"
              placeholder="Notes"
            />
          </div>

          <div className="form__button-holder--horizontal">
            <button
              type="button"
              className="previous button--l"
              onClick={previousPage}
            >
              Previous
            </button>
            {/* <button type="submit" disabled={pristine || submitting}> */}
            <div
              onClick={() => {
                this.setState({ showModal: true });
              }}
              className="button--l"
            >
              Submit
            </div>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ form, auth, user, loader }) => {
  return {
    pickup: form.pickup?.values,
    clothes: form.clothes?.values,
    auth,
    user: user.currentUser,
    loader,
  };
};

export default connect(mapStateToProps, { createOrder })(
  reduxForm({
    form: "pickup", //Form name is same
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(PickupFormThirdPage)
);
