import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import driverReducer from "./driverReducer";
import loadReducer from "./loadReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: orderReducer,
  form: formReducer,
  driver: driverReducer,
  loader: loadReducer,
  error: errorReducer,
});
