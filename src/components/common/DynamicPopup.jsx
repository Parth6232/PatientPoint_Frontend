import React from "react";
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Popup = ({ 
  open, 
  onClose, 
  title, 
  description,
  type,
  buttons,
  icon: CustomIcon
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "300px",
          borderRadius: "12px",
          padding: "24px 16px",
        },
      }}
      fullWidth
    >
      <DialogContent sx={{ textAlign: "center", p: 0 }}>
        {CustomIcon ? (
          <CustomIcon sx={{ 
            color: type === "error" ? "#d32f2f" : "#00C853",
            fontSize: 64,
          }} />
        ) : (
          type === "error" ? (
            <CancelIcon sx={{ 
              color: "#d32f2f",
              fontSize: 64,
            }} />
          ) : (
            <CheckCircleIcon sx={{ 
              color: "#00C853",
              fontSize: 64,
            }} />
          )
        )}
        <Typography variant="h6" sx={{ 
          fontWeight: 500,
          fontSize: "24px",
        }}>
          {title}
        </Typography>
        <Typography sx={{ 
          color: "text.secondary",
          fontSize: "16px",
          mb: 3,
          lineHeight: 1.2
        }}>
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ 
        p: 0,
        display: 'flex',
        flexDirection: buttons?.length > 1 ? 'row' : 'column',
        gap: 1
      }}>
        {buttons?.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            variant={button.variant || "contained"}
            fullWidth
            sx={button.sx || { 
              backgroundColor: "black",
              color: "white",
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#333"
              }
            }}
          >
            {button.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
