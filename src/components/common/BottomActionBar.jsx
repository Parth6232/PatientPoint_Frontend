import React from 'react';
import { Box, Button, Toolbar } from '@mui/material';

const BottomActionBar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'white',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.2)',
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end', padding: '16px' }}>
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            borderColor: 'black',
            marginRight: '8px',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Cancel Job
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
        >
          Assign Job
        </Button>
      </Toolbar>
    </Box>
  );
};

export default BottomActionBar;
