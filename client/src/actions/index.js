import { formValues, reset } from "redux-form";
import history from "../history";
import server from "../apis/server";
import fetchCoords from "../components/helpers/fetchCoords";
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
} from "./types";

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

export const createUser = (formValues) => async (dispatch, getState) => {
  const res = await server.post("/users", { ...formValues });

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
  const coords = await fetchCoords(formValues);
  formValues.coords = { lat: coords.lat, lng: coords.lng };

  const res = await server.post("/orders", { ...formValues });

  dispatch({ type: CREATE_ORDER, payload: res.data });
  dispatch(reset("clothes"));
  dispatch(reset("pickup"));
  history.push("/");
};

export const editOrder = (id, formValues) => async (dispatch) => {
  const res = await server.put(`/orders/${id}`, formValues);

  dispatch({ type: EDIT_ORDER, payload: res.data });
};

export const cancelOrder = (id) => async (dispatch) => {
  await server.delete(`/orders/${id}`);

  dispatch({ type: CANCEL_ORDER, payload: id });
  // history.push("/order");
};

// misc

// https://maps.googleapis.com/maps/api/geocode/json?address=2835+Fallin+ct,+High+Point,+27262&key=AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8

// Driver
export const driverFetchOrder = (date, coords) => async (dispatch) => {
  const res = await server.get(`/orders/?date=${date}`);

  dispatch({ type: D_FETCH_ORDER, payload: res.data });
};
