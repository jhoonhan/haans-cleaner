import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createOrder } from "../actions";
import validate from "./validate";
import price from "../price";

class PickupFormThirdPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  convertToArray = (data) => {
    return Object.entries(data).map(([key, value]) => {
      const obj = {};
      obj.type = key;
      obj.count = value;
      return obj;
    });
  };
  getTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((el) => {
      const pricePerItem = price[el.type] * el.count;
      totalPrice = totalPrice + pricePerItem;
    });
    return totalPrice;
  };
  getPickUpDate = () => {
    const date = new Date();
    const hourNow = date.getHours();

    if (hourNow > 5) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  };

  onFinalSubmit = (formValue) => {
    const clothes = this.props.clothes;
    // console.log({ ...formValue, clothes });
    // console.log(this.props.clothes);
    const combined = { ...formValue, clothes, userId: "123jdie929da9d29" };
    this.props.createOrder(combined);
  };
  renderInfo() {
    if (!this.props.pickup) return null;

    const { address, name } = this.props.pickup;
    return (
      <React.Fragment>
        <div>
          <h3>{name}</h3>
        </div>
        <div>{address}</div>
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
            <div key={cloth.type} className="pickup__form__order-count__row">
              <div className="pickup__clothes">{cloth.type}</div>
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

    const subtotal =
      Math.round(
        this.getTotalPrice(this.convertToArray(this.props.clothes)) * 100
      ) / 100;
    const tax = Math.round(subtotal * 0.0475 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    return (
      <React.Fragment>
        <label>subtotal:</label>
        <div>${subtotal}</div>

        <label>tax: </label>
        <div>${tax}</div>

        <label>
          <h3>total: </h3>
        </label>

        <div>
          <h3>${total}</h3>
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
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onFinalSubmit)}
        className="pickup__form pickup__form--third"
      >
        <div className="pickup__form__row">
          <h2>Order Detail</h2>
        </div>
        <div className="pickup__form__row">
          <div className="pickup__form__info">{this.renderInfo()}</div>

          <div className="pickup__form__order-count">{this.renderCount()}</div>
        </div>
        <div
          className="pickup__form__row border-top--divider border-bottom--divider"
          style={{ padding: "3rem 0" }}
        >
          <div className="pickup__form__order-detail">
            <div className="pickup__form__order-date">
              <label>Pick-up time:</label>
              <div>{this.renderDate()}</div>
            </div>
            <div className="pickup__form__order-total">
              {this.renderTotal()}
            </div>
          </div>
        </div>
        <div className="pickup__form__row">
          <label>Delivery Instruction (optional)</label>
          <Field name="deliveryNote" component="textarea" placeholder="Notes" />
        </div>

        <div className="pickup__button-holder--horizontal">
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          {/* <button type="submit" disabled={pristine || submitting}> */}
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ form }) => {
  return { pickup: form.pickup?.values, clothes: form.clothes?.values };
};

export default connect(mapStateToProps, { createOrder })(
  reduxForm({
    form: "pickup", //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(PickupFormThirdPage)
);
