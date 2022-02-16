import { formValues } from "redux-form";
import server from "../apis/server";

export const fetchUser = () => {
  return {
    type: "FETCH_USER",
  };
};

export const createOrder = (formValues) => async (dispatch) => {
  server.post("/orders", formValues);
};
