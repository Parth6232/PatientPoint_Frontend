import { Box, Button, Tooltip, useMediaQuery } from '@mui/material';
import Text from './common/Text';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'store/slices/userSlice';
import { useTheme } from '@mui/material/styles';
import InitialsAvatar from './common/InitialsAvatar';


export default function Header() {
    const theme = useTheme();
  
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Get authentication status from Redux store
  const profile = useSelector((state) => state.user.profileData);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    
    dispatch(userActions.resetProfileData());

    if (!isAuthenticated) {
      // Check if user is logged out
      navigation('/login');
    }
  };

  return (
    <Box
      sx={{
        background: '#cbe3f6',
        border: '1px solid #EFF6FF',
        display: isMobile?'none':'flex',
        justifyContent: 'space-between',
        padding: '5px',
        borderRadius: '10px',
        alignItems: 'center',
        gap: 2,
        margin: '5px 10px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{
               width: '100px',
    height: '52px',
          }}
          src="/assest/MediRouteIcon.png"
          alt="logo"
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Text
          sx={{
            fontFamily: 'Manrope',
            fontWeight: 800,
            fontSize: '18px',
            lineHeight: '27.78px',
            letterSpacing: '0%',
            color: '#262626',
          }}
        >
           PatientPoint
        </Text>
        <Text
          sx={{
            fontFamily: 'Manrope',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '18.86px',
            letterSpacing: '0%',
            color: '#454444eb',
            textTransform: 'capitalize',
          }}
        >
          Healthcare Platform
        </Text>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Other buttons can go here */}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <InitialsAvatar name={profile?.profileData?.name || profile?.name || 'Admin'} sx={{ width: 35, height: 35, fontSize: '16px' }} />
        <Tooltip title="Logout" arrow>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              background: '#cbe3f6',
              color: '#262626',
              height: '35px',
              minWidth: '18px !important',
              borderRadius: '10px',
              textAlign: 'center',
              padding: '5px 9px',
              borderColor: '1px solid #cbe3f6 !important',
            }}
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ width: '18px', height: '18px' }} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
