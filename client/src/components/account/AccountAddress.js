import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";
import Modal from "../Modal";

const AccountAddress = ({
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
      editUser(user?._id, { ...user, ...formValues, fullName });
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
              deleteUser(user._id);
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
        <header className="page-title">
          <h2>Account</h2>
        </header>
        <div className="account-container">
          <h3 className="align-self-flex-start margin-top--1rem">
            My Addresses
          </h3>

          <div className="form__form__row">
            <label>Saved Address</label>
            <SavedAddressList enableDelete={true} enableDefault={true} />
          </div>

          <div className="form__form__row">
            <AddNewAddress />
          </div>
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user, form }) => {
  return {
    auth,
    user: user.currentUser,
    editAccount: form.editAccount,
  };
};

export default connect(mapStateToProps, {
  signOutRedux,
  fetchUser,
  editUser,
  deleteUser,
})(AccountAddress);
