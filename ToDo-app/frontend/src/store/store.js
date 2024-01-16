// Configure the Redux store using the provided root reducer
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// To configure the Redux store using the provided root reducer
const store = configureStore({
  reducer: rootReducer, // To set the root reducer to manage the store state
});

export default store;
