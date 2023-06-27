import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserResponce } from "../types/user";

const initialState: UserResponce = {
  token: "",
  username: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logout(state) {
      return initialState;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
