import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signOutRedux, fetchUser } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";

const Account = ({
  auth,
  user,
  signOutRedux,
  handleSubmit,
  editUser,
  editAccount,
}) => {
  useEffect(() => {}, [auth.isSignedIn, user]);

  // DOM selection
  const onSignOutClick = () => {
    const gAuth = window.gapi.auth2?.getAuthInstance();
    gAuth.signOut();
    signOutRedux();
  };

  // const renderSavedAddressList = () => {
  //   const filteredArr = user.savedAddress.reduce((address, i) => {
  //     const x = address.find(
  //       (el) => el.street === i.street && el.city === i.city && el.zip === i.zip
  //     );
  //     if (!x) {
  //       return address.concat([i]);
  //     } else {
  //       return address;
  //     }
  //   }, []);

  //   // Render
  //   return filteredArr.map((address, i) => {
  //     const defaultCss =
  //       address.street === user.defaultAddress.street &&
  //       address.city === user.defaultAddress.city &&
  //       address.zip === user.defaultAddress.zip
  //         ? "default"
  //         : "";

  //     return (
  //       <div className={`band ${defaultCss}`} key={i}>
  //         <div>{Object.values(address).join(", ")}</div>
  //       </div>
  //     );
  //   });
  // };

  const onEditSubmit = () => {
    console.log(`aaang`);
  };

  return (
    <div className="account-container">
      <Form onSubmit={handleSubmit(onEditSubmit)} className="form__form">
        <div className="form__form__row">
          <label>Name</label>
          <Field name="name" type="text" component={renderInput} />
        </div>

        <div className="form__form__row">
          <label>Email</label>
          <Field name="email" type="text" component={renderInput} />
        </div>

        <div className="form__form__row">
          <label>Phone Number</label>
          <Field name="phone" type="text" component={renderInput} />
        </div>

        <div className="form__form__row">
          <label>Saved Address</label>
          <SavedAddressList />
          <AddNewAddress />
        </div>

        <div className="form__form__row">
          <button onClick={onSignOutClick} className="button--l">
            Sign Out
          </button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ auth, user, form }) => {
  return {
    initialValues: {
      name: user.currentUser?.fullName,
      defaultAddress: user.currentUser?.defaultAddress,
      phone: user.currentUser?.phone,
      email: user.currentUser?.email,
    },
    auth,
    user: user.currentUser,
    editAccount: form.editAccount,
  };
};

const wrappedForm = reduxForm({
  form: "editAccount", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(Account);

export default connect(mapStateToProps, { signOutRedux, fetchUser, editUser })(
  wrappedForm
);
