import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { appConstants } from 'helpers/constants/appConstant';
import { localStore } from '../localStore';
import { toastActions } from '../slices/toastSlice';
import { loadingActions } from 'store/slices/loadingSlice';
import { userActions } from 'store/slices/userSlice';

// Base query for the API service
const apiServiceSlice = {};

// The main query to interact with the API
apiServiceSlice.baseQuery = fetchBaseQuery({
  baseUrl: appConstants.apiBaseURL,
  prepareHeaders: (headers) => {
    const token = localStore.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Retry functionality for the base query
apiServiceSlice.baseQueryWithRetry = retry(
  apiServiceSlice.baseQueryWithInterceptor,
  { maxRetries: 3 }
);

// The query with the interceptor to handle errors and retries
apiServiceSlice.baseQueryWithInterceptor = async (args, api, extraOptions) => {

  if (args?.method === "GET") {
    api.dispatch(
      loadingActions.setLoading({
        loading: true,
      })
    );
  }

  try {
    const result = await apiServiceSlice.baseQuery(args, api, extraOptions);

    if (result.error) {
      let toastMessage = 'Oops, Something went wrong. Please try again later';

      if (result.error.status === 401) {
        await localStore.resetToken();
        api.dispatch(
          userActions.setIsAuthenticated({ isAuthenticated: false })
        );
      }

      if (result.error?.data?.message) {
        toastMessage = result.error.data.message;
      }

      api.dispatch(
        toastActions.setToastData({
          message: toastMessage,
          variant: 'error',
        })
      );
    }

    if (["POST", "PATCH", "PUT"].includes(result.meta.request.method)) {
      api.dispatch(
        toastActions.setToastData({
          message: result.data.message,
          variant: "success",
        })
      );
    }

    if (["GET"].includes(result.meta.request.method)) {
      api.dispatch(
        loadingActions.setLoading({
          loading: false,
        })
      );
    }

    return result;
  } catch (error) {
    console.log("error", error);
    api.dispatch(
      toastActions.setToastData({
        message: "Oops, Something went wrong. Please try again later",
        variant: "error",
      })
    );
    return error;
  }
};

export { apiServiceSlice };
