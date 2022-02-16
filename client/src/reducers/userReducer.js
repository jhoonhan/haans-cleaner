import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from "../components/actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER:
      return [...state, action.payload];
    case FETCH_USERS:
      return [...state, action.payload];
    case CREATE_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
