import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      const { search } = action.payload;
      state.search = search;
    },
  },
});

export const { updateSearch } = productSlice.actions;

export default productSlice.reducer;
