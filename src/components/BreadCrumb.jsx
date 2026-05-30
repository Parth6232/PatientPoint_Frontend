import { Box } from '@mui/material';
import React from 'react';
import Text from './common/Text';
import { useNavigate } from 'react-router-dom';

const BreadCrumb = ({
  page,
  color,
  arrow = false,
  addArrow = false,
  onClick,
  dashoardTitle=false
}) => {
  const navigation = useNavigate();
  const handleGotoDashboard = () => {
    navigation('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // paddingLeft: '10px',
      }}
    >
      {arrow && (
        <img
          src="/assest/Button_Small.svg"
          style={{ cursor: 'pointer', width: '45px' }}
          onClick={() => navigation(-1)}
        />
      )}
      {addArrow && (
        <img
          src="/assest/Button_Small.svg"
          style={{ cursor: 'pointer', width: '45px' }}
          onClick={onClick}
        />
      )}

      <img
        style={{ width: '45px', cursor: 'pointer' }}
        src="/assest/homebg.svg"
        onClick={handleGotoDashboard}
      />
      <img
        style={{ marginTop: '-12px', width: '18px' }}
        src="/assest/arrow-right-01.svg"
      />

      <Text sx={breadcrumbTextStyle}>Municipal Corporation</Text>
      <img
        style={{ marginTop: '-12px', width: '18px' }}
        src="/assest/arrow-right-01.svg"
      />

      <Text sx={breadcrumbTextStyle}>Departments</Text>
      <img
        style={{ marginTop: '-12px', width: '18px' }}
        src="/assest/arrow-right-01.svg"
      />

      <Text sx={breadcrumbTextStyle}>Building Permission</Text>
      <img
        style={{ marginTop: '-12px', width: '18px' }}
        src="/assest/arrow-right-01.svg"
      />
      {dashoardTitle && (
        <>
          <Text sx={breadcrumbTextStyle}>Dashboard</Text>
          <img
            style={{ marginTop: '-12px', width: '18px' }}
            src="/assest/arrow-right-01.svg"
          />
        </>
      )}

      <Text sx={{ ...breadcrumbTextStyle, color: color }}>{page}</Text>
    </Box>
  );
};

const breadcrumbTextStyle = {
  fontFamily: 'Manrope',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18.86px',
  color: '#262626',
  marginTop: '-10px',
};

export default BreadCrumb;
