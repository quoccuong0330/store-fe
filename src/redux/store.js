import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import productReducer from "./slices/productSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
