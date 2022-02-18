import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, logInUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import RenderInput from "./RenderInput";

const SignInSecondPage = (props) => {
  const { handleSubmit } = props;

  const onFinalSubmit = (formValue) => {
    // console.log({ ...formValue, clothes });
    // console.log(this.props.clothes);
    const combined = {
      ...formValue,
      googleId: props.auth.userProfile.FW,
      fullName: `${formValue.firstName} ${formValue.lastName}`,
    };
    props.createUser(combined);
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

        <button type="submit" className="w100p" style={{ marginTop: "3rem" }}>
          Create Account
        </button>
      </form>
    );
  };

  return <React.Fragment>{renderSignUp()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      firstName: state.auth.userProfile.VX,
      lastName: state.auth.userProfile.iW,
      email: state.auth.userProfile.tv,
    },
    auth: state.auth,
    user: state.user.currentUser,
  };
};

const wrappedForm = reduxForm({
  form: "userSingUp", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(SignInSecondPage);

export default connect(mapStateToProps, { createUser, logInUser, fetchUser })(
  wrappedForm
);
