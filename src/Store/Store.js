import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/Slice/UserSlice";
import productReducer from "../Store/Slice/ProductSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
