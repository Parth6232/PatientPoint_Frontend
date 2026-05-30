import React, { memo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";

const Loader = ({ position = "fixed", loading = false, size = "md",_sx }) => {
    const sizes = {
        xs: 32,
        sm: 56,
        md: 72,
        lg: 94
    }
  return (
    <Stack
      sx={{
        background: "#d3d3d396",
        justifyContent: "center",
        alignItems: "center",
        position: position,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: loading ? 100000 : -1,
        visibility: loading ? "visible" : "hidden",
        ..._sx
      }}
    >
      {/* <img
        src="/loader.gif"
        alt="loader"
        style={{ width: sizes[size], borderRadius: 3 }}
      /> */}
      <CircularProgress />
    </Stack>
  );
};

export default memo(Loader);
