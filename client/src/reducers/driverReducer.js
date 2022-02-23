import _ from "lodash";
import { D_FETCH_ORDER, D_ACCEPT_ORDER, D_SET_COORDS } from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case D_FETCH_ORDER:
      return { ...state, orders: { ..._.mapKeys(action.payload, "id") } };
    // return [...state, ...action.payload];
    case D_ACCEPT_ORDER:
      return { ...state, orders: { [action.payload.id]: action.payload } };
    case D_SET_COORDS:
      return { ...state, currentCoords: action.payload };

    default:
      return state;
  }
};

export default reducer;
//
