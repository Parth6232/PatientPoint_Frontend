import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  isAuthenticated: false,
  profileData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileData: (state, action) => ({
      ...state,
      profileData: action.payload,
    }),
    resetProfileData: () => ({
      ...initialState,
    }),
    setIsAuthenticated: (state, action) => ({
      ...state,
      isAuthenticated: action.payload,
    }),
  },
});

export const userActions = userSlice.actions;
export const userReducers = persistReducer(
  { key: 'user', storage, whitelist: ['isAuthenticated', 'profileData'] },
  userSlice.reducer
);
