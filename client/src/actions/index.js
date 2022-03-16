import { formValues, reset } from "redux-form";
import history from "../history";
import server from "../apis/server";

import {
  LOADING_TOGGLE_ACTION,
  SIGN_IN,
  SIGN_OUT,
  FETCH_ORDER,
  CREATE_ORDER,
  CANCEL_ORDER,
  FETCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  CANCEL_USER_ORDER,
  MOUNT_USER,
  D_FETCH_ORDER,
  D_CLEAR_ORDER,
  D_ACCEPT_ORDER,
  D_EDIT_ACCEPTED_ORDER,
  D_COMPLETE_ORDER,
  D_FETCH_ACCEPTED,
  D_SET_COORDS,
  D_CANCEL_ORDER,
  ERROR_HTTP,
} from "./types";

/// Helpers
const _loadingApiCall = async (fn, dispatch) => {
  dispatch({ type: LOADING_TOGGLE_ACTION, payload: true });
  const res = await fn();
  dispatch({ type: LOADING_TOGGLE_ACTION, payload: false });
  return res;
};

/// GLobal

export const loadingToggleAction = (status) => {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
};

//////////////// USER
export const signIn = ({ isSignedIn, userProfile }) => {
  return {
    type: isSignedIn ? SIGN_IN : SIGN_OUT,
    payload: isSignedIn ? userProfile : {},
  };
};

export const signOutRedux = () => {
  history.push("/");
  return {
    type: SIGN_OUT,
    payload: {},
  };
};

export const mountUser = (user) => {
  return {
    type: MOUNT_USER,
    payload: user,
  };
};

export const createUser =
  (formValues, googleId) => async (dispatch, getState) => {
    try {
      const { firstName, lastName, street, city, zip } = formValues;
      const combinedAddress = { street, city, zip };
      const combined = {
        ...formValues,
        googleId,
        fullName: `${firstName} ${lastName}`,
        defaultAddress: combinedAddress,
        savedAddress: [combinedAddress],
      };

      const res = await server.post("/user", { ...combined });

      dispatch({ type: CREATE_USER, payload: res.data.data.data });
      history.push("/");
    } catch (error) {
      console.error(error);
      dispatch({ type: ERROR_HTTP, error });
    }
  };

