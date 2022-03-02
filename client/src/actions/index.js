import { formValues, reset } from "redux-form";
import history from "../history";
import server from "../apis/server";
import GoogleGeocode from "../apis/GoogleGeocode";
import { Loader } from "@googlemaps/js-api-loader";

import {
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
  D_ACCEPT_ORDER,
  D_COMPLETE_ORDER,
  D_FETCH_ACCEPTED,
  D_GET_COORDS,
  D_SET_COORDS,
  D_CANCEL_ORDER,
  D_SET_DISTANCE,
  D_SET_GEOCODE,
} from "./types";

// export const fetchGeocode = (address) => async (dispatch) => {
//   console.log(address);
//   const { street, city, zip } = address;
//   const queryStreet = street
//     .replace(/[^a-zA-Z0-9 ]/g, "")
//     .split(" ")
//     .join("+");
//   const queryCity = city
//     .replace(/[^a-zA-Z0-9 ]/g, "")
//     .split(" ")
//     .join("+");
//   const queryZip = zip;

//   const res = await GoogleGeocode.get(
//     `/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=${process.env.REACT_APP_GOOGLE_GEOCODING}`
//   );
//   const coords = res.data.results[0].geometry.location;
//   // dispatch({ type: D_GET_COORDS, payload: coords });

//   return coords;
// };
//
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

    const res = await server.post("/users", { ...combined });

    dispatch({ type: CREATE_USER, payload: res.data });
    history.push("/");
  };

export const fetchUser = (id) => async (dispatch, getState) => {
  const res = await server.get(`/users/?googleId=${id}`);
  dispatch({ type: FETCH_USER, payload: res.data[0] });
  // history.push("/");
};

export const editUser = (id, newValue) => async (dispatch) => {
  const res = await server.patch(`/users/${id}`, newValue);

  dispatch({ type: EDIT_USER, payload: res.data });
};
export const deleteUser = (id) => async (dispatch) => {
  await server.delete(`/users/${id}`);

  dispatch({ type: DELETE_USER, payload: id });
  history.push("/");
};

//
//
//
//////////////////// ORDER
export const fetchOrder = (id) => async (dispatch) => {
  const res = await server.get(`/orders/?googleId=${id}`);

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const fetchOrders = () => async (dispatch) => {
  const res = await server.get("/orders");

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const createOrder = (formValues) => async (dispatch, getState) => {
  const res1 = await server.post("/orders", { ...formValues });

  dispatch({ type: CREATE_ORDER, payload: res1.data });
  dispatch(reset("clothes"));
  dispatch(reset("pickup"));
  history.push("/");
};

export const editOrder = (id, formValues) => async (dispatch) => {
  const res = await server.patch(`/orders/${id}`, formValues);
  // console.log(`edit order fired`);
  dispatch({ type: EDIT_ORDER, payload: res.data });
};

export const cancelOrder = (id) => async (dispatch) => {
  await server.delete(`/orders/${id}`);

  dispatch({ type: CANCEL_ORDER, payload: id });
  // history.push("/order");
};

// Driver
export const driverFetchOrder = (date, coords) => async (dispatch) => {
  const res = await server.get(`/orders/?date=${date}`);

  dispatch({ type: D_FETCH_ORDER, payload: res.data });
};

export const driverFetchAccepted = (acceptId) => async (dispatch) => {
  const res = await server.get(`/orders/?acceptId=${acceptId}`);

  dispatch({ type: D_FETCH_ACCEPTED, payload: res.data });
};

export const acceptOrder = (orderId, data) => async (dispatch) => {
  const res = await server.get(`/orders/${orderId}`);

  if (res.data.status === "completed") {
    window.alert("error");
  }
  if (res.data.status === "submitted") {
    const res = await server.patch(`/orders/${orderId}`, data);
    dispatch({ type: D_ACCEPT_ORDER, payload: res.data });
  }

  if (res.data.status === "accepted" && res.data.acceptId === data.acceptId) {
    const res = await server.patch(`/orders/${orderId}`, {
      ...data,
      acceptId: null,
    });

    if (res.status !== 200) {
      console.error(`error`);
      return;
    }

    dispatch({
      type: D_CANCEL_ORDER,
      payload: { ...res.data, acceptId: null },
    });
  }
  if (res.data.status === "accepted" && res.data.acceptId !== data.acceptId) {
    window.alert(`order is accepted by other driver`);
  }
};

export const compeleteOrder = (orderId, data) => async (dispatch) => {
  const res = await server.get(`/orders/${orderId}`);

  if (res.data.acceptId !== data.acceptId) window.alert("error");

  if (res.data.acceptId === data.acceptId) {
    const res = await server.patch(`/orders/${orderId}`, {
      ...data,
      acceptId: data.acceptId,
    });

    if (res.status !== 200) {
      console.error(`error`);
      return;
    }

    dispatch({
      type: D_COMPLETE_ORDER,
      payload: { ...res.data, acceptId: data.id },
    });
  }
};

export const setCoordsAct = (coords) => (dispatch) => {
  dispatch({ type: D_SET_COORDS, payload: coords });
};

export const setDistance = (distance, id) => async (dispatch) => {
  console.log(`distance setter fired`);
  const res = await server.patch(`/orders/${id}`, { distance });
  dispatch({ type: D_SET_DISTANCE, payload: res.data });
};

export const setGeocode = (geocode, id) => (dispatch) => {
  dispatch({ type: D_SET_GEOCODE, payload: geocode });
};
