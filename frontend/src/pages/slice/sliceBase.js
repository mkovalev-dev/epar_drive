import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  activeMenuItem: { id: "files" },
  activeFolderItem: {},
  activeDrawerItem: { visible: false },
};

export const userSharedPermission = createAsyncThunk(
  "base/userSharedPermission",
  async (data, { rejectWithValue }) => {
    const response = await api.post("base/create/user/share/permission/", {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const userSharedPermissionDestroy = createAsyncThunk(
  "base/userSharedPermissionDestroy",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(
      `base/create/user/share/permission/${id}`,
      {}
    );
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setActiveMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    setActiveFolderItem: (state, action) => {
      state.activeFolderItem = action.payload;
    },
    setActiveDrawerItem: (state, action) => {
      state.activeDrawerItem = action.payload;
    },
  },
  extraReducers: {},
});

export default baseSlice.reducer;

export const { setActiveMenuItem } = baseSlice.actions;
export const activeMenuItem = (state) => state.base.activeMenuItem;

export const { setActiveFolderItem } = baseSlice.actions;
export const activeFolderItem = (state) => state.base.activeFolderItem;

export const { setActiveDrawerItem } = baseSlice.actions;
export const activeDrawerItem = (state) => state.base.activeDrawerItem;
