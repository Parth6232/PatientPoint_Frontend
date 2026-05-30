import Text from '@components/common/Text';
import TextField from '@components/common/TextField';
import PmcButton from '@components/PmcButton';
import { Box, IconButton, InputAdornment, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Collapse } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authApiAction } from 'store/apiSlices/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import RouteConstants from 'navigator/RoutesConstants';
import toast, { Toaster } from 'react-hot-toast';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'Patient', specialization: '', age: '', gender: '',
  });
  const [errors, setErrors] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', specialization: '', age: '', gender: '', apiError: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const [register, { isLoading }] = authApiAction.authRegister();

  const validate = () => {
    let isValid = true;
    let newErrors = { ...errors, apiError: '' };

    if (!form.firstName) { newErrors.firstName = 'Required'; isValid = false; }
    if (!form.lastName) { newErrors.lastName = 'Required'; isValid = false; }
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) { newErrors.email = 'Invalid email'; isValid = false; }
    if (!form.phone) { newErrors.phone = 'Required'; isValid = false; }
    if (!form.password || form.password.length < 8) { newErrors.password = 'Min 8 chars'; isValid = false; }
    if (form.password !== form.confirmPassword) { newErrors.confirmPassword = 'Do not match'; isValid = false; }
    if (form.role === 'Patient') {
      if (!form.age) { newErrors.age = 'Required'; isValid = false; }
      if (!form.gender) { newErrors.gender = 'Required'; isValid = false; }
    } else if (form.role === 'Doctor') {
      if (!form.specialization) { newErrors.specialization = 'Required'; isValid = false; }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', apiError: '' }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const payload = { ...form, ...(form.role === 'Patient' ? { age: form.age, gender: form.gender } : { specialization: form.specialization }) };
      const res = await register(payload);
      if (res?.data?.status === 201) {
        toast.success(form.role === 'Patient' ? "Patient registered successfully. Please login." : "Doctor registration submitted successfully. Please wait for admin approval.");
        setTimeout(() => navigate(RouteConstants.Login.path), 2000);
      } else {
        const errorMsg = res?.error?.data?.msg || res?.data?.message || 'Registration failed';
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  const isFormDisabled = !form.email || !form.password || !form.firstName || !form.lastName || !form.phone || !form.confirmPassword || (form.role === 'Doctor' && !form.specialization) || (form.role === 'Patient' && (!form.age || !form.gender));

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', background: '#f4f7fe', overflow: 'hidden' }}>
      <Toaster position="top-center" />

      {/* Left: Background Image */}
      <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '200px', sm: '300px', md: '100vh' }, background: 'url(/assest/hospital_building_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', display: { xs: 'none', sm: 'block' } }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />
      </Box>

      {/* Right: Register Form */}
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 2, md: 2 }, height: '100vh' }}>
        <Box sx={{ width: '100%', maxWidth: '480px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', p: { xs: 2.5, md: 3 }, animation: 'fadeIn 0.5s ease-in-out', '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
          <Box textAlign="center" mb={1.5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <img src="/assest/MediRouteIcon.png" alt="logo" style={{ width: '30px' }} />
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '20px', sm: '24px' }, color: '#1a1a1a', fontFamily: 'Manrope' }}>PatientPoint</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#666', fontFamily: 'Manrope', fontWeight: 500 }}>Create your account to continue</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>First Name</Typography>
              <TextField name="firstName" placeholder="First Name" fullWidth onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Last Name</Typography>
              <TextField name="lastName" placeholder="Last Name" fullWidth onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Email</Typography>
              <TextField name="email" placeholder="Email Address" fullWidth onChange={handleChange} error={!!errors.email} helperText={errors.email} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Phone</Typography>
              <TextField name="phone" placeholder="Phone Number" fullWidth onChange={handleChange} error={!!errors.phone} helperText={errors.phone} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '12px', color: '#1a1a1a', fontFamily: 'Manrope', fontWeight: 700, mr: 1 }}>Role:</Typography>
            <RadioGroup row name="role" value={form.role} onChange={handleChange}>
              <FormControlLabel value="Patient" control={<Radio size="small" sx={{ color: '#2575fc', padding: '4px', '&.Mui-checked': { color: '#6a11cb' } }} />} label={<Typography sx={{fontSize: '13px', fontFamily: 'Manrope'}}>Patient</Typography>} />
              <FormControlLabel value="Doctor" control={<Radio size="small" sx={{ color: '#2575fc', padding: '4px', '&.Mui-checked': { color: '#6a11cb' } }} />} label={<Typography sx={{fontSize: '13px', fontFamily: 'Manrope'}}>Doctor</Typography>} />
            </RadioGroup>
          </Box>

          <Collapse in={form.role === 'Patient'}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Box flex={1}>
                <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Age</Typography>
                <TextField name="age" type="number" placeholder="Age" fullWidth onChange={handleChange} error={!!errors.age} helperText={errors.age} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
              </Box>
              <Box flex={1}>
                <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Gender</Typography>
                <Select name="gender" value={form.gender} onChange={handleChange} fullWidth displayEmpty sx={{ borderRadius: '8px', background: '#fff', height: '38px', fontFamily: 'Manrope', fontSize: '13px', border: errors.gender ? '1px solid #d32f2f' : 'none' }}>
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Box>
            </Box>
          </Collapse>

          <Collapse in={form.role === 'Doctor'}>
            <Box mb={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Specialization</Typography>
              <TextField name="specialization" placeholder="E.g. Cardiologist" fullWidth onChange={handleChange} error={!!errors.specialization} helperText={errors.specialization} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
          </Collapse>

          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Password</Typography>
              <TextField name="password" placeholder="Min 8 chars" fullWidth type={showPassword ? 'text' : 'password'} onChange={handleChange} error={!!errors.password} helperText={errors.password} InputProps={{ endAdornment: form.password && ( <InputAdornment position="end"> <IconButton onClick={handleClickShowPassword} edge="end" size="small"> {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />} </IconButton> </InputAdornment> ) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
            <Box flex={1}>
              <Typography sx={{ fontSize: '11px', color: '#1a1a1a', fontFamily: 'Manrope', mb: '2px', fontWeight: 700 }}>Confirm</Typography>
              <TextField name="confirmPassword" placeholder="Confirm" fullWidth type={showConfirmPassword ? 'text' : 'password'} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} InputProps={{ endAdornment: form.confirmPassword && ( <InputAdornment position="end"> <IconButton onClick={handleClickShowConfirmPassword} edge="end" size="small"> {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />} </IconButton> </InputAdornment> ) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', background: '#fff', height: '38px', fontSize: '13px' } }} />
            </Box>
          </Box>

          <PmcButton type="submit" isDisabled={isFormDisabled || isLoading} onClick={handleSubmit} fullWidth sx={{ borderRadius: '10px', py: 1, fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', textTransform: 'none', boxShadow: '0 8px 16px rgba(37, 117, 252, 0.25)', transition: 'all 0.3s ease', '&:hover': { background: 'linear-gradient(135deg, #5c0fba 0%, #1c66e6 100%)', transform: 'translateY(-2px)', boxShadow: '0 10px 20px rgba(37, 117, 252, 0.3)' } }}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </PmcButton>

          <Box mt={1.5} textAlign="center">
            <Typography sx={{ fontSize: '13px', fontFamily: 'Manrope', color: '#666' }}>
              Already have an account?{' '}
              <span style={{ color: '#2575fc', cursor: 'pointer', fontWeight: 700, transition: 'color 0.2s' }} onClick={() => navigate(RouteConstants.Login.path)}>
                Sign In
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterContainer;
