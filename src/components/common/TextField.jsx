import React, { useState } from 'react';
import MTextField from '@mui/material/TextField';
import { Box, InputAdornment } from '@mui/material';
import Text from './Text';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const TextField = ({
  name = '',
  label = '',
  placeholder = '',
  helperText = '',
  error = '',
  InputLabelProps = {},
  onChange, // ✅ Accept onChange prop directly
  value,     // ✅ Accept value as a controlled prop
  sx,
  startIcon,
  endIcon,
  size = 'medium',
  passwordField,
  fullWidth = true,
  max,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleInputChange = (e) => {
    const val = max ? e.target.value.substring(0, max) : e.target.value;
    if (onChange) {
      onChange({ target: { name, value: val } }); // 🔄 Simulate native event structure
    }
  };

  return (
    <Box>
      <MTextField
        fullWidth={fullWidth}
        error={!!error}
        label={label}
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={handleInputChange}
        type={passwordField && !showPassword ? 'password' : 'text'}
        InputLabelProps={{
          sx: {
            color: '#949494',
            fontSize: '16px',
            '&.Mui-focused': {
              color: '#949494',
            },
          },
        }}
        sx={{
          fontWeight: '500',
          fontSize: '16px',
          fontFamily: 'Manrope !important',
          '& .MuiInputBase-root': {
            fontSize: '12px',
            backgroundColor: value ? '#cbe3f6' : '#ffffff',
            border: value ? '1px solid #b3a588' : 'none',
            borderRadius: "12px"
          },
          '& .MuiInputBase-input': {
            color: '#262626',
            fontFamily: 'Manrope',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '12px',
            letterSpacing: '0%',
            zIndex: 1,
            padding: '7.5px 14px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: 1,
              borderColor: '#66a4e1',
              borderRadius: '10px',
              height: '38px',
            },
            '&:hover fieldset': {
              borderColor: '#66a4e1',
            },
            '&.Mui-focused fieldset': {
              color: 'black',
              padding: '8.5px 14px',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#8D8D8D',
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
              style={{ cursor: 'pointer' }}
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
        }}
        {...restProps}
      />

      {helperText && (
        <Text
          sx={{
            color: 'red',
            fontSize: '10px',
            marginTop: '10px'
          }}
          variant="small"
          align="left"
        >
          {helperText}
        </Text>
      )}
    </Box>
  );
};

export default React.memo(TextField);

