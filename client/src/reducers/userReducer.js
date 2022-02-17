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
  console.log(action.payload);
  switch (action.type) {
    case SIGN_OUT:
      console.log(`singOUt reducer fired`);
      return { currentUser: null };
    case FETCH_USER:
      console.log(`fetchUser reducer fired`);
      return { currentUser: action.payload };
    case MOUNT_USER:
      console.log(`mountUser reducer fired`);
      return { currentUser: action.payload };
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
