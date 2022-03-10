import React, { createRef, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import GoogleMap from "../../apis/GoogleMap";
import { createOrder } from "../../actions";
import validate from "./validate";
import price from "../price";
import Modal from "../Modal";
import Loader from "../Loader";

const PickupFormFourthPage = (props) => {
  // constructor(props) {
  //   super(props);

  //   // state = { showModal: false };

  //   // googleMapWrapper = createRef();

  //   // total = { total: 0, subtotal: 0, tax: 0 };
  //   taxRate = 0.0475;
  // }
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState({ total: 0, subtotal: 0, tax: 0 });
  // let total = { total: 0, subtotal: 0, tax: 0 };
  const taxRate = 0.0475;

  // componentDidMount() {
  //   window.scrollTo(0, 0);

  //   if (props.auth.isSignedIn && !props.user) {
  //     props.fetchUser(props.auth.userProfile.FW);
  //   }
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.auth.isSignedIn && !props.user) {
      props.fetchUser(props.auth.userProfile.FW);
    }
    if (props.clothes) getTotalPrice(cvtObj2Arr(props.clothes));
  }, []);

  const cvtObj2Arr = (data) => {
    return Object.entries(data).map(([key, value]) => {
      const obj = {};
      obj.type = key;
      obj.count = value;
      return obj;
    });
  };

  const onFinalSubmit = () => {
    const clothes = props.clothes;
    const formValues = props.pickup;

    const combined = {
      ...formValues,
      clothes,
      googleId: props.auth.userProfile.FW,
      userId: props.user._id,
      total,
      timestamp: Date.now(),
      status: "submitted",
    };
    props.createOrder(combined).then(() => setShowModal(false));
  };

  const modalAction = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={async () => {
            onFinalSubmit();
          }}
          className="button--l button--alert"
        >
          Submit
        </button>
      </>
    );
  };

  const getTotalPrice = (data) => {
    let preSubtotal = 0;
    data.forEach((el) => {
      const pricePerItem = price[el.type] * el.count;
      preSubtotal = preSubtotal + pricePerItem;
    });
    const subtotal = Number(Math.round(preSubtotal * 100) / 100).toFixed(2);
    const tax = Number(Math.round(preSubtotal * taxRate * 100) / 100).toFixed(
      2
    );
    const totalCalculated = Number(
      Math.round((preSubtotal + +tax) * 100) / 100
    ).toFixed(2);
    console.log(totalCalculated);
    setTotal({ subtotal, total: totalCalculated, tax });
  };

  const renderInfo = () => {
    if (!props.pickup) return null;

    const { street, city, zip, name } = props.pickup;
    return (
      <React.Fragment>
        <h4>{name}</h4>
        <p>{`${street}, ${city}, ${zip}`}</p>
      </React.Fragment>
    );
  };
  const renderCount = () => {
    if (!props.clothes) return;
    const clothes = cvtObj2Arr(props.clothes);
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
                <label>
                  ${Math.round(price[cloth.type] * cloth.count * 100) / 100}
                </label>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  const renderTotal = () => {
    if (!props.clothes) return null;

    return (
      <React.Fragment>
        <label>subtotal:</label>
        <p>${total.subtotal}</p>

        <label>tax: </label>
        <p>${total.tax}</p>

        <label>total: </label>
        <h4>${total.total}</h4>
      </React.Fragment>
    );
  };
  const renderDate = () => {
    const selectedDate = new Date(props.pickup.date);
    const convertedDate = selectedDate.toISOString().split("T")[0];
    const pickupDate = new Date(convertedDate);

    const date = {
      year: pickupDate.getFullYear(),
      month: pickupDate.getMonth() + 1,
      date: pickupDate.getDate(),
      day: pickupDate.toLocaleString("default", { weekday: "long" }),
    };
    return (
      <React.Fragment>
        <p>
          {date.day}, {date.month}/{date.date}, 7AM - 9AM
        </p>
      </React.Fragment>
    );
  };

  const render = () => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
      <>
        <Loader show={props.loader.showLoader} />
        <Modal
          show={showModal}
          handleClose={setShowModal}
          id={props.user.googleId}
          title="Submit Order"
          content="Are you sure?"
          actions={modalAction()}
        />
        <form
          onSubmit={handleSubmit(onFinalSubmit)}
          className="form__form form__form--third"
        >
          <div className="form__form__row">
            <div className="form__form__pickup-date">
              <label>Pick-up date:</label>
              {renderDate()}
            </div>
          </div>

          <div
            className="form__form__row border-top--divider"
            style={{ paddingTop: "3rem" }}
          >
            <div className="form__form__info">{renderInfo()}</div>
            <div
              className="form__form__order-count"
              style={{ marginTop: "2rem" }}
            >
              {renderCount()}
            </div>
          </div>
          <div
            className="form__form__row border-bottom--divider border-top--divider"
            style={{ paddingBottom: "1.5rem", paddingTop: "2rem" }}
          >
            <div className="form__form__order-total">{renderTotal()}</div>
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
                setShowModal(true);
              }}
              className="button--l"
            >
              Submit
            </div>
          </div>
        </form>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ form, auth, user, loader }) => {
  return {
    pickup: form.pickup.values,
    clothes: form.clothes.values,
    auth,
    user: user.currentUser,
    loader,
  };
};

export default connect(mapStateToProps, { createOrder })(
  reduxForm({
    form: "pickup", //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(PickupFormFourthPage)
);
