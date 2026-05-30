/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Autocomplete, TextField, Checkbox, Chip, Box } from '@mui/material';

const MultiVillageDropdown = ({
  onChange,
  inputValue,
  disabled,
  options,
  label,
  placeholder,
  width = '524px',
  height = '48px !important',
  multiple,
  value,
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      onChange={(event, newValue) => onChange(newValue)}
      disabled={disabled}
      inputValue={inputValue}
      options={options}
      value={value} // Set the value prop
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value} // Ensure correct option comparison
      filterOptions={(options, { inputValue }) =>
        options?.filter((option) =>
          option?.label?.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ padding: '0px 5px' }}>
          <Checkbox style={{ marginRight: 4 }} checked={selected} />
          {option.label}
        </li>
      )}
      renderTags={(selected, getTagProps) => {
        const displayedTags = selected.slice(0, 2);
        const moreCount = selected.length - 2;

        return (
          <>
            <Box sx={{ display: 'flex' }}>
              {displayedTags.map((option, index) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  {...getTagProps({ index })}
                />
              ))}
              {moreCount > 0 && (
                <Chip
                  sx={{ height: '15px', marginLeft: '10px', marginTop: '2px' }}
                  label={`+${moreCount}`}
                />
              )}
            </Box>
          </>
        );
      }}
      sx={{
        width: width,
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
          '& .MuiChip-deleteIcon': {
            fontSize: '12px !important',
            marginTop: '-2px',
          },
          '& .MuiAutocomplete-tag': {
            fontSize: '10px',
            margin: '-5px -8px',
            background: 'none',
          },
        },
      }}
      ListboxProps={{
        style: {
          maxHeight: '200px',
          overflow: 'auto',
          borderRadius: '12px',
          fontSize: '10px',
        },
      }}
    />
  );
};

export default MultiVillageDropdown;
