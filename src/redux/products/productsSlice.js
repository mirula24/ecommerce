import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },

    addProduct: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },

    editProduct: (state, action) => {
      const product = action.payload;
      state.items = state.items.map((productItem) =>
        productItem === product.id ? product : productItem
      );
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setError, addProduct, editProduct, setLoading } =
  productsSlice.actions;

const { reducer: productsReducer } = productsSlice;

export default productsReducer;
