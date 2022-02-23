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
  D_GET_COORDS,
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
  const coords = await fetchGeocode(formValues);
  formValues.coords = { lat: coords.lat, lng: coords.lng };

  const res = await server.post("/orders", { ...formValues });

  dispatch({ type: CREATE_ORDER, payload: res.data });
  dispatch(reset("clothes"));
  dispatch(reset("pickup"));
  history.push("/");
};

export const editOrder = (id, formValues) => async (dispatch) => {
  const res = await server.patch(`/orders/${id}`, formValues);
  console.log(`edit order fired`);
  dispatch({ type: EDIT_ORDER, payload: res.data });
};

export const cancelOrder = (id) => async (dispatch) => {
  await server.delete(`/orders/${id}`);

  dispatch({ type: CANCEL_ORDER, payload: id });
  // history.push("/order");
};

// Driver
export const driverFetchOrder = (date, coords) => async (dispatch) => {
  const res = await server.get(`/orders/?date=${date}&status=submitted`);

  dispatch({ type: D_FETCH_ORDER, payload: res.data });
};

export const acceptOrder = (orderId, data) => async (dispatch) => {
  const res = await server.get(`/orders/${orderId}`);
  console.log(data.acceptId);

  if (res.data.status === "submitted") {
    console.log(`yes`);
    const res = await server.patch(`/orders/${orderId}`, data);
    dispatch({ type: D_ACCEPT_ORDER, payload: res.data });
  }

  if (res.data.status === "accepted" && res.data.acceptId === data.acceptId) {
    console.log(`yes`);
    const res = await server.patch(`/orders/${orderId}`, {
      ...data,
      acceptId: null,
    });
    dispatch({
      type: D_ACCEPT_ORDER,
      payload: { ...res.data, acceptId: null },
    });
  }
};

export const fetchGeocode = (address) => async (dispatch) => {
  const { street, city, zip } = address;
  const queryStreet = street
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("+");
  const queryCity = city
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("+");
  const queryZip = zip;

  const res = await GoogleGeocode.get(
    `/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=${process.env.REACT_APP_GOOGLE_GEOCODING}`
  );
  const coords = res.data.results[0].geometry.location;
  // dispatch({ type: D_GET_COORDS, payload: coords });

  return coords;
};

export const loadMap = (date, fetchOrder, initMap) => async (dispatch) => {
  if (fetchOrder) {
    const res = await server.get(`/orders/?date=2022-02-22&status=submitted`);
    dispatch({ type: D_FETCH_ORDER, payload: res.data });
  }

  const loader = new Loader({
    apiKey: "AIzaSyAWOwdj0u40d-mjuGT-P4Z2JTMEgbdzfU8",
    version: "weekly",
  });

  loader
    .load()
    .then((google) => {
      initMap(google);
    })
    .catch((e) => {
      // do something
    });
};

// export const fetchDistanceMatrix = async ({ origin, destination }) => {
//   const convertAddress = (address) => {
//     // 2835 Fallin ct High Point 27262
//     console.log(`aang`);
//     const street = address.street.replaceAll(" ", "%20");
//     const city = address.city.replaceAll(" ", "%20");
//     const combined = `${street}+${city}+${address.zip}`;
//     return combined;
//   };

//   const queryOrigin = convertAddress(origin);
//   const queryDestination = convertAddress(destination);

//   const res = await GoogleGeocode.get(
//     `/distancematrix/json?destinations=${queryOrigin}&origins=${queryDestination}&units=imperial&key=${process.env.REACT_APP_GOOGLE_GEOCODING}`
//   );

//   console.log(res.data);
// };
