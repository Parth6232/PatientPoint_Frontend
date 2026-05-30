import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  open: false,
  message: "",
  variant: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastData: (state, action) => ({
      open: true,
      message: action.payload.message,
      variant: action.payload.variant,
    }),
    resetToastData: () => ({
      ...initialState,
    }),
  },
});

export const toastActions = toastSlice.actions;
export const toastReducers = persistReducer(
  { key: "toast", storage, whitelist: [] },
  toastSlice.reducer
);
