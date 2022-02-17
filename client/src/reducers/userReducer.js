import _ from "lodash";
import {
  FETCH_USER,
  LOGIN_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_USER:
      return { currentUser: action.payload };
    case LOGIN_USER:
      return { currentUser: action.payload };
    case EDIT_USER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_USER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
