import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createUser, fetchUser } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { motion } from "framer-motion";
import validate from "./validate";

import RenderInput from "../helpers/RenderInput";

const SignInSecondPage = (props) => {
  const { handleSubmit } = props;

  const onFinalSubmit = (formValues) => {
    const googleId = props.auth.userProfile.TW;
    props.createUser(formValues, googleId);
  };

  const render = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.1, delay: 0.1 }}
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit(onFinalSubmit)} className="form__form">
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
            <label>Street</label>
            <Field
              name="street"
              type="text"
              component={RenderInput}
              label="street"
            />
          </div>
          <div className="form__form__row">
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
      </motion.div>
    );
  };

  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    initialValues: {
      firstName: auth.userProfile.iY,
      lastName: auth.userProfile.wW,
      email: auth.userProfile.Bv,
    },
    auth: auth,
    user: user.currentUser,
  };
};

const wrappedForm = reduxForm({
  form: "userSingUp", //Form name is same
  validate,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(SignInSecondPage);

export default connect(mapStateToProps, {
  createUser,
  fetchUser,
})(wrappedForm);
