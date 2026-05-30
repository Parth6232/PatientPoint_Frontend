import Text from '@components/common/Text';
import TextField from '@components/common/TextField';
import PmcButton from '@components/PmcButton';
import { Box, IconButton, InputAdornment, Typography, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authApiAction } from 'store/apiSlices/auth/authApiSlice';
import { localStore } from 'store/localStore';
import { userActions } from 'store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouteConstants from 'navigator/RoutesConstants';
import toast, { Toaster } from 'react-hot-toast';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const [login, { isLoading }] = authApiAction.login();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    try {
      const otpRes = await login({ email: form.email, password: form.password });

      if (otpRes?.data?.status === 200) {
        if (otpRes.data.token) {
          localStore.setToken(otpRes.data.token);
          localStore.setRole(otpRes.data.role);
          await dispatch(userActions.setIsAuthenticated({ isAuthenticated: true }));
          await dispatch(userActions.setProfileData({ profileData: otpRes.data.user }));
        }
      } else {
        const errorMsg = otpRes?.error?.data?.msg || otpRes?.data?.message || 'Login failed';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      toast.error('An unexpected error occurred during login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        background: '#f4f7fe',
        overflow: 'hidden'
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left: Background Image */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '300px', sm: '400px', md: '100vh' },
          background: 'url(/assest/hospital_building_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />
      </Box>

      {/* Right: Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 2 },
          height: '100vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '450px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            padding: { xs: '20px', md: '30px' },
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } }
          }}
        >
          <Box textAlign="center" mb={2.5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
              <img src="/assest/MediRouteIcon.png" alt="logo" style={{ width: '35px' }} />
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '22px', sm: '26px' }, color: '#1a1a1a', fontFamily: 'Manrope' }}>
                PatientPoint
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#666', fontFamily: 'Manrope', fontWeight: 600 }}>
              Welcome Back!
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', fontFamily: 'Manrope' }}>
              Please login to continue to your account
            </Typography>
          </Box>

          <Box width="100%">
            <Typography sx={{ fontSize: '13px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '4px', fontWeight: 700 }}>
              Email
            </Typography>
            <TextField
              name="email"
              placeholder="Enter your email"
              fullWidth
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px', background: '#fff', height: '42px' } }}
            />

            <Typography sx={{ fontSize: '13px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '4px', fontWeight: 700 }}>
              Password
            </Typography>
            <TextField
              name="password"
              placeholder="Enter your password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: form.password && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', background: '#fff', height: '42px' } }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel 
                control={<Checkbox size="small" sx={{ color: '#8ec5fc', padding: '4px', '&.Mui-checked': { color: '#6a11cb' } }} />} 
                label={<Typography sx={{ fontSize: '13px', fontFamily: 'Manrope', color: '#666' }}>Remember me</Typography>} 
              />
              <MuiLink href="#" underline="none" sx={{ fontSize: '13px', fontFamily: 'Manrope', color: '#2575fc', fontWeight: 600 }}>
                Forgot password?
              </MuiLink>
            </Box>

            <PmcButton
              type="submit"
              isDisabled={!form.email || !form.password || isLoading}
              onClick={handleSubmit}
              fullWidth
              sx={{ 
                borderRadius: '10px', 
                py: 1, 
                fontSize: '15px', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', 
                color: '#fff',
                textTransform: 'none',
                boxShadow: '0 8px 16px rgba(37, 117, 252, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #5c0fba 0%, #1c66e6 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(37, 117, 252, 0.3)',
                } 
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </PmcButton>

            <Box mt={2} textAlign="center">
              <Typography sx={{ fontSize: '13px', fontFamily: 'Manrope', color: '#666' }}>
                Don't have an account?{' '}
                <span
                  style={{ color: '#2575fc', cursor: 'pointer', fontWeight: 700, transition: 'color 0.2s' }}
                  onClick={() => navigate(RouteConstants.Register.path)}
                >
                  Create Account
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginContainer;
