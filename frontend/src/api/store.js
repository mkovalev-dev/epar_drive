import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "../pages/slice/sliceUsers";
import baseSlice from "../pages/slice/sliceBase";
import folderSlice from "../pages/slice/sliceFolder";
import fileSlice from "../pages/slice/sliceFile";

/**
 * Настройки для store redux
 */

const rootReducer = combineReducers({
  users: usersSlice,
  base: baseSlice,
  folder: folderSlice,
  file: fileSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "base", "folder", "file"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
