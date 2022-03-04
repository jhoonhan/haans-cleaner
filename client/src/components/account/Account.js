import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser, fetchOrder } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";
import SavedAddressList from "./SavedAddressList";
import AddNewAddress from "./AddNewAddress";
import Modal from "../Modal";
import DriverAccount from "../driver/DriverAccount";
import AccountEdit from "./AccountEdit";

const Account = ({
  auth,
  user,
  userFetched,
  order,
  signOutRedux,
  handleSubmit,
  editUser,
  fetchUser,
  editAccount,
  deleteUser,
  match,
}) => {
  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState("landing");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (!userFetched) {
      fetchUser(auth.userProfile.FW);
    }
    if (auth.isSignedIn && userFetched) {
      setFetched(true);
    }
  }, [auth.isSignedIn, user]);

  // DOM selection

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

  const onClickExpand = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
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
    if (!fetched) return null;
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.1 }}
          className="motion-container"
        >
          <header className="page-title">
            <h2>Account</h2>
          </header>

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
          {/* <AccountEdit /> */}
          <div className="account-container">
            <div className="form__form__row">
              <Link to="/account/edit" className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Personal Information
                </h3>
              </Link>

              <Link to="/account/edit" className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Payment Methods
                </h3>
              </Link>

              <Link to="/account/address" className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  Address Book
                </h3>
              </Link>

              <Link to="/account/order" className="nav__item">
                <h3 className="align-self-flex-start margin-top--1rem">
                  My Orders
                </h3>
              </Link>
            </div>

            <div className="form__form__row">
              <button onClick={onSignOutClick} className="button--d">
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, order, user, form }) => {
  return {
    auth,
    order,
    user: user.currentUser,
    userFetched: user.fetched,
    editAccount: form.editAccount,
  };
};

export default connect(mapStateToProps, {
  signOutRedux,
  fetchUser,
  editUser,
  deleteUser,
})(Account);

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
