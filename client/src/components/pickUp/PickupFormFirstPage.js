import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

const PickupFormFirstPage = (props) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const { handleSubmit, lastPage } = props;

  const renderField = ({ input, label, type, meta: { touched, error } }) => {
    const inputArea = (
      <input
        {...input}
        placeholder={label}
        type={type}
        className="input--100"
      />
    );
    const textArea = <textarea {...input} placeholder={label} type={type} />;

    return (
      <div className="form__form__row">
        <label>{label[0].toUpperCase() + label.substring(1)}</label>
        <div>
          {label === "note" ? textArea : inputArea}
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  };

  return (
    <form className="form__form" onSubmit={handleSubmit}>
      <div className="form__form__row">
        <h2>Order Information</h2>
      </div>
      <Field name="name" type="text" component={renderField} label="name" />
      <Field
        name="address"
        type="text"
        component={renderField}
        label="address"
      />
      <Field
        name="phone"
        type="number"
        component={renderField}
        label="phone number"
      />
      <Field name="date" type="text" component={renderField} label="date" />
      <Field name="note" type="text" component={renderField} label="note" />
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

export default reduxForm({
  form: "pickup", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(PickupFormFirstPage);
