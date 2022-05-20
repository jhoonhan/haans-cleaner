import React from "react";

const fetchChecker = (props, required) => {
  if (!props.user.userFetched) {
    fetchUser(auth.userProfile.TW);
  }
  if (!props.drivers.orderFetched) {
    driverFetchOrder("2022-02-22");
  }
  if (props.user.userFetched && props.drivers.orderFetched) {
    setFetched(true);
  }

  return;
};

export default fetchChecker;
