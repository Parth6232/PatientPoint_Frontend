import React from 'react';
import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';

const DetailCard = ({ title, details }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        padding: 2,
        marginBottom: 2,
        width: '100%', // Ensure the card takes full width on smaller screens
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={detail.fullWidth ? 12 : 4}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }} // Smaller font for mobile
                >
                  {detail.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive text size
                    wordBreak: 'break-word', // Prevent text overflow
                  }}
                >
                  {detail.value}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
