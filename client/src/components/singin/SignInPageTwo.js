import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import GoogleButton from "../GoogleButton";

const SignInPageTwo = ({ auth, user }) => {
  console.log({ auth, user });

  return (
    <form className="form__form">
      <GoogleButton />
      <div className="form__form__row">
        <label>Name</label>
        <Field name="name" type="text" component="input" label="name" />
      </div>
      <div className="form__form__row">
        <label>Address</label>
        <Field name="address" type="text" component="input" label="name" />
      </div>
      <div className="form__form__row">
        <label>Phone Number</label>
        <Field name="phone" type="text" component="input" label="name" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user };
};

const wrappedForm = reduxForm({
  form: "userSingUp", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(SignInPageTwo);

export default connect(mapStateToProps)(wrappedForm);
