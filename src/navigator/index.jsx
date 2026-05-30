import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import routesData from '@navigator/Routes';
import PageNotFound from '@pages/PageNotFound/PageNotFound';

import { ProtectedRoute, PublicRoute } from '@helpers/routes';
import LayoutContainer from 'container/Layout/LayoutContainer';
import RouteConstants from './RoutesConstants';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import { useSelector } from 'react-redux';
import { localStore } from 'store/localStore';

const AppNavigator = () => {
  const auth = {
    isAuthenticated: useSelector((state) => state.user.isAuthenticated),
  };
  const role = localStore.getRole();

  // If not authenticated, redirect to login
  if (!auth.isAuthenticated) {
    return (
      <React.StrictMode>
        <Routes>
          <Route
            path={RouteConstants.Login.path}
            element={<LoginPage />}
          />
          <Route
            path={RouteConstants.Register.path}
            element={<RegisterPage />}
          />
          <Route path="*" element={<Navigate to={RouteConstants.Login.path} replace />} />
        </Routes>
      </React.StrictMode>
    );
  }

  return (
    <React.StrictMode>
      <Routes>
        <Route
          path={RouteConstants.Login.path}
          element={<Navigate to={RouteConstants.Dashboard.path} replace />}
        />
        <Route
          path={RouteConstants.Register.path}
          element={<Navigate to={RouteConstants.Dashboard.path} replace />}
        />
        <Route element={<LayoutContainer />}>
          {routesData
            .filter((route) => route?.role?.includes(role))
            .map((route, index) => {
              return (
                <Route
                  key={`${route.path}_${index}`}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.StrictMode>
  );
};

export default AppNavigator;
