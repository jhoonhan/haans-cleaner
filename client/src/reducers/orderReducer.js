import _ from "lodash";
import {
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  EDIT_ORDER,
  CANCEL_ORDER,
  SIGN_OUT,
} from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case FETCH_ORDER:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_ORDERS:
      return { ...state, orders: action.payload };
    case CREATE_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case CANCEL_ORDER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
