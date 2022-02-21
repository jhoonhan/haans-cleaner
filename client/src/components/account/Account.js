import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";
import Modal2 from "../Modal2";
import { motion } from "framer-motion";

const Account = ({
  auth,
  user,
  signOutRedux,
  handleSubmit,
  editUser,
  editAccount,
  deleteUser,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, [auth.isSignedIn, user]);

  // DOM selection

  const onSignOutClick = () => {
    const gAuth = window.gapi.auth2?.getAuthInstance();
    gAuth.signOut();
    signOutRedux();
  };

  const onDeleteClick = () => {
    deleteUser(user.id);
  };

  const onEditSubmit = (type) => {
    const formValues = editAccount.values;
    const fullName = `${editAccount.values.firstName} ${editAccount.values.lastName}`;

    if (type === "profile") {
      editUser(user?.id, { ...user, ...formValues, fullName });
    }
  };

  const renderModalActions = () => {
    return (
      <>
        <button onClick={() => setShowModal(false)} className="button--l">
          Go Back
        </button>
        <button
          onClick={() => onDeleteClick()}
          className="button--l button--alert"
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Modal2
        show={showModal}
        handleClose={setShowModal}
        id={user.googleId}
        title="Delete Account"
        content="Are you sure?"
        actions={renderModalActions()}
      />
      <div className="account-container">
        <Form
          onSubmit={handleSubmit(() => onEditSubmit("profile"))}
          className="form__form"
        >
          <h3 className="justify-self--flex-start margin-top--1rem">Profile</h3>
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
            <label>Saved Address</label>
            <SavedAddressList enableDelete={true} enableDefault={true} />
            <AddNewAddress />
          </div>
          <div className="form__form__row">
            <button
              onClick={handleSubmit(() => onEditSubmit("profile"))}
              className="button--l"
            >
              Edit Profile
            </button>
          </div>

          <h3 className="justify-self--flex-start margin-top--1rem">Account</h3>
          <div className="form__form__row">
            <button onClick={onSignOutClick} className="button--d">
              Sign Out
            </button>
          </div>

          <div className="form__form__row">
            <button
              onClick={() => setShowModal(true)}
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
})(Account);

export default connect(mapStateToProps, {
  signOutRedux,
  fetchUser,
  editUser,
  deleteUser,
})(wrappedForm);

// class Morpheus extends Component {
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <div>
//         Fields go here
//         <button onClick={handleSubmit(values =>
//           this.props.onSubmit({
//             ...values,
//             pill: 'blue'
//           }))}>Blue Pill</button>
//         <button onClick={handleSubmit(values =>
//           this.props.onSubmit({
//             ...values,
//             pill: 'red'
//           }))}>Red Pill</button>
//       </div>
//     );
//   }
// }

// export default reduxForm({
//   form: 'morpheus'
// })(Morpheus)
