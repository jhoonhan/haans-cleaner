import { ERROR_HTTP } from "../actions/types";

const reducer = (state = { hasError: false, data: {} }, action) => {
  switch (action.type) {
    case ERROR_HTTP:
      return { ...state, hasError: true, type: "http", data: action.payload };
    default:
      return state;
  }
};

export default reducer;
