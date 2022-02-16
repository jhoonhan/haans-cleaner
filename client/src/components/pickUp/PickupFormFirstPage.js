import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const PickupFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="pickup__form" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="name" />
      <Field
        name="address"
        type="text"
        component={renderField}
        label="address"
      />

      <Field name="date" type="text" component={renderField} label="date" />
      <Field name="note" type="text" component={renderField} label="note" />
      <div>
        <button type="submit" className="next">
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
