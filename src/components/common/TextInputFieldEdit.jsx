import React, { useState } from "react";
import MTextField from "@mui/material/TextField";
import { Box, InputAdornment } from "@mui/material";
import Text from "./Text";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const TextInputFieldEdit = ({
  name = "",
  label = "",
  helperText = "",
  InputLabelProps = {},
  error = false,
  handleOnChange,
  sx = {},
  startIcon,
  endIcon,
  size = "small",
  passwordField = false,
  fullWidth = true,
  max,
  inputValue,
  width='420px',
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MTextField
        fullWidth={fullWidth}
        error={Boolean(error)}
        label={label}
        size={size}
        type={passwordField && !showPassword ? "password" : "text"}
        onChange={(e) =>
          handleOnChange({
            name,
            value: max ? e.target.value.substring(0, max) : e.target.value,
          })
        }
        InputLabelProps={{
          sx: {
            color: "#949494",
            fontSize: "1rem",
            "&.Mui-focused": { color: "#949494" },
          },
        }}
        sx={{
          fontWeight: 500,
          backgroundColor: "white",
          borderColor: "#C8C8C8",
          fontSize: "1rem",
          borderRadius:"12px",
          "& .MuiInputBase-root": {
            width:width,
            fontSize: "12px",
            height: "35px",
            borderRadius:"12px",
            marginTop:'5px',
            backgroundColor: inputValue ? '#EFF6FF' : '#ffffff', 
            border: inputValue   ?'1px solid #93C5FD':'none',

          },
          '& .MuiInputBase-input': {
            color: '#262626', // Change the placeholder color to grey
            fontFamily: 'Manrope',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '12px',
            letterSpacing: '0%',
            zIndex:1000,
            padding: '7.5px 14px'


          },
         '& .Mui-disabled': {
  '-webkit-text-fill-color': '#262626 !important',
  fontSize:'12px !important'
},

          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: 1, // Set border width
              borderColor: '#cccccc', // Set border color to grey
              borderRadius: '10px', // Set border radius to 8px
              // background: '#EFF6FF',
              height:'40px',

            },
            '&:hover fieldset': {
              borderColor: '#b3b3b3', // Slightly darker grey on hover
              background: '#EFF6FF',

            },
            '&.Mui-focused fieldset': {
              borderColor: '#66a4e1', // Darker grey when focused
              // background: '#EFF6FF',
              color:'black',
              padding: '8.5px 14px'

            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#8D8D8D', // Change the placeholder color to grey
            fontFamily: 'Manrope',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '12px',
            letterSpacing: '0%',
          },
          ...sx,
        }}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: passwordField ? (
            <InputAdornment
              position="end"
              onClick={handleTogglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <VisibilityRoundedIcon />
              ) : (
                <VisibilityOffRoundedIcon />
              )}
            </InputAdornment>
          ) : (
            endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
          ...restProps?.InputProps,
        }}
        {...restProps}
      />

      {/* Helper Text */}
      {helperText && (
        <Text sx={{ color: "grey" }} variant="small" align="left">
          {helperText}
        </Text>
      )}

      {/* Error Text */}
      {error && (
        <Text sx={{ color: "red" }} variant="small" align="left">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default React.memo(TextInputFieldEdit);