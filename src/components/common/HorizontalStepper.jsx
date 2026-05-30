import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DottedStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderTop: `2px dotted black`, 
  },
  '& .Mui-active':{
    color: 'black !important', 
    // fill: "#fff",
    // border: "1px solid black",
    // borderRadius: "50%",
  },
  '& .Mui-completed': {
    color: 'green !important', 
  },
  '& .MuiStepIcon-text':{
    fill:"white !important",
  }
}));

export default function HorizontalStepper({
  steps = [],
  initialStep = 0,
  onComplete = () => {},
  children = [] 
}) {
  const [activeStep, setActiveStep] = React.useState(initialStep);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  React.useEffect(() => {
    if (activeStep === steps.length) {
      onComplete();
    }
  }, [activeStep, steps.length, onComplete]);

  return (
    <Box sx={{ width: '100%' }}>
      <DottedStepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </DottedStepper>
      {activeStep === steps.length ? (
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you're finished
        </Typography>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/* Render the component for the current step */}
          <Box sx={{ mt: 2 }}>{children[activeStep]}</Box>
        </>
      )}

      {/* Buttons for navigation */}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
