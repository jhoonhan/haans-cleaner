import React, { useEffect, useState } from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";
import validate from "./validate";

import SavedAddressList from "../account/SavedAddressList";

import renderField from "../helpers/renderField";
import renderInput from "../helpers/renderInput";

const PickupFormFirstPage = (props) => {
  const [selected, setSelected] = useState(
    props.user?.currentUser?.defaultAddress
  );

  useEffect(() => {
    if (props.auth.isSignedIn && !props.user) {
      props.fetchUser(props.auth.userProfile.FW);
    }
  }, [props.auth.isSignedIn]);

  useEffect(() => {
    if (selected) {
      props.change("street", selected.street);
      props.change("city", selected.city);
      props.change("zip", selected.zip);
    }
  }, [selected]);

  const { handleSubmit, lastPage } = props;

  return (
    <form className="form__form" onSubmit={handleSubmit}>
      <div className="form__form__row">
        <Field name="name" type="text" component={renderField} label="name" />
      </div>

      <div className="form__form__row">
        <label>Address</label>
        <Field
          name="street"
          type="text"
          component={renderInput}
          label="street"
        />
        <div className="cityzip">
          <label>City</label>
          <label>Zip</label>
          <Field name="city" type="text" component={renderInput} label="city" />
          <Field name="zip" type="number" component={renderInput} label="zip" />
        </div>
      </div>
      <div className="form__form__row">
        <label>Saved Addresses</label>
        <SavedAddressList
          enableDelete={false}
          enableDefault={false}
          setSelected={setSelected}
        />
      </div>

      <div className="form__form__row">
        <Field
          name="phone"
          type="number"
          component={renderField}
          label="phone number"
        />
      </div>

      <div className="form__form__row">
        <Field
          name="date"
          type="date"
          component={renderField}
          label="pick-up date"
        />
      </div>

      <div className="form__form__row">
        <Field name="note" type="text" component={renderField} label="note" />
      </div>

      <div className="form__form__row"></div>

      <div className="form__button-holder--vertical">
        <button type="submit" className="next button--l">
          Count clothes (optional)
        </button>
        <button type="button" className="previous button--l" onClick={lastPage}>
          Next
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    initialValues: {
      name: user.currentUser?.fullName,
      phone: user.currentUser?.phone,
      street: user.currentUser?.defaultAddress.street,
      city: user.currentUser?.defaultAddress.city,
      zip: user.currentUser?.defaultAddress.zip,
    },
    auth: auth,
    user: user.currentUser,
  };
};

const wrappedForm = reduxForm({
  form: "pickup", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  // validate,
})(PickupFormFirstPage);

export default connect(mapStateToProps, { fetchUser, change })(wrappedForm);