export const fetchUser = (googleId) => async (dispatch, getState) => {
  try {
    const res = await server.get(`/user/get/${googleId}`);
    dispatch({ type: FETCH_USER, payload: res.data.data[0] });
    // history.push("/");
    console.log(`user fetched`);
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const editUser = (id, newValue) => async (dispatch) => {
  try {
    const res = await server.patch(`/user/${id}`, newValue);
    dispatch({ type: EDIT_USER, payload: res.data.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    await server.delete(`/user/${id}`);

    dispatch({ type: DELETE_USER, payload: id });
    history.push("/");
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};
//
//////////////////// ORDER
export const fetchOrder = (googleId) => async (dispatch) => {
  try {
    const res = await server.get(`/user/order/${googleId}`);
    console.log(res.data.data);

    dispatch({ type: FETCH_ORDER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const createOrder = (data) => async (dispatch, getState) => {
  try {
    const fn = async () => {
      const res = await server.post(`/order/geocode`, {
        ...data,
      });
      const res1 = await server.post("/order", { ...data, coords: res.data });

      await server.patch(`/user/order/${data.userId}`, res1.data.data.data);

      return res1;
    };

    const res = await _loadingApiCall(fn, dispatch);

    dispatch({ type: CREATE_ORDER, payload: res.data.data.data });
    dispatch(reset("clothes"));
    dispatch(reset("pickup"));

    history.push("/");
    return res;
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const cancelOrder = (order, callback) => async (dispatch, getState) => {
  try {
    const fn = async () => {
      const res = await server.delete(`/order/delete/${order._id}`);
      const res1 = await server.patch(
        `user/delete/${order.userId}/${order._id}`
      );
      return [res, res1];
    };

    const orders = getState().user.currentUser.orders.filter(
      (orderEl) => orderEl._id !== order._id
    );
    const res = await _loadingApiCall(fn, dispatch);

    if (res[0].status === 200 && res[1].status === 200) {
      dispatch({ type: CANCEL_USER_ORDER, payload: orders });
      dispatch({ type: CANCEL_ORDER, payload: order._id });
    }

    callback(false);
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

// Driver
export const driverFetchOrder = (query) => async (dispatch) => {
  try {
    const { acceptId, type, coords, selectedDate, pageNumber } = query;
    const res = await server.get(
      `/order/driversearch/${type}/${acceptId}?lat=${coords.lat}&lng=${coords.lng}&date=${selectedDate}&page=${pageNumber}&limit=5`
    );
    dispatch({
      type: D_FETCH_ORDER,
      payload: res.data.data,
    });
    return res;
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const driverFetchAccepted =
  (acceptId, selectedDate, coords) => async (dispatch) => {
    try {
      const res = await server.get(
        `/order/driversearch/accepted/${acceptId}?lat=${coords.lat}&lng=${coords.lng}&date=${selectedDate}`
      );

      dispatch({
        type: D_FETCH_ACCEPTED,
        payload: res.data.data,
      });
      return res;
    } catch (error) {
      console.error(error);
      console.log(`aaang`);
      dispatch({ type: ERROR_HTTP, payload: error });
    }
  };

export const driverClearOrder = () => (dispatch) => {
  dispatch({ type: D_CLEAR_ORDER, payload: null });
};

// export const driverEditAcceptedOrder = (dataObj, id) => async (dispatch) => {
//   try {
//     const res = await server.patch(`/order/update/${id}`, dataObj);
//     // console.log(`edit order fired`);
//     dispatch({ type: D_EDIT_ACCEPTED_ORDER, payload: res.data.data });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const driverAcceptOrder = (ids, data) => async (dispatch) => {
  try {
    const { orderId, driverId, customerId } = ids;
    const res = await server.get(`/order/${orderId}`);

    if (res.data.data.status === "submitted") {
      const res = await server.patch(`/order/update/${orderId}`, data);
      await server.patch(
        `/user/update/accepted/${customerId}/${driverId}/${orderId}`,
        data
      );
      dispatch({ type: D_ACCEPT_ORDER, payload: res.data.data });
    }

    if (
      res.data.data.status === "accepted" &&
      res.data.data.acceptId === data.acceptId
    ) {
      const res = await server.patch(`/order/update/${orderId}`, {
        ...data,
        acceptId: null,
        acceptDate: null,
      });
      await server.patch(
        `/user/update/submitted/${customerId}/${driverId}/${orderId}`,
        data
      );
      dispatch({
        type: D_CANCEL_ORDER,
        payload: { ...res.data.data, acceptId: null },
      });
    }
    //
    if (res.data.data.status === "completed") {
      window.alert("error");
    }
    if (
      res.data.status === "accepted" &&
      res.data.data.acceptId !== data.acceptId
    ) {
      window.alert(`order is accepted by other driver`);
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const driverCompeleteOrder = (ids, data) => async (dispatch) => {
  try {
    const { orderId, driverId, customerId } = ids;
    const fn = async () => {
      const res = await server.get(`/order/${orderId}`);
      if (res.data.data.acceptId !== data.acceptId) {
        window.alert("The order was completed or accepted by other");
        return { status: 404 };
      }
      if (res.data.data.acceptId === data.acceptId) {
        const res = await server.patch(`/order/update/${orderId}`, {
          ...data,
          acceptId: data.acceptId,
        });
        const res1 = await server.patch(
          `/user/update/completed/${customerId}/${driverId}/${orderId}`,
          data
        );
        if (res.status === 200 && res1.status === 200) {
          return res;
        }
      }
    };

    const res = await _loadingApiCall(fn, dispatch);

    dispatch({
      type: D_COMPLETE_ORDER,
      payload: { ...res.data.data, acceptId: data.acceptId },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_HTTP, error });
  }
};

export const driverSetCoords = (coords) => (dispatch) => {
  dispatch({ type: D_SET_COORDS, payload: coords });
};

export const getGeocode = (address, id) => async (dispatch) => {
  const res = await server.get(`/geocode/${id}`, address);
  console.log(res);
};

export const getDistance = (address, id) => async (dispatch) => {
  const res = await server.get(`/geocode/${id}`, address);
  console.log(res);
};
