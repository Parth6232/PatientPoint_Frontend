import Text from "@components/common/Text";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
// import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PmcButton({ isDisabled,children,onClick }) {
  const [loading, setLoading] = useState(false);
  const loader =  useSelector((state) => state.loading.loading);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
        onClick();
      }, 1000);
    setTimeout(() => {
      setLoading(false);
      }, 2000);
  };
  
  return (
    <Button
      sx={{
        width: "100%",
        height:'48px',
        background: "#3B82F6 !important", // Ensure background color remains unchanged
        boxShadow: "0px 0px 14px 2px #00000033",
        borderRadius: "12px",
        color: "#fff",
        fontFamily: "Manrope",
        justifyContent: "center",
        textAlign:'center !important',
        opacity: (isDisabled ) ? 0.3 : 1,
        "&.Mui-disabled": {
          background: "#3B82F6", // Keep the background color unchanged when disabled
          color: "#fff", // Ensure text color remains white
        },
      }}
      disabled={isDisabled || loading || loader}
      onClick={handleClick}
    >
      <Text sx={{ marginLeft: "0.5rem",textTransform:'none' ,fontFamily: 'Manrope'}}>
        {!(loading || loader )? children : "Please wait"}
        {(loading || loader) && (
            <CircularProgress
              size={18}
              sx={{ color: "#FFFFFF !important" , marginLeft:'15px'}}
            />
          )}
      </Text>
    </Button>
  );
}