import _ from "lodash";
import {
  D_FETCH_ORDER,
  D_ACCEPT_ORDER,
  D_COMPLETE_ORDER,
  D_CANCEL_ORDER,
  D_SET_COORDS,
  D_FETCH_ACCEPTED,
  D_SET_DISTANCE,
  D_EDIT_ORDER,
  D_EDIT_ACCEPTED_ORDER,
  D_CLEAR_ORDER,
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
        orders: { ...state.orders, ..._.mapKeys(action.payload, "_id") },
      };
    case D_FETCH_ACCEPTED:
      return {
        ...state,
        fetched: { ...state.fetched, acceptedOrder: true },
        acceptedOrders: {
          ...state.acceptedOrders,
          ..._.mapKeys(action.payload, "_id"),
        },
      };
    case D_CLEAR_ORDER:
      return {
        ...state,
        fetched: { searchOrder: false, acceptedOrder: false },
        orders: null,
        acceptedOrders: null,
      };
    case D_EDIT_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.payload._id]: action.payload,
        },
      };
    case D_EDIT_ACCEPTED_ORDER:
      return {
        ...state,
        acceptedOrder: {
          ...state.acceptedOrders,
          [action.payload._id]: action.payload,
        },
      };
    case D_SET_DISTANCE:
      return {
        ...state,
        acceptedOrders: {
          ...state.acceptedOrders,
          [action.payload._id]: action.payload,
        },
      };

    case D_ACCEPT_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload._id]: action.payload },
        acceptedOrders: {
          ...state.acceptedOrders,
          [action.payload._id]: action.payload,
        },
      };
    case D_COMPLETE_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload._id]: action.payload },
        acceptedOrders: {
          ...state.acceptedOrders,
          [action.payload._id]: action.payload,
        },
      };
    case D_CANCEL_ORDER:
      return {
        ...state,
        orders: { ...state.orders, [action.payload._id]: action.payload },
        acceptedOrders: _.omit(state.acceptedOrders, [action.payload._id]),
        // return _.omit(state, action.payload);
      };
    case D_SET_COORDS:
      return { ...state, currentCoords: action.payload };

    default:
      return state;
  }
};

export default reducer;
//
