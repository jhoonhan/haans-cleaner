import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";

const SavedAddressList = ({
  user,
  editUser,
  enableDelete,
  enableDefault,
  setSelected,
}) => {
  const [highlight, setHighlight] = useState({});

  useEffect(() => {
    if (user) {
      setHighlight(user?.defaultAddress);
    }
  }, [user]);

  const onSelect = (address) => {
    if (!enableDefault) {
      setHighlight(address);
      setSelected(address);
    }
    if (enableDefault) {
      editUser(user?.id, { defaultAddress: address });
    }
    return;
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

  const isDefault = (data, data2) => {
    if (
      data.street === data2.street &&
      data.city === data2.city &&
      data.zip === data2.zip
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredArr = () => {
    if (!user) return null;
    const result = user.savedAddress.reduce((address, i) => {
      const x = address.find(
        (el) => el.street === i.street && el.city === i.city && el.zip === i.zip
      );
      if (!x) {
        return address.concat([i]);
      } else {
        return address;
      }
    }, []);
    return result;
  };

  const renderList = () => {
    if (!user) return null;
    const result = filteredArr().map((address, i) => {
      const defaultCss =
        enableDefault && isDefault(address, user.defaultAddress)
          ? "default"
          : "";
      const highlightCss =
        !enableDefault && isDefault(address, highlight) ? "selected" : "";

      return (
        <div className={`band ${defaultCss} ${highlightCss}`} key={i}>
          <div onClick={() => onSelect(address)}>
            {Object.values(address).join(", ")}
          </div>
          {enableDelete ? (
            <div
              onClick={() => onClickDelete(address)}
              className={
                isDefault(address, user.defaultAddress)
                  ? "hidden"
                  : "band__delete"
              }
            >
              X
            </div>
          ) : null}
        </div>
      );
    });
    return result;
  };

  return <>{renderList()}</>;
};

const mapStateToProps = ({ auth, user }) => {
  return {
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, { editUser })(SavedAddressList);
