import React from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";

const SavedAddressList = ({ user, editUser }) => {
  const onClickDefault = (address) => {
    editUser(user?.id, { defaultAddress: address });
  };
  const onClickDelete = (address) => {
    const filteredArr = user.savedAddress.filter((el) => {
      return (
        el.street !== address.street ||
        el.city !== address.city ||
        el.zip !== address.zip
      );
    });
    editUser(user?.id, { savedAddress: filteredArr });
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
    const isDefault = () => {
      if (
        address.street === user.defaultAddress.street &&
        address.city === user.defaultAddress.city &&
        address.zip === user.defaultAddress.zip
      ) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <div className={`band ${defaultCss}`} key={i}>
        <div onClick={() => onClickDefault(address)}>
          {Object.values(address).join(", ")}
        </div>
        <div
          onClick={() => onClickDelete(address)}
          className={isDefault() ? "hidden" : "band__delete"}
        >
          X
        </div>
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
