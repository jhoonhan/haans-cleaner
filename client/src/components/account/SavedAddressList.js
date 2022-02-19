import React from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";

const SavedAddressList = ({ user, editUser }) => {
  const onClickDefault = (address) => {
    editUser(user?.id, { defaultAddress: address });
  };
  const filteredArr = user.savedAddress.reduce((address, i) => {
    const x = address.find(
      (el) => el.street === i.street && el.city === i.city && el.zip === i.zip
    );
    if (!x) {
      return address.concat([i]);
    } else {
      return address;
    }
  }, []);

  return filteredArr.map((address, i) => {
    const defaultCss =
      address.street === user.defaultAddress.street &&
      address.city === user.defaultAddress.city &&
      address.zip === user.defaultAddress.zip
        ? "default"
        : "";

    return (
      <div
        onClick={() => onClickDefault(address)}
        className={`band ${defaultCss}`}
        key={i}
      >
        <div>{Object.values(address).join(", ")}</div>
      </div>
    );
  });
};

const mapStateToProps = ({ auth, user }) => {
  return {
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { editUser })(SavedAddressList);
