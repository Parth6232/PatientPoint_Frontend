import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  Divider,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'store/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { localStore } from 'store/localStore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import InitialsAvatar from './common/InitialsAvatar';

const drawerWidth = 240;

const navItems = [
  {
    text: 'Dashboard',
    path: '/',
    role: ['Admin', 'Patient', 'Doctor'],
    icon: <DashboardIcon />,
  },
  {
    text: 'Patients',
    path: '/patients',
    role: ['Admin', 'Doctor'],
    icon: <PeopleIcon />,
  },
  {
    text: 'Doctors',
    path: '/doctors',
    role: ['Admin'],
    icon: <LocalHospitalIcon />,
  },
  {
    text: 'Doctor Approvals',
    path: '/admin/approvals',
    role: ['Admin'],
    icon: <LocalHospitalIcon />,
  },
  {
    text: 'Appointments',
    path: '/appointments',
    role: ['Admin', 'Patient', 'Doctor'],
    icon: <EventIcon />,
  },
  {
    text: 'Profile',
    path: '/profile',
    role: ['Admin', 'Patient', 'Doctor'],
    icon: <Person2RoundedIcon />,
  },
];

function Sidebar() {
  const role = localStore.getRole();

  const location = useLocation();
  const theme = useTheme();
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Get authentication status from Redux store
  const profile = useSelector((state) => state.user.profileData);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    dispatch(userActions.resetProfileData());

    if (!isAuthenticated) {
      // Check if user is logged out
      navigation('/login');
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          color="#FFFFFF"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          🏥 PatientPoint
        </Typography>

        <Divider sx={{ borderColor: '#FFFFFF', mb: 2 }} />

        <List>
          {navItems
            .filter((route) => route.role.includes(role))
            .map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  key={item.text}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    backgroundColor: isActive ? '#007f80' : 'transparent',
                    borderRadius: isActive ? '8px' : '0px',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#007f80',
                      borderRadius: '8px',
                      marginTop: '5px',
                      marginBottom: '5px',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#FFFFFF' }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        color: '#FFFFFF',
                        fontWeight: isActive ? 'bold' : 'normal',
                      },
                    }}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>

      <Box sx={{ mt: 'auto', mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <InitialsAvatar name={profile?.profileData?.name || profile?.name || 'Admin'} sx={{ width: 50, height: 50, mb: 1, fontSize: '20px' }} />
        <Typography variant="body1" color="#fff" fontWeight="bold" sx={{ fontFamily: 'Manrope' }}>
          {profile?.profileData?.name || profile?.name || 'Admin'}
        </Typography>
      </Box>

      {/* Logout Button */}
      <Box sx={{ mt: 1 }}>
        <ListItem
          button
          onClick={handleLogout} // define this function in your component
          sx={{
            cursor: 'pointer',
            backgroundColor: '#FFFFF',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#007f80',
            },
          }}
        >
          <LogoutIcon
            sx={{ width: '18px', height: '18px', color: '#FFFFFF' }}
          />

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              sx: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
          />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      {/* AppBar for mobile menu icon */}
      {isMobile && (
        <AppBar position="fixed" sx={{ background: '#111', color: '#FFFFFF' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo + Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img
                src="/assest/MediRouteIcon.png"
                alt="logo"
                style={{ width: '50px', height: '50px' }}
              />
              <Typography variant="h6" noWrap component="div" fontWeight="bold">
                PatientPoint
              </Typography>
            </Box>

            {/* Menu Icon (right aligned) */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Permanent drawer for large screens */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              // top: 64,
              height: '100vh',
              background: '#111',
              marginTop: '5px',
              borderRadius: '9px',
              marginBottom: '5px',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Temporary drawer for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              background: '#111',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;