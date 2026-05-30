import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import InitialsAvatar from '../common/InitialsAvatar';

const ProfileComponent = () => {
  const profile = useSelector((state) => state.user.profileData);

  return (
    <Box maxWidth="700px" mx="auto" mt={4} p={2}>
      
      {/* Header */}
      <Card sx={{ 
        mb: 3, 
        borderRadius: '16px', 
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        color: '#fff'
      }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
          <InitialsAvatar 
            name={profile?.profileData?.name ?? 'Admin'} 
            sx={{ 
              width: 90, height: 90, 
              border: '4px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
              fontSize: '32px'
            }} 
          />
          <Box ml={3}>
            <Typography variant="h4" fontWeight="bold" fontFamily="Manrope">
              {profile?.profileData?.name ?? "Admin"}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, fontFamily: 'Manrope', textTransform: 'capitalize' }}>
              {profile?.profileData?.role === 'Admin' ? profile?.profileData?.email : profile?.profileData?.role}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Personal Details */}
      {profile?.profileData?.role !== 'Admin' && (
        <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.03)' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily="Manrope" color="#262626">
              Personal Information
            </Typography>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" fontFamily="Manrope">Email Address</Typography>
                <Typography variant="body1" fontWeight="500" fontFamily="Manrope">{profile?.profileData?.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" fontFamily="Manrope">Phone Number</Typography>
                <Typography variant="body1" fontWeight="500" fontFamily="Manrope">{profile?.profileData?.phone || 'N/A'}</Typography>
              </Grid>
              {profile?.profileData?.role === 'Patient' && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" fontFamily="Manrope">Age</Typography>
                  <Typography variant="body1" fontWeight="500" fontFamily="Manrope">{profile?.profileData?.age || 'N/A'}</Typography>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" fontFamily="Manrope">Gender</Typography>
                <Typography variant="body1" fontWeight="500" fontFamily="Manrope">{profile?.profileData?.gender || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Additional Info */}
      {profile?.profileData?.role === 'Doctor' && (
        <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.03)' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily="Manrope" color="#262626">
              Professional Details
            </Typography>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" fontFamily="Manrope">Specialization</Typography>
                <Typography variant="body1" fontWeight="500" fontFamily="Manrope">{profile?.profileData?.specialization || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProfileComponent;
