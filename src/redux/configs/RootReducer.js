
import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from '../reducers/AuthReducer';

const rootReducers = combineReducers({
  auth: AuthReducer
});

export default rootReducers;
