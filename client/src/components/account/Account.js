import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { signOutRedux, fetchUser, deleteUser } from "../../actions";

import AccountEdit from "./AccountEdit";
import AccountOrder from "./AccountOrder";
import AccountAddress from "./AccountAddress";
import AccountHome from "./AccountHome";

import DriverAccountHome from "../driver/DriverAccountHome";
import DriverAccountOrder from "../driver/DriverAccountOrder";

const Account = ({
  auth,
  user,
  userFetched,
  signOutRedux,
  fetchUser,
  match,
}) => {
  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (!auth.isSignedIn) return;
    if (auth.isSignedIn && !fetched) {
      fetchUser(auth.userProfile.FW);
    }

    if (auth.isSignedIn && userFetched) {
      setFetched(true);
    }
  }, [auth.isSignedIn, user]);

  // DOM selection

  const onSignOutClick = () => {
    const gAuth = window.gapi.auth2.getAuthInstance();
    gAuth.signOut();
    signOutRedux();
  };

  const renderContent = () => {
    if (page === "home")
      return (
        <AccountHome
          user={user}
          page={page}
          setPage={setPage}
          onSignOutClick={onSignOutClick}
        />
      );
    if (page === "edit") return <AccountEdit page={page} setPage={setPage} />;
    if (page === "address")
      return <AccountAddress page={page} setPage={setPage} />;
    if (page === "order") return <AccountOrder page={page} setPage={setPage} />;
  };

  const renderDriverContent = () => {
    if (page === "home")
      return (
        <DriverAccountHome
          user={user}
          setPage={setPage}
          onSignOutClick={onSignOutClick}
        />
      );
    if (page === "edit") return <AccountEdit setPage={setPage} />;
    if (page === "address") return <AccountAddress setPage={setPage} />;
    if (page === "order") return <DriverAccountOrder setPage={setPage} />;
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
          {match.path === "/account" ? renderContent() : renderDriverContent()}
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
