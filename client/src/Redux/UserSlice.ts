import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserResponceProps } from "../types/userInterfaces";
import { apiInterface } from "../api";
import { RegisterProps, LoginProps } from "../types/userInterfaces";

export const fetchRegister = createAsyncThunk<UserResponceProps, RegisterProps>(
  "quiz/fetchRegister",
  async (params) => {
    try {
      const response = apiInterface.auth.register(params);
      return response;
    } catch (err: any) {
      console.log(err);
    }
  }
);

export const fetchLogin = createAsyncThunk<UserResponceProps, LoginProps>(
  "quiz/fetchLogin",
  async (params) => {
    try {
      const response = apiInterface.auth.login(params);
      return response;
    } catch (err: any) {
      console.log(err);
    }
  }
);

const initialState: UserResponceProps = {
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
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {});
    builder.addCase(fetchRegister.rejected, (state) => {});
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(fetchLogin.pending, (state) => {});
    builder.addCase(fetchLogin.rejected, (state) => {});
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
