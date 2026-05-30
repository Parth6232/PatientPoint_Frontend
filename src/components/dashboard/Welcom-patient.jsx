import React from "react";
import { Card, CardContent, Typography, Box, AppBar, Toolbar } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export function WelcomPatient({ role }) {
  // normalize role to lowercase
  const normalizedRole = role?.toLowerCase();

  const titles = {
    doctor: "👨‍⚕️ Doctor Dashboard",
    patient: "🧑‍🤝‍🧑 Patient Dashboard",
  };

  const images = {
    doctor: "https://cdn-icons-png.flaticon.com/512/387/387561.png", // doctor illustration
    patient: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png", // patient illustration
  };

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
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          >
            {titles[normalizedRole] || "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Card
        sx={{
          bgcolor: "#E8F5E9", // soft green background
          color: "#1B5E20", // dark green text
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            {/* Greeting Text */}
            <Box flex={1} pr={3}>
              <Typography variant="h5" fontWeight="bold">
                Welcome Back!
              </Typography>
              <Typography variant="body2" mt={1}>
                {normalizedRole === "doctor"
                  ? "Here’s your patient overview and today’s schedule."
                  : "Here’s your medical history and today’s appointments."}
              </Typography>
            </Box>

            {/* Right Side Icon + Image */}
            <Box display="flex" alignItems="center" gap={2}>
              <LocalHospitalIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              <img
                src={images[normalizedRole]}
                alt={`${normalizedRole} illustration`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
