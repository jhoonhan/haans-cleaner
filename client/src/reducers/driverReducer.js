import _ from "lodash";
import {
  D_FETCH_ORDER,
  D_ACCEPT_ORDER,
  D_SET_COORDS,
  D_FETCH_ACCEPTED,
} from "../actions/types";

const reducer = (state = { fetched: false }, action) => {
  switch (action.type) {
    case D_FETCH_ORDER:
      return {
        ...state,
        fetched: true,
        orders: { ..._.mapKeys(action.payload, "id") },
      };
    case D_FETCH_ACCEPTED:
      return {
        ...state,
        fetched: true,
        orders: { ..._.mapKeys(action.payload, "id") },
      };
    case D_ACCEPT_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload.id]: action.payload },
      };
    case D_SET_COORDS:
      return { ...state, currentCoords: action.payload };

    default:
      return state;
  }
};

export default reducer;
//
