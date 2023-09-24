import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import authReducer, { login } from "./authSlice";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user-hunger"));

const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: userFromLocalStorage,
    },
  },
});

if(userFromLocalStorage){
  store.dispatch(login(userFromLocalStorage))
}

export default store;
