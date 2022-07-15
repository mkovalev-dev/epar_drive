import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  listFileData: [],
  listFileStatus: "idle",
  listFileError: null,

  listFileInFolderData: [],
  listFileInFolderStatus: "idle",
  listFileInFolderError: null,

  renameFileData: null,
  renameFileStatus: "idle",

  deleteFileData: {},
  deleteFileStatus: "idle",
  deleteFileError: null,

  listTrashFileData: [],
  listTrashFileStatus: "idle",
  listTrashFileError: null,

  retrieveFileData: null,
  retrieveFileStatus: "idle",
  retrieveFileError: null,

  drawerRetrieveFileData: null,
  drawerRetrieveFileStatus: "idle",
  drawerRetrieveFileError: null,
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

export const fileInFolderList = createAsyncThunk(
  "file/fileInFolderList",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`file/list/retrieve/${id}/`);
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

export const trashFileList = createAsyncThunk(
  "file/trashFileList",
  async (_, { rejectWithValue }) => {
    const response = await api.get("file/trash/");
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const retrieveFile = createAsyncThunk(
  "file/retrieveFile",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`file/retrieve/file/${id}/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const saveFile = createAsyncThunk(
  "file/retrieveFile",
  async ({ file, id }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.put(`file/save/${id}/`, {
      body: formData,
      timeout: false,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const drawerRetrieveFile = createAsyncThunk(
  "file/drawerRetrieveFile",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`file/drawer/retrieve/${id}/`);
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

    [fileInFolderList.pending]: (state) => {
      state.listFileInFolderStatus = "loading";
    },
    [fileInFolderList.fulfilled]: (state, action) => {
      state.listFileInFolderStatus = "succeeded";
      state.listFileInFolderData = action.payload;
    },
    [fileInFolderList.rejected]: (state, action) => {
      state.listFileInFolderStatus = "failed";
      state.listFileInFolderError = action.payload.errors;
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

    [trashFileList.pending]: (state) => {
      state.listTrashFileStatus = "loading";
    },
    [trashFileList.fulfilled]: (state, action) => {
      state.listTrashFileStatus = "succeeded";
      state.listTrashFileData = action.payload;
    },
    [trashFileList.rejected]: (state, action) => {
      state.listTrashFileStatus = "failed";
      state.listTrashFileError = action.payload.errors;
    },

    [retrieveFile.pending]: (state) => {
      state.retrieveFileStatus = "loading";
    },
    [retrieveFile.fulfilled]: (state, action) => {
      state.retrieveFileStatus = "succeeded";
      state.retrieveFileData = action.payload;
    },
    [retrieveFile.rejected]: (state, action) => {
      state.retrieveFileStatus = "failed";
      state.retrieveFileError = action.payload.errors;
    },

    [drawerRetrieveFile.pending]: (state) => {
      state.drawerRetrieveFileStatus = "loading";
    },
    [drawerRetrieveFile.fulfilled]: (state, action) => {
      state.drawerRetrieveFileStatus = "succeeded";
      state.drawerRetrieveFileData = action.payload;
    },
    [drawerRetrieveFile.rejected]: (state, action) => {
      state.drawerRetrieveFileStatus = "failed";
      state.drawerRetrieveFileError = action.payload.errors;
    },
  },
});

export default fileSlice.reducer;

export const listFileData = (state) => state.file.listFileData;
export const listFileStatus = (state) => state.file.listFileStatus;
export const listFileError = (state) => state.file.listFileError;

export const listFileInFolderData = (state) => state.file.listFileInFolderData;
export const listFileInFolderStatus = (state) =>
  state.file.listFileInFolderStatus;
export const listFileInFolderError = (state) =>
  state.file.listFileInFolderError;

export const { setUploadFileChanger } = fileSlice.actions;
export const uploadFileChanger = (state) => state.file.uploadFileChanger;

export const renameFileData = (state) => state.file.renameFileData;
export const renameFileStatus = (state) => state.file.renameFileStatus;

export const deleteFileData = (state) => state.file.deleteFileData;
export const deleteFileStatus = (state) => state.file.deleteFileStatus;
export const deleteFileError = (state) => state.file.deleteFileError;

export const listTrashFileData = (state) => state.file.listTrashFileData;
export const listTrashFileStatus = (state) => state.file.listTrashFileStatus;
export const listTrashFileError = (state) => state.file.listTrashFileError;

export const retrieveFileData = (state) => state.file.retrieveFileData;
export const retrieveFileStatus = (state) => state.file.retrieveFileStatus;
export const retrieveFileError = (state) => state.file.retrieveFileError;

export const drawerRetrieveFileData = (state) =>
  state.file.drawerRetrieveFileData;
export const drawerRetrieveFileStatus = (state) =>
  state.file.drawerRetrieveFileStatus;
export const drawerRetrieveFileError = (state) =>
  state.file.drawerRetrieveFileError;
