import { Box } from '@mui/material';
import React from 'react';
import Text from './common/Text';
import { useNavigate } from 'react-router-dom';

const HeaderBack = ({ title, subTitle, description, subDescription }) => {
  const navigate = useNavigate();

  return (
    <>
      {title && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            paddingLeft: '10px',
          }}
        >
          <img
            src="/assest/Button_Small.svg"
            style={{ cursor: 'pointer' ,  width: '45px',
              height: '45px'}}
            
            onClick={() => navigate(-1)}
          />
          <Box>
            <Text
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '22.78px',
                color: '#262626',
              }}
            >
              {title}
            </Text>
            <Text
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '18.86px',
                color: '#262626',
              }}
            >
              {subTitle}
            </Text>
          </Box>
        </Box>
      )}
      {description && (
        <Box
          sx={{
            height: '90px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: '10px',
            padding: '10px',
            background: '#F0F0F0',
            marginBottom: '20px',
          }}
        >
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '18.78px',
              color: '#262626',
            }}
          >
            {description}
          </Text>
          <Text
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '18.32px',
              color: '#393939',
            }}
          >
            {subDescription}
          </Text>
        </Box>
      )}
    </>
  );
};

export default HeaderBack;
