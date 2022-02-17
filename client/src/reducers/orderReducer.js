import _ from "lodash";
import {
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
} from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATE_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ORDER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
