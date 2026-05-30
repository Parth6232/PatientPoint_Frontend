import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import { authApiAction } from "store/apiSlices/auth/authApiSlice";

const DashboardComponent = () => {
  const { data: dashboardCount } = authApiAction.dashboardCount();
  const { data: recentAppointments } = authApiAction.recentAppointments();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          p: { xs: 2, sm: 3, md: 4 },
          minHeight: "100vh",
        }}
      >
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {[{
            title: "Total Patients",
            value: dashboardCount?.totalPatients ?? 0,
            icon: <PeopleIcon />,
            color: "#1976d2",
          }, {
            title: "Total Doctors",
            value: dashboardCount?.availableDoctors ?? 0,
            icon: <LocalHospitalIcon />,
            color: "green",
          }, {
            title: "Appointments Today",
            value: dashboardCount?.appointmentsToday ?? 0,
            icon: <EventIcon />,
            color: "orange",
          }].map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: card.color, width: 50, height: 50 }}>
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {card.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Appointments Table */}
        <Paper
          sx={{
            mt: 4,
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Recent Appointments
          </Typography>

          {/* Scrollable Box for small screens */}
          <Box
            sx={{
              maxHeight: { xs: "300px", sm: "400px", md: "auto" },
              overflow: "auto", // vertical + horizontal scroll
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f0f4f8" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentAppointments?.recentAppointments?.map((item) => (
                  <TableRow hover key={item._id}>
                    <TableCell>{item.patient?.name ?? "N/A"}</TableCell>
                    <TableCell>{item.doctor?.name ?? "N/A"}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
