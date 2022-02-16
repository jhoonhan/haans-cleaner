import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  auth: authReducer,
  users: userReducer,
  orders: orderReducer,
  form: formReducer,
});
