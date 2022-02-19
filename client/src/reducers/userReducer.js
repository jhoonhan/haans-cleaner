import _ from "lodash";
import {
  FETCH_USER,
  LOGIN_USER,
  SIGN_OUT,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  MOUNT_USER,
} from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state, currentUser: null };
    case FETCH_USER:
      return { ...state, currentUser: action.payload };
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

    default:
      return state;
  }
};

export default reducer;
