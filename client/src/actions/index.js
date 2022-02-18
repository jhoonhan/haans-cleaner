import { formValues, reset } from "redux-form";
import history from "../history";
import server from "../apis/server";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  LOGIN_USER,
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  MOUNT_USER,
} from "./types";

//////////////// USER
export const signIn = ({ isSignedIn, userProfile }) => {
  return {
    type: isSignedIn ? SIGN_IN : SIGN_OUT,
    payload: isSignedIn ? userProfile : {},
  };
};

export const mountUser = (user) => {
  console.log(`mountUser fired`);
  console.log(user);
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
  console.log(`user fetched`);
  // history.push("/");
};
//
//
//
//////////////////// ORDER
export const fetchOrder = (id) => async (dispatch) => {
  const res = await server.get(`/orders/?googleId=${id}`);

  dispatch({ type: FETCH_ORDER, payload: res.data });
  console.log(`order fetched`);
};

export const fetchOrders = () => async (dispatch) => {
  const res = await server.get("/orders");

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const createOrder = (formValues) => async (dispatch, getState) => {
  await server.post("/orders", { ...formValues });

  // dispatch({ type: CREATE_ORDER, payload: res.data });
  dispatch(reset("clothes"));
  history.push("/");
};

export const editOrder = (id, formValues) => async (dispatch) => {
  const res = await server.put(`/orders/${id}`, formValues);

  dispatch({ type: EDIT_ORDER, payload: res.data });
};

export const deleteOrder = (id) => async (dispatch) => {
  await server.put(`/orders/${id}`);

  dispatch({ type: DELETE_ORDER, payload: id });
};
