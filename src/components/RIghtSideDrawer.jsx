import React from "react";
import {
  Drawer,
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const RightSideDrawer = ({
  open,
  onClose,
  title,
  content,
  buttons = [],
  onNext,
  onPrevious,
  nextButtonText = "Next",
  previousButtonText = "Previous",
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: '80%',     
            md: '50%',
            lg: '40%',
            xl: '30%'      
          },
          maxWidth: '600px'
        }
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 3,
          position: "relative",
          bgcolor: "#333",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{content}</Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 2 },
            mt: 2,
            pt: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          {onPrevious && (
            <Button
              variant="outlined"
              color="primary"
              onClick={onPrevious}
              fullWidth={isSmallScreen}
              sx={{
                borderColor: 'black',
                order: { xs: 2, sm: 1 }
              }}
            >
              {previousButtonText}
            </Button>
          )}

          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || "contained"}
              color={button.color || "primary"}
              onClick={button.onClick}
              fullWidth={isSmallScreen}
              sx={{
                borderColor: 'black',
                order: { xs: 3, sm: 2 },
                ...button.sx
              }}
            >
              {button.label}
            </Button>
          ))}

          {onNext && (
            <Button
              variant="contained"
              onClick={onNext}
              fullWidth={isSmallScreen}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                order: { xs: 1, sm: 3 },
                '&:hover': {
                  backgroundColor: '#333'
                }
              }}
            >
              {nextButtonText}
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default RightSideDrawer;
