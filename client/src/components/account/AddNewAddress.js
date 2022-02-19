import React from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import renderInput from "../helpers/renderInput";
import { editUser } from "../../actions";

const AddNewAddress = ({ user, editUser, editAddress, reset }) => {
  const refNewAddressContainer = React.createRef();
  const refNewAddressDropDown = React.createRef();

  const onClickNewAddress = () => {
    const newAddress = {
      street: editAddress.values.newStreet,
      city: editAddress.values.newCity,
      zip: editAddress.values.newZip,
    };
    editUser(user?.id, { savedAddress: [...user.savedAddress, newAddress] });

    onControlNewAddress(true);

    reset();
  };

  const animationClasses = `height--0 opacity--0 padding--0 margin--0 overflow--hidden`;

  const onControlNewAddress = (type) => {
    if (type === true) {
      refNewAddressContainer.current.classList.remove(
        "account__new-address--focused"
      );
      refNewAddressDropDown.current.classList.add("height--0");
      refNewAddressDropDown.current.classList.add("opacity--0");
      refNewAddressDropDown.current.classList.add("padding--0");
      refNewAddressDropDown.current.classList.add("margin--0");
      refNewAddressDropDown.current.classList.add("overflow--hidden");
    }
    if (!type) {
      refNewAddressContainer.current.classList.add(
        "account__new-address--focused"
      );
      refNewAddressDropDown.current.classList.remove("height--0");
      refNewAddressDropDown.current.classList.remove("opacity--0");
      refNewAddressDropDown.current.classList.remove("padding--0");
      refNewAddressDropDown.current.classList.remove("margin--0");
      refNewAddressDropDown.current.classList.remove("overflow--hidden");
    }
  };

  return (
    <div
      onFocus={() => onControlNewAddress(false)}
      onBlur={() => onControlNewAddress(true)}
      className="account__new-address"
    >
      <div ref={refNewAddressContainer} className="width--100p">
        <Field
          name="newStreet"
          placeholder="Add a new address"
          type="text"
          component={renderInput}
        />
      </div>

      <div
        ref={refNewAddressDropDown}
        // className={`account__new-address__dropdown width--100p`}
        className={`account__new-address__dropdown width--100p ${animationClasses}`}
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

        <button onClick={onClickNewAddress} className="button--d">
          add
        </button>
      </div>
    </div>
  );
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
