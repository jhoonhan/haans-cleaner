import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, formValues, reduxForm } from "redux-form";

import { fetchPosts, createUser } from "../../actions";

class PickUp extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  }
  RenderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.createUser(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="address"
          component={this.RenderInput}
          label="Enter Title"
        />
        <Field name="sex" component={this.RenderInput} label="Enter sex" />
        <button>Next</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.address) {
    errors.address = "You must enter";
  }
  if (!formValues.sex) {
    errors.sex = "you must have sex";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "pickUpOne",
  validate,
})(PickUp);

export default connect(null, { createUser })(formWrapped);
