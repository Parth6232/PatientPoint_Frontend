import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ErrorBoundary from "@components/common/ErrorBoundry";
import theme from "@helpers/theme";

const AppHoc = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/">
        <CssBaseline />
        <ErrorBoundary>{children}</ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppHoc;
