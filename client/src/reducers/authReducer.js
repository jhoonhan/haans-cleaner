import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userProfile: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userProfile: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userProfile: {} };

    default:
      return state;
  }
};

export default reducer;
