import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  listFileData: [],
  listFileStatus: "idle",
  listFileError: null,

  renameFileData: null,
  renameFileStatus: "idle",

  deleteFileData: {},
  deleteFileStatus: "idle",
  deleteFileError: null,
};

export const fileList = createAsyncThunk(
  "file/folderList",
  async (_, { rejectWithValue }) => {
    const response = await api.get("file/list/");
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const fileRename = createAsyncThunk(
  "file/fileRename",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await api.put(`file/rename/${id}/`, { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const fileDelete = createAsyncThunk(
  "file/fileDelete",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(`file/delete/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const fileHardDelete = createAsyncThunk(
  "file/fileHardDelete",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(`file/hard-delete/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadFileChanger: (state, action) => {
      state.uploadFileChanger = action.payload;
    },
  },
  extraReducers: {
    [fileList.pending]: (state) => {
      state.listFileStatus = "loading";
    },
    [fileList.fulfilled]: (state, action) => {
      state.listFileStatus = "succeeded";
      state.listFileData = action.payload;
    },
    [fileList.rejected]: (state, action) => {
      state.listFileStatus = "failed";
      state.listFileError = action.payload.errors;
    },

    [fileRename.fulfilled]: (state, action) => {
      state.renameFileStatus = "succeeded";
      state.renameFileData = action.payload;
    },

    [fileDelete.pending]: (state) => {
      state.deleteFileStatus = "loading";
    },
    [fileDelete.fulfilled]: (state, action) => {
      state.deleteFileStatus = "succeeded";
      state.deleteFileData = action.payload;
    },
    [fileDelete.rejected]: (state, action) => {
      state.deleteFileStatus = "failed";
      state.deleteFileError = action.payload.errors;
    },
  },
});

export default fileSlice.reducer;

export const listFileData = (state) => state.file.listFileData;
export const listFileStatus = (state) => state.file.listFileStatus;
export const listFileError = (state) => state.file.listFileError;

export const { setUploadFileChanger } = fileSlice.actions;
export const uploadFileChanger = (state) => state.file.uploadFileChanger;

export const renameFileData = (state) => state.file.renameFileData;
export const renameFileStatus = (state) => state.file.renameFileStatus;

export const deleteFileData = (state) => state.file.deleteFileData;
export const deleteFileStatus = (state) => state.file.deleteFileStatus;
export const deleteFileError = (state) => state.file.deleteFileError;
