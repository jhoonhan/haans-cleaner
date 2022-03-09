import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, resetForm, isPristine } from "redux-form";
import validate from "./validate";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const PickupFormThirdPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSelector = ({ input }) => {
    const style = input.value > 0 ? "highlighted" : "";

    return (
      <div className={`form__clothes ${style}`}>
        <div
          className="form__clothes__selector"
          onClick={() => input.onChange(+input.value + 1)}
        >
          {input.name}
        </div>
        <input
          className="form__clothes__edit"
          onChange={input.onChange}
          value={+input.value}
          type="number"
        />
      </div>
    );
  };
  const { handleSubmit, previousPage, reset } = props;
  return (
    <form onSubmit={handleSubmit} className="form__form">
      <div className="form__reset-form" onClick={reset}>
        reset
      </div>
      <label>Count your clothes</label>
      <div className="form__selector">
        <Field name="top" component={renderSelector} />
        <Field name="pants" component={renderSelector} />
        <Field name="sweater" component={renderSelector} />
        <Field name="jacket" component={renderSelector} />
        <Field name="coat" component={renderSelector} />
        <Field name="skirt" component={renderSelector} />
        <Field name="dress" component={renderSelector} />
        <Field name="other" component={renderSelector} />
        <Field name="error" component={renderError} />
      </div>
      <div className="form__button-holder--horizontal fixed">
        <button
          type="button"
          className="previous button--l"
          onClick={previousPage}
        >
          Previous
        </button>
        <button type="submit" className="next button--l">
          Next
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {};
};

const wrappedForm = reduxForm({
  form: "clothes", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(PickupFormThirdPage);

export default connect(mapStateToProps, { isPristine })(wrappedForm);
