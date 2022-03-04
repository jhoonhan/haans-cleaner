import { LOADING_TOGGLE_ACTION } from "../actions/types";

const INITIAL_STATE = {
  showLoader: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_TOGGLE_ACTION:
      return { ...state, showLoader: action.payload };
    default:
      return state;
  }
};

export default reducer;
