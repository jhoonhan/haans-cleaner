import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, resetForm, isPristine } from "redux-form";
import validate from "./validate";
import clothesIcons from "../../image/clothesIcons.svg";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const PickupFormThirdPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSelector = ({ input }) => {
    console.log(input.name);
    return (
      <div
        className={`form__clothes ${
          input.value > 0 ? "highlighted--border" : ""
        }`}
      >
        <div
          className="form__clothes__selector"
          onClick={() => input.onChange(+input.value + 1)}
        >
          <label>{input.name}</label>
          <svg viewBox="0 0 200 200" className="clothes-icon">
            <use href={`${clothesIcons}#${input.name}`} />
          </svg>
        </div>
        <input
          className={`form__clothes__edit ${
            input.value > 0 ? "highlighted--background" : ""
          }`}
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
      <div className="form__form__row">
        <label style={{ margin: "0" }}>Count your clothes</label>
      </div>

      <div className="form__form__row">
        <div className="button--d form__reset-form" onClick={reset}>
          reset
        </div>
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
      </div>
      <div className="form__form__row"></div>
      <div className="form__form__row">
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
