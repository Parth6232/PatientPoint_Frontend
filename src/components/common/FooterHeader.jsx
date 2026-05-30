import { Box } from '@mui/material';
import React from 'react';
import Text from './Text';

const FooterHeader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
        padding: '15px 10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text
          sx={{
            fontFamily: 'Manrope',
            fontWeight: 400,
            fontSize: '14px',
            color: '#525252',
          }}
        >
          Copyright @ 2025 PMC. All Rights Reserved.
        </Text>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <img src="/assest/customer-support.svg" />
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '14px',
              color: '#525252',
            }}
          >
            HelpCenter
          </Text>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <img src="/assest/contact-book.svg" />
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '14px',
              color: '#525252',
            }}
          >
            Contact Us
          </Text>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <img src="/assest/privacy.svg" />
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '14px',
              color: '#525252',
            }}
          >
            Privacy Policy
          </Text>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <img src="/assest/terms.svg" />
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '14px',
              color: '#525252',
            }}
          >
            Terms & Conditions
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterHeader;
