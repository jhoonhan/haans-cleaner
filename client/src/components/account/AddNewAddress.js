import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import renderInput from "../helpers/renderInput";
import { editUser } from "../../actions";

const AddNewAddress = ({
  user,
  editUser,
  editAddress,
  reset,
  handleSubmit,
}) => {
  const [show, setShow] = useState(false);
  const refNewAddressContainer = useRef(null);
  const refNewAddressDropDown = useRef(null);

  const onClickNewAddress = () => {
    const newAddress = {
      street: editAddress.values.newStreet,
      city: editAddress.values.newCity,
      zip: editAddress.values.newZip,
    };
    editUser(user?._id, { savedAddress: [...user.savedAddress, newAddress] });

    setShow(true);

    reset();
  };

  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const render = () => {
    return (
      <div
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="account__new-address"
      >
        <label>add new address</label>
        <div
          ref={refNewAddressContainer}
          className="width--100p"
          style={{ marginTop: "0.5rem" }}
        >
          <Field
            name="newStreet"
            placeholder="Add a new address"
            type="text"
            component={renderInput}
          />
        </div>

        <div
          ref={refNewAddressDropDown}
          className={`account__new-address__dropdown width--100p ${
            !show ? animationClasses : ""
          }`}
        >
          <div className="cityzip">
            <Field
              name="newCity"
              placeholder="City"
              type="text"
              component={renderInput}
            />
            <Field
              name="newZip"
              placeholder="Zip Code"
              type="text"
              component={renderInput}
            />
          </div>

          <button
            onClick={handleSubmit(onClickNewAddress)}
            className="button--d"
            style={{ marginTop: "2rem" }}
          >
            add
          </button>
        </div>
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, form }) => {
  return {
    initialValues: {
      newStreet: null,
      newCity: null,
      newZip: null,
    },
    auth,
    user: user.currentUser,
    editAddress: form.editAddress,
  };
};

const wrappedForm = reduxForm({
  form: "editAddress", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(AddNewAddress);

export default connect(mapStateToProps, { editUser })(wrappedForm);
