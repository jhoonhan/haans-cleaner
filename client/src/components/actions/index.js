import { formValues } from "redux-form";
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

export const signIn = (status) => {
  const type = status ? SIGN_IN : SIGN_OUT;
  return {
    type,
  };
};

export const fetchOrder = (id) => async (dispatch) => {
  const res = await server.get(`/order/${id}`);

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const fetchOrders = () => async (dispatch) => {
  const res = await server.get("/order");

  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const createOrder = (formValues) => async (dispatch, getState) => {
  // const {userId} = getState().auth;
  // const res = await server.post("/orders", {...formValues, userId});
  const res = await server.post("/orders", { ...formValues });

  dispatch({ type: CREATE_ORDER, payload: res.data });
};

export const editOrder = (id, formValues) => async (dispatch) => {
  const res = await server.put(`/order/${id}`, formValues);

  dispatch({ type: EDIT_ORDER, payload: res.data });
};

export const deleteOrder = (id) => async (dispatch) => {
  await server.put(`/order/${id}`);

  dispatch({ type: DELETE_ORDER, payload: id });
};

export const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};
