import _ from "lodash";
import {
  D_FETCH_ORDER,
  D_ACCEPT_ORDER,
  D_CANCEL_ORDER,
  D_SET_COORDS,
  D_FETCH_ACCEPTED,
  D_SET_DISTANCE,
} from "../actions/types";

const reducer = (
  state = {
    fetched: { searchOrder: false, acceptedOrder: false },
    acceptedOrders: {},
  },
  action
) => {
  switch (action.type) {
    case D_FETCH_ORDER:
      return {
        ...state,
        fetched: { ...state.fetched, searchOrder: true },
        orders: { ..._.mapKeys(action.payload, "id") },
      };
    case D_FETCH_ACCEPTED:
      return {
        ...state,
        fetched: { ...state.fetched, acceptedOrder: true },
        acceptedOrders: { ..._.mapKeys(action.payload, "id") },
      };
    case D_ACCEPT_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload.id]: action.payload },
        acceptedOrders: {
          ...state.acceptedOrders,
          [action.payload.id]: action.payload,
        },
      };
    case D_CANCEL_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload.id]: action.payload },
        acceptedOrders: _.omit(state.acceptedOrders, [action.payload.id]),
        // return _.omit(state, action.payload);
      };
    case D_SET_COORDS:
      return { ...state, currentCoords: action.payload };
    case D_SET_DISTANCE:
      return {
        ...state,
        acceptedOrders: {
          ...state.acceptedOrders,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
//
