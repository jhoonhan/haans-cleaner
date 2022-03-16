import _ from "lodash";
import {
  FETCH_USER,
  LOGIN_USER,
  SIGN_OUT,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  MOUNT_USER,
  D_GET_COORDS,
  CREATE_ORDER,
  CANCEL_USER_ORDER,
} from "../actions/types";

const reducer = (state = { fetched: false, currentUser: null }, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state, currentUser: null };
    case FETCH_USER:
      return { ...state, currentUser: action.payload, fetched: true };
    case MOUNT_USER:
      return { ...state, currentUser: action.payload };
    case CREATE_USER:
      return { ...state, currentUser: action.payload };
    case LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case EDIT_USER:
      return { ...state, currentUser: action.payload };
    case DELETE_USER:
      return _.omit(state, action.payload);
    case D_GET_COORDS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          defaultAddress: {
            ...state.currentUser.defaultAddress,
            coords: action.payload,
          },
        },
      };
    case CREATE_ORDER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          orders: [...state.currentUser.orders, action.payload],
        },
      };
    case CANCEL_USER_ORDER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          orders: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
