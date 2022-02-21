import _ from "lodash";
import { D_FETCH_ORDER } from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case D_FETCH_ORDER:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default reducer;
//
