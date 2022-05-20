import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { editUser } from "../../actions";
import RenderInput from "../helpers/RenderInput";

import Modal from "../Modal";
import PageTitle from "../PageTitle";

const AccountEdit = ({
  auth,
  user,
  signOutRedux,
  handleSubmit,
  editUser,
  editAccount,
  deleteUser,
  setPage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

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
      <motion.div
        className="motion-container account__content__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.1 }}
      >
        <Modal
          show={showModal}
          handleClose={setShowModal}
          id={user?.googleId}
          title={
            modalType === "deleteAccount" ? "Delete Account" : "Edit Account"
          }
          content="Are you sure?"
          actions={modalAction()}
        />
        <PageTitle
          title="profile"
          hasGoBack={true}
          onClickHandle={() => setPage("home")}
        />

        <div className="account-container">
          <Form onSubmit={handleSubmit} className="form__form">
            <div className="form__form__row">
              <label>First Name</label>
              <Field name="firstName" type="text" component={RenderInput} />
            </div>

            <div className="form__form__row">
              <label>Last Name</label>
              <Field name="lastName" type="text" component={RenderInput} />
            </div>

            <div className="form__form__row">
              <label>Email</label>
              <Field name="email" type="text" component={RenderInput} />
            </div>

            <div className="form__form__row">
              <label>Phone Number</label>
              <Field name="phone" type="text" component={RenderInput} />
            </div>

            <div className="form__form__row">
              <button
                onClick={handleSubmit(() => {
                  setShowModal(true);
                  setModalType("editAccount");
                })}
                className="button--d"
              >
                Edit Profile
              </button>
            </div>

            <div className="form__form__row">
              <label style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                account
              </label>

              <button
                onClick={onSignOutClick}
                className="button--d"
                style={{ marginBottom: "2rem" }}
              >
                Sign Out
              </button>
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
      </motion.div>
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
