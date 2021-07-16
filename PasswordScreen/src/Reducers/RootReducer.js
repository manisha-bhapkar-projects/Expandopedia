import { combineReducers } from "redux";
// import addUser from "../modules/addUserSetup";
const appReducer = combineReducers({
  // addUser
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
