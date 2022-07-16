import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  newFolderData: {},
  newFolderStatus: "idle",
  newFolderError: null,

  listFolderData: [],
  listFolderStatus: "idle",
  listFolderError: null,

  listFolderRetrieveData: [],
  listFolderRetrieveStatus: "idle",
  listFolderRetrieveError: null,

  deleteFolderData: {},
  deleteFolderStatus: "idle",
  deleteFolderError: null,

  listTrashFolderData: [],
  listTrashFolderStatus: "idle",
  listTrashFolderError: null,

  headerFolderData: {},
  headerFolderStatus: "idle",
  headerFolderError: null,
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

export const folderRetrieveList = createAsyncThunk(
  "folder/folderRetrieveList",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`folder/list/retrieve/${id}/`);
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

export const trashFolderList = createAsyncThunk(
  "folder/trashFolderList",
  async (_, { rejectWithValue }) => {
    const response = await api.get("folder/trash/");
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const folderHardDelete = createAsyncThunk(
  "folder/folderHardDelete",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(`folder/hard-delete/${id}/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

export const folderHeaderInfo = createAsyncThunk(
  "folder/folderHeaderInfo",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`folder/header/info/retrieve/${id}/`);
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

    [folderRetrieveList.pending]: (state) => {
      state.listFolderRetrieveStatus = "loading";
    },
    [folderRetrieveList.fulfilled]: (state, action) => {
      state.listFolderRetrieveStatus = "succeeded";
      state.listFolderRetrieveData = action.payload;
    },
    [folderRetrieveList.rejected]: (state, action) => {
      state.listFolderRetrieveStatus = "failed";
      state.listFolderRetrieveError = action.payload.errors;
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

    [trashFolderList.pending]: (state) => {
      state.listTrashFolderStatus = "loading";
    },
    [trashFolderList.fulfilled]: (state, action) => {
      state.listTrashFolderStatus = "succeeded";
      state.listTrashFolderData = action.payload;
    },
    [trashFolderList.rejected]: (state, action) => {
      state.listTrashFolderStatus = "failed";
      state.listTrashFolderError = action.payload.errors;
    },

    [folderHeaderInfo.pending]: (state) => {
      state.headerFolderStatus = "loading";
    },
    [folderHeaderInfo.fulfilled]: (state, action) => {
      state.headerFolderStatus = "succeeded";
      state.headerFolderData = action.payload;
    },
    [folderHeaderInfo.rejected]: (state, action) => {
      state.headerFolderStatus = "failed";
      state.headerFolderData = {};
      state.headerFolderError = action.payload.errors;
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

export const listFolderRetrieveData = (state) =>
  state.folder.listFolderRetrieveData;
export const listFolderRetrieveStatus = (state) =>
  state.folder.listFolderRetrieveStatus;
export const listFolderRetrieveError = (state) =>
  state.folder.listFolderRetrieveError;

export const deleteFolderData = (state) => state.folder.deleteFolderData;
export const deleteFolderStatus = (state) => state.folder.deleteFolderStatus;
export const deleteFolderError = (state) => state.folder.deleteFolderError;

export const listTrashFolderData = (state) => state.folder.listTrashFolderData;
export const listTrashFolderStatus = (state) =>
  state.folder.listTrashFolderStatus;
export const listTrashFolderError = (state) =>
  state.folder.listTrashFolderError;

export const headerFolderData = (state) => state.folder.headerFolderData;
export const headerFolderStatus = (state) => state.folder.headerFolderStatus;
export const headerFolderError = (state) => state.folder.headerFolderError;
