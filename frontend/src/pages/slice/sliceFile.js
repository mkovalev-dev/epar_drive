import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  listFileData: [],
  listFileStatus: "idle",
  listFileError: null,
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
  },
});

export default fileSlice.reducer;

export const listFileData = (state) => state.file.listFileData;
export const listFileStatus = (state) => state.file.listFileStatus;
export const listFileError = (state) => state.file.listFileError;

export const { setUploadFileChanger } = fileSlice.actions;
export const uploadFileChanger = (state) => state.file.uploadFileChanger;
