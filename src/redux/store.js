import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import productsReducer from "./products/productsSlice";
import productCategoriesReducer from "./productCategories/productCategoriesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    productCategories: productCategoriesReducer,
  },
});
