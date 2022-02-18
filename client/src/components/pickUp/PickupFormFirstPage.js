import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";
import validate from "./validate";

import RenderField from "../singIn/RenderField";
import RenderInput from "../singIn/RenderInput";

const PickupFormFirstPage = (props) => {
  useEffect(() => {
    if (props.auth.isSignedIn && !props.user) {
      props.fetchUser(props.auth.userProfile.FW);
    }
  });

  const { handleSubmit, lastPage } = props;

  return (
    <form className="form__form" onSubmit={handleSubmit}>
      <div className="form__form__row">
        <h2>Order Information</h2>
      </div>

      <div className="form__form__row">
        <Field name="name" type="text" component={RenderField} label="name" />
      </div>

      <div className="form__form__row">
        <label>Address</label>
        <Field
          name="street"
          type="text"
          component={RenderInput}
          label="street"
        />
        <div className="cityzip">
          <label>City</label>
          <label>Zip</label>
          <Field name="city" type="text" component={RenderInput} label="city" />
          <Field name="zip" type="number" component={RenderInput} label="zip" />
        </div>
      </div>

      <div className="form__form__row">
        <Field
          name="phone"
          type="number"
          component={RenderField}
          label="phone number"
        />
      </div>

      <div className="form__form__row">
        <Field
          name="date"
          type="date"
          component={RenderField}
          label="pick up date"
        />
      </div>

      <div className="form__form__row">
        <Field name="note" type="text" component={RenderField} label="note" />
      </div>

      <div className="form__form__row"></div>

      <div className="form__button-holder--vertical">
        <button type="submit" className="next">
          Count clothes (optional)
        </button>
        <button type="button" className="previous" onClick={lastPage}>
          Next
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ auth, user }) => {
  const fullName = () => {
    if (user.currentUser) {
      return user.currentUser.fullName;
    }
    if (!user.currentUser && auth.userProfile.tf) {
      return auth.userProfile.tf;
    }
    if (!user.currentUser && !auth.userProfile.tf) {
      return "";
    }
  };

  return {
    initialValues: {
      name: fullName(),
      street: user.currentUser?.street,
      city: user.currentUser?.city,
      zip: user.currentUser?.zip,
      phone: user.currentUser?.phone,
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

export default connect(mapStateToProps, { fetchUser })(wrappedForm);
