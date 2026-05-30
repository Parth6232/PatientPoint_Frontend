import { Modal, Typography } from '@mui/material';
import React from 'react';
import Box from './Box';
import DeleteIcon from '@mui/icons-material/Delete';

const ModalCommon = ({
  isModalOpen,
  handleClose,
  message = '',
  icon = <DeleteIcon color="red" sx={{ fontSize: 80, mb: 2 }} />,
  children,
  showIcon = true,
  title = 'Notice',
  width="30%",
  padding=4
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="common-modal"
      aria-describedby="common-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: padding,
          maxHeight: '90vh',
          overflow: 'auto',
          textAlign: 'center', // ✅ center all text
        }}
      >
        {showIcon && icon}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2, textAlign: 'center' }} // ✅ center title
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCommon;
