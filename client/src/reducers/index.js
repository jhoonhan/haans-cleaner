import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import postReducer from "./postReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  posts: postReducer,
  users: usersReducer,
  form: formReducer,
});
