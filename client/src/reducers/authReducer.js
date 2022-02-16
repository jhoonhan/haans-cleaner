import { SIGN_IN, SIGN_OUT } from "../components/actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };

    default:
      return state;
  }
};

export default reducer;
