import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, fetchUser, fetchGeocode } from "../../actions";
import { Field, reduxForm } from "redux-form";

import RenderInput from "../helpers/renderInput";

const SignInSecondPage = (props) => {
  const { handleSubmit } = props;

  const onFinalSubmit = (formValues) => {
    const googleId = props.auth.userProfile.FW;
    props.createUser(formValues, googleId);
  };

  const renderSignUp = () => {
    return (
      <form onSubmit={handleSubmit(onFinalSubmit)} className="form__form">
        {/* <GoogleButton /> */}
        <div className="form__form__row">
          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            component={RenderInput}
            label="firstName"
          />
        </div>
        <div className="form__form__row">
          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            component={RenderInput}
            label="lastName"
          />
        </div>
        <div className="form__form__row">
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component={RenderInput}
            label="email"
          />
        </div>
        <div className="form__form__row">
          <label>Phone Number</label>
          <Field
            name="phone"
            type="number"
            component={RenderInput}
            label="phone"
          />
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
            <Field
              name="city"
              type="text"
              component={RenderInput}
              label="city"
            />
            <Field
              name="zip"
              type="number"
              component={RenderInput}
              label="zip"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w100p button--l"
          style={{ marginTop: "3rem" }}
        >
          Create Account
        </button>
      </form>
    );
  };

  return <React.Fragment>{renderSignUp()}</React.Fragment>;
};

const mapStateToProps = ({ auth, user }) => {
  return {
    initialValues: {
      firstName: auth.userProfile.VX,
      lastName: auth.userProfile.iW,
      email: auth.userProfile.tv,
    },
    auth: auth,
    user: user.currentUser,
  };
};

const wrappedForm = reduxForm({
  form: "userSingUp", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(SignInSecondPage);

export default connect(mapStateToProps, {
  createUser,
  fetchUser,
  fetchGeocode,
})(wrappedForm);
