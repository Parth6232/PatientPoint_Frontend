import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ExitModel = ({ showModal, handleCloseModal, handleGoBack }) => {
  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 510,
          bgcolor: "#fef5f5",
          p: 3,
          borderRadius: 4,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img src="/assest/backArrow.svg" alt="Back Arrow" />
        </Box>
        <Typography
          sx={{
            mt: 1,
            color: "#383737",
            fontFamily: "Manrope",
            fontWeight: "700",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          Are you sure you want to leave this page?
        </Typography>
        <Typography
          sx={{
            color: "#383737",
            fontFamily: "Manrope",
            fontWeight: "400",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          You have unsaved changes in the staff registration form. Exiting now
          will discard all entered details.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mt: 4 }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              border: "1px solid #8D8D8D",
              borderRadius: "12px",
              background: "#FFFFFF",
              fontSize: "0.875rem",
              color: "#262626",
              width: "240px",
              textTransform: "none",
            }}
          >
            Continue Filling
          </Button>
          <Button
            variant="contained"
            onClick={handleGoBack}
            sx={{
              border: "1px solid #8D8D8D",
              borderRadius: "12px",
              background: "#3B82F6",
              fontSize: "0.875rem",
              color: "#FFFFFF",
              width: "240px",
              textTransform: "none",
            }}
          >
            Exit to Dashboard
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExitModel;
