import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  newFolderData: {},
  newFolderStatus: "idle",
  newFolderError: null,

  listFolderData: [],
  listFolderStatus: "idle",
  listFolderError: null,

  deleteFolderData: {},
  deleteFolderStatus: "idle",
  deleteFolderError: null,
};

export const folderCreate = createAsyncThunk(
  "folder/folderCreate",
  async (data, { rejectWithValue }) => {
    const response = await api.post("folder/create/", { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const folderList = createAsyncThunk(
  "folder/folderList",
  async (_, { rejectWithValue }) => {
    const response = await api.get("folder/list/");
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const folderDelete = createAsyncThunk(
  "folder/folderDelete",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(`folder/delete/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const folderRename = createAsyncThunk(
  "folder/folderCreate",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await api.put(`folder/rename/${id}/`, { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: {
    [folderCreate.pending]: (state) => {
      state.newFolderStatus = "loading";
    },
    [folderCreate.fulfilled]: (state, action) => {
      state.newFolderStatus = "succeeded";
      state.newFolderData = action.payload;
    },
    [folderCreate.rejected]: (state, action) => {
      state.newFolderStatus = "failed";
      state.newFolderError = action.payload.errors;
    },

    [folderList.pending]: (state) => {
      state.listFolderStatus = "loading";
    },
    [folderList.fulfilled]: (state, action) => {
      state.listFolderStatus = "succeeded";
      state.listFolderData = action.payload;
    },
    [folderList.rejected]: (state, action) => {
      state.listFolderStatus = "failed";
      state.listFolderError = action.payload.errors;
    },

    [folderDelete.pending]: (state) => {
      state.deleteFolderStatus = "loading";
    },
    [folderDelete.fulfilled]: (state, action) => {
      state.deleteFolderStatus = "succeeded";
      state.deleteFolderData = action.payload;
    },
    [folderDelete.rejected]: (state, action) => {
      state.deleteFolderStatus = "failed";
      state.deleteFolderError = action.payload.errors;
    },
  },
});

export default folderSlice.reducer;

export const newFolderData = (state) => state.folder.newFolderData;
export const newFolderStatus = (state) => state.folder.newFolderStatus;
export const newFolderError = (state) => state.folder.newFolderError;

export const listFolderData = (state) => state.folder.listFolderData;
export const listFolderStatus = (state) => state.folder.listFolderStatus;
export const listFolderError = (state) => state.folder.listFolderError;

export const deleteFolderData = (state) => state.folder.deleteFolderData;
export const deleteFolderStatus = (state) => state.folder.deleteFolderStatus;
export const deleteFolderError = (state) => state.folder.deleteFolderError;
