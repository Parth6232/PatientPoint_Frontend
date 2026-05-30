import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SearchableDropdown = ({
  onChange,
  inputValue,
  disabled,
  options,
  label,
  placeholder,
  width = '524px',
  height = '48px !important',
  multiple,
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      onChange={(event, newValue) => onChange(newValue)}
      disabled={disabled}
      inputValue={inputValue}
      options={options}
      getOptionLabel={(option) => option.label}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) =>
          option.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            fontSize: '12px',
          }}
        >
          {option.label}
        </li>
      )}
      sx={{
        width: width,
        '& .MuiInputBase-root': {
          overflow: 'hidden',
          backgroundColor: inputValue ? '#EFF6FF' : '#ffffff',
          border: inputValue ? '1px solid #93C5FD' : 'none',
        },

        '& .MuiAutocomplete-inputRoot': {
          height: height,
          borderRadius: '12px !important',
          fontSize: '12px',
          '& .MuiAutocomplete-endAdornment': {
            position: 'absolute',
            right: '10px',
          },
          '& .Mui-disabled': {
            '-webkit-text-fill-color': '#262626 !important',
          },
          '& .MuiAutocomplete-input': {
            padding: '3.5px 4px 7.5px 5px !important',
            fontFamily: 'Manrope',
          },
          '& .MuiChip-deleteIcon ': {
            fontSize: '12px !important',
          },
          '& .MuiAutocomplete-tag': {
            fontSize: '9px',
            margin: '-6px',
            background: 'none',
          },
        },
      }}
      ListboxProps={{
        style: { maxHeight: '200px', overflow: 'auto', borderRadius: '12px' },
      }}
    />
  );
};

export default SearchableDropdown;
