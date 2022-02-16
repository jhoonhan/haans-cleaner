import { formValues } from "redux-form";
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
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from "./types";

//////////////// USER
export const signIn = ({ isSignedIn, userProfile }) => {
  const type = isSignedIn ? SIGN_IN : SIGN_OUT;
  return {
    type,
    payload: userProfile,
  };
};

export const createUser = (formValues) => async (dispatch, getState) => {
  // const {userId} = getState().auth;
  // const res = await server.post("/Users", {...formValues, userId});
  console.log(formValues);
  // const res = await server.post("/users", { ...formValues });
  const res = await server.post("/users", { wtf: "wtf" });

  dispatch({ type: CREATE_USER, payload: res.data });
  history.push("/");
};

//
//
//
//////////////////// ORDER
export const fetchOrder = (id) => async (dispatch) => {
  const res = await server.get(`/orders/${id}`);

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const fetchOrders = () => async (dispatch) => {
  const res = await server.get("/orders");

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const createOrder = (formValues) => async (dispatch, getState) => {
  // const {userId} = getState().auth;
  // const res = await server.post("/orders", {...formValues, userId});
  const res = await server.post("/orders", { ...formValues });

  dispatch({ type: CREATE_ORDER, payload: res.data });
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
