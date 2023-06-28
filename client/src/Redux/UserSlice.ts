import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserResponceProps } from "../types/userInterfaces";
import { apiInterface } from "../api";
import { RegisterProps, LoginProps } from "../types/userInterfaces";

export const fetchRegister = createAsyncThunk<UserResponceProps, RegisterProps>(
  "user/fetchRegister",
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
  "user/fetchLogin",
  async (params) => {
    try {
      const response = apiInterface.auth.login(params);
      return response;
    } catch (err: any) {
      console.log(err);
    }
  }
);

export const fetchAuthMe = createAsyncThunk("user/fetchAuthMe", async () => {
  try {
    const response = apiInterface.auth.me();
    return response;
  } catch (err: any) {
    console.log(err);
  }
});

const initialState: UserResponceProps = {
  token: "",
  username: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logout() {
      window.localStorage.removeItem("token");
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

    builder.addCase(fetchAuthMe.pending, (state) => {});
    builder.addCase(fetchAuthMe.rejected, (state) => {});
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
