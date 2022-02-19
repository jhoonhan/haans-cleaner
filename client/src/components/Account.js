import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signOutRedux } from "../actions";
import { Field, reduxForm } from "redux-form";

const Account = ({ auth, user, signOutRedux }) => {
  useEffect(() => {}, []);

  const onSignOutClick = () => {
    const gAuth = window.gapi.auth2?.getAuthInstance();
    gAuth.signOut();
    signOutRedux();
  };

  const renderSavedAddressList = () => {
    const filteredList = user.savedAddress.filter(
      (address) => address.street !== user.defaultAddress.street
    );

    return filteredList.map((address) => {
      return (
        <div className="band">
          <div>{Object.values(address).join(", ")}</div>
        </div>
      );
    });
  };

  return (
    <div className="account-container">
      <div className="template">
        <div className="template__row">
          <label>Name</label>
          <h3>{user.fullName}</h3>
        </div>

        <div className="template__row">
          <label>Email</label>
          <h3>{user.email}</h3>
        </div>

        <div className="template__row">
          <label>Phone Number</label>
          <h3>{user.phone}</h3>
        </div>

        <div className="template__row">
          <label>Saved Address</label>
          <div className="band default">
            <div>{Object.values(user.defaultAddress).join(", ")}</div>
          </div>
          {renderSavedAddressList()}
        </div>

        <div className="template__row">
          <button onClick={onSignOutClick} className="button--l">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { signOutRedux })(Account);
