import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import validate from "./validate";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const PickupFormSecondPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderInput = ({ input }) => {
    const style = input.value > 0 ? "selected" : "";

    return (
      <div className={`pickup__clothes ${style}`}>
        <div
          className="pickup__clothes__selector"
          onClick={() => input.onChange(+input.value + 1)}
        >
          {input.name}
        </div>
        <input
          className="pickup__clothes__edit"
          onChange={input.onChange}
          value={+input.value}
          type="number"
        />
      </div>
    );
  };
  const { handleSubmit, previousPage, reset } = props;
  return (
    <form onSubmit={handleSubmit} className="pickup__form">
      <div className="pickup__reset-form" onClick={reset}>
        reset
      </div>
      <label>Count your clothes</label>
      <div className="pickup__selector">
        <Field name="top" component={renderInput} />
        <Field name="pants" component={renderInput} />
        <Field name="sweater" component={renderInput} />
        <Field name="jacket" component={renderInput} />
        <Field name="coat" component={renderInput} />
        <Field name="skirt" component={renderInput} />
        <Field name="dress" component={renderInput} />
        <Field name="other" component={renderInput} />
        <Field name="error" component={renderError} />
      </div>
      <div className="pickup__button-holder--horizontal fixed">
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { null: null };
};

const wrappedForm = reduxForm({
  form: "clothes", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(PickupFormSecondPage);

export default connect(mapStateToProps)(wrappedForm);
