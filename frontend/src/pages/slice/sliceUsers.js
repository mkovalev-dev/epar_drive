import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  userLogin: null,
  userLoginStatus: "idle",
  userLoginError: null,

  checkLoginParams: false,
};

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (data, { rejectWithValue }) => {
    const response = await api.post("users/login/", { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const checkLogin = createAsyncThunk(
  "users/checkLogin",
  async (_, { rejectWithValue }) => {
    const response = await api.get("users/check-login/");
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const userLogout = createAsyncThunk(
  "users/userLogout",
  async (data, { rejectWithValue }) => {
    const response = await api.get("users/logout/", {});
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCheckLoginParams: (state, action) => {
      state.checkLoginParams = action.payload;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.userLoginStatus = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userLoginStatus = "succeeded";
      state.userLogin = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.userLoginStatus = "failed";
      state.userLoginError = action.payload.errors;
    },

    [checkLogin.pending]: (state) => {
      state.userLoginStatus = "loading";
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.userLoginStatus = "succeeded";
      state.userLogin = action.payload;
    },
    [checkLogin.rejected]: (state, action) => {
      state.userLoginStatus = "failed";
      state.userLoginError = action.payload.errors;
    },
  },
});

export default usersSlice.reducer;

export const userLoginData = (state) => state.users.userLogin;
export const userLoginStatusSelector = (state) => state.users.userLoginStatus;
export const userLoginError = (state) => state.users.userLoginError;

export const { setCheckLoginParams } = usersSlice.actions;
export const checkLoginParams = (state) => state.users.checkLoginParams;
