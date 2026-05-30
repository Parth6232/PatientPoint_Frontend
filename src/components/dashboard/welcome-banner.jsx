import React from "react";
import { Card, CardContent, Typography, Box, AppBar, Toolbar } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export function WelcomeBanner() {
  return (
    <>
       <AppBar
              position="static"
              elevation={0}
              sx={{
               background: "linear-gradient(90deg, #BBDEFB, #90CAF9)",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}>
                  🏥 Hospital Admin Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
    <Card
      sx={{
        bgcolor: "#E8F5E9", // soft green background
        color: "#1B5E20",   // dark green text
        borderRadius: 3,
        mb: 4,
        boxShadow: 3,
        p: 2,
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
          transition: "0.3s",
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Greeting Text */}
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Welcome Back!
            </Typography>
            <Typography variant="body2" mt={1}>
              Here's a quick overview of your hospital's status today.
            </Typography>
          </Box>

          {/* Icon */}
          <LocalHospitalIcon sx={{ fontSize: 40, opacity: 0.8 }} />
        </Box>
      </CardContent>
    </Card>
    </>
  );
}
