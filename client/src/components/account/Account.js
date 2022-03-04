import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser, fetchOrder } from "../../actions";
import { Field, Form, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { editUser } from "../../actions";
import renderInput from "../helpers/renderInput";

import Modal from "../Modal";

import DriverAccount from "../driver/DriverAccount";
import AccountEdit from "./AccountEdit";
import AccountOrder from "./AccountOrder";
import AccountAddress from "./AccountAddress";
import AccountHome from "./AccountHome";

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
  const [page, setPage] = useState("home");
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

  const renderContent = () => {
    if (page === "home")
      return <AccountHome setPage={setPage} onSignOutClick={onSignOutClick} />;
    if (page === "edit") return <AccountEdit setPage={setPage} />;
    if (page === "address") return <AccountAddress setPage={setPage} />;
    if (page === "order") return <AccountOrder setPage={setPage} />;
  };

  const render = () => {
    if (!fetched) return null;
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
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
          {renderContent()}
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
