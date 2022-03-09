import { formValues, reset } from "redux-form";
import history from "../history";
import server from "../apis/server";
import GoogleGeocode from "../apis/GoogleGeocode";
import { Loader } from "@googlemaps/js-api-loader";

import {
  LOADING_TOGGLE_ACTION,
  SIGN_IN,
  SIGN_OUT,
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  EDIT_ORDER,
  CANCEL_ORDER,
  LOGIN_USER,
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  MOUNT_USER,
  EDIT_DADDRESS,
  D_FETCH_ORDER,
  D_CLEAR_ORDER,
  D_ACCEPT_ORDER,
  D_EDIT_ACCEPTED_ORDER,
  D_COMPLETE_ORDER,
  D_FETCH_ACCEPTED,
  D_GET_COORDS,
  D_SET_COORDS,
  D_CANCEL_ORDER,
  D_SET_DISTANCE,
  D_SET_GEOCODE,
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
  };

export const fetchUser = (googleId) => async (dispatch, getState) => {
  const res = await server.get(`/user/get/${googleId}`);
  dispatch({ type: FETCH_USER, payload: res.data.data[0] });
  // history.push("/");
  if (res.status === 200) console.log(`user fetched`);
};

export const editUser = (id, newValue) => async (dispatch) => {
  const res = await server.patch(`/user/${id}`, newValue);

  dispatch({ type: EDIT_USER, payload: res.data.data });
};
export const deleteUser = (id) => async (dispatch) => {
  await server.delete(`/user/${id}`);

  dispatch({ type: DELETE_USER, payload: id });
  history.push("/");
};

//
//
//
//////////////////// ORDER
export const fetchOrder = (googleId) => async (dispatch) => {
  const res = await server.get(`/order/get/${googleId}`);

  dispatch({ type: FETCH_ORDER, payload: res.data.data });
};

export const createOrder = (data) => async (dispatch, getState) => {
  const fn = async () => {
    const res = await server.post(`/order/geocode`, {
      ...data,
    });
    const res1 = await server.post("/order", { ...data, coords: res.data });
    return res1;
  };

  const res = await _loadingApiCall(fn, dispatch);

  if (res.status === 201) {
    dispatch({ type: CREATE_ORDER, payload: res.data.data.data });
  }

  if (res.status !== 201) {
    window.alert("error");
    return;
  }

  dispatch(reset("clothes"));
  dispatch(reset("pickup"));
  history.push("/");
  return res;
};

export const cancelOrder = (order, callback) => async (dispatch) => {
  const res = await _loadingApiCall(
    () => server.delete(`/order/delete/${order._id}`),
    dispatch
  );
  if (res.status === 200) {
    dispatch({ type: CANCEL_ORDER, payload: order._id });
  }
  if (res.status !== 200) {
    window.alert("error");
  }
  callback(false);
};

// Driver
export const driverFetchOrder = (query) => async (dispatch) => {
  const { acceptId, type, coords, selectedDate, pageNumber } = query;
  console.log(coords);
  const res = await server.get(
    `/order/driversearch/${type}/${acceptId}?date=${selectedDate}&page=${pageNumber}&limit=5`
  );
  if (res.status !== 200) {
    console.error(`error`);
    return;
  }

  dispatch({
    type: type === "search" ? D_FETCH_ORDER : D_FETCH_ACCEPTED,
    payload: res.data.data,
  });
  return res;
};

export const driverClearOrder = () => (dispatch) => {
  dispatch({ type: D_CLEAR_ORDER, payload: null });
};

export const driverEditAcceptedOrder = (dataObj, id) => async (dispatch) => {
  console.log(dataObj);
  const res = await server.patch(`/order/update/${id}`, dataObj);
  // console.log(`edit order fired`);
  dispatch({ type: D_EDIT_ACCEPTED_ORDER, payload: res.data.data });
};

export const driverAcceptOrder = (orderId, data) => async (dispatch) => {
  const res = await server.get(`/order/${orderId}`);

  if (res.data.data.status === "submitted") {
    const res = await server.patch(`/order/update/${orderId}`, data);
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

    dispatch({
      type: D_CANCEL_ORDER,
      payload: { ...res.data.data, acceptId: null },
    });
  }

  if (res.data.data.status === "completed") {
    window.alert("error");
  }
  if (
    res.data.status === "accepted" &&
    res.data.data.acceptId !== data.acceptId
  ) {
    window.alert(`order is accepted by other driver`);
  }
};

export const driverCompeleteOrder = (ids, data) => async (dispatch) => {
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
        `/user/completed/${customerId}/${driverId}`,
        data
      );

      if (res.status !== 200 || res1.status !== 200) {
        console.error(`error`);
        return null;
      }
      if (res.status === 200 && res1.status === 200) {
        return res;
      }
    }
  };

  const res = await _loadingApiCall(fn, dispatch);

  if (res.status === 200) {
    dispatch({
      type: D_COMPLETE_ORDER,
      payload: { ...res.data.data, acceptId: data.acceptId },
    });
  }
};

export const driverSetCoordsAct = (coords) => (dispatch) => {
  dispatch({ type: D_SET_COORDS, payload: coords });
};

export const getGeocode = (address, id) => async (dispatch) => {
  const res = await server.get(`/geocode/${id}`, address);
  console.log(res);
};
