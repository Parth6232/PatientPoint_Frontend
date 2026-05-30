import { Button as MuiButton } from "@mui/material";
import React from "react";

const Button = (props) => {
  const {
    btnName = "-",
    onClick,
    isDisable = false,
    width = "100%",
    sx,
    variant = 'contained',
    leftIcon,   
    rightIcon, 
    ...restProps
  } = props;
  
  return (
    <MuiButton
      onClick={onClick}
      disabled={isDisable}
      variant={variant}
      size="large"
      sx={{
        borderRadius: "8px",
        border: "none",
        color: isDisable ? '#9F9F9F' : '#fff',
        textAlign: "center",
        fontSize: "1rem",
        width: width,
        background: isDisable ? "#DFDFDF" : 'black',
        "&:disabled": {
          cursor: "not-allowed",
          background: "#DFDFDF",
        },
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        ...sx,
      }}
      {...restProps}
    >
      {leftIcon && <span style={{ display: "flex", alignItems: "center" }}>{leftIcon}</span>}
      {btnName}
      {rightIcon && <span style={{ display: "flex", alignItems: "center" }}>{rightIcon}</span>}
    </MuiButton> 
  );
};

export default React.memo(Button);
