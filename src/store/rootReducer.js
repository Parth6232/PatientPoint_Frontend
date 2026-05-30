import { combineReducers } from "redux";

// Normal RTK slice
import { toastReducers } from "./slices/toastSlice";

// RTK Query API slice
import { authApiAction, authApiReducer } from "./apiSlices/auth/authApiSlice";
import { userReducers } from "./slices/userSlice";
import { loadingReducers } from "./slices/loadingSlice";

const rootReducers = combineReducers({
  toast: toastReducers,
  user: userReducers,
  loading:loadingReducers,
  [authApiAction.reducerPath]: authApiReducer,
});

export default rootReducers;
