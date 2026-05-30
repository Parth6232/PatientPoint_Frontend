import React from 'react';
import { Avatar } from '@mui/material';

// Generate a consistent color based on string
const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const InitialsAvatar = ({ name = 'User', sx = {} }) => {
  // Extract first letter and capitalize it. Handle "Doctor Amit" gracefully by taking first actual char.
  const nameParts = name.trim().split(' ');
  let letter = 'U';
  if (nameParts.length > 0 && nameParts[0].length > 0) {
    if (['doctor', 'dr.', 'dr'].includes(nameParts[0].toLowerCase()) && nameParts.length > 1) {
      letter = nameParts[1][0].toUpperCase();
    } else {
      letter = nameParts[0][0].toUpperCase();
    }
  }

  const bgColor = stringToColor(name);

  return (
    <Avatar
      sx={{
        bgcolor: bgColor,
        background: `linear-gradient(135deg, ${bgColor}99 0%, ${bgColor} 100%)`,
        color: '#fff',
        fontWeight: 'bold',
        ...sx
      }}
    >
      {letter}
    </Avatar>
  );
};

export default InitialsAvatar;
