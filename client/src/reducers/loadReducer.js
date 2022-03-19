import { LOADING_TOGGLE_ACTION, LEAK } from "../actions/types";

const INITIAL_STATE = {
  showLoader: false,
  leak: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_TOGGLE_ACTION:
      return { ...state, showLoader: action.payload };
    case LEAK:
      return { ...state, leak: action.payload };
    default:
      return state;
  }
};

export default reducer;
