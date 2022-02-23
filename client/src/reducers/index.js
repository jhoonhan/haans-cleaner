import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import driverReducer from "./driverReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: orderReducer,
  form: formReducer,
  driver: driverReducer,
});
