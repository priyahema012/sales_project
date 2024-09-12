
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from '../configs/RootReducer'; 

export const store = configureStore({ reducer: rootReducers });
