import { CURRENT_PAGE } from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default reducer;
