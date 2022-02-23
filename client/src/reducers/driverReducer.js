import _ from "lodash";
import { D_FETCH_ORDER, D_ACCEPT_ORDER } from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case D_FETCH_ORDER:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // return [...state, ...action.payload];
    case D_ACCEPT_ORDER:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};

export default reducer;
//
