import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createUser, logInUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

import GoogleButton from "../GoogleButton";

const SignInPageTwo = (props) => {
  useEffect(() => {}, []);
  // console.log(auth.userProfile);
  const { handleSubmit } = props;
  console.log(props.user);

  const onFinalSubmit = (formValue) => {
    // console.log({ ...formValue, clothes });
    // console.log(this.props.clothes);
    const combined = { ...formValue, googleId: props.auth.userProfile.FW };
    props.createUser(combined);
  };

  const renderInput = ({ input }) => {
    return (
      <React.Fragment>
        <input onChange={input.onChange} value={input.value} type="text" />
      </React.Fragment>
    );
  };

  const renderSignUp = () => {
    return (
      <form onSubmit={handleSubmit(onFinalSubmit)} className="form__form">
        <GoogleButton />
        <div className="form__form__row">
          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            component={renderInput}
            label="firstName"
          />
        </div>
        <div className="form__form__row">
          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            component={renderInput}
            label="lastName"
          />
        </div>
        <div className="form__form__row">
          <label>Email</label>
          <Field
            name="email"
            type="number"
            component={renderInput}
            label="email"
          />
        </div>
        <div className="form__form__row">
          <label>Phone Number</label>
          <Field
            name="phone"
            type="number"
            component={renderInput}
            label="phone"
          />
        </div>

        <button type="submit">Create Account</button>
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(SignInPageTwo);

export default connect(mapStateToProps, { createUser, logInUser })(wrappedForm);
