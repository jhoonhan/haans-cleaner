import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";
import Modal2 from "../Modal2";

const AccountEdit = ({
  auth,
  user,
  signOutRedux,
  handleSubmit,
  editUser,
  editAccount,
  deleteUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const onSignOutClick = () => {
    const gAuth = window.gapi.auth2?.getAuthInstance();
    gAuth.signOut();
    signOutRedux();
  };

  const onEditSubmit = (type) => {
    const formValues = editAccount.values;
    const fullName = `${editAccount.values.firstName} ${editAccount.values.lastName}`;

    if (type === "profile") {
      editUser(user?.id, { ...user, ...formValues, fullName });
    }
  };

  const modalAction = () => {
    if (showModal && modalType === "deleteAccount") {
      return (
        <>
          <button onClick={() => setShowModal(false)} className="button--l">
            Go Back
          </button>
          <button
            onClick={() => {
              deleteUser(user.id);
              setShowModal(false);
            }}
            className="button--l button--alert"
          >
            Delete
          </button>
        </>
      );
    }
    if (showModal && modalType === "editAccount") {
      return (
        <>
          <button onClick={() => setShowModal(false)} className="button--l">
            Go Back
          </button>
          <button
            onClick={handleSubmit(() => {
              onEditSubmit("profile");
              setShowModal(false);
            })}
            className="button--l button--alert"
          >
            Submit
          </button>
        </>
      );
    }
  };

  const render = () => {
    return (
      <>
        <Modal2
          show={showModal}
          handleClose={setShowModal}
          id={user?.googleId}
          title={
            modalType === "deleteAccount" ? "Delete Account" : "Edit Account"
          }
          content="Are you sure?"
          actions={modalAction()}
        />
        <header className="page-title">
          <h2>Account</h2>
        </header>
        <div className="account-container">
          <h3 className="align-self-flex-start margin-top--1rem">My Profile</h3>
          <Form onSubmit={handleSubmit} className="form__form">
            <div className="form__form__row">
              <label>First Name</label>
              <Field name="firstName" type="text" component={renderInput} />
            </div>

            <div className="form__form__row">
              <label>Last Name</label>
              <Field name="lastName" type="text" component={renderInput} />
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
              <button
                onClick={handleSubmit(() => {
                  setShowModal(true);
                  setModalType("editAccount");
                })}
                className="button--l"
              >
                Edit Profile
              </button>
            </div>

            <h3 className="justify-self--flex-start margin-top--1rem">
              Account
            </h3>
            <div className="form__form__row">
              <button onClick={onSignOutClick} className="button--d">
                Sign Out
              </button>
            </div>

            <div className="form__form__row">
              <button
                onClick={handleSubmit(() => {
                  setShowModal(true);
                  setModalType("deleteAccount");
                })}
                className="button--d button--alert"
              >
                Delete Account
              </button>
            </div>
          </Form>
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, form }) => {
  return {
    initialValues: {
      firstName: user.currentUser?.firstName,
      lastName: user.currentUser?.lastName,
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
})(AccountEdit);

export default connect(mapStateToProps, {
  signOutRedux,
  fetchUser,
  editUser,
  deleteUser,
})(wrappedForm);
