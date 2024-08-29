import { createSlice } from "@reduxjs/toolkit";

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    items: [],
    lastFetch: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setProductCategories: (state, action) => {
      state.items = action.payload;
      state.lastFetch = new Date().toISOString();
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProductCategories, setLoading, setError } =
  productCategoriesSlice.actions;

const { reducer: productCategoriesReducer } = productCategoriesSlice;

export default productCategoriesReducer;
