import {createSlice} from '@reduxjs/toolkit';
// import configData from "@app/config/index";

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => ({
        
      loading: action.payload.loading,
    }),
  },
});

export const loadingActions = loadingSlice.actions;
export const loadingReducers = loadingSlice.reducer;
    