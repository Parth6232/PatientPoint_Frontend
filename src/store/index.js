import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import rootReducers from "./rootReducer";
import { authApiAction } from "./apiSlices/auth/authApiSlice";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApiAction.middleware]),
});

export const persistor = persistStore(store);
