import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createOrder } from "../actions";
import validate from "./validate";

class PickupFormThirdPage extends React.Component {
  onFinalSubmit = (formValue) => {
    const clothes = this.props.clothes;
    // console.log({ ...formValue, clothes });
    // console.log(this.props.clothes);
    const combined = { ...formValue, clothes, userId: "123jdie929da9d29" };
    this.props.createOrder(combined);
  };
  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onFinalSubmit)}>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field
              name="employed"
              id="employed"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" placeholder="Notes" />
          </div>
        </div>
        <div>
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ form }) => {
  return { clothes: form.clothes.values };
};

export default connect(mapStateToProps, { createOrder })(
  reduxForm({
    form: "pickup", //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(PickupFormThirdPage)
);
