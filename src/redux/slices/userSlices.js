import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  access_token: "",
  address: "",
  avatar: "",
  phone: "",
  id: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { email, name, token, address, avatar, phone, _id, isAdmin } =
        action.payload;
      state.name = name || email;
      state.email = email;
      state.access_token = token;
      state.address = address;
      state.avatar = avatar;
      state.phone = phone;
      state.id = _id;
      state.isAdmin = isAdmin;
    },
    resetUser: (state, action) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.address = "";
      state.avatar = "";
      state.phone = "";
      state.id = "";
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
